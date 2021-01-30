import Root from "./components/Root.svelte";
import User from "./components/User.svelte";
import SaveUser from "./components/SaveUser.svelte";
import Query from "./components/Query.svelte";
import Mutate from "./components/Mutate.svelte";
import Subscribe from "./components/Subscribe.svelte";
import { query, mutate, subscribe } from "./graphql/index.js";

export {
    firebase,
    currentUser as user,
    loginStatus,
    accessToken,
    global,
    hasuraEndpoint,
    queries,
    performance,
    signUp,
    signIn,
    signOut,
    signInWithGoogle,
    signInWithGithub,
    signInWithFacebook,
    signInWithTwitter,
    signInWithOAuth,
    signInWithGoogleRedirect,
    signInWithGithubRedirect,
    signInWithFacebookRedirect,
    signInWithTwitterRedirect,
    signInWithOAuthRedirect,
    verifyEmail,
    updateProfile,
    updateEmail,
    updatePassword,
    resetPassword,
    deleteAccount,
} from "./store.js";

export {
    Root,
    User,
    SaveUser,
    Query,
    Mutate,
    Subscribe,
    query,
    mutate,
    subscribe
}