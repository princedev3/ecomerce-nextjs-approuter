"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const DeleteProduct = () => {

  const router = useRouter()
    const [datas,setDatas]= useState([])
    const fetchProduct = async()=>{
        const res = await fetch(`http://localhost:3000/api/products/All`,{
            cache:"no-store"
        })
        const data = await res.json()
        setDatas(data)
    }
    useEffect(()=>{
        fetchProduct()
    },[])

const handleDelete = async(id)=>{
const res = await fetch(`http://localhost:3000/api/delete/${id}`,{
  method:"DELETE"
})
if(res.ok){
  toast.success("product deleted")
  window.location.reload()
}
}
  return (
    <div className=" mt-3 flex gap-8 flex-wrap justify-center items-center mx-auto relative">
        {
          datas && datas.map((item,idx)=>(
            <div key={idx} className='w-[280px] h-[290px] bg-fuchsia-50/5 shadow-md rounded-3xl   '>
            <div className='relative w-full h-[60%] '>
                <Image alt='' src={item.image} fill className='object-contain hover:rotate-45 duration-300 transition-all rounded-lg'/>
               
               
            </div>
            <div className="p-3 flex flex-col items-center">
           <div className=" grid grid-cols-2 mb-2  gap-5">
           <p className='hover:underline'>{item.name} </p>
            {/* <p className='hover:underline'>{item.desc} </p>
            <p className='hover:underline'>{item.ingridient} </p> */}
            <p className='hover:underline'>$ <span className="font-semibold ">{item.price}</span> </p>
           </div>
           <button  onClick={()=> handleDelete(item.id)} type="submit" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete Product</button>
            </div>

            
        

          
        </div>
          ))
        }
    </div>
  )
}

export default DeleteProduct