import React, { useContext, useState, useEffect, useRef } from "react";
import { auth, db } from "@/firebase/firebaseApp";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(null);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const router = useRouter();

  function signup(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(router.push("/"))
      .catch((err) => {
        if (err.code == "auth/email-already-in-use") {
          alert("Email Exist");
          console.log("redirect");
          // formik.resetForm();
        }
      });
    return;
  }

  async function login(email, password) {
    const result = await signInWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((err) => {
      console.log(err);
      if (err.code == "auth/wrong-password") {
        alert("Wrong password");
      } else if (err.code == "auth/user-not-found") {
        alert("User Not Found");
        router.push("/register");
      }
    });
    console.log(result);
    // _callback();
  }

  async function googleSignIn() {
    const result = await signInWithPopup(auth, googleProvider).catch((err) => {
      console.log(err);
      if (err.code == "auth/account-exists-with-different-credential") {
        alert("Account exists with different credential");
      } else if (err.code == "auth/user-not-found") {
        alert("User Not Found");
        router.push("/register");
      }
    });
    // console.log(result.user.uid);
  }

  async function githubSignIn() {
    const result = await signInWithPopup(auth, githubProvider).catch((err) => {
      console.log(err);
      if (err.code == "auth/account-exists-with-different-credential") {
        alert("Account exists with different credential");
      } else if (err.code == "auth/user-not-found") {
        alert("User Not Found");
        router.push("/register");
      }
    });
    console.log(result);
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
      if (router.asPath !== "/login" && router.asPath !== "/register") {
        router.push(router.asPath);
      } else {
        router.push("/");
      }
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    googleSignIn,
    githubSignIn,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
