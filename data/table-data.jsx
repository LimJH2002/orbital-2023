export const transactions = [
  {
    title: "GrabFood",
    label: "Food",
    type: "Money-out",
    currency: "SGD",
    amount: "30.00",
    date: new Date("2023-6-11").toISOString().split("T")[0],
  },
  {
    title: "Shopee",
    label: "Online Shopping",
    type: "Money-out",
    currency: "MYR",
    amount: "68.77",
    date: new Date("2023-6-12").toISOString().split("T")[0],
  },
];

export const LabelCategories = [
  "Food",
  "Transport",
  "Online Shopping",
  "Subscription",
];

export function label(str) {
  return str === LabelCategories[0] ? (
    <span className="inline-flex items-center px-3 py-0.5 rounded-full !bg-yellow-100 text-yellow-800">
      Food
    </span>
  ) : str === LabelCategories[1] ? (
    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800">
      Transport
    </span>
  ) : str === LabelCategories[2] ? (
    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800">
      Online Shopping
    </span>
  ) : str === LabelCategories[3] ? (
    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
      Subscription
    </span>
  ) : (
    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
      Others
    </span>
  );
}
