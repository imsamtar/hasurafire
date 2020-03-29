import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { serverUri as server } from "./store";

const graphql = {
  get serverUri() {
    let serverUri;
    server.subscribe(uri => (serverUri = uri))();
    return serverUri;
  },
  get token() {
    return localStorage.getItem("token");
  },
  get httpClient() {
    if (!graphql.serverUri || !graphql.token) return 0;
    const link = new HttpLink({
      uri: graphql.serverUri,
      headers: { Authorization: `Bearer ${graphql.token}` }
    });
    return new ApolloClient({
      link,
      cache: new InMemoryCache()
    });
  },
  get client() {
    if (!graphql.serverUri || !graphql.token) return 0;
    const httpLink = new HttpLink({
      uri: graphql.serverUri,
      headers: { Authorization: `Bearer ${graphql.token}` }
    });
    const wsLink = new WebSocketLink({
      uri: `ws://${graphql.serverUri.split("//").splice(-1)[0]}`,
      options: {
        reconnect: true,
        connectionParams: {
          headers: { Authorization: `Bearer ${graphql.token}` }
        }
      }
    });
    const link = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      httpLink
    );
    return new ApolloClient({
      link,
      cache: new InMemoryCache()
    });
  }
};

export default {
  query(query, variables) {
    return graphql.httpClient.query({ query, variables });
  },
  subscribe(query, variables) {
    return graphql.client.subscribe({ query, variables });
  },
  mutate(mutation, variables) {
    return graphql.httpClient.mutate({ mutation, variables });
  }
};
