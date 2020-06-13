import gql from "graphql-tag";
import client from "./client";
import { queries } from "../store";

function parseQuery(query) {
  if (typeof query == "string") {
    query &&
      query.indexOf(" ") === -1 &&
      query.indexOf("{") === -1 &&
      queries.subscribe((queries) => (query = queries[query] || query))();
    return gql(query);
  }
  return query;
}

export const query = (query, variables = {}, options = {}) => {
  return client.query(parseQuery(query), variables, options)
};
export const subscribe = (query, variables = {}, options = {}) => {
  return client.subscribe(parseQuery(query), variables, options)
};
export const mutate = (mutation, variables = {}, options = {}) => {
  return client.mutate(parseQuery(mutation), variables, options)
};
