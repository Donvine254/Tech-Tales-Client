import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";



// Function to format created_at date for the blog
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export async function GET(req, { params }) {
  const { blogId } = params;

  if (blogId) {
    try {
      // Fetch blogs associated with the specific user
      const blog = await prisma.blogs.findUnique({
        where: {
          id: BigInt(blogId),
        },
      });
      if (blog) {
        const user = await prisma.users.findUnique({
          where: {
            id: BigInt(blog.user_id),
          },
        });

        const formattedBlogs = {
          id: blog.id.toString(),
          image: blog.image,
          title: blog.title,
          body: blog.body,
          tags: blog.tags,
          slug: blog.slug,
          user_avatar: user.picture,
          author: user.username,
          user_bio: user.bio,
          user_socials: user.socials,
          created_at_date: formatDate(blog.created_at),
          comments: comments,
        };

        return NextResponse.json(formattedBlogs);
      }
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
