// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

// -------------------- Project 1 --------------------
const firebaseConfig1 = {
  apiKey: "AIzaSyDzxxffzsdKs2ZbU3cShMQKEh3OKztFUZQ",
  authDomain: "major-658b8.firebaseapp.com",
  projectId: "major-658b8",
  storageBucket: "major-658b8.firebasestorage.app",
  messagingSenderId: "867533338076",
  appId: "1:867533338076:web:10b935d08ae423f4478b19",
  measurementId: "G-Y7WCP1W7X2",
};

// Initialize Project 1
const app1 = initializeApp(firebaseConfig1, "app1");
export const db1 = getFirestore(app1);

// -------------------- Project 2 --------------------
const firebaseConfig2 = {
  apiKey: "AIzaSyAplkL04U6CPuyxzqudjYDD66Tr1XEvlQQ",
  authDomain: "major2-75b8d.firebaseapp.com",
  projectId: "major2-75b8d",
  storageBucket: "major2-75b8d.firebasestorage.app",
  messagingSenderId: "532297996350",
  appId: "1:532297996350:web:5a30e1a31c89f8baac996f",
  measurementId: "G-QFS8TD70PK",
};

// Initialize Project 2
const app2 = initializeApp(firebaseConfig2, "app2");
export const db2 = getFirestore(app2);
export const analytics2 = getAnalytics(app2);

// Firebase Auth for Project 2
export const auth = getAuth(app2);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
