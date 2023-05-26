import Head from "next/head";
import Layout from "../layout/layout";
import Link from "next/link";

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
          <div className="input-group">
            <input type="email" name="email" placeholder="Email" />
          </div>
          <div className="input-group">
            <input type="password" name="password" placeholder="Password" />
          </div>

          <div className="input-button">
            <button type="submit">Login</button>
          </div>
          <div className="input-button">
            <button type="submit">Sign in with Google</button>
          </div>
          <div className="input-button">
            <button type="submit">Sign in with Github</button>
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
