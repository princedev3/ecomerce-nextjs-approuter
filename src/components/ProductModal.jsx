"use client"
import { useCartStore } from '@/libs/store'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const ProductModal = ({id,popupRef}) => {

    const {addToCart} = useCartStore()

    const session = useSession()
  
const[quantity,setQuanity]= useState(1)

const[item,setItem]=useState({})

useEffect(()=>{
    useCartStore.persist.rehydrate()
},[])



useEffect(()=>{
    const fetchProduct=async()=>{
        const res = await fetch(`/api/modalproduct/${id}`,{
            cache:"no-store"
        })
        const data = await res.json()
        setItem(data)
    }
    fetchProduct()
},[id])

const handleAdd= ()=>{
    addToCart({
        quantity,id:item.id,image:item.image,name:item.name,price:(item.price*quantity)
       })
toast.success("product added to cart successfully")
}

  return (
    <div className='w-full h-full relative flex items-center justify-center '>
         <div  className="w-[90%] h-[90%]  bg-white/90 absolute  rounded-2xl p-6">
       
                <div className='relative w-full h-[40%] md:h-[50%] '>
                    <Image alt='' src={item.image} fill className='object-contain hover:rotate-45 duration-300 transition-all'/>
                   
                   
                </div>
                <div className="p-2 flex flex-col items-center">
               <div className=" grid grid-cols-2 mb-1  gap-2">
               <p className='hover:underline'>{item.name} </p>
                <p className='hover:underline'>{item.desc} </p>
                <p className='hover:underline'>{item.ingridient} </p>
                <p className='hover:underline'>$ <span className="font-semibold ">{item.price * quantity}</span> </p>
               </div>
               {
                <div className='flex gap-10 mb-3'>

                    <p className=''>Qty: <span className='font-semibold text-xl'> {quantity}</span> </p>
                    <p onClick={()=>setQuanity(quantity<9?quantity+1:quantity) } className='cursor-pointer px-2 py-1 bg-green-600 text-white rounded-lg text-xl font-semibold'>+</p>
                    <p onClick={()=>setQuanity(quantity>1?quantity-1:quantity) } className='px-2 py-1 bg-red-600 text-white rounded-lg text-xl font-semibold'>-</p>
                </div>
               }
               <button onClick={()=>handleAdd()} disabled={session?.status==="unauthenticated"}  className=' disabled:bg-red-200 p-3 bg-blue-300 w-[80%] text-white font-semibold capitalize rounded-md hover:scale-105 transition-all duration-300 hover:bg-blue-500 '>{session?.status==="unauthenticated" ?"login to add to cart":"add to cart"}</button>
                </div>
                </div>
             

               
            
               
  </div>
  )
}

export default ProductModal