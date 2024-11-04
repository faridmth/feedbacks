import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export async function POST(req){
    const {postid,userid}= await req.json()
    if(!postid || !userid){
        return NextResponse.json({error:"Userid and Post Needed !"},{status:400})
    }
    try{
        const upvote = await prisma.upvote.create({
            data:{
                postid,
                userid
            }
        })
        return NextResponse.json({message:"upvote added"},{status:201})

    }catch(err){
        return NextResponse.json({error:"Something went wrong !"},{status:500})

    }
}

export async function  DELETE(req) {
    const {postid,userid}= await req.json()
    try{
        await prisma.upvote.delete({
            where:{
                userid_postid: {
                    userid,
                    postid
                }
            }
        })
        return new NextResponse(null, { status: 204 });

    }catch(err){
        console.error("Error fetching posts:", err.message || err);
        return NextResponse.json({error:"Something went wrong !"},{status:500})

    }
 
}