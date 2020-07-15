import { get } from "svelte/store";
import gql from "graphql-tag";
import client from "./client";
import { queries, global } from "../store";

function stringQuery(query, type) {
  if (typeof query == "string") {
    query &&
      query.indexOf(" ") === -1 &&
      query.indexOf("{") === -1 &&
      (query = get(queries)[query] || query);
    query = query.replace(/^\s*(query|mutation|subscription)?\s*/g, `${type} `);
  }
  return query;
}

function parseQuery(query, type) {
  if (typeof query == "string")
    return gql(stringQuery(query, type));
  return query;
}

function vars(query, vars) {
  let variables = {};
  if (typeof query === "string") {
    query = stringQuery(query);
    Array.from(query.matchAll(/\$(\w+)\s*:\s*\w+!?\s*[,\)]/g))
      .forEach(match => {
        if (typeof get(global)[match[1]] !== "undefined")
          variables[match[1]] = get(global)[match[1]];
      });
  }
  return { ...variables, ...vars };
}

export const query = (query, variables = {}, options = {}) => {
  /* Fall back to global variable (if any),
   * if a variable not passed,
   * only works with string form of query (not with graphql-tag) */
  variables = vars(query, variables);
  /* execute this query */
  return client.query(parseQuery(query, "query"), variables, options)
};
export const mutate = (mutation, variables = {}, options = {}) => {
  /* Fall back to global variable (if any),
   * if a variable not passed,
   * only works with string form of mutation (not with graphql-tag) */
  variables = vars(mutation, variables);
  /* execute this mutation */
  return client.mutate(parseQuery(mutation, "mutation"), variables, options)
};
export const subscribe = (query, variables = {}, options = {}) => {
  /* Fall back to global variable (if any),
   * if a variable not passed,
   * only works with string form of query (not with graphql-tag) */
  variables = vars(query, variables);
  /* execute this query */
  return client.subscribe(parseQuery(query, "subscription"), variables, options)
};
