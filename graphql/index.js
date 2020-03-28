import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { serverUri as server } from "./store";

export default function() {
  let serverUri;
  let token = localStorage.getItem("token");
  server.subscribe(uri => (serverUri = uri))();
  if (!serverUri || !token) return 0;
  const httpLink = new HttpLink({
    uri: serverUri,
    headers: { Authorization: `Bearer ${token}` }
  });
  const wsLink = new WebSocketLink({
    uri: `ws://${serverUri.split("//").splice(-1)[0]}`,
    options: {
      reconnect: true,
      connectionParams: {
        headers: { Authorization: `Bearer ${token}` }
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
