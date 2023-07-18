import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Loading from "../loading";

const CryptoMarket = dynamic(
  () => import("react-tradingview-embed").then((mod) => mod.CryptocurrencyMarket),
  { ssr: false }
);

export default function CryptoMarketWidget() {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(parseInt(window.innerHeight * 0.8));

    const handleResize = () => {
      setHeight(parseInt(window.innerHeight * 0.8));
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (height === 0) return <Loading />; // or a loading spinner, etc.

  return (
    <div className="mx-20">
      <CryptoMarket
        widgetProps={{
          width: "100%",
          height: height,
          defaultColumn: "overview",
          screener_type: "crypto_mkt",
          displayCurrency: "USD",
          colorTheme: "dark",
          locale: "en",
        }}
      />
    </div>
  );
}
