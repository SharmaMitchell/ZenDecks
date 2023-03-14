import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnZiVBYeqf7ntVQwy6yfidA8uF6nPP6Kw",
  authDomain: "flashy-c6e62.firebaseapp.com",
  projectId: "flashy-c6e62",
  storageBucket: "flashy-c6e62.appspot.com",
  messagingSenderId: "1033423310217",
  appId: "1:1033423310217:web:b69543a350a0c47157e558",
  measurementId: "G-0K50HJCSJD",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();

export default firebase;
