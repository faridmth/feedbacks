import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(req){
    try{
        const {content,userid,title} = await req.json()

        if(!content || !userid){
            return NextResponse.json(
                {error:"you should include authorid and content !"},
                {status:400}

            )
        }


        const post = await prisma.post.create({
            data:{
                content : content,
                authorid : userid,
                title:title
            },
            include:{
                author : {
                    select : {
                        name : true,
                        email:true,
                        image:true
                    }
                }
            }
        })

        return NextResponse.json( {postid : post.id},{status:201})

    
    }catch(err){
        console.error("Error :", err.message || err);
        return NextResponse.json({error:"failed to create a Post"},{status:500})

    }
}
export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                upvotes:{
                    _count:"desc"
                }
            },
            include: {
                author: {
                    select: {
                        id:true,
                        name: true,
                        image:true,
                    },
                },
                _count: {
                    select:{
                        comments:true,
                        upvotes:true
                    } 
                },
                upvotes:{
                    select:{
                        userid:true
                    }
                }
            },

        });
        if (posts.length === 0) {
            return NextResponse.json([], { status: 404 });
        }
        return NextResponse.json(posts, { status: 200 });
    } catch (err) {
        console.error("Error fetching posts:", err.message || err);
        return NextResponse.json({ error: "Something went wrong" }, { status: 400 });
    }
}

export async function DELETE(req) {
    const {postid}= await req.json()
    if(!postid){
        return NextResponse.json({ error: "Post Id Required !" }, { status: 404 });
    }
    try{
        await prisma.post.delete({
            where:{
                id : postid
            }
        })
        return new NextResponse(null, { status: 204 });

    }catch(err){
        console.error("Post was not deleted", err.message || err);
        return NextResponse.json({ error: "Something went wrong" }, { status: 400 });
    }
}