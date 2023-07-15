import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../loading";
import BankTab from "@/components/bank-tab";
import Overview from "./overview";
import LinkBank from "./link-bank";

const Bank = () => {
  const router = useRouter();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [curr, setCurr] = useState("1");

  function handleState() {
    setCurr(prev => prev == "1" ? "2" : "1");
  }

  if (loading) return <Loading />;

  if (!user) {
    router.push("/login");
    return <div>Please sign in to continue</div>;
  }

  return (
    <div>
      <BankTab id={curr} setFunc={handleState} />
      {curr == "1" ? <Overview /> : <LinkBank />}
    </div>
  );
};

export default Bank;
