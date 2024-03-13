import prisma from "@/libs/prismaConnect"
import { NextResponse } from "next/server"
import { getAuthSession } from "../auth/[...nextauth]/route"



export const PUT = async(req,{params})=>{
    // const sess = await getAuthSession()
    // console.log(sess)
 try {
   const users = await getAuthSession()
   
    const {id}= await req.json()
    
    const products = await prisma.products.findUnique({
        where:{
            id
        }
    })
    

  
    const user = await prisma.user.findUnique({
        where:{
            email:users.user.email
        },
        
    })
    
const existing = user.likes.find(item=>item.id === id)
if(existing){
    const remove = user.likes.filter(item=>item.id !==id)
  
    const update = await prisma.user.update({
                  where:{
                    email:users.user.email
                  },
                  data:{
                      likes:[
                          ...remove
                      ]
                  }
              })
              return new NextResponse(JSON.stringify({message:"item removed to wishlist list",products},{status:200} )) 

}else{
    const update = await prisma.user.update({
        where:{
            email:users.user.email
        },
        data:{
            likes:[
                ...user.likes,products
            ]
        }
    })
    return new NextResponse(JSON.stringify({message:"item added to wishlist list",products},{status:200} )) 

}
 
     
 } catch (error) {
    console.log(error)
    return new NextResponse(JSON.stringify("error"))
 }
} 