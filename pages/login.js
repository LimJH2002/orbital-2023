import Head from "next/head";
import Layout from "../layout/layout";
import Link from "next/link";
import styles from "../styles/Form.module.css";
import Image from "next/image";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState } from "react";
// import { userSession, signIn, signOut } from "next-auth/react";
import { useFormik } from "formik";
import login_validate from "../lib/validate";
import { getAuth, signInWithRedirect, GoogleAuthProvider, GithubAuthProvider, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { initFirebase } from "@/firebase/firebaseApp";
import { async } from "@firebase/util";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

export default function Login() {
  initFirebase();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();


  const emailSignIn = async (formik) => {
    // const result = await signInWithEmailAndPassword(auth, formik.email, formik.password);
    // console.log(result);
    await signInWithEmailAndPassword(auth, formik.email, formik.password)
      .then((result) => console.log(result.user));
    
  }

  const googleSignIn = async () => {
    const result = await signInWithRedirect(auth, googleProvider);
    console.log(result.user.uid);
  }

  const githubSignIn = async () => {
    const result = await signInWithRedirect(auth, githubProvider);
    console.log(result.user);
  }


  const [show, setShow] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate: login_validate,
    onSubmit: emailSignIn
  })

  console.log(formik.errors)
  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    router.push("/");
    // console.log(user.displayName);
    return <div>Welcome {user.displayName}</div>
  }

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     router.push("/");
  //     return <div>Welcome {user.displayName}</div>
  //   }
  // })

  async function onSubmit(values) {
    console.log(values)
  }

  async function handleGoogleSignIn() {
    signIn('google', { callbackUrl: "http://localhost:3000"})

  }

  async function handleGithubSignIn() {
    signIn('github', { callbackUrl: "http://localhost:3000"})

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

        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit} >
          <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-rose-600' : ''}`}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input_text}
              onChange={formik.handleChange}
              {...formik.getFieldProps('email')}
            />
            <span className="icon flex items-center px-4">
              <HiAtSymbol size={25} />
            </span>
            
          </div>
          {/* {formik.errors.email && formik.touched.email ? <span className="text-rose-500">{formik.errors.email}</span> : <></>} */}
          {/* <div className={styles.input_group}> */}
          <div className={`${styles.input_group} ${formik.errors.password && formik.touched.password ? 'border-rose-600' : ''}`}>
            <input
              type={`${show ? "text" : "password"}`}
              name="password"
              placeholder="Password"
              className={styles.input_text}
              {...formik.getFieldProps('password')}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow(!show)}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>
            {/* {formik.errors.password && formik.touched.password ? <span className="text-rose-500">{formik.errors.password}</span> : <></>} */}
          

          <div className="input-button`">
            <button type="submit" className={styles.button}>
              Login
            </button>
          </div>
          <div className="input-button">
            <button
              type="button"
              onClick={googleSignIn}
              //onClick={handleGoogleSignIn}
              className={styles.button_custom}
            >
              <Image src={"/assets/google.svg"} width="20" height="20"></Image>
              Sign in with Google
            </button>
          </div>
          <div className="input-button">
            <button type="button" onClick={githubSignIn} className={styles.button_custom}>
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
