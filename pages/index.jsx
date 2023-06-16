import Head from "next/head";
import Overlap from "@/components/overlap-banner";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import dynamic from "next/dynamic";
import Loading from "./loading";

function Home() {
  const auth = getAuth();
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const currentUser = auth.currentUser;

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    router.push("/login");
    return <div>Please sign in to continue</div>;
  }

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" sizes="any" href="/LogoF.ico"></link>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {User({ auth, currentUser })}
    </>
  );
}

//Authorize User
function User(props) {
  return <Overlap auth={props.auth} />;
}

export default dynamic(() => Promise.resolve(Home), { ssr: false });