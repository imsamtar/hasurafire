import gql from "graphql-tag";
import client from ".";

const query = (query, variables = {}) => {
  if (typeof query == "string") query = gql(query);
  return client.query(query, variables);
};

const subscribe = (query, variables = {}) => {
  if (typeof query == "string") query = gql(query);
  return client.subscribe(query, variables);
};

const mutate = (mutation, variables = {}) => {
  if (typeof mutation == "string") mutation = gql(mutation);
  return client.mutate(mutation, variables);
};

export { query, subscribe, mutate };
