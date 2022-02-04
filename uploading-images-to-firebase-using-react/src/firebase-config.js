import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
// import { getStorage } from "./firebase/storage";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIu8Ivg_teGc5zJU3nQfFknGWjfq8TD_A",
  authDomain: "uploading-images-to-fire-69291.firebaseapp.com",
  projectId: "uploading-images-to-fire-69291",
  storageBucket: "uploading-images-to-fire-69291.appspot.com",
  messagingSenderId: "290170825709",
  appId: "1:290170825709:web:c8141a577d437917ff55e4",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const firestore = getFirestore(app);
