import React from "react";

function BankTable(props) {

  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300 table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Date
                  </th>
                  <th scope="col" className=" px-3 py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {transactions &&
                  filteredSortedTransactions.map(
                    (transaction, transactionIdx) => (
                      <tr
                        key={transaction.title}
                        className={
                          transactionIdx % 2 === 0 ? undefined : "bg-gray-50"
                        }
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {transaction.title}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {transaction.type}
                        </td>
                        <td className=" px-3 py-4 text-sm">
                          {label(transaction.category)}
                        </td>
                        {/* Default value for currency is SGD */}
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {transaction.currency || "SGD"} {transaction.amount}
                        </td>
                        <td className="whitespace-nowrap py-4 text-sm text-gray-500">
                          {transaction.date}
                        </td>
                        <td className="whitespace-nowrap py-4 text-right text-sm font-medium">
                          {/* <EditTransaction transaction={...transaction} /> */}
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BankTable;
