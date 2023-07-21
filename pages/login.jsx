import Head from "next/head";
import Layout from "../layout/layout";
import Link from "next/link";
import styles from "../styles/Form.module.css";
import Image from "next/image";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState } from "react";
import { useFormik } from "formik";
import login_validate from "../lib/validate";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "./loading";

export default function Login() {
  const router = useRouter();
  const { googleSignIn, githubSignIn, login } = useAuth();

  const emailSignIn = async (formik) => {
    console.log(formik.email, formik.password);
    return await login(formik.email, formik.password);
  };

  const [show, setShow] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: login_validate,
    onSubmit: emailSignIn,
  });

  console.log(formik.errors);

  async function onSubmit(values) {
    console.log(values);
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

        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div
            className={`${styles.input_group} ${
              formik.errors.email && formik.touched.email
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input_text}
              onChange={formik.handleChange}
              {...formik.getFieldProps("email")}
            />
            <span className="icon flex items-center px-4">
              <HiAtSymbol size={25} />
            </span>
          </div>
          {formik.errors.email && formik.touched.email ? <span className="text-rose-500">{formik.errors.email}</span> : <></>}
          {/* <div className={styles.input_group}> */}
          <div
            className={`${styles.input_group} ${
              formik.errors.password && formik.touched.password
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              type={`${show ? "text" : "password"}`}
              name="password"
              placeholder="Password"
              className={styles.input_text}
              {...formik.getFieldProps("password")}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow(!show)}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>
          {formik.errors.password && formik.touched.password ? <span className="text-rose-500">{formik.errors.password}</span> : <></>}

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
            <button
              type="button"
              onClick={githubSignIn}
              className={styles.button_custom}
            >
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
