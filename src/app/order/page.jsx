"use client"
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

const Order = () => {
  const [orderList,setOrderList]=useState([])
  const fetchOrder = async()=>{
  const res =await fetch(`/api/order`,{
    cache:"no-store"
  })
  const data = await res.json()
  setOrderList(data)
  }
  useEffect(()=>{
    fetchOrder()
  },[])
  console.log(orderList)
  return (
    <div>
       <Table>
  <TableCaption>A list of your recent orders.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">OrderId</TableHead>
      <TableHead  className="hidden md:block mt-6">Date</TableHead>
      <TableHead className="">Price</TableHead>
      <TableHead className="hidden  md:block mt-6">Product</TableHead>
      <TableHead className="">Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
      {
        orderList && orderList.map((item,idx)=>(
          <TableRow>
            
          <TableCell className="font-medium">{item.id} </TableCell>
          <TableCell className="hidden md:block ">{item.createdAt.slice(0,10)} </TableCell>
          <TableCell className="">{item.price} </TableCell>
          <TableCell className="hidden md:block">{item.product.length>0 && item.product[0].name} </TableCell>
          <TableCell className="">{item.status} </TableCell>
    </TableRow>
        ))
      }
  </TableBody>
</Table>
    </div>
  )
}

export default Order