// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC2Gb0C4ME5UHwROJ-OR_mf78NTi5DfLHA",
  authDomain: "cherry-76821.firebaseapp.com",
  projectId: "cherry-76821",
  storageBucket: "cherry-76821.appspot.com",
  messagingSenderId: "535041050006",
  appId: "1:535041050006:web:d733bdf15c0b18875849b7",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
