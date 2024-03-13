import prisma from "@/libs/prismaConnect";
import { NextResponse } from "next/server";


const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const  POST =async(req,{params})=>{
const {id} = params
try {
    const order = await prisma.order.findUnique({
        where:{
            id
        }
    })
    if(order){
    
        const paymentIntent = await stripe.paymentIntents.create({
            amount: order.price *100,
            currency: "eur",
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods: {
              enabled: true,
            },
          });
         
          await prisma.order.update({
            where:{
                id
            },
            data:{
                intent_id:paymentIntent.id
            }
          })

     
          return new NextResponse(JSON.stringify({ clientSecret: paymentIntent.client_secret},{status:200}))
    }else{
        
        return new NextResponse(JSON.stringify({message:"no order found"},{status:401}))
    }
} catch (error) {
    return new NextResponse(JSON.stringify({message:"can not create intent key"},{status:500}))
}
}