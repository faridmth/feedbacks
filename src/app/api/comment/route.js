import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req){
    const {content,postid,authorid} = await req.json()

    if(!content){
        return NextResponse.json({error:"content messing !"},{status:400})
    }
    if(!postid){
        return NextResponse.json({error:"postid messing !"},{status:400})
    }
    if(!authorid){
        return NextResponse.json({error:"authorId messing !"},{status:400})
    }
    const post = await prisma.Post.findUnique({
        where: { id: postid }
    });

    if (!post) {
        return NextResponse.json(
            { error: `Post with ID ${postid} not found` },
            { status: 404 }
        );
    }

    try {
        const comment = await prisma.comment.create({
            data : {
                content,
                authorid,
                postid
            }
        })
        return NextResponse.json(comment,{status:201})
    } catch (err) {
        console.error("Comment was not created !", err.message || err);
        return NextResponse.json({ error: "Something went wrong" }, { status: 400 });
        
    }
}