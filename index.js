import Root from "./components/Root.svelte";
import User from "./components/User.svelte";
import Query from "./components/Query.svelte";
import Subscribe from "./components/Subscribe.svelte";
import Mutate from "./components/Mutate.svelte";
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
