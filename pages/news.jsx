import React from "react";
import { useRouter } from "next/router";

const News = () => {
  const router = useRouter();
  router.push("/comingSoon");
  return <div></div>;
};

export default News;
