import React from "react";
import Link from "next/link";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "./loading";

export default function comingSoon() {
  const router = useRouter();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loading />;

  if (!user) {
    router.push("/login");
    return <div>Please sign in to continue</div>;
  }

  return (
    <div className="bg-gray-900 mx-auto h-screen flex flex-col md:flex-row justify-between items-center">
      <div className="flex flex-col gap-5">
        <p
          className="text-lg font-medium bg-blue-500 text-gray-50 uppercase px-3 flex justify-center 
        rounded-3xl py-2 w-48"
        >
          Coming Soon
        </p>

        <p className="text-6xl font-bold text-white">Stay Tuned!</p>
        <p className="text-2xl font-bold text-white">
          We are working hard on it
        </p>
        <p className="text-base text-white">
          Don't worry your data is safe with us.
        </p>
        <Link href={"/"} legacyBehavior>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl hover:scale-95 duration-300 transition text-gray-50 shadow-xl font-medium">
            Back to Homepage
          </button>
        </Link>
      </div>
      <img src="/assets/travel.png" className="max-w-3xl" />
    </div>
  );
}
