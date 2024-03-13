"use client"
import CheckoutForm from '@/components/CheckoutForm'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React, { useEffect, useState } from 'react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const Payment = ({params}) => {

  const[ clientSecret,setClientSecret]=useState("")
const {id}=params
useEffect(()=>{
const createPayment = async()=>{
  const res = await fetch(`/api/create-intent/${id}`,{
    cache:"no-store",
    method:"POST",   
  })
const data = await res.json()
setClientSecret(data.clientSecret)
}
createPayment()
},[id])


const options = {
  clientSecret,
  appearance:{
    theme: 'stripe',
  }
};
  return (
    <div>
      <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
    </div>
  )
}

export default Payment