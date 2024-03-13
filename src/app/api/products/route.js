import prisma from "@/libs/prismaConnect"
import { NextResponse } from "next/server"


export const POST = async(req,{params})=>{
  
    const {name,image,cat,ingridient,desc,price,isFeatured}= await req.json()
    try {
        const post = await prisma.products.create({
            data:{name,image,cat,ingridient,desc,price,isFeatured}
        })
        return new NextResponse(JSON.stringify(post,{status:200}))

    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({message:"can not create product"},{status:500}))
    }
}