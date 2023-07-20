import Head from "next/head";
import { Fragment, React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../loading";
import StocksTab from "@/components/stock-tab";
import EconomicCalendarWidget from "./economic-calendar";
import ForexCrossRatesWidget from "./forex-cross-rates";
import CryptoMarketWidget from "./crypto-market";
import RealTimeChartWidget from "./real-time-chart";
import ComingSoon from "@/components/coming-soon";

const Main = () => {
  const router = useRouter();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [curr, setCurr] = useState("1");

  function handleState(id) {
    setCurr(
      id == "1"
        ? "1"
        : id == "2"
        ? "2"
        : id == "3"
        ? "3"
        : id == "4"
        ? "4"
        : "5"
    );
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
        <StocksTab id={curr} setFunc={handleState} />
        {curr == "1" ? (
          <ComingSoon />
        ) : curr == "2" ? (
          <RealTimeChartWidget />
        ) : curr == "3" ? (
          <CryptoMarketWidget />
        ) : curr == "4" ? (
          <EconomicCalendarWidget />
        ) : (
          <ForexCrossRatesWidget />
        )}
      </div>
    </Fragment>
  );
};

export default Main;
