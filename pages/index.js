import Head from "next/head";
import { Inter } from "next/font/google";
import Link from "next/link";
import Layout from "@/components/layout";
import { useAuth } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const { logout, currentUser } = useAuth();
  console.log(currentUser);

  return (
    <>
      <Head>
        <title>Homepage</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      { User({logout, currentUser})}

      {/* {session ? User({ session, signOut }) : Guest()} */}
    </>
  );
}

//Authorize User
function User({ logout, currentUser }) {
  return (
    <Layout>
      <main className="container mx-auto text-center py-20">
        <h3 className="text-4xl font-bold">User Homepage</h3>

        <div className="details">
          <h3>{currentUser && currentUser.displayName}</h3>
          <h3>{currentUser && currentUser.email}</h3>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => logout()}
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
    </Layout>
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
