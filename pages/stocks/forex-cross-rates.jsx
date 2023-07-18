import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ForexCrossRates = dynamic(
  () => import("react-tradingview-embed").then((mod) => mod.ForexCrossRates),
  { ssr: false }
);

export default function ForexCrossRatesWidget() {
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

  if (height === 0) return null; // or a loading spinner, etc.

  return (
    <div className="mx-20">
      <ForexCrossRates
        widgetProps={{
          width: "100%",
          height: height,
          currencies: [
            "SGD",
            "MYR",
            "USD",
            "EUR",
            "JPY",
            "GBP",
            "CHF",
            "AUD",
            "CAD",
            "NZD",
          ],
          isTransparent: false,
          colorTheme: "dark",
          locale: "en",
        }}
      />
    </div>
  );
}
