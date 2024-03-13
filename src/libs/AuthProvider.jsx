"use client"

import { SessionProvider } from "next-auth/react"


export  const  NextAuthProvider = async({children})=>{

    return <SessionProvider>{children} </SessionProvider>
}