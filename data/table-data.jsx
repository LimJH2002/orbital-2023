export const LabelCategories = [
  "Food",
  "Transport",
  "Online Shopping",
  "Subscription",
  "Bank"
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
    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
      Online Shopping
    </span>
  ) : str === LabelCategories[3] ? (
    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
      Subscription
    </span>
  ) : str === LabelCategories[4] ? (
    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
      Bank
    </span>
  ) : (
    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
      Others
    </span>
  );
}
