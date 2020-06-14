import gql from "graphql-tag";
import client from "./client";
import { queries } from "../store";

function parseQuery(query, type) {
  if (typeof query == "string") {
    query &&
      query.indexOf(" ") === -1 &&
      query.indexOf("{") === -1 &&
      queries.subscribe((queries) => (query = queries[query] || query))();
    query = query.replace(/^\s*(query|mutation|subscription)?\s*/g, `${type} `);
    return gql(query);
  }
  return query;
}

export const query = (query, variables = {}, options = {}) => {
  return client.query(parseQuery(query, "query"), variables, options)
};
export const subscribe = (query, variables = {}, options = {}) => {
  return client.subscribe(parseQuery(query, "subscription"), variables, options)
};
export const mutate = (mutation, variables = {}, options = {}) => {
  return client.mutate(parseQuery(mutation, "mutation"), variables, options)
};
