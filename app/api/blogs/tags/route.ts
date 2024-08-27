// import prisma from "@/prisma/prisma";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET() {
//   try {
//     // Fetch all blogs
//     const blogs = await prisma.blog.findMany({
//       select: {
//         tags: true,
//       },
//       cacheStrategy: { ttl: 3600 },
//     });

//     const uniqueTags = new Set();
//     blogs.forEach((blog: any) => {
//       const tagsArray = blog.tags.split(",").map((tag: string) => tag.trim());
//       tagsArray.forEach((tag: string) => uniqueTags.add(tag.toLowerCase()));
//     });

//     const tagsList = Array.from(uniqueTags).sort();

//     return NextResponse.json(tagsList);
//   } catch (error) {
//     console.error("Error fetching tags:", error);
//     return NextResponse.error();
//   }
// }

// export async function POST(req: NextRequest, res: NextResponse) {
//   const { tags } = await req.json();
//   const tagsArray = tags.split(",").map((tag) => tag.trim());
//   try {
//     const blogs = await prisma.blog.findMany({
//       where: {
//         tags: {
//           in: tagsArray,
//         },
//       },
//       take: 5,
//     });
//     return NextResponse.json(blogs);
//   } catch (error) {
//     console.error("Error fetching blogs:", error);
//     return NextResponse.json(
//       { error: "An error occurred while fetching blogs" },
//       { status: 500 }
//     );
//   }
// }
