import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useState } from "react";
import { getSession, useSession, signOut } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();

  function handleSignOut() {
    signOut()
  }

  // const[session, setSession] = useState(false);
  return (
    <>
      <Head>
        <title>Homepage</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {session ? User({ session, handleSignOut }) : Guest()}
    </>
  );
}

//Guest
function Guest() {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Guest Homepage</h3>

      <div className="flex justify-center">
        <Link href={"/login"} legacyBehavior>
          <a className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50">
            Sign In
          </a>
        </Link>
      </div>
    </main>
  );
}

//Authorize User
function User({ session, handleSignOut }) {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">User Homepage</h3>

      <div className="details">
        <h5>{session.user.name}</h5>
        <h5>{session.user.email}</h5>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSignOut}
          className="mt-5 px-10 py-1 rounded-sm bg-gradient-to-r from-blue-500 to-indigo-500 text-gray-50"
        >
          Sign Out
        </button>
      </div>

      <div className="flex justify-center">
        <Link href={"/comingSoon"} legacyBehavior>
          <a className="mt-5 px-10 py-1 rounded-sm bg-gradient-to-r from-blue-500 to-indigo-500 text-gray-50">
            Profile Page
          </a>
        </Link>
      </div>
    </main>
  );
}

//Protected Route: Redirect to /login if the user is not signed in
export async function getServerSideProps({ req }) {
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  return {
    props: { session }
  }
}