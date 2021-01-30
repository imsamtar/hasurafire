import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { hasuraEndpoint, accessToken } from "../store.js";
import { readStore } from "../utils.js";

function shouldStop(headers = {}) {
    return (!readStore(hasuraEndpoint) || !readStore(accessToken)) && headers['Authorization'];
}

function getURI(protocol = "https") {
    return readStore(hasuraEndpoint)
        .replace(/^((\w*:)?\/\/)?/, `${protocol}://`);
}

const graphql = {
    httpClient(headers = {}) {
        if (shouldStop(headers)) return 0;
        const link = new HttpLink({
            uri: getURI(),
            headers
        });
        return new ApolloClient({
            link,
            cache: new InMemoryCache(),
        });
    },
    wsClient(headers = {}) {
        if (shouldStop(headers)) return 0;
        const link = new WebSocketLink({
            uri: getURI('wss'),
            options: {
                reconnect: true,
                lazy: true,
                connectionParams: {
                    headers
                },
            },
        });
        // To avoid `failed: WebSocket is closed before the connection is established.` warning in console
        link.subscriptionClient.maxConnectTimeGenerator.setMin(3000);
        return [
            new ApolloClient({
                link,
                cache: new InMemoryCache(),
            }),
            link.subscriptionClient,
        ];
    },
};

function processOptions(options = {}) {
    const token = readStore(accessToken);
    const headers = { Authorization: `Bearer ${token}`, ...(options.headers || {}) };
    if (!token) delete headers['Authorization'];
    if (options.noauth && options.noauth !== "false") delete headers['Authorization'];
    if (options['adminsecret']) {
        delete headers['Authorization'];
        headers['x-hasura-role'] = 'admin';
        headers['x-hasura-admin-secret'] = options['adminsecret'];
    }
    if (options.role) headers['x-hasura-role'] = options.role;
    return headers;
}

export default {
    query(query, variables, options = {}) {
        const headers = processOptions(options);
        return graphql.httpClient(headers).query({ query, variables });
    },
    mutate(mutation, variables, options = {}) {
        const headers = processOptions(options);
        return graphql.httpClient(headers).mutate({ mutation, variables });
    },
    subscribe(query, variables, options = {}) {
        const headers = processOptions(options);
        const client = graphql.wsClient(headers);
        return {
            observable: client[0].subscribe({ query, variables }),
            client: client[1],
        };
    }
};