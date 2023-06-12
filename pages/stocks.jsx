import React from "react";
import { useRouter } from "next/router";

const Stocks = () => {
  const router = useRouter();
  router.push("/comingSoon");
  return <div></div>;
};

export default Stocks;
