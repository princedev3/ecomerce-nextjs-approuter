import prisma from "@/libs/prismaConnect"
import { NextResponse } from "next/server"



 export const PUT = async(req,{params})=>{
    const {intentid}= params
 
    try {
      const findOrder =   await prisma.order.update({
            where:{
                intent_id:intentid
            },
            data:{status:"payment recieved/processing order"}
        })

        return new NextResponse(JSON.stringify(findOrder,{status:200}))
    } catch (error) {
        return new NextResponse(JSON.stringify({message:"can not update status"},{status:500}))
    }
 }