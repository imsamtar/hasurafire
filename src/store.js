import { writable } from "svelte/store";
import { readStore } from "./utils";

export const firebase = writable(0);
export const analytics = writable(0);
export const performance = writable(0);
export const loginStatus = writable(0); // -1 = Signed Out, 0 = Loading, 1 = Signed In
export const currentUser = writable(0);
export const accessToken = writable("");
export const hasuraEndpoint = writable("");
export const queries = writable({});
export const global = writable({});
export default firebase;

function processProvider(provider, scopes, options) {
    if (scopes instanceof Array)
        for (const scope of scopes) provider.addScope(scope);
    provider.setCustomParameters(options);
}

// For signInWithPopup

export function signInWithGoogle(scopes = [], options = {}) {
    const { auth } = readStore(firebase);
    const provider = new auth.GoogleAuthProvider();
    processProvider(provider, scopes, options);
    return auth().signInWithPopup(provider);
};

export function signInWithGithub(scopes = [], options = {}) {
    const { auth } = readStore(firebase);
    const provider = new auth.GithubAuthProvider();
    processProvider(provider, scopes, options);
    return auth().signInWithPopup(provider);
};

export function signInWithFacebook(scopes = [], options = {}) {
    const { auth } = readStore(firebase);
    const provider = new auth.FacebookAuthProvider();
    processProvider(provider, scopes, options);
    return auth().signInWithPopup(provider);
};

export function signInWithTwitter(scopes = [], options = {}) {
    const { auth } = readStore(firebase);
    const provider = new auth.TwitterAuthProvider();
    processProvider(provider, scopes, options);
    return auth().signInWithPopup(provider);
};

export function signInWithOAuth(scopes = [], options = {}) {
    const { auth } = readStore(firebase);
    const provider = new auth.OAuthProvider();
    processProvider(provider, scopes, options);
    return auth().signInWithPopup(provider);
};

// For signInWithRedirect

export function signInWithGoogleRedirect(scopes = [], options = {}) {
    const { auth } = readStore(firebase);
    const provider = new auth.GoogleAuthProvider();
    processProvider(provider, scopes, options);
    return auth().signInWithRedirect(provider);
};

export function signInWithGithubRedirect(scopes = [], options = {}) {
    const { auth } = readStore(firebase);
    const provider = new auth.GithubAuthProvider();
    processProvider(provider, scopes, options);
    return auth().signInWithRedirect(provider);
};

export function signInWithFacebookRedirect(scopes = [], options = {}) {
    const { auth } = readStore(firebase);
    const provider = new auth.FacebookAuthProvider();
    processProvider(provider, scopes, options);
    return auth().signInWithRedirect(provider);
};

export function signInWithTwitterRedirect(scopes = [], options = {}) {
    const { auth } = readStore(firebase);
    const provider = new auth.TwitterAuthProvider();
    processProvider(provider, scopes, options);
    return auth().signInWithRedirect(provider);
};

export function signInWithOAuthRedirect(scopes = [], options = {}) {
    const { auth } = readStore(firebase);
    const provider = new auth.OAuthProvider();
    processProvider(provider, scopes, options);
    return auth().signInWithRedirect(provider);
};

// Other signin mathods

export function signInWithEmailAndPassword(email, password) {
    const { auth } = readStore(firebase);
    return auth().signInWithEmailAndPassword(email, password);
};

// Signout

export function signOut() {
    const { auth } = readStore(firebase);
    return auth().signOut();
};