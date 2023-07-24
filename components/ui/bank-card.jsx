import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

export default function BankCard(props) {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [isLinked, setIsLinked] = useState(false);

  const getUserProfile = async () => {
    fetch("/api/user?userId=" + user.uid, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((e) => e.json())
      .then((e) => {
        // setUserLinkBank(e.linkedBank);
        setIsLinked(e.linkedBank);
        // console.log("bool:", e.linkedBank);
        // setIsLoading(false);
      });
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const resetSync = () => {
    window.localStorage.setItem("SYNC", JSON.stringify(false));
  };

  const changeLinked = async (isLink) => {
    if (isLink) {
      await fetch("/api/user?userId=" + user.uid, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ linkedBank: false }),
      });
    }
    setIsLinked(!isLink);
  };

  return (
    <div class="p-5 flex flex-col mx-20 mb-5 items-center bg-white border border-gray-200 rounded-xl shadow md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <img
        class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-96 m-9"
        src={props.img}
        alt={props.name + " logo"}
      />
      <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {props.name}
        </h5>
        <p class="mb-6 font-normal text-gray-700 dark:text-gray-400">
          Supported Functionality:
          <br />
          View Transactions, Label Transactions.
        </p>
        {!isLinked ? (
          <a href={props.redirect} className="inline-block">
            {props.soon ? (
              <button
                type="button"
                // onClick={() => setLink((prev) => !prev)}
                className="rounded-full bg-gray-400 px-4 py-2.5 text-sm font-semibold text-white shadow-sm"
              >
                Coming Soon
              </button>
            ) : (
              <button
                type="button"
                onClick={() => changeLinked((prev) => prev)}
                className="rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Link Bank
              </button>
            )}
          </a>
        ) : (
          <a className="inline-block">
            {props.soon ? (
              <button
                type="button"
                className="rounded-full bg-gray-400 px-4 py-2.5 text-sm font-semibold text-white shadow-sm"
              >
                Coming Soon
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  changeLinked((prev) => prev);
                  resetSync();
                  props.setShow(true);
                }}
                className="rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Unlink
              </button>
            )}
          </a>
        )}
      </div>
    </div>
  );
}
