import React from "react";
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();
  router.push("/comingSoon");
  return <div></div>;
};

export default Profile;
