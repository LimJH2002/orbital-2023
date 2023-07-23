import { Fragment, React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../loading";
import NewsTab from "@/components/news-tab";
import NewsBlog from "./news-blog";
import SavedNews from "./saved-news";
import Head from "next/head";


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
    <Fragment>
      <Head>
        <title>News</title>
        <link rel="icon" sizes="any" href="/LogoF.ico"></link>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div>
        <NewsTab id={curr} setFunc={handleState} />
        {curr == "1" ? <NewsBlog /> : <SavedNews setFunc={handleState} />}
      </div>
    </Fragment>
  );
};

export default News;
