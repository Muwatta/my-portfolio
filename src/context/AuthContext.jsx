import { createContext, useContext, useEffect, useState } from "react";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, isFirebaseConfigured } from "../lib/firebase";
import { db } from "../lib/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      return;
    }

    setPersistence(auth, browserLocalPersistence).catch(() => {});
    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });
  }, []);

  const signIn = (email, password) => {
    if (!auth) throw new Error("Firebase is not configured.");
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email, password, displayName = "") => {
    if (!auth) throw new Error("Firebase is not configured.");
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    if (db) {
      await setDoc(
        doc(db, "profiles", credential.user.uid),
        {
          email: credential.user.email,
          displayName: displayName.trim(),
          role: "learner",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
        { merge: true },
      );
    }
    return credential;
  };

  const signOut = () => (auth ? firebaseSignOut(auth) : Promise.resolve());

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        isConfigured: isFirebaseConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
