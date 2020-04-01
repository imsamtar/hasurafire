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
  get wsClient() {
    if (!graphql.serverUri || !graphql.token) return 0;
    const link = new WebSocketLink({
      uri: `ws://${graphql.serverUri.split("//").splice(-1)[0]}`,
      options: {
        reconnect: true,
        connectionParams: {
          headers: { Authorization: `Bearer ${graphql.token}` }
        }
      }
    });
    link.subscriptionClient.maxConnectTimeGenerator.duration = () =>
      link.subscriptionClient.maxConnectTimeGenerator.max;
    return [
      new ApolloClient({
        link,
        cache: new InMemoryCache()
      }),
      () => link.subscriptionClient.close()
    ];
  }
};

export default {
  query(query, variables) {
    return graphql.httpClient.query({ query, variables });
  },
  subscribe(query, variables) {
    const client = graphql.wsClient;
    return {
      observable: client[0].subscribe({ query, variables }),
      disconnect: client[1]
    };
  },
  mutate(mutation, variables) {
    return graphql.httpClient.mutate({ mutation, variables });
  }
};
