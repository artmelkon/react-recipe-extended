import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDNm3gVmsHgTCihFnOGLkrTJqXIVsgTyr8",
  authDomain: "recipes-auth-b9967.firebaseapp.com",
  projectId: "recipes-auth-b9967",
  storageBucket: "recipes-auth-b9967.appspot.com",
  messagingSenderId: "789768690481",
  appId: "1:789768690481:web:aaa0f3686645c9ae8e6e10",
  measurementId: "G-BTYZY7T950",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      throw new Error("Error creating user ", err.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
