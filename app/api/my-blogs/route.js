import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/lib/decodeToken";
// Function to format created_at date for the blog
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export async function GET(req, res) {
  const userData = await getDataFromToken(req);

  if (!userData) {
    return NextResponse.json({ error: "Forbidden Request" }, { status: 401 });
  }
  const user = await prisma.users.findUnique({
    where: {
      id: BigInt(userData.id),
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
          user_id: BigInt(userData.id),
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
