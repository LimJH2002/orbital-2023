import React from "react";
import { useRouter } from "next/router";

const Stocks = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/comingSoon");
  });
  return <div></div>;
};

export default Stocks;
