import { React, useEffect } from "react";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "./loading";
import StocksTab from "@/components/stock-tab";

const Stocks = () => {
  const router = useRouter();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  // useEffect(() => {
  //   router.push("/comingSoon");
  // });

  if (loading) return <Loading />;

  if (!user) {
    router.push("/login");
    return <div>Please sign in to continue</div>;
  }

  return <StocksTab curr="1" />;
};

export default Stocks;
