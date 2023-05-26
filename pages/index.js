import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZ4iQxM4SiVncO2W49X2WZkrAoizeR-pw",
  authDomain: "finforce-orbital.firebaseapp.com",
  projectId: "finforce-orbital",
  storageBucket: "finforce-orbital.appspot.com",
  messagingSenderId: "904834984824",
  appId: "1:904834984824:web:726eb0d563b9c4cc0d368d",
  measurementId: "G-TZ5Q6M846M",
};

export default function Home() {

  const[session, setSession] = useState(false);
  return (
    <>
      <Head>
        <title>Homepage</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {session ? User() : Guest()}
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
function User() {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">User Homepage</h3>

      <div className="details">
        <h5>Unknown</h5>
        <h5>Unknown</h5>
      </div>

      <div className="flex justify-center">
        <button className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 bg-gray-50">
          Sign Out
        </button>
      </div>

      <div className="flex justify-center">
        <Link href={"/profile"} legacyBehavior>
          <a className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50">
            Profile Page
          </a>
        </Link>
      </div>
    </main>
  );
}
