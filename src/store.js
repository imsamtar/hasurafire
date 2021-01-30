import { writable } from "svelte/store";
import { readStore } from "./utils.js";

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

export function signIn(email, password) {
    const { auth } = readStore(firebase);
    return auth().signInWithEmailAndPassword(email, password);
};

// sign up <email+password>

export function signUp(email, password) {
    const { auth } = readStore(firebase);
    return auth().createUserWithEmailAndPassword(email, password);
};

// reset password

export function resetPassword(email, langnageCode = undefined) {
    const { auth } = readStore(firebase);
    if (langnageCode) {
        auth().languageCode = langnageCode;
    }
    return auth().sendPasswordResetEmail(email);
};

// update password

export function updatePassword(newPassword) {
    const { auth } = readStore(firebase);
    const user = auth().currentUser;
    return user.updatePassword(newPassword);
}

// update email

export function updateEmail(newEmail) {
    const { auth } = readStore(firebase);
    const user = auth().currentUser;
    return user.updateEmail(newEmail);
}

// update user profile

export function updateProfile(profile = {}) {
    const { auth } = readStore(firebase);
    const user = auth().currentUser;
    return user.updateProfile(profile);
}

// verify email

export function verifyEmail() {
    const { auth } = readStore(firebase);
    const user = auth().currentUser;
    return user.sendEmailVerification();
}

// Signout

export function signOut() {
    const { auth } = readStore(firebase);
    return auth().signOut();
};

// delete account

export function deleteAccount() {
    const { auth } = readStore(firebase);
    const user = auth().currentUser;
    return user.delete();
}
