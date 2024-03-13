"use client"

import { createContext, useState } from "react"


export const ContextProvider = createContext()

export const CreateContext = ({children})=>{

    const [query,setQuery]= useState("")

return(
    <ContextProvider.Provider value={{query,setQuery}} >{children}</ContextProvider.Provider>
)
}