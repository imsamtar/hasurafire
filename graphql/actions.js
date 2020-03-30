import gql from "graphql-tag";
import client from ".";
import { queries } from "./store";

function parseQuery(query) {
  if (typeof query == "string") {
    query &&
      query.indexOf(" ") === -1 &&
      query.indexOf("{") === -1 &&
      queries.subscribe(queries => (query = queries[query] || query))();
    return gql(query);
  } else {
    return query;
  }
}

const query = (query, variables = {}) => {
  query = parseQuery(query);
  return client.query(query, variables);
};

const subscribe = (query, variables = {}) => {
  query = parseQuery(query);
  return client.subscribe(query, variables);
};

const mutate = (mutation, variables = {}) => {
  mutation = parseQuery(mutation);
  return client.mutate(mutation, variables);
};

export { query, subscribe, mutate };
