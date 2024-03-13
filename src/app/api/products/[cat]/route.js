import prisma from "@/libs/prismaConnect"
import { NextResponse } from "next/server"



export const GET= async(req,{params})=>{
    const {cat} = await params
    
  
    try {
        let products

        if(cat !== 'All'){
            products = await prisma.products.findMany({
                where:{
                    cat
                }
            })
        }
      
        if(cat === 'All'){
            products = await prisma.products.findMany()
        }
      
        return new NextResponse(JSON.stringify(products),{status:200})
    } catch (error) {
        return new NextResponse(JSON.stringify({message:"can not fetch all products"},{status:500}))
    }
}