import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZ4iQxM4SiVncO2W49X2WZkrAoizeR-pw",
  authDomain: "finforce-orbital.firebaseapp.com",
  projectId: "finforce-orbital",
  storageBucket: "finforce-orbital.appspot.com",
  messagingSenderId: "904834984824",
  appId: "1:904834984824:web:726eb0d563b9c4cc0d368d",
  measurementId: "G-TZ5Q6M846M"
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Homepage</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </main>
    </>
  );
}
