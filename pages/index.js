import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { initFirebase } from "@/firebase/firebaseApp";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // initFirebase();

  // const app = initFirebase();
  const auth = getAuth();
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const currentUser = auth.currentUser

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    router.push("/login");
    return <div>Please sign in to continue</div>;
  }

  console.log(currentUser.displayName);
  // const { data: session } = useSession();
  // function handleSignOut() {
  //   signOut()
  // }

  // const[session, setSession] = useState(false);
  return (
    <>
      <Head>
        <title>Homepage</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {User({ auth, currentUser })}

      {/* {session ? User({ session, signOut }) : Guest()} */}
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
function User({ auth, currentUser }) {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">User Homepage</h3>

      <div className="details">
        {/* <h5>{session.user.name}</h5>
        <h5>{session.user.email}</h5> */}
        <h5>{currentUser.displayName}</h5>
        <h5>{currentUser.email}</h5>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => auth.signOut()}
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
// export async function getServerSideProps({ req }) {
//   const session = await getSession({ req })

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       }
//     }
//   }
//   return {
//     props: { session }
//   }
// }