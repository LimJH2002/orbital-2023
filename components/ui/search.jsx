"use client";

import React, { useState } from "react";
import { NASDAQ } from "@/data/nasdaq";

const Searchbar = (props) => {
  const [activeSearch, setActiveSearch] = useState([]);

  const handleSearch = (e) => {
    const upperCaseValue = e.target.value.toUpperCase();

    if (upperCaseValue == "") {
      setActiveSearch([]);
      return false;
    }
    setActiveSearch(NASDAQ.filter((w) => w.includes(upperCaseValue)));
  };

  return (
    <form className="relative w-full">
      <div className="relative">
        <input
          type="search"
          placeholder="Search Symbols"
          className="w-full p-4 rounded-xl bg-slate-800 text-white"
          onChange={(e) => handleSearch(e)}
        />
      </div>

      {activeSearch.length > 0 && (
        <div className="absolute top-20 p-4 bg-slate-800 text-white w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col overflow-y-auto max-h-60 z-10">
          {activeSearch.map((stock) => (
            <span
              className="hover:bg-slate-700 p-2 rounded-xl"
              onClick={() => props.handleSymbolClick(stock)}
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
