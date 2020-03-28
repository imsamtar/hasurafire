import Root from "./Root.svelte";
import User from "./User.svelte";
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
