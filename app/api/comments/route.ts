import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

type Comment = {
  body: string;
  authorId: number;
  blogId: number;
};

export async function GET() {
  try {
    const comments = await prisma.comment.findMany({
      include: {
        author: {
          select: {
            username: true,
            picture: true,
          },
        },
        blog: {
          select: {
            slug: true,
            title: true,
          },
        },
      },
    });
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong, kindly try again" },
      { status: 200 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  // Validate and parse the incoming data
  const data = (await req.json()) as Comment;

  if (!data.body || !data.authorId || !data.blogId) {
    return NextResponse.json(
      { error: "Invalid data. Ensure all required fields are present." },
      { status: 400 }
    );
  }

  try {
    // Create the comment
    const newComment = await prisma.comment.create({
      data: data,
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

//function to patch a comment

export async function PATCH(req: NextRequest, res: NextResponse) {
  // Validate and parse the incoming data
  const { body } = await req.json();
  const id = req.nextUrl.searchParams.get("id");
  if (!body) {
    return NextResponse.json(
      { error: "Invalid data. Ensure all required fields are present." },
      { status: 400 }
    );
  }

  try {
    // Create the comment
    const newComment = await prisma.comment.update({
      where: {
        id: Number(id),
      },
      data: { body: body },
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
    console.error("Error updating comment:", error);
    return NextResponse.json(
      { error: "An error occurred while updating the comment." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

//function to delete comment
export async function DELETE(req: NextRequest, res: NextResponse) {
  const id = req.nextUrl.searchParams.get("id");
  if (id) {
    try {
      await prisma.comment.delete({
        where: {
          id: Number(id),
        },
      });
      return NextResponse.json({}, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Record to delete does not exist." },
        { status: 404 }
      );
    } finally {
      await prisma.$disconnect();
    }
  } else {
    return NextResponse.json(
      { error: "Record to delete does not exist." },
      { status: 404 }
    );
  }
}
