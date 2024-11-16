import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req,{params}) {
    const { commentid } =await params;

    if (!commentid) {
      return NextResponse.json({ message: "comment required" }, { status: 404 });
    }

    try {
        await prisma.comment.delete({
          where: {
            id: commentid
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