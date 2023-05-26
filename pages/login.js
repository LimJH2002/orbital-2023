import Head from "next/head";
import Layout from "../layout/layout";
import Link from "next/link";
import styles from '../styles/Form.module.css'
import Image from "next/image";
import { IconName } from "react-icons/hi";

export default function Login() {
  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>

      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">Explore</h1>
          <p className="w-3/4 mx-auto text-gray-400">rfjdklj;jksljs;lkjkj</p>
        </div>

        <form className="flex flex-col gap-5">
          <div className={styles.input_group}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input_text}
            />
          </div>
          <div className={styles.input_group}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={styles.input_text}
            />
          </div>

          <div className="input-button`">
            <button type="submit" className={styles.button}>
              Login
            </button>
          </div>
          <div className="input-button">
            <button type="button" className={styles.button_custom}>
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
        <div className="title"></div>
      </section>
    </Layout>
  );
}
