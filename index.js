import Root from "./components/Root.svelte";
import User from "./components/User.svelte";
import Query from "./components/Query.svelte";
import Subscribe from "./components/Subscribe.svelte";
import Mutate from "./components/Mutate.svelte";
import { query, subscribe, mutate } from "./graphql/actions";
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
  signOut
} = auth;

export {
  Root,
  User,
  Query,
  Subscribe,
  Mutate,
  query,
  subscribe,
  mutate,
  firebase,
  user,
  loginStatus,
  signInWithGoogle,
  signInWithGithub,
  signInWithFacebook,
  signInWithTwitter,
  signInWithOAuth,
  signInWithEmailAndPassword,
  signOut
};
