import React, { useState } from "react";
import { label } from "@/data/table-data";
import EditTransaction from "./edit-transaction-window";
import Exclude from "./exclude";

function TransactionItem({
  transaction,
  transactionIdx,
  userProfile,
  convert_preferred,
  preferred,
  bank,
  selectedOpt,
  exclude,
  setExclude,
}) {
  return (
    <tr
      key={transaction.title}
      className={transactionIdx % 2 === 0 ? undefined : "bg-gray-50"}
    >
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        {transaction.title}
      </td>
      <td
        className={
          "whitespace-nowrap px-3 py-4 text-sm " +
          (transaction.type === "Money-in" ? "text-lime-500" : "text-red-600")
        }
      >
        {transaction.type}
      </td>
      <td className=" px-3 py-4 text-sm">{label(transaction.category)}</td>
      {/* Default value for currency is SGD */}
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {/* {transaction.currency || "SGD"} {transaction.amount} */}
        {userProfile &&
          convert_preferred(
            preferred,
            userProfile.currency,
            transaction.currency,
            transaction.amount
          )}
      </td>
      <td className="whitespace-nowrap py-4 text-sm text-gray-500">
        {transaction.date}
      </td>
      <td className="whitespace-nowrap py-4 text-right text-sm font-medium">
        {/* {bank && selectedOpt && <Exclude exclude={exclude} setExclude={setExclude} />} */}
        {!bank && transaction.category !== "Bank" && (
          <EditTransaction transaction={transaction} />
        )}
      </td>
    </tr>
  );
}

export default TransactionItem;
