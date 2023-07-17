import Head from "next/head";
import Overlap from "@/components/overlap-banner";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "./loading";
import { Fragment } from "react";

export default function Home() {
  const auth = getAuth();
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const currentUser = auth.currentUser;
  const passedIntro = true;

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    router.push("/login");
    return <div>Please sign in to continue</div>;
  }

  if (!passedIntro) {
    router.push("/intro");
    console.log(passed);
    return <div>You're still a newbie!</div>;
  }

  return (
    <Fragment>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" sizes="any" href="/LogoF.ico"></link>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {User({ auth, currentUser })}
    </Fragment>
  );
}

//Authorize User
function User(props) {
  return <Overlap auth={props.auth} />;
}
