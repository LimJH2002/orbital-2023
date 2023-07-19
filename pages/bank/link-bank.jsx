import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../loading";
import BankCard from "@/components/ui/bank-card";
import Notification from "@/components/ui/notification";
import { set } from "date-fns";

const access = "37f35d0c-bcfe-3d07-adc7-5537936aff59";

const LinkBank = () => {
  const router = useRouter();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [show, setShow] = useState(false);

  return (
    <div>
      <Notification
        show={show}
        setShow={setShow}
        message="Succesfully Unlinked"
        other="You can link back anytime!"
      />
      <BankCard
        name="Oversea-Chinese Banking Corp. (OCBC)"
        img=".././ocbclogo.png"
        setShow={setShow}
        redirect="https://api.ocbc.com/ocbcauthentication/api/oauth2/authorize?client_id=BIupf899blqp6taidPc0wjCJ6foa&redirect_uri=https://orbital-2023.vercel.app/bank&scope=transactional"
      />
      <BankCard name="DBS Bank" img=".././dbslogo.png" soon={true} />
    </div>
  );
};

export default LinkBank;
