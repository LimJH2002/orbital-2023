export default function TransformBankTransactions(trans) {
  return trans.map((tran) => foo(tran));
}

function foo(tran) {
  return {
    title: tran.description,
    type: tran.debitCreditIndicator == "credit" ? "Money-out" : "Money-in",
    category: "Bank",
    currency: tran.currencyCode,
    amount: tran.amount,
    date: tran.transactionDate,
  };
}
