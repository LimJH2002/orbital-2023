import React from "react";
import Link from "next/link";

export default function ComingSoon() {
  return (
    <div className="bg-gray-900 flex flex-col md:flex-row justify-between items-center mx-20 mt-10">
      <div className="flex flex-col gap-5">
        <p
          className="text-lg font-medium bg-blue-500 text-gray-50 uppercase px-3 flex justify-center 
        rounded-3xl py-2 w-48"
        >
          Coming Soon
        </p>

        <p className="text-6xl font-bold text-white">Stay Tuned!</p>
        <p className="text-2xl font-bold text-white">
          We are working hard on it
        </p>
        <p className="text-base text-white">
          Don't worry your data is safe with us.
        </p>
      </div>
      <img src="/assets/travel.png" className="max-w-3xl" />
    </div>
  );
}
