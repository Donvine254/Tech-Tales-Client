import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest, res: NextResponse) {
//   const { tags, blogId, userId } = await req.json();
//   const tagsArray = tags.split(",").map((tag) => tag.trim());
//   try {
//     const blogs = await prisma.blog.findMany({
//       where: {
//         OR: tagsArray.map((tag) => ({
//           tags: {
//             contains: tag,
//             mode: "insensitive",
//           },
//         })),
//       },
//       include: {
//         author: {
//           select: {
//             username: true,
//             picture: true,
//           },
//         },
//         _count: {
//           select: {
//             comments: true,
//           },
//         },
//       },
//       take: 20,
//       cacheStrategy: { ttl: 600 },
//     });
//     const filteredBlogs = blogs.filter((blog) => blog.id !== Number(blogId));
//     const recommendations = filteredBlogs
//       .sort(() => 0.5 - Math.random())
//       .slice(0, 5);

//     return NextResponse.json(recommendations);
//   } catch (error) {
//     console.error("Error fetching blogs:", error);
//     return NextResponse.json(
//       { error: "An error occurred while fetching blogs" },
//       { status: 500 }
//     );
//   }
// }
export async function POST(req: NextRequest, res: NextResponse) {
  const { tags, blogId, viewedBlogs } = await req.json();
  const tagsArray = tags.split(",").map((tag) => tag.trim());
  console.log(viewedBlogs);
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        id: {
          not: Number(blogId),
        },
        OR: tagsArray.map((tag) => ({
          tags: {
            contains: tag,
            mode: "insensitive",
          },
        })),
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            picture: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      take: 20,
      cacheStrategy: { ttl: 600 },
    });

    const filteredBlogs = blogs.filter(
      (blog) => !viewedBlogs.includes(blog.id)
    );

    let recommendations;
    if (filteredBlogs.length > 0) {
      recommendations = filteredBlogs
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);
    } else {
      recommendations = blogs.sort(() => 0.5 - Math.random()).slice(0, 5);
    }
    return NextResponse.json(recommendations);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching blogs" },
      { status: 500 }
    );
  }
}
