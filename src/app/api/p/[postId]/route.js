import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export async function GET(req,{params}) {
    const {postId} = params

    if(!postId) return NextResponse.json({error: "postId required !"},{status:404})

    try{
        const post = await prisma.post.findUnique({
            where:{
                id:postId
            },
            include:{
                comments:{
                    select:{
                        id:true,
                        content:true,
                        author:true,
                        updatedAt:true
                    },
                },
                author:{
                    select:{
                        name:true,
                        image:true           
                    }
                },

                _count:{
                    select:{
                        upvotes:true
                    }
                }
            }
        })
        return NextResponse.json(post,{status:200})

    }catch(err){
        console.error(err || err.message)
       return NextResponse.json({error: "something went wrong !"},{status:500})
    } 
}