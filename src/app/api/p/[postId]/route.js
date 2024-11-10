import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { postid } =await params;

  if (!postid) {
    return NextResponse.json({ message: "postId required" }, { status: 404 });
  }

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postid
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

  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ 
      message: "Internal server error",
      error: error.message 
    }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { postid } = await params;

  if (!postid) {
    return NextResponse.json({ message: "postId required" }, { status: 404 });
  }

  try {
    await prisma.post.delete({
      where: {
        id: postid
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