"use client"
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'



const Login = () => {
    const session = useSession()
    const router = useRouter()
   if(session.status ==="authenticated"){
       router.push("/")
   }
  
  return (
    <div className=''>
    <div className='flex items-center justify-center mt-[5rem]'>
        <div className='flex flex-col gap-3 items-center shadow-md p-8 rounded-lg'>
            <h1 className='font-bold text-4xl'>login</h1>
            <p className='italic hover:underline'>we are determined to give you our best kitchen services</p>
            <div className="">
                <button onClick={()=>signIn("google")} className='bg-gradient-to-r from-blue-400 to-red-400 px-4 py-3 rounded-full text-white font-semibold mb-5 hover:scale-x-110 duration-300 transition-all'>
                    login with your google account
                </button>

                    
            </div>
        </div>
    </div>
</div>
  )
}

export default Login