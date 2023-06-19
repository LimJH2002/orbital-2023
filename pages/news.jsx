import { React, useEffect } from "react";
import { useRouter } from "next/router";

const News = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/comingSoon");
  });
  return <div></div>;
};

export default News;
