import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../loading";
import NewsTab from "@/components/news-tab";
import NewsBlog from "./news-blog";


const News = () => {
  const router = useRouter();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [curr, setCurr] = useState("1");

  function handleState(id) {
    setCurr(id == "1" ? "1" : "2");
  }

  if (loading) return <Loading />;

  if (!user) {
    router.push("/login");
    return <div>Please sign in to continue</div>;
  }

  return (
    <div>
      <NewsTab id={curr} setFunc={handleState} />
      {curr == "1" ? <NewsBlog /> : <div />}
    </div>
  );
};

export default News;
