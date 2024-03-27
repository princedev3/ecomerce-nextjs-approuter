"use client"
import { ContextProvider } from '@/libs/ContextApi'
import { useCartStore } from '@/libs/store'
import { Search, ShoppingCart, User } from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useContext, useEffect, useRef, useState } from 'react'

const Navbar = () => {
    const {data,status} = useSession()
  
   
    const { totalItem} = useCartStore()
   
   const{setQuery}=useContext(ContextProvider)
   const [isVisible,setIsVisible]= useState(false) 
 
   const popupRef = useRef(null)
   useEffect(()=>{
    const handleCloseOutside = (e)=>{
       if(popupRef.current && !popupRef.current.contains(e.target )){
        setIsVisible(false)
       }
    }
    document.addEventListener("click",handleCloseOutside)

    if(!isVisible){
      document.removeEventListener("click",handleCloseOutside)
    }
    return ()=>{
      document.removeEventListener("click",handleCloseOutside)
    }
},[isVisible])
  return (
    <div className='flex items-center justify-between p-5 w-full  mx-auto shadow-sm py-4' >
      
<Link href={"/"} className="flex-1 text-2xl font-extrabold dark:text-white text-zinc-500">Silver<span className='text-3xl text-cyan-500'>Fox</span></Link>
    
<div className=' flex-1 relative '>
<div className='lg:flex items-center justify-center hidden'>
    <input  onChange={e=>setQuery(e.target.value)} type="text" className='w-full placeholder: p-2 border border-gray-200  rounded-full text-gray-400 outline-none '  placeholder='Search for your delicious meal'/>
    <button className='absolute  right-4 text-gray-400'>
    <Search />
    </button>
</div>
</div>
<div className="flex-1 flex justify-end">
{status==="authenticated"?<div className='flex items-center gap-2'>
    <button onClick={signOut} className='text-white font-semibold bg-cyan-500 hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-blue-300 capitalize tracking-widest rounded-full text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800'>
        logout
    </button>
    <div className='px-3 py-2 bg-black/5 rounded-md hover:bg-transparent relative'>
        <User  onClick={()=>setIsVisible(!isVisible)}/>
        {
       (
                <div ref={popupRef} className={`${isVisible?" absolute mt-4 w-[200px] h-fit bg-gray-200 rounded-xl -left-[200%] z-50 p-4":"hidden absolute mt-4 w-[200px] h-fit bg-gray-200 rounded-xl -left-[200%] z-50 p-4"}  flex flex-col`}>
                    <Link href={"/wishlist"} className='cursor-pointer my-1'> WishList</Link>
                    <Link href={"/order"} className='cursor-pointer my-1'> Order</Link>
                    {
                        data?.user?.isAdmin && (
                            <Link href={"/create-product"} className='cursor-pointer my-1'>Create-product</Link>
                        )
                    }
                    {
                        data?.user?.isAdmin && (
                            <Link href={"/delete-product"} className='cursor-pointer my-1'>Delete-product</Link>
                        )
                    }
                  
                 
                    
                    
                </div>
            )
        }
    </div>
    <div className='px-3 py-2 bg-black/5 rounded-md hover:bg-transparent relative group'>
        <Link href={"/cart"}>
    <ShoppingCart />
    <p className='absolute w-4 h-4 flex items-center justify-center text-white  group-hover:scale-110 transition-all duration-300 top-0 right-0 p-1 bg-cyan-600 text-sm rounded-full'>{totalItem} </p>
        </Link>
    </div>
</div>:<div>
<Link href={"/login"} className='text-white  font-semibold bg-cyan-500 hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-blue-300 capitalize tracking-widest rounded-full text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800'>
        login
    </Link>
    </div>}
</div>

    </div>
  )
}

export default Navbar