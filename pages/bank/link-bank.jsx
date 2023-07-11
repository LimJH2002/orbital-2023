import { React, useEffect } from "react";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../loading";
import BankTab from "@/components/bank-tab";

const Bank = () => {
  const router = useRouter();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loading />;

  if (!user) {
    router.push("/login");
    return <div>Please sign in to continue</div>;
  }

  return (
    <div>
      <BankTab id="2" />
    </div>
  );
};

export default Bank;
