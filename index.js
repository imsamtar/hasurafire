import Root from "./components/Root.svelte";
import User from "./components/User.svelte";
import SaveUser from "./components/SaveUser.svelte";
import Query from "./components/Query.svelte";
import Subscribe from "./components/Subscribe.svelte";
import Mutation from "./components/Mutation.svelte";
import { query, subscribe, mutate } from "./graphql/actions";
import { accessToken } from "./stores";
import * as auth from "./auth";

const {
  default: firebase,
  currentUser: user,
  loginStatus,
  signInWithGoogle,
  signInWithGithub,
  signInWithFacebook,
  signInWithTwitter,
  signInWithOAuth,
  signInWithEmailAndPassword,
  signOut,
} = auth;

export {
  Root,
  User,
  SaveUser,
  Query,
  Subscribe,
  Mutation,
  query,
  subscribe,
  mutate,
  firebase,
  user,
  loginStatus,
  accessToken,
  signInWithGoogle,
  signInWithGithub,
  signInWithFacebook,
  signInWithTwitter,
  signInWithOAuth,
  signInWithEmailAndPassword,
  signOut,
};
