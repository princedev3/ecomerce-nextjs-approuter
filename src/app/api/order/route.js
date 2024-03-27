import { NextResponse } from "next/server"
import { getAuthSession } from "../auth/[...nextauth]/route"
import prisma from "@/libs/prismaConnect"



export const POST = async(req,{params})=>{
    const session = await getAuthSession()

    if(session){
        try {
            const body= await req.json()
            const order = await prisma.order.create({
                data:body
            })
            return new NextResponse(JSON.stringify(order),{status:200})
        } catch (error) {
            return new NextResponse(JSON.stringify({message:"can not create order"}),{status:500})
            
        }
    }else{
        return new NextResponse(JSON.stringify({message:"you are not logged in"},{status:500}))
    }
}  
  

export const GET = async(req,{params})=>{
    const session = await getAuthSession()

    if(session?.user?.isAdmin){
        try {
            
            const order = await prisma.order.findMany()
            return new NextResponse(JSON.stringify(order),{status:200})
        } catch (error) {
            return new NextResponse(JSON.stringify({message:"can not fetch order"}),{status:500})
            
        }
    }else{
        const order = await prisma.order.findMany({
            where:{
                email:session?.user?.userEmail
            }
        })
        return new NextResponse(JSON.stringify(order),{status:200})
      
    }
}  
  

