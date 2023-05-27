import Head from "next/head";
import Layout from "../layout/layout";
import Link from "next/link";
import styles from '../styles/Form.module.css'
import Image from "next/image";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState } from "react";
import { userSession, signIn, signOut } from "next-auth/react";
import { async } from "@firebase/util";
import { getAuth, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import firebaseConfig from "./index.js";

export default function Login() {

  const[show, setShow] = useState(false);

  async function handleGoogleSignIn() {
    signIn('google', { callbackUrl: "http://localhost:3000"})
    // signInWithRedirect(getAuth(), new GoogleAuthProvider())
  }

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>

      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">
            FinForce Login
          </h1>
          <p className="w-3/4 mx-auto text-gray-400">Simplify your wealth</p>
        </div>

        <form className="flex flex-col gap-5" method="POST">
          <div className={styles.input_group}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input_text}
            />
            <span className="icon flex items-center px-4">
              <HiAtSymbol size={25} />
            </span>
          </div>
          <div className={styles.input_group}>
            <input
              type={`${show ? "text" : "password"}`}
              name="password"
              placeholder="Password"
              className={styles.input_text}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow(!show)}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>

          <div className="input-button`">
            <button type="submit" className={styles.button}>
              Login
            </button>
          </div>
          <div className="input-button">
            <button type="button" onClick={handleGoogleSignIn} className={styles.button_custom}>
              <Image src={"/assets/google.svg"} width="20" height="20"></Image>
              Sign in with Google
            </button>
          </div>
          <div className="input-button">
            <button type="button" className={styles.button_custom}>
              <Image src={"/assets/github.svg"} width="25" height="25"></Image>
              Sign in with Github
            </button>
          </div>
        </form>

        <p className="text-center text-gray-400">
          Don't have an account yet?{" "}
          <Link legacyBehavior href={"/register"}>
            <a className="text-blue-700">Sign Up</a>
          </Link>
        </p>
      </section>
    </Layout>
  );
}
