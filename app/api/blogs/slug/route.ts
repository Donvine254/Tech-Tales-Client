import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { slug } = await req.json();
  if (!slug) {
    return NextResponse.json(
      { error: "Kindly provide the blog slug" },
      { status: 404 }
    );
  } else {
    const blog = await prisma.blog.findUnique({
      where: {
        slug: slug,
      },
      include: {
        author: {
          select: {
            username: true,
            picture: true,
            bio: true,
            socialMedia: {
              select: {
                platform: true,
                handle: true,
              },
            },
          },
        },
        comments: {
          include: {
            author: {
              select: {
                username: true,
                picture: true,
                role: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json(blog, { status: 200 });
  }
}
