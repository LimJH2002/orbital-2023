import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Loading from "../loading";

const MarketOverview = dynamic(
  () => import("react-tradingview-embed").then((mod) => mod.MarketOverview),
  { ssr: false }
);

export default function MarketOverviewWidget() {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const std = [
    {
      s: "NASDAQ:AAPL",
    },
    {
      s: "NASDAQ:TSLA",
    },
    {
      s: "NYSE:BABA",
    },
  ];

  // Symbols Local Storage
  const data = window.localStorage.getItem("SYMBOLS");
  const [symbols, setSymbols] = useState(
    data !== null ? JSON.parse(data) : std
  );

  useEffect(() => {
    window.localStorage.setItem("SYMBOLS", JSON.stringify(symbols));
  }, [symbols]);

  useEffect(() => {
    setHeight(parseInt(window.innerHeight * 0.8));
    setWidth(parseInt(window.innerWidth * 0.4));

    const handleResize = () => {
      setHeight(parseInt(window.innerHeight * 0.8));
      setWidth(parseInt(window.innerWidth * 0.4));
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (height === 0 || width === 0) return <Loading />;

  return (
    <div className="mx-20 flex flex-row">
      <MarketOverview
        widgetProps={{
          colorTheme: "dark",
          dateRange: "12M",
          showChart: true,
          locale: "en",
          width: width,
          height: height,
          largeChartUrl: "",
          isTransparent: false,
          showSymbolLogo: true,
          showFloatingTooltip: false,
          plotLineColorGrowing: "rgba(41, 98, 255, 1)",
          plotLineColorFalling: "rgba(41, 98, 255, 1)",
          gridLineColor: "rgba(240, 243, 250, 0)",
          scaleFontColor: "rgba(106, 109, 120, 1)",
          belowLineFillColorGrowing: "rgba(41, 98, 255, 0.12)",
          belowLineFillColorFalling: "rgba(41, 98, 255, 0.12)",
          belowLineFillColorGrowingBottom: "rgba(41, 98, 255, 0)",
          belowLineFillColorFallingBottom: "rgba(41, 98, 255, 0)",
          symbolActiveColor: "rgba(41, 98, 255, 0.12)",
          tabs: [
            {
              title: "Stocks",
              symbols: symbols,
            },
          ],
        }}
      />

      <div className="ml-10 bg-gray-800 rounded-xl p-3">
        <form>
          <label
            htmlFor="phone-number"
            className="block text-sm font-medium leading-6 text-white"
          >
            Add Stocks
          </label>
          <div className="flex">
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 flex items-center">
                <label htmlFor="country" className="sr-only">
                  Symbols
                </label>
                <select
                  id="exchange"
                  name="exchange"
                  autoComplete="exchange"
                  className="h-full rounded-md border-0 bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                >
                  <option>NASDAQ</option>
                  <option>NYSE</option>
                </select>
              </div>
              <input
                type="text"
                name="symbol"
                id="symbol"
                className="block w-full rounded-md border-0 pl-36 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Stock Symbol"
              />
            </div>
            <button
              onClick={() =>
                setSymbols((prev) => [...prev, { s: "NASDAQ:AMZN" }])
              }
              className="rounded-md bg-indigo-600 px-5 mx-3 mt-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Stock
            </button>
          </div>
        </form>
        <div>Hiiii</div>
      </div>
    </div>
  );
}
