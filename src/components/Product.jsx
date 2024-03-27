"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { FaHeart } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import ProductModal from './ProductModal';
import SingleProduct from './SingleProduct';

const Product = ({products}) => {





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
                console.log(error)
             }
    }
   
  return (
    <div>
        <div className=" flex gap-8 flex-wrap justify-center px-2  items-center mx-auto">
            {products && products.map((item,idx)=>
            (
          <SingleProduct  item={item} idx={idx} handleWish={handleWish}  />
            )
            )}

            
        </div>
    </div>
  )
}

export default Product