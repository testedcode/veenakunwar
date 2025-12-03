// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1Qr10jYG2yS9b_R3AQvfKvc8c1R-Ep6Y",
  authDomain: "veenakunwar-50d5d.firebaseapp.com",
  projectId: "veenakunwar-50d5d",
  storageBucket: "veenakunwar-50d5d.firebasestorage.app",
  messagingSenderId: "336417751752",
  appId: "1:336417751752:web:2332f70b7db9926d769bfd",
  measurementId: "G-CFBMY6MPCH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, analytics, db, storage, auth };

