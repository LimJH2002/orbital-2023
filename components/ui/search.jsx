"use client";

import React, { useState, useEffect } from "react";
import { NASDAQ } from "@/data/nasdaq";
import { NYSE } from "@/data/nyse";

const Searchbar = (props) => {
  const [exchangeData, setExchangeData] = useState(NASDAQ);
  const [activeSearch, setActiveSearch] = useState(exchangeData);
  const [searchValue, setSearchValue] = useState(""); // State variable for input value

  useEffect(() => {
    setSearchValue(""); // Reset the input when the exchange is switched
    setActiveSearch([]); // Clear the search results when the exchange is switched
    setExchangeData(props.selectedExchange === "NYSE" ? NYSE : NASDAQ);
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

  return (
    <form className="relative w-full">
      <div className="relative">
        <input
          type="search"
          placeholder="Search Symbols"
          className="w-full p-4 rounded-xl bg-slate-800 text-white"
          value={searchValue} // Controlled input
          onFocus={(e) => handleSearch(e)}
          // onBlur={()=> setActiveSearch([])}
          onChange={(e) => handleSearch(e)}
        />
      </div>

      {activeSearch.length > 0 && (
        <div className="absolute top-20 p-4 bg-slate-800 text-white w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col overflow-y-auto max-h-60 z-10">
          {activeSearch.map((stock) => (
            <span
              className="hover:bg-slate-700 p-2 rounded-xl"
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
