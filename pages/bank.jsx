import React from 'react'
import { useRouter } from "next/router";


const Bank = () => {
  const router = useRouter();
  router.push("/comingSoon"); 
  return (
    <div>B</div>
  )
}

export default Bank;