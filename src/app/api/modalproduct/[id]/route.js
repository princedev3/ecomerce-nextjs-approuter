import prisma from "@/libs/prismaConnect"
import { NextResponse } from "next/server"



export const GET= async(req,{params})=>{
    const {id} = await params
    
  
    try {
      

 
           let product = await prisma.products.findUnique({
                where:{
                    id:id
                }
            })
        
      
        return new NextResponse(JSON.stringify(product),{status:200})
    } catch (error) {
        return new NextResponse(JSON.stringify({message:"can not fetch single product"},{status:500}))
    }
}