import prisma from "@/libs/prismaConnect"
import { NextResponse } from "next/server"




export const DELETE= async(req,{params})=>{
    const {id} = await params
    
    try {
      const deleteProduct = await prisma.products.delete({
        where:{
            id
        }
      })    
        return new NextResponse(JSON.stringify({message:"product deleted "},{status:200}))
    } catch (error) {
        return new NextResponse(JSON.stringify({message:"error in deleting product"},{status:500}))
    }
}  