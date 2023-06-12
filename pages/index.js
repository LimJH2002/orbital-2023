import Head from "next/head";
import { Inter } from "next/font/google";
import Link from "next/link";
import Layout from "@/components/layout";
import { useAuth } from "@/context/AuthContext";
import Overlap from "@/components/overlap-banner";
import { useRouter } from "next/router";

export default function Home() {
  const { logout, currentUser } = useAuth();
  const router = useRouter();
  if (!currentUser) {
    router.push("/login")
  }

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" sizes="any" href="/LogoF.ico"></link>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {User({ logout, currentUser })}
    </>
  );
}

//Authorize User
function User() {
  return (
    <Layout>
      <Overlap />
    </Layout>
  );
}
