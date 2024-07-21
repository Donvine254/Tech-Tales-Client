import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

type Comment = {
  body: string;
  authorId: number;
  blogId: number;
};

export async function POST(req: NextRequest, res: NextResponse) {
  // Validate and parse the incoming data
  let data: Comment;
  try {
    data = await req.json();

    // Check if all required fields are present
    if (!data.body || !data.authorId || !data.blogId) {
      return NextResponse.json(
        { error: "Invalid data. Ensure all required fields are present." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  try {
    // Create the comment
    const newComment = await prisma.comment.create({
      data: {
        body: data.body,
        authorId: data.authorId,
        blogId: data.blogId,
      },
      include: {
        author: {
          select: {
            username: true,
            picture: true,
            role: true,
          },
        },
      },
    });

    // Return the new comment with author details
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the comment." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
