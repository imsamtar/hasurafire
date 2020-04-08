import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { serverUri } from "./store";
import { accessToken } from "../stores";
import { readStore } from "../utils";

const graphql = {
  get httpClient() {
    if (!readStore(serverUri) || !readStore(accessToken)) return 0;
    const link = new HttpLink({
      uri: readStore(serverUri),
      headers: { Authorization: `Bearer ${readStore(accessToken)}` },
    });
    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  },
  get wsClient() {
    if (!readStore(serverUri) || !readStore(accessToken)) return 0;
    const link = new WebSocketLink({
      uri: `ws://${readStore(serverUri).split("//").splice(-1)[0]}`,
      options: {
        reconnect: true,
        connectionParams: {
          headers: { Authorization: `Bearer ${readStore(accessToken)}` },
        },
      },
    });
    link.subscriptionClient.maxConnectTimeGenerator.duration = () =>
      link.subscriptionClient.maxConnectTimeGenerator.max;
    return [
      new ApolloClient({
        link,
        cache: new InMemoryCache(),
      }),
      () => link.subscriptionClient.close(),
    ];
  },
};

export default {
  query(query, variables) {
    return graphql.httpClient.query({ query, variables });
  },
  subscribe(query, variables) {
    const client = graphql.wsClient;
    return {
      observable: client[0].subscribe({ query, variables }),
      disconnect: client[1],
    };
  },
  mutate(mutation, variables) {
    return graphql.httpClient.mutate({ mutation, variables });
  },
};
