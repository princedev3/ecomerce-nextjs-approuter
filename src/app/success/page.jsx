"use client"
import Success from '@/components/Success';
import React from 'react'
import { Suspense } from "react";

const SuccessPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Success/>
       </Suspense>
  )
}

export default SuccessPage