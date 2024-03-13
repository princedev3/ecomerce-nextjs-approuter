import prisma from "@/libs/prismaConnect"
import { NextResponse } from "next/server"
import { getAuthSession } from "../auth/[...nextauth]/route"



export const GET = async (req,{params})=>{
 
    const {searchParams} = new URL(req.url)
    const email = searchParams.get("email")

    try {
      const user =   await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        return new NextResponse(JSON.stringify(user),{status:200})
    } catch (error) {
        return new NextResponse(JSON.stringify({message:"can not get wish list items"}),{status:500})
    }
}