
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
 import prisma from "./prismaConnect"

 export const authOptions ={
     adapter:PrismaAdapter(prisma) ,
     session:{
        strategy:"jwt"
     },
      providers:[
          GithubProvider({
              clientId: process.env.GITHUB_ID ,
              clientSecret: process.env.GITHUB_SECRET ,
            }),
            GoogleProvider({
              clientId: process.env.GOOGLE_ID ,
              clientSecret: process.env.GOOGLE_SECRET ,
            }),
      ],
    
        callbacks:{
         async session({token,session}){
            if(token){
                session.user.isAdmin=token.isAdmin
                session.user.likes=token.likes
            }
            return session
         },
         async jwt({token}){

            const userInDb = await prisma.user.findUnique({
                where:{
                    email:token.email
                }
            })

            token.isAdmin = userInDb?.isAdmin
            token.likes=userInDb?.likes
            return token
         }
        },
      secret:process.env.NEXTAUTH_SECRET,

  }