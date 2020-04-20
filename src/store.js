import { writable } from "svelte/store";
import { readStore } from "./utils";

export const firebase = writable(0);
export const analytics = writable(0);
export const performance = writable(0);
export const loginStatus = writable(0); // -1 = Signed Out, 0 = Loading, 1 = Signed In
export const currentUser = writable(0);
export const accessToken = writable("");
export const serverUri = writable("");
export const queries = writable({});
export default firebase;

export const signInWithGoogle = () => {
    const { auth } = readStore(firebase);
    return auth().signInWithPopup(new auth.GoogleAuthProvider());
};

export const signInWithGithub = () => {
    const { auth } = readStore(firebase);
    return auth().signInWithPopup(new auth.GithubAuthProvider());
};

export const signInWithFacebook = () => {
    const { auth } = readStore(firebase);
    return auth().signInWithPopup(new auth.FacebookAuthProvider());
};

export const signInWithTwitter = () => {
    const { auth } = readStore(firebase);
    return auth().signInWithPopup(new auth.TwitterAuthProvider());
};

export const signInWithOAuth = () => {
    const { auth } = readStore(firebase);
    return auth().signInWithPopup(new auth.OAuthProvider());
};

export const signInWithEmailAndPassword = (email, password) => {
    const { auth } = readStore(firebase);
    return auth().signInWithEmailAndPassword(email, password);
};

export const signOut = () => {
    const { auth } = readStore(firebase);
    return auth().signOut();
};
