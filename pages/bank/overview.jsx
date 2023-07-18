import { React, useEffect } from "react";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../loading";
import { TbCashBanknoteOff } from "react-icons/tb";
import Table from "@/components/table";

const Overview = (props) => {
  const router = useRouter();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loading />;

  if (!user) {
    router.push("/login");
    return <div>Please sign in to continue</div>;
  }

  return true ? (
    // Show Transactions if linked
    <div className="mt-10 mx-10">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          {/* Replace start */}
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            <Table bank={false} />
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
