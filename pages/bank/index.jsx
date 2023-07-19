import Head from "next/head";
import { Fragment, React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../loading";
import BankTab from "@/components/bank-tab";
import Overview from "./overview";
import LinkBank from "./link-bank";

const access = "07b1eef7-9939-3775-8242-05ab1e331ca0";

const Bank = () => {
  const router = useRouter();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [curr, setCurr] = useState("1");
  const [token, setToken] = useState();
  const query = router.query;
  useEffect(() => {
    console.log("q", query)
    if (query) {
      setToken(query.access_token);
    }
  }, [user])

  const setLinkedBank = async () => {
    const response = await fetch("/api/user?userId=" + user.uid, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({linkedBank: true}),
    });
  }

  useEffect(() => {
    console.log("access", token)
    if (token.length == 36) {
      setLinkedBank();
    }
  }, [token])

  function handleState(id) {
    setCurr(id == "1" ? "1" : "2");
  }

  if (loading) return <Loading />;

  if (!user) {
    router.push("/login");
    return <div>Please sign in to continue</div>;
  }

  return (
    <Fragment>
      <Head>
        <title>Bank</title>
        <link rel="icon" sizes="any" href="/LogoF.ico"></link>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div>
        <BankTab id={curr} setFunc={handleState} />
        {curr == "1" ? <Overview setFunc={handleState} /> : <LinkBank />}
      </div>
    </Fragment>
  );
};

export default Bank;
