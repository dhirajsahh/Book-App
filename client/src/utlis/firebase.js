// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "bookapp-a2a79.firebaseapp.com",
  projectId: "bookapp-a2a79",
  storageBucket: "bookapp-a2a79.appspot.com",
  messagingSenderId: "461752225009",
  appId: "1:461752225009:web:2edb4aa830f47241072d50",
  measurementId: "G-CMJ2VHE1XN",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
