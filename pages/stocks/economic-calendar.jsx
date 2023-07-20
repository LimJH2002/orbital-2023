import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Loading from "../loading";

const EconomicCalendar = dynamic(
  () => import("react-tradingview-embed").then((mod) => mod.EconomicCalendar),
  { ssr: false }
);

export default function EconomicCalendarWidget() {
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
      <EconomicCalendar
        widgetProps={{
          width: "100%",
          height: height,
          colorTheme: "dark",
          isTransparent: false,
          locale: "en",
          importanceFilter: "-1,0,1",
          currencyFilter:
            "USD,EUR,ITL,NZD,CHF,AUD,FRF,JPY,ZAR,TRL,CAD,DEM,MXN,ESP,GBP",
        }}
      />
    </div>
  );
}
