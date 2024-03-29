import React, { useState, useEffect, useRef } from "react";
import { NASDAQ } from "@/data/nasdaq";
import { NYSE } from "@/data/nyse";
import { BINANCE } from "@/data/binance";

const Searchbar = (props) => {
  const [exchangeData, setExchangeData] = useState(NASDAQ);
  const [activeSearch, setActiveSearch] = useState(exchangeData);
  const [searchValue, setSearchValue] = useState(""); // State variable for input value
  const timeoutRef = useRef(null); // useRef to hold timeout

  useEffect(() => {
    setSearchValue(""); // Reset the input when the exchange is switched
    setActiveSearch([]); // Clear the search results when the exchange is switched
    setExchangeData(
      props.selectedExchange === "NYSE"
        ? NYSE
        : props.selectedExchange === "BINANCE"
        ? BINANCE
        : NASDAQ
    );
  }, [props.selectedExchange]);

  const handleSearch = (e) => {
    const upperCaseValue = e.target.value.toUpperCase();
    setSearchValue(upperCaseValue); // Set the input value to the state

    if (upperCaseValue == "") {
      setActiveSearch(exchangeData);
      // return false;
    }
    setActiveSearch(exchangeData.filter((w) => w.includes(upperCaseValue)));
  };

  // Clear search results with delay
  const handleBlur = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveSearch([]);
    }, 400); // delay in milliseconds
  };

  return (
    <form className="relative w-full">
      <div className="relative">
        <input
          type="search"
          placeholder="Search Symbols"
          className="w-full p-4 rounded-xl bg-slate-800 text-white"
          value={searchValue} // Controlled input
          onFocus={(e) => handleSearch(e)}
          onBlur={handleBlur}
          onChange={(e) => handleSearch(e)}
        />
      </div>

      {activeSearch.length > 0 && (
        <div className="absolute top-20 p-4 bg-slate-600 text-white w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col overflow-y-auto max-h-72 z-10">
          {activeSearch.map((stock) => (
            <span
              className="hover:bg-slate-500 p-2 rounded-xl"
              onClick={() => {
                props.handleSymbolClick(stock);
                setSearchValue(""); // Clear the input when a span is clicked
                setActiveSearch([]); // Clear search results when a span is clicked
              }}
            >
              {stock}
            </span>
          ))}
        </div>
      )}
    </form>
  );
};

export default Searchbar;
