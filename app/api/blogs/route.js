import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

//function to format created_at date for the blog
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export async function GET(req, res) {
  try {
    // Fetch blogs with related user data
    const blogs = await prisma.blog.findMany({
      include: {
        author: {
          select: {
            username: true,
            picture: true,
          },
        },
      },
    });

    // Format blogs data
    const formattedBlogs = blogs.map((blog) => ({
      id: blog.id.toString(),
      image: blog.image,
      title: blog.title,
      body: blog.body,
      tags: blog.tags,
      slug: blog.slug,
      user_avatar: blog.author.picture,
      author: blog.author.username,
      created_at_date: formatDate(blog.createdAt),
    }));

    return NextResponse.json(formattedBlogs, { status: 200 });
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

// export async function POST(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }
//   const { slug } = await req.json();

//   try {
//     const blog = await prisma.blog.findFirst({
//       where: {
//         slug: slug,
//       },
//     });
//     if (blog) {
//       const comments = await prisma.comments.findMany({
//         where: {
//           blog_id: BigInt(blog.id),
//         },
//       });
//       const user = await prisma.users.findUnique({
//         where: {
//           id: BigInt(blog.user_id),
//         },
//       });
//       const socials = await prisma.social_media.findMany({
//         where: {
//           user_id: BigInt(user.id),
//         },
//         select: {
//           platform: true,
//           url: true,
//         },
//       });
//       const formattedBlog = {
//         id: blog.id.toString(),
//         image: blog.image,
//         title: blog.title,
//         body: blog.body,
//         tags: blog.tags,
//         slug: blog.slug,
//         user_avatar: user.picture,
//         author: user.username,
//         user_id: blog.user_id.toString(),
//         user_bio: user.bio,
//         author_socials: socials,
//         created_at_date: formatDate(blog.created_at),
//         comments: comments.length,
//       };

//       return NextResponse.json(formattedBlog, { status: 200 });
//     }
//   } catch (error) {
//     console.error("Error fetching blogs:", error);

//     return NextResponse.json(
//       { error: "An error occurred while fetching blog data." },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// }

export async function POST(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { slug } = await req.json();

  try {
    const blog = await prisma.blog.findFirst({
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
        comments: true, // Include comments for counting
      },
    });

    if (blog) {
      const formattedBlog = {
        id: blog.id,
        image: blog.image,
        title: blog.title,
        body: blog.body,
        tags: blog.tags,
        slug: blog.slug,
        user_avatar: blog.author.picture,
        author: blog.author.username,
        user_id: blog.author.id,
        user_bio: blog.author.bio,
        author_socials: blog.author.socialMedia,
        created_at_date: formatDate(blog.createdAt),
        comments_count: blog.comments.length, // Return the count of comments
      };

      return NextResponse.json(formattedBlog, { status: 200 });
    } else {
      return NextResponse.json({ error: "Blog not found." }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching blog data:", error);

    return NextResponse.json(
      { error: "An error occurred while fetching blog data." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
