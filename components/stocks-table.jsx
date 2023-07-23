import Image from "next/image";
import { exchangeLogo } from "@/functions/Stocks";

export default function StocksTable(props) {
  const handleRemoveItem = (ele) => {
    props.setSymbols(props.stocks.filter((item) => item.s !== ele.s));
  };

  return (
    <div className="bg-gray-900 mt-9 rounded-xl overflow-hidden">
      <div className="mx-auto">
        <div className="py-8">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center mb-5">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold leading-6 text-white">
                  Added Stocks
                </h1>
              </div>
            </div>
            <div className="mt-8 max-h-96 overflow-y-scroll">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr className="bg-gray-500">
                      <th
                        scope="col"
                        className="px-6 py-3 w-1/3 text-left text-xs font-medium text-white uppercase tracking-wider"
                      >
                        Symbol
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 w-1/3 text-left text-xs font-medium text-white uppercase tracking-wider"
                      >
                        Exchange
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 w-1/3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        {/* <span className="sr-only">Remove</span> */}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {props.stocks.map((stock, index) => (
                      <tr
                        key={stock.s}
                        className={`bg-${
                          index % 2 === 0 ? "gray-700" : "gray-800"
                        } hover:bg-gray-600`}
                      >
                        <td className="px-6 py-4 text-sm font-medium text-white">
                          {stock.s.split(":")[1]}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300 flex items-center">
                          {exchangeLogo(stock.s.split(":")[0])}
                          {stock.s.split(":")[0]}
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-medium">
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
  );
}
