import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Loading from "../loading";
import StocksTable from "@/components/stocks-table";
import { checkDuplicates } from "@/functions/Stocks";
import NotificationStocks from "@/components/ui/notification-addStocks";
import Searchbar from "@/components/ui/search";
import { sortStock } from "@/functions/Stocks";

const MarketOverview = dynamic(
  () => import("react-tradingview-embed").then((mod) => mod.MarketOverview),
  { ssr: false }
);

export default function MarketOverviewWidget() {
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const [show, setShow] = useState(false);
  const [selectedExchange, setSelectedExchange] = useState("NASDAQ");
  const [inputSymbol, setInputSymbol] = useState("");
  const [firstRender, setFirstRender] = useState(true);

  const std = [
    {
      s: "NASDAQ:AAPL",
    },
    {
      s: "NYSE:BABA",
    },
    {
      s: "BINANCE:BTCUSDT",
    },
  ];

  const handleExchangeChange = (e) => {
    setSelectedExchange(e.target.value);
  };

  const handleSymbolClick = (e) => {
    setInputSymbol(e);
  };

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
    } else {
      handleAddStock();
    }
  }, [inputSymbol]);

  const handleAddStock = () => {
    const newStock = `${selectedExchange}:${inputSymbol}`;
    if (!checkDuplicates(newStock, symbols)) {
      setSymbols((prev) => sortStock([...prev, { s: newStock }]));
      setShow(false);
    } else {
      setShow(true);
    }
  };

  // Symbols Local Storage
  let data = undefined;

  if (typeof window !== "undefined") {
    data = window.localStorage.getItem("SYMBOLS");
  }

  const [symbols, setSymbols] = useState(data ? JSON.parse(data) : std);

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

  if (height === null || width === null) return <Loading />;

  return (
    <div className="mx-20 md:flex md:flex-row">
      <NotificationStocks show={show} setShow={setShow} />
      <div className="md:w-1/2">
        <MarketOverview
          widgetProps={{
            colorTheme: "dark",
            dateRange: "12M",
            showChart: true,
            locale: "en",
            width: "100%",
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
      </div>

      <div className="ml-10 bg-gray-800 rounded-xl p-3 md:w-1/2">
        <div className="flex flex-row">
          <select
            id="exchange"
            name="exchange"
            onChange={handleExchangeChange}
            className="mr-3 rounded-xl text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue="NASDAQ"
          >
            <option>NASDAQ</option>
            <option>NYSE</option>
            <option>BINANCE</option>
          </select>

          <Searchbar
            handleSymbolClick={handleSymbolClick}
            selectedExchange={selectedExchange}
            symbols={symbols}
            setShow={setShow}
          />
        </div>
        <StocksTable
          className="mt-5"
          stocks={symbols}
          setSymbols={setSymbols}
        />
      </div>
    </div>
  );
}
