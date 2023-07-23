import Image from "next/image";
import { exchangeLogo } from "@/functions/Stocks";

export default function StocksTable(props) {
  const handleRemoveItem = (ele) => {
    props.setSymbols(props.stocks.filter((item) => item.s !== ele.s));
  };

  return (
    <div className="bg-gray-900 mt-9 rounded-xl">
      <div className="mx-auto">
        <div className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-white">
                  Added Stocks
                </h1>
              </div>
            </div>
            <div className="mt-10 flow-root max-h-96 overflow-auto">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                        >
                          Symbol
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          Exchange
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                        >
                          <span className="sr-only">Remove</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {props.stocks.map((stock) => (
                        <tr key={stock.s}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                            {stock.s.split(":")[1]}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                            <div className="flex flex-row">
                              {exchangeLogo(stock.s.split(":")[0])}
                              {stock.s.split(":")[0]}
                            </div>
                          </td>
                          <td className="relative whitespace-nowrap py-4 text-right text-sm font-medium sm:pr-0">
                            <a
                              href="#"
                              onClick={() => handleRemoveItem(stock)}
                              className="text-indigo-400 hover:text-indigo-300"
                            >
                              Remove
                              <span className="sr-only">{stock.s}</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
