"use client"
import { useCartStore } from '@/libs/store'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { Resend } from 'resend'
import { Suspense } from "react";







const Success = () => {
  const { clearFromcart} = useCartStore()
  

  const searchParams =  useSearchParams()

  const paymentIntent = searchParams.get("payment_intent")

const router = useRouter()
  useEffect(()=>{
  const makeRequest = async()=>{
    try {
     const res =  await fetch(`/api/confirm/${paymentIntent}`,{
        method:"PUT",
        
      })

      const data = await res.json()
  
    router.push("/order")
      
 
    } catch (error) {
      console.log(error)
    }
  }
  makeRequest()
  },[paymentIntent])
 
  return (
    <Suspense fallback={<div>Loading...</div>} >
     <div className="mb-6 text-xl font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
     thank you for choosing us.
      paymenet successful please do not close page
     </div>
      </Suspense>
  )
}

export default Success