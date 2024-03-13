"use client"
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import ProductModal from './ProductModal'
import { useSession } from 'next-auth/react'

const SingleProduct = ({handleWish,item,idx,}) => {
   

    const [isVisible,setIsVisible]= useState(false)
    const popupRef=useRef() 
    const session = useSession()
   
 

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
    <div className=' '>
          <div key={idx} className='w-[280px] h-[290px] bg-fuchsia-50/5 shadow-md rounded-3xl   '>
                <div className='relative w-full h-[60%] '>
                    <Image alt='' src={item.image} fill className='object-contain hover:rotate-45 duration-300 transition-all rounded-lg'/>
                 {
               session?.status==="authenticated" &&
            <FaHeart onClick={()=>{handleWish(item.id)}} className={`fill-black/60 absolute top-3 right-3  text-lg`} />
                 }
                   
                </div>
                <div className="p-3 flex flex-col items-center">
               <div className=" grid grid-cols-2 mb-2  gap-2">
               <p className='hover:underline'>{item.name} </p>
                <p className='hover:underline'>{item.desc} </p>
                <p className='hover:underline'>{item.ingridient} </p>
                <p className='hover:underline'>$ <span className="font-semibold ">{item.price}</span> </p>
               </div>
               <button onClick={()=>{setIsVisible(!isVisible)}} className='p-1 bg-blue-300 w-[80%] text-white font-semibold capitalize rounded-md hover:scale-105 transition-all duration-300 hover:bg-blue-500 '>add to cart</button>
                </div>

                { 
            

                <div ref={popupRef} className={`${isVisible?"absolute rounded-2xl mx-[100px] bg-black/50  w-[80%] h-[100%] left-0 top-0  z-40":"absolute w-full h-[50%] left-0 top-0  z-50 hidden"}`} >
                <ProductModal id={item.id}  />
              
            </div>}
            </div>
    </div>
  )
}

export default SingleProduct