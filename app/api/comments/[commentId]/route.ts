import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

type Comment = {
  body: string;
  authorId: number;
  commentId: number;
};

export async function POST(req: NextRequest, res: NextResponse) {
  const { body, authorId, commentId } = await req.json();
  if (!body || !authorId || !commentId) {
    return NextResponse.json(
      { error: "Invalid data. Ensure all required fields are present." },
      { status: 400 }
    );
  }
  try {
    const newResponse = await prisma.response.create({
      data: {
        body,
        authorId,
        commentId,
      },
      include: {
        author: {
          select: {
            username: true,
            picture: true,
            role: true,
            status: true,
          },
        },
      },
    });
    return NextResponse.json(newResponse, { status: 201 });
  } catch (error) {
    console.error("Error creating comment response:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the comment response." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
