import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./src/app/prisma"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google({
          httpOptions: {
        timeout: 1000000000, // 10 seconds timeout
      }

  })
    ,Resend({
    from: "onboarding@resend.dev",
  })],
  adapter: PrismaAdapter(prisma),
  debug:true,
  pages : {
    verifyRequest: "/dashboard",
    AccessDenied:'/signin'
  },
  session:{
    maxAge:24 * 60 * 60
  }
})