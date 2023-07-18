import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../loading";
import { TbCashBanknoteOff } from "react-icons/tb";
import Table from "@/components/table";


const token = "ae8616d7-4e78-3b77-b92e-1ac3c6685328";

const Overview = (props) => {
  const router = useRouter();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [userLinkBank, setUserLinkBank] = useState();

  if (loading) return <Loading />;

  if (!user) {
    router.push("/login");
    return <div>Please sign in to continue</div>;
  }

  const bankTransactions = {
    results: {
      success: true,
      responseList: [
        {
          amount: "10",
          debitCreditIndicator: "credit",
          description: "Transacrtion A",
          transactionDate: "2023-07-11",
          month: "July",
          currencyCode: "SGD",
        },
      ],
    },
  };

  const [bankData, setBankData] = useState();

  const getUserProfile = async () => {
    const response = await fetch("/api/user?userId=" + user.uid, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((e) => e.json());
    setUserLinkBank(response.linkedBank)
  }

  useEffect(() => {
    getUserProfile()
  }, [])

  const getBankTransactions = async () => {
    const response = await fetch(
      "/api/bank?sessionToken=OAuth2INB 1e28b59170ddee9e8676d02c951de80a&accountId=12345678&fromDate=01-01-2001&toDate=07-07-2023",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    ).then((e) => e.json());
    setBankData(response);
  };
  useEffect(() => {
    getBankTransactions();
  }, []);



  return userLinkBank ? (
    // Show Transactions if linked
    <div className="mt-10 mx-10">
      <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
        {/* Replace start */}
        <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
          <Table bank={true} bankTransactions={bankData} />
        </div>
        {/* /Replace end */}
      </div>
    </div>
  ) : (
    // Idle state
    <div className="px-20">
      <button
        type="button"
        onClick={() => props.setFunc("2")}
        className="w-full text-white border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <TbCashBanknoteOff className="mx-auto h-12 w-12" />
        <span className="mt-2 block text-sm font-medium">
          Link Your First Bank Account!
        </span>
      </button>
    </div>
  );
};

export default Overview;
