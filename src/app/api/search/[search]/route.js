import prisma from "@/libs/prismaConnect"
import { NextResponse } from "next/server"



export const GET= async(req,{params})=>{

    const {search} = await params
   
    try {
         const  products = await prisma.products.findMany()
       const filtered = products.filter(item=>item.cat.toLowerCase().includes(search.toLowerCase()) || item.name.toLowerCase().includes(search.toLowerCase()))
        return new NextResponse(JSON.stringify(filtered),{status:200})
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({message:"can not fetch all products"},{status:500}))
    }
}