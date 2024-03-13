"use client"
import { ContextProvider } from '@/libs/ContextApi'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import Product from './Product'
import { useSession } from 'next-auth/react'

const category = [
    "All","Avalanche","Black and Bleu","Crunchy spice","Night bite","angry nacho","Breakfast"
]

const Products = () => {
    const{query }=useContext(ContextProvider)
    
    const [products,setProducts]=useState([])
    const [search,setSearch]=useState([])
    const [cat,setCat]=useState("All")


const session = useSession()

    const fetchProducts = async ()=>{
        const products = await fetch(`/api/products/${cat}`,{
            cache:"no-store"
        })
        const data = await products.json()
        setProducts(data)
    }
    const fetchSearch = async ()=>{
        const products = await fetch(`/api/search/${query}`,{
            cache:"no-store"
        })
        const data = await products.json()
        setSearch(data)
    }

    useEffect(()=>{
        fetchProducts()
    },[cat])

    useEffect(()=>{
        fetchSearch()
    },[query.length>1])

   
  return (
    <div>
         <div className='flex justify-between py-4 px-8 flex-wrap  gap-3'>
            {category.map(item=>
            <div className='py-2 px-4 bg-black/5 rounded-full hover:scale-105 transition-all duration-300 hover:bg-blue-600 hover:text-white  mb-3' onClick={()=>setCat(item)} key={item}>
              {item}
            </div>
            )}
        </div>
        < Product  products={query.length>1?search:products }/>
    </div>
  )
}

export default Products