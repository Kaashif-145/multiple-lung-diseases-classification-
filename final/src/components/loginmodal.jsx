import React, { useState } from "react";
import { auth, googleProvider, githubProvider, db2 } from "../firebaseConfig";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const LoginModal = ({ show, handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!show) return null;

  // -------------------- Email/Password Login --------------------
  const handleEmailLogin = async () => {
    try {
      const userDoc = await getDoc(doc(db2, "users", email));
      if (!userDoc.exists()) {
        // New user → create account
        await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db2, "users", email), { email });
        alert("Signup & Login successful!");
      } else {
        // Existing user → login
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
      }
      handleClose();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // -------------------- Google Login --------------------
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userRef = doc(db2, "users", user.uid);
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        await setDoc(userRef, { uid: user.uid, name: user.displayName, email: user.email });
      }
      alert("Google login successful!");
      handleClose();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // -------------------- GitHub Login --------------------
  const handleGithubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;
      const userRef = doc(db2, "users", user.uid);
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        await setDoc(userRef, { uid: user.uid, name: user.displayName, email: user.email });
      }
      alert("GitHub login successful!");
      handleClose();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-xl font-semibold mb-4">Login / Signup</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button onClick={handleEmailLogin} className="w-full bg-green-600 text-white p-2 rounded mb-2">Login / Signup</button>
        <hr className="my-3" />
        <button onClick={handleGoogleLogin} className="w-full bg-blue-600 text-white p-2 rounded mb-2">Login with Google</button>
        <button onClick={handleGithubLogin} className="w-full bg-gray-800 text-white p-2 rounded">Login with GitHub</button>
        <button onClick={handleClose} className="mt-3 text-sm text-gray-500">Cancel</button>
      </div>
    </div>
  );
};

export default LoginModal;
