import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { postId } = params;
  console.log("POST ID :")
  console.log(postId)
  if (!postId) {
    return NextResponse.json({ message: "postId required" }, { status: 404 });
  }

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId
      },
      include: {
        author: {
          select: {
            name: true,
            image: true
          },
        },
        upvotes:{
            select:{
                userid:true
            }
        },
        comments:{
          select:{
            id:true,
            content:true,
            updatedAt:true,
            author:{
              select:{
                id:true,
                name:true,
                image:true
              }
            } 
          },
          orderBy:{
            createdAt:"desc"
          }
        },
        _count:{
            select:{
                upvotes:true
            }
        }
      }
    });

    // Always return an object, even if post is null
    if (!post) {
      return NextResponse.json({ 
        message: "Post not found",
        post: null 
      }, { status: 404 });
    }

    // Return the post wrapped in an object
    return NextResponse.json({ 
      post,
      message: "Success" 
    }, { status: 200 });

  } catch (err) {
    console.error("Error :", err.message || err);
    return NextResponse.json({ 
      message: "Internal server error",
      error: err.message 
    }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { postId } = await params;

  if (!postId) {
    return NextResponse.json({ message: "postId required" }, { status: 404 });
  }

  try {
    await prisma.post.delete({
      where: {
        id: postId
      }
    });

    return NextResponse.json(null, { status: 200 });

  } catch (error) {
    return NextResponse.json({
      message: "Internal server error",
      error: error.message
    }, { status: 500 });
  }
}