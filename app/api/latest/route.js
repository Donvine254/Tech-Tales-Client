import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";



//function to format created_at date for the blog
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export async function GET(req, res) {
  try {
    const blogs = await prisma.blogs.findMany({
      orderBy: {
        created_at: "desc",
      },
      take: 5,
    });

    const formattedBlogs = await Promise.all(
      blogs.map(async (blog) => {
        const user = await prisma.users.findUnique({
          where: {
            id: blog.user_id,
          },
          select: {
            username: true,
            picture: true,
          },
        });

        return {
          id: blog.id.toString(),
          image: blog.image,
          title: blog.title,
          body: blog.body,
          tags: blog.tags,
          slug: blog.slug,
          user_avatar: user.picture,
          author: user.username,
          created_at_date: formatDate(blog.created_at),
        };
      })
    );

    return NextResponse.json(formattedBlogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);

    return NextResponse.json(
      { error: "An error occurred while fetching blogs." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
