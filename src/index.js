export { default as Root } from "./components/Root.svelte";
export { default as User } from "./components/User.svelte";
export { default as SaveUser } from "./components/SaveUser.svelte";
export { default as Query } from "./components/Query.svelte";
export { default as Subscribe } from "./components/Subscribe.svelte";
export { default as Mutation } from "./components/Mutation.svelte";
export { query, subscribe, mutate } from "./graphql";
export {
  default as firebase,
  currentUser as user,
  loginStatus,
  accessToken,
  signInWithGoogle,
  signInWithGithub,
  signInWithFacebook,
  signInWithTwitter,
  signInWithOAuth,
  signInWithEmailAndPassword,
  signOut
} from "./store";
