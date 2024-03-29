import { useReducer } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

export default function EditTransactionForm({ transaction, closeWindow }) {
  const { currentUser } = useAuth();
  const router = useRouter();
  const uid = currentUser.uid;

  const [formData, setFormData] = useReducer(formReducer, {
    title: transaction.title,
    type: transaction.type,
    category: transaction.category,
    currency: transaction.currency,
    amount: transaction.amount,
    date: transaction.date,
    id: transaction.id,
  });

  const handleEdit = (e) => {
    e.preventDefault();
    if (Object.keys(formData).length == 0)
      return console.log("Don't have Form Data");
    fetch("/api/list?userId=" + uid, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    closeWindow();
    router.reload();
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const deleteData = {
      title: transaction.title,
      type: transaction.type,
      category: transaction.category,
      amount: transaction.amount,
      date: transaction.date,
      id: transaction.id,
    };
    console.log("deleteData", deleteData);
    if (Object.keys(deleteData).length == 0)
      return console.log("Don't have Form Data");
      
    await fetch("/api/list?userId=" + uid, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deleteData),
    });

    closeWindow();
    router.reload();
  };

  return (
    <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleEdit}>
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Edit Transaction
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Incorrect transaction? We got you!
            </p>
          </div>

          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Transaction Title
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <input
                    required
                    type="text"
                    name="title"
                    id="title"
                    onChange={setFormData}
                    defaultValue={transaction.title}
                    className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                  />
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Transaction Type
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <select
                  id="type"
                  name="type"
                  onChange={setFormData}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  defaultValue={transaction.type}
                >
                  <option>Money-in</option>
                  <option>Money-out</option>
                </select>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Transaction Category
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <select
                  id="category"
                  name="category"
                  onChange={setFormData}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  defaultValue={transaction.category}
                >
                  <option>Food</option>
                  <option>Transport</option>
                  <option>Online Shopping</option>
                  <option>Subscription</option>
                  <option>Others</option>
                </select>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700"
              >
                Transaction Amount
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <div className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    <select
                      id="currency"
                      name="currency"
                      defaultValue={transaction.currency}
                      onChange={setFormData}
                      className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                    >
                      <option>SGD</option>
                      <option>MYR</option>
                      <option>USD</option>
                    </select>
                  </div>
                  <input
                    required
                    type="number"
                    min="0.01"
                    name="amount"
                    step=".01"
                    id="amount"
                    onChange={setFormData}
                    className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                    defaultValue={transaction.amount}
                  />
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Transaction Date
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div class="relative max-w-sm">
                  <input
                    required
                    type="date"
                    id="date"
                    name="date"
                    defaultValue={transaction.date}
                    onChange={setFormData}
                    max={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={closeWindow}
          >
            Cancel
          </button>
          <button
            type="button"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
