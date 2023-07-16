import { React, useEffect } from "react";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../loading";
import BankCard from "@/components/ui/bank-card";

const LinkBank = () => {
  const router = useRouter();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);


  return (
    <div>
      <BankCard
        name="Oversea-Chinese Banking Corp. (OCBC)"
        img=".././ocbclogo.png"
      />
      <BankCard name="DBS Bank" img=".././dbslogo.png" />
    </div>
  );
};

export default LinkBank;
