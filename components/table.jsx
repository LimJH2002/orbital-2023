import { BanknotesIcon, FireIcon } from "@heroicons/react/24/outline";
import { label } from "@/data/table-data";
import EditTransaction from "./edit-transaction-window";
import NewTransaction from "./new-transaction-window";
import { useAuth } from "@/context/AuthContext";
import useSWR from "swr";
import Loading from "@/pages/loading";

function checkIcon(type) {
  return type === "Money-out" ? (
    <FireIcon className="h-6 w-6 text-gray-400" />
  ) : (
    <BanknotesIcon className="h-6 w-6 text-gray-400" />
  );
}

// const fetcher = (uid) => fetch('/api/list?userId=' + uid).then(res => res.json());
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Table() {
  const { currentUser } = useAuth();
  console.log(currentUser ? currentUser.uid : 10);
  const uid = currentUser ? currentUser.uid : "master";

  const { data, error } = useSWR("/api/list?userId=" + uid, fetcher);
  const isLoading = !data && !error;

  if (isLoading) return <Loading />;
  // if (error) return <div>Error occurred: {error.message}</div>;

  console.log("data", data);
  const transactions = data;
  console.log(transactions)
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            Monthly Transactions
          </h1>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          {/* <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Transaction
          </button> */}
          <NewTransaction />
        </div>
      </div>
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
                    <th
                      scope="col"
                      className="relative px-3 py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {transactions &&
                    transactions.map((transaction, transactionIdx) => (
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
                        <td className="relative whitespace-nowrap py-4 text-right text-sm font-medium sm:pr-6">
                          <EditTransaction transaction={transaction} />
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
  );
}
