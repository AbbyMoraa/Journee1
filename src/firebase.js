// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Your Firebase config (from your Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyCVZCbe3q7x0c3gQZMwz04HsUqF3fwewIE",
  authDomain: "journee1-55859.firebaseapp.com",
  projectId: "journee1-55859",
  storageBucket: "journee1-55859.firebasestorage.app",
  messagingSenderId: "662151178093",
  appId: "1:662151178093:web:d5b28fe45a6915763e9c64",
  measurementId: "G-XLN395VH03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth + Firestore so the rest of your app can use them
export const auth = getAuth(app);
export const db = getFirestore(app);

