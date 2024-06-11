// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD60w531SxJj_6S5o0WN3g3K3jKnxFG6Zo",
  authDomain: "the-keep-97b53.firebaseapp.com",
  projectId: "the-keep-97b53",
  storageBucket: "the-keep-97b53.appspot.com",
  messagingSenderId: "1089909758115",
  appId: "1:1089909758115:web:bb1a3fc2c1423fe7414716"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db};