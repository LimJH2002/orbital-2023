import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Loading from "../loading";

let tvScriptLoadingPromise;

const RealTimeChart = dynamic(
  () => import("react-tradingview-embed").then((mod) => mod.AdvancedChart),
  { ssr: false }
);

export default function RealTimeChartWidget() {
  // const onLoadScriptRef = useRef();
  // const [height, setHeight] = useState(0);

  //   useEffect(() => {
  //     onLoadScriptRef.current = createWidget;

  //     if (!tvScriptLoadingPromise) {
  //       tvScriptLoadingPromise = new Promise((resolve) => {
  //         const script = document.createElement("script");
  //         script.id = "tradingview-widget-loading-script";
  //         script.src = "https://s3.tradingview.com/tv.js";
  //         script.type = "text/javascript";
  //         script.onload = resolve;

  //         document.head.appendChild(script);
  //       });
  //     }

  //     tvScriptLoadingPromise.then(
  //       () => onLoadScriptRef.current && onLoadScriptRef.current()
  //     );

  //     return () => (onLoadScriptRef.current = null);

  //     function createWidget() {
  //       if (
  //         document.getElementById("tradingview_baee4") &&
  //         "TradingView" in window
  //       ) {
  //         new window.TradingView.widget({
  //           width: "100%",
  //           height: height,
  //           symbol: "NASDAQ:AAPL",
  //           interval: "D",
  //           timezone: "Etc/UTC",
  //           theme: "light",
  //           style: "1",
  //           locale: "en",
  //           toolbar_bg: "#f1f3f6",
  //           enable_publishing: false,
  //           allow_symbol_change: true,
  //           container_id: "tradingview_baee4",
  //         });
  //       }
  //     }
  //   }, []);

  // useEffect(() => {
  //   setHeight(parseInt(window.innerHeight * 0.8));

  //   const handleResize = () => {
  //     setHeight(parseInt(window.innerHeight * 0.8));
  //   };

  //   window.addEventListener("resize", handleResize);

  //   // Cleanup event listener
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  // if (height === 0) return <Loading />; // or a loading spinner, etc.

  // return (
  //   <div className="tradingview-widget-container mx-20">
  //     <div id="tradingview_baee4" />
  //     <div className="tradingview-widget-copyright">
  //       <a
  //         href="https://www.tradingview.com/"
  //         rel="noopener nofollow"
  //         target="_blank"
  //       >
  //         <span className="text-white">Track all markets on TradingView</span>
  //       </a>
  //     </div>
  //   </div>
  // );

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
      <RealTimeChart
        widgetProps={{
          width: "100%",
          height: height,
          symbol: "NASDAQ:AAPL",
          interval: "60",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          allow_symbol_change: true,
        }}
      />
    </div>
  );
}
