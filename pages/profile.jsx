import { Fragment, useState } from "react";
import Image from "next/image";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "./loading";
import { useReducer } from "react";
import useSWR from "swr";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

export default function Profile() {
  const auth = getAuth();
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("No file chosen");
  const [username, setUsername] = useState();
  const { currentUser } = useAuth();
  const [thisUid, setThisUid] = useState("");
  useEffect(() => {
    if (currentUser) {
      setThisUid(currentUser.uid);
    }
  }, [currentUser]);

  const getUsername = async () => {
    setIsLoading(true);
    const response = await fetch("/api/user?userId=" + thisUid, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((e) => e.json());
    setUsername(response);
    setIsLoading(false);
  };

  useEffect(() => {
    getUsername();
  }, [thisUid]);

  const [formData, setFormData] = useReducer(formReducer, {
    // currency: "SGD",
  });

  function handleChange(event) {
    setFileName(
      event.target.files.length < 1
        ? "No file chosen"
        : event.target.files[0].name
    );
  }
  const usernameData = username ? username.username : "";
  const userBudget = username ? (username.budget ? username.budget : "1000") : "";
  const userCurrency = username
    ? username.currency
      ? username.currency
      : "SGD"
    : "";

  // const fetcher = (...args) => fetch(...args).then((res) => res.json());
  // const fetcher = (url) => fetch(url).then((res) => res.json());
  // const { userData, error } = useSWR("/api/list?userId=" + uid, fetcher);
  // console.log("err", error);
  // if (!userData) return <div>Loading...</div>

  const handleUserProfile = async (e) => {
    e.preventDefault();
    console.log("update profile", formData);
    if (Object.keys(formData).length == 0)
      return console.log("Don't have Form Data");

    await fetch("/api/user?userId=" + thisUid, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    router.reload();
  };

  if (loading || isLoading) return <Loading />;

  if (!user) {
    router.push("/login");
    return <div>Please sign in to continue</div>;
  }

  return (
    <Fragment>
      <main className="pl-10">
        {/* Settings forms */}
        <div className="divide-y divide-white/5">
          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-white">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                Update as many times as you need.
              </p>
            </div>

            <form className="md:col-span-2" onSubmit={handleUserProfile}>
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="col-span-full flex items-center gap-x-8">
                  <Image
                    src={user.photoURL ? user.photoURL : "/DefaultAvatar.png"}
                    alt="Profile Picture"
                    width={1000}
                    height={1000}
                    className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                  />
                  <div>
                    <input
                      id="user-photo"
                      name="user-photo"
                      type="file"
                      accept=".png, .jpg"
                      onChange={handleChange}
                      hidden={true}
                    />
                    <label
                      type="button"
                      htmlFor="user-photo"
                      className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                    >
                      Change Avatar
                    </label>
                    <span id="file-chosen" className="px-2 text-white text-sm">
                      {fileName}
                    </span>
                    <p className="mt-2 text-xs leading-5 text-gray-400">
                      JPG or PNG only.
                    </p>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <div className="pl-3 flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                      <input
                        type="text"
                        name="username"
                        id="username"
                        onChange={setFormData}
                        autoComplete="username"
                        className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                        defaultValue={usernameData}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Monthly Budget
                  </label>
                  <div className="mt-2">
                    <div className="pl-3 flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                      <input
                        type="number"
                        name="budget"
                        id="budget"
                        onChange={setFormData}
                        className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                        defaultValue={userBudget}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="currency"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Preferred Currency
                  </label>
                  <div className="mt-2">
                    <select
                      id="currency"
                      name="currency"
                      onChange={setFormData}
                      defaultValue={userCurrency}
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                    >
                      {/* {console.log("aaaaa", username)} */}
                      <option value="SGD">Singapore Dollar</option>
                      <option value="MYR">Malaysian Ringgit</option>
                      <option value="USD">United States Dollar</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex">
                <button
                  type="submit"
                  className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>

          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-white">
                Change password
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                Feeling stalked? Update your password here. Shhhh we won't tell.
              </p>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                *Only available for manual sign ups.*
              </p>
            </div>

            <form className="md:col-span-2">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="current-password"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Current password
                  </label>
                  <div className="mt-2">
                    <input
                      id="current-password"
                      name="current_password"
                      type="password"
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="new-password"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    New password
                  </label>
                  <div className="mt-2">
                    <input
                      id="new-password"
                      name="new_password"
                      type="password"
                      autoComplete="new-password"
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Confirm password
                  </label>
                  <div className="mt-2">
                    <input
                      id="confirm-password"
                      name="confirm_password"
                      type="password"
                      autoComplete="new-password"
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex">
                <button
                  type="submit"
                  className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>

          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-white">
                Delete account
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                Breaking up with us?
              </p>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                This action is not reversible. All information will be deleted
                forever.
              </p>
            </div>

            <form className="items-start flex md:col-span-2">
              <button
                type="submit"
                className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
              >
                Yes, delete my account
              </button>
            </form>
          </div>
        </div>
      </main>
    </Fragment>
  );
}
