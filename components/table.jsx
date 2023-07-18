import { label } from "@/data/table-data";
import EditTransaction from "./edit-transaction-window";
import NewTransaction from "./new-transaction-window";
import { useAuth } from "@/context/AuthContext";
import useSWR from "swr";
import Loading from "@/pages/loading";
import SelectDate from "./select-date";
import { useState, useEffect } from "react";
import { months, years } from "@/data/month-year";
import SortingDate from "@/functions/Sorting";
import Toggle from "./ui/toggle";
import { convert_preferred } from "@/lib/convert";
import axios from "axios";

// const fetcher = (uid) => fetch('/api/list?userId=' + uid).then(res => res.json());
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const bankFetcher = (url, token) => axios.get(url, { headers: { authorization: "Bearer " + token } }).then((res) => res.data);
const token = "ae8616d7-4e78-3b77-b92e-1ac3c6685328";

export default function Table() {
  const { currentUser } = useAuth();
  const [preferred, setPreferred] = useState(false);
  const [userProfile, setUserProfile] = useState();
  // console.log(currentUser ? currentUser.uid : 10);
  const uid = currentUser ? currentUser.uid : "master";

  const { data, error } = useSWR("/api/list?userId=" + uid, fetcher);

  const getUserProfile = async () => {
    const response = await fetch("/api/user?userId=" + uid, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((e) => e.json());
    setUserProfile(response)
  }

  useEffect(() => {
    getUserProfile()
  }, [])
  
  const isLoading = !data && !error && !userProfile;

  //Filter mechanism start
  const data1 = window.localStorage.getItem("MONTH_STATE");
  const data2 = window.localStorage.getItem("YEAR_STATE");
  const [selectedMonth, setSelectedMonth] = useState(
    data1 !== null ? JSON.parse(data1) : months[0]
  );
  const [selectedYear, setSelectedYear] = useState(
    data2 !== null ? JSON.parse(data2) : years[0]
  );

  useEffect(() => {
    console.log("preferred", preferred);
    console.log(userProfile)
  }, [preferred]) 

  useEffect(() => {
    window.localStorage.setItem("MONTH_STATE", JSON.stringify(selectedMonth));
  }, [selectedMonth]);

  useEffect(() => {
    window.localStorage.setItem("YEAR_STATE", JSON.stringify(selectedYear));
  }, [selectedYear]);

  const condition = (trans) => {
    let [currYear, currMonth] = trans.date.split("-");
    return selectedMonth.value.toString() === "0" &&
      selectedYear.toString() === "All Year"
      ? true
      : selectedMonth.value.toString() === "0"
      ? currYear === selectedYear.toString()
      : selectedYear.toString() === "All Year"
      ? currMonth === selectedMonth.value.toString()
      : currYear === selectedYear.toString() &&
        currMonth === selectedMonth.value.toString();
  };
  //Filter Mechanism End

  // Check loading
  if (isLoading) return <Loading />;

  const transactions = data === undefined ? [] : data;
  const sortedTransactions = SortingDate(transactions);

  const filteredSortedTransactions = sortedTransactions.filter(condition);
  // console.log("FFF", filteredSortedTransactions);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-end">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Transactions</h1>
        </div>
        <div className="flex mt-4 sm:mt-0 sm:ml-16">
          {/* <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Transaction
          </button> */}
          <SelectDate
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            setSelectedMonth={setSelectedMonth}
            setSelectedYear={setSelectedYear}
          />
          <NewTransaction />
        </div>
      </div>

      <Toggle
        desc={"Show Preferred Currency"}
        enabled={preferred}
        setEnabled={setPreferred}
      />

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
                            {/* {transaction.currency || "SGD"} {transaction.amount} */}
                            {userProfile && convert_preferred(preferred, userProfile.currency, transaction.currency, transaction.amount)}
                          </td>
                          <td className="whitespace-nowrap py-4 text-sm text-gray-500">
                            {transaction.date}
                          </td>
                          <td className="whitespace-nowrap py-4 text-right text-sm font-medium">
                            <EditTransaction transaction={...transaction} />
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
    </div>
  );
}
