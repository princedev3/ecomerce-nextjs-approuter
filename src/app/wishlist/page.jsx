"use client"
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaHeart } from 'react-icons/fa'

const WishListItem = () => {
    const session = useSession()
    const[likesItem,setLikesItem]=useState([])


    const fetchWish = async ()=>{
        const data = await fetch(`/api/userlist?email=${session?.data?.user?.email}`,{
            cache:"no-store"
        })
        const res = await data.json()
       setLikesItem(res?.likes)
      
    }
    useEffect(()=>{
        fetchWish()
    },[session?.data?.user?.email])

  const handleWish = async(id)=>{
      
             try {
              const res =   await fetch(`/api/wishlist`,{
                    method: "PUT",
                    cache: 'no-store',
                    body: JSON.stringify({id})
                })
                const data = await res.json()
                toast.success(data.message)
              
             } catch (error) {
                
             }
    }
   
  return (
    <div>
         <div className=" flex gap-8 flex-wrap justify-center items-center mt-3 mx-auto">
            {likesItem && likesItem.map((item,idx)=>
            (<div key={idx} className='w-[280px] h-[290px] bg-fuchsia-50/5 shadow-md rounded-3xl '>
                <div className='relative w-full h-[60%] '>
                    <Image alt='' src={item.image} fill className='object-contain hover:rotate-45 duration-300 transition-all'/>
                    <FaHeart onClick={()=>handleWish(item.id)} className='absolute top-3 right-3 fill-black/60 text-lg'/>
                   
                </div>
                <div className="p-3 flex flex-col items-center">
               <div className=" grid grid-cols-2 mb-2  gap-2">
               <p className='hover:underline'>{item.name} </p>
                <p className='hover:underline'>{item.desc} </p>
                <p className='hover:underline'>{item.ingridient} </p>
                <p className='hover:underline'>$ <span className="font-semibold ">{item.price}</span> </p>
               </div>
               <button className='p-1 bg-blue-300 w-[80%] text-white font-semibold capitalize rounded-md hover:scale-105 transition-all duration-300 hover:bg-blue-500 '>add to cart</button>
                </div>
            </div>)
            )}
        </div>
    </div>
  )
}

export default WishListItem