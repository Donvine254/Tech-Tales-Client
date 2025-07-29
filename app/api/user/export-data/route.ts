import { getSession } from "@/lib/actions/session";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session || !session.userId) {
    return NextResponse.redirect(
      new URL("/login?message=login-required", req.url)
    );
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(session.userId) },
      omit: {
        password_digest: true,
      },
    });
    const blogs = await prisma.blog.findMany({
      where: {
        authorId: Number(session.userId),
      },
      include: {
        _count: { select: { comments: true } },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const favorites = await prisma.favorite.findMany({
      where: {
        userId: Number(session.userId),
      },
    });
    const comments = await prisma.comment.findMany({
      where: {
        authorId: Number(session.userId),
      },
      include: {
        blog: {
          select: {
            title: true,
            slug: true,
            tags: true,
          },
        },
        _count: {
          select: {
            responses: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const responses = await prisma.response.findMany({
      where: {
        authorId: Number(session.userId),
      },
      include: {
        comment: {
          select: {
            id: true,
            body: true,
            createdAt: true,
            updatedAt: true,
            blog: {
              select: {
                title: true,
                slug: true,
                tags: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json([
      { profile: user },
      { blog_posts: blogs },
      { favorites },
      { comments },
      { responses },
    ]);
  } catch (error) {
    const e = error as Error;
    console.log(e);
    return NextResponse.error();
  }
}
