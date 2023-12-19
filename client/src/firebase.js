
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-25bfa.firebaseapp.com",
  projectId: "mern-auth-25bfa",
  storageBucket: "mern-auth-25bfa.appspot.com",
  messagingSenderId: "1084982864936",
  appId: "1:1084982864936:web:24dd372626da6b0dcf991d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);