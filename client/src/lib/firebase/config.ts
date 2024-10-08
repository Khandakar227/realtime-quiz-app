// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBT-QerQYKVyLcS1T2vzecONYx5VfBNPGc",
  authDomain: "quiz-app-2381c.firebaseapp.com",
  databaseURL: "https://quiz-app-2381c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "quiz-app-2381c",
  storageBucket: "quiz-app-2381c.appspot.com",
  messagingSenderId: "881547572757",
  appId: "1:881547572757:web:ea005bd889279bc21f801c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const rtdb = getDatabase(app);