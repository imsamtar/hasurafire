import { writable } from "svelte/store";

const firebase = writable(0);
export default firebase;

export const loginStatus = writable(0); // -1 = Signed Out, 0 = Loading, 1 = Signed In
export const currentUser = writable(0);

export const signInWithGoogle = () => {
  let response;
  const unsub = firebase.subscribe((firebase) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    response = firebase.auth().signInWithPopup(provider);
  });
  unsub();
  return response;
};

export const signInWithGithub = () => {
  let response;
  const unsub = firebase.subscribe((firebase) => {
    const provider = new firebase.auth.GithubAuthProvider();
    response = firebase.auth().signInWithPopup(provider);
  });
  unsub();
  return response;
};

export const signInWithFacebook = () => {
  let response;
  const unsub = firebase.subscribe((firebase) => {
    const provider = new firebase.auth.FacebookAuthProvider();
    response = firebase.auth().signInWithPopup(provider);
  });
  unsub();
  return response;
};

export const signInWithTwitter = () => {
  let response;
  const unsub = firebase.subscribe((firebase) => {
    const provider = new firebase.auth.TwitterAuthProvider();
    response = firebase.auth().signInWithPopup(provider);
  });
  unsub();
  return response;
};

export const signInWithOAuth = () => {
  let response;
  const unsub = firebase.subscribe((firebase) => {
    const provider = new firebase.auth.OAuthProvider();
    response = firebase.auth().signInWithPopup(provider);
  });
  unsub();
  return response;
};

export const signInWithEmailAndPassword = (email, password) => {
  let response;
  const unsub = firebase.subscribe((firebase) => {
    response = firebase.auth().signInWithEmailAndPassword(email, password);
  });
  unsub();
  return response;
};

export const signOut = () => {
  let response;
  const unsub = firebase.subscribe((firebase) => {
    response = firebase.auth().signOut();
  });
  unsub();
  return response;
};
