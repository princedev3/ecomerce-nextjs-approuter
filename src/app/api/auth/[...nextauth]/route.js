
import { authOptions } from "@/libs/authOptions"
import NextAuth, {  getServerSession } from "next-auth"

const handler = NextAuth(authOptions)

export {handler as GET,handler as POST}



export const getAuthSession = ()=>getServerSession(authOptions)