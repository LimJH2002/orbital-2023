import {React, useEffect} from 'react'
import { useRouter } from "next/router";


const Bank = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/comingSoon");
  });
  return (
    <div></div>
  )
}

export default Bank;