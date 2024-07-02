import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

// Function to format created_at date for the blog
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export async function GET(req, { params }) {
  const { userId } = params;
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  const user = await prisma.users.findUnique({
    where: {
      id: BigInt(userId),
    },
    select: {
      username: true,
      picture: true,
    },
  });
  if (user) {
    try {
      // Fetch blogs associated with the specific user
      const blogs = await prisma.blogs.findMany({
        where: {
          user_id: BigInt(userId),
        },
        orderBy: {
          created_at: "desc",
        },
      });

      const formattedBlogs = blogs.map((blog) => ({
        id: blog.id.toString(),
        image: blog.image,
        title: blog.title,
        body: blog.body,
        tags: blog.tags,
        slug: blog.slug,
        user_id: blog.user_id.toString(),
        user_avatar: user.picture,
        author: user.username,
        created_at_date: formatDate(blog.created_at),
      }));

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
  } else {
    return NextResponse.json({ error: "User Not Found" }, { status: 400 });
  }
}
