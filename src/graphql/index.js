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

export const query = (query, variables = {}) => client.query(parseQuery(query), variables);
export const subscribe = (query, variables = {}) => client.subscribe(parseQuery(query), variables);
export const mutate = (mutation, variables = {}) => client.mutate(parseQuery(mutation), variables);
