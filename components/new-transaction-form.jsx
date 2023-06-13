import { useReducer } from "react";
import { useAuth } from "@/context/AuthContext";
// import useSWR from "swr";
// import Table from "./table";
// import useFetchLists from "@/hooks/fetchLists";

const formReducer = (state, event) => {
  return {
      ...state,
      [event.target.name]: event.target.value
  }
}

// const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function NewTransactionForm({ func, onSave }) {

  const { currentUser } = useAuth();
  const uid = currentUser.uid;
  // const { lists, setLists } = useFetchLists();
  const [formData, setFormData] = useReducer(formReducer, {"type":"Money-in", "category":"Food"});
  // setFormData({type:"Money-in"});
  console.log(formData)
  // const { data, error, isLoading, mutate } = useSWR('/api/list?userId=' + uid, fetcher);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(Object.keys(formData).length == 0) return console.log("Don't have Form Data");
    // console.log(formData);
    // setLists([...lists, formData]);
    fetch('/api/list?userId=' + uid, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    func();
    // setLists('');
    
    // Table();
  }

  return (
    <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit}>
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              New Transaction
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Missed something? Worry not!
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
                  required
                  id="type"
                  name="type"
                  onChange={setFormData}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
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
                  required
                  id="category"
                  name="category"
                  onChange={setFormData}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
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
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    $
                  </span>
                  <input
                    required
                    type="number"
                    min="0.01"
                    name="amount"
                    step=".01"
                    onChange={setFormData}
                    id="amount"
                    className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
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
                    onChange={setFormData}
                    id="date"
                    name="date"
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
            onClick={func}
          >
            Cancel
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
