import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
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
          status: "PUBLISHED",
        },
        include: {
          author: {
            select: {
              username: true,
              picture: true,
              handle: true,
              bio: true,
              socials: true,
            },
          },
          comments: {
            where: {
              status: "VISIBLE",
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
          },
        },
      });

      if (!blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }

      return NextResponse.json(blog, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while fetching the blog" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
