import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export async function POST(req, res) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 401 });
  }
  try {
    const { blogId } = await req.json();

    if (!blogId) {
      return NextResponse.json(
        { error: "Blog with matching id not found" },
        { status: 400 }
      );
    }

    const comments = await prisma.comments.findMany({
      where: { blog_id: BigInt(blogId) },
      select: {
        id: true,
        body: true,
        user_id: true,
        blog_id: true,
        created_at: true,
      },
    });

    if (!comments || comments.length === 0) {
      return NextResponse.json({ comments: [] }, { status: 200 });
    }

    const formattedComments = await Promise.all(
      comments.map(async (comment) => {
        const user = await prisma.users.findUnique({
          where: { id: BigInt(comment.user_id) },
          select: {
            picture: true,
            username: true,
            role: true,
          },
        });

        return {
          id: comment.id.toString(),
          body: comment.body,
          author: user.username,
          blog_id: comment.blog_id.toString(),
          created_at_date: formatDate(comment.created_at),
          user_id: comment.user_id.toString(),
          user_avatar: user.picture,
          user_role: user.role,
        };
      })
    );

    return NextResponse.json(formattedComments, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching blog comments." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
