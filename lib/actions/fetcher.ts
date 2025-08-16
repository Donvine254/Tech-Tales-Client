import { unstable_cache } from "next/cache";
import prisma from "@/prisma/prisma";
import { blogSelect } from "@/prisma/select";
import { BlogWithUser } from "@/types";
// function to fetch blogs based on the order by field
export const blogFetcher = (
  orderByField: "createdAt" | "views" | "likes",
  cacheKey: string,
  take: number = 10
) =>
  unstable_cache(
    async () => {
      "use server";
      return await prisma.blog.findMany({
        where: {
          status: "PUBLISHED",
        },
        select: blogSelect,
        orderBy: {
          [orderByField]: "desc",
        },
        take: take,
      });
    },
    [cacheKey],
    { revalidate: 600 }
  );

// return random featured blogs
export const getRandomBlogs = async () => {
  "use server";
  const blogs = await prisma.$queryRaw<BlogWithUser[]>`
  SELECT b.*, json_build_object('username', u.username, 'picture', u.picture) AS author
  FROM "Blog" b
  JOIN "User" u ON b."authorId" = u.id
  WHERE b.status = 'PUBLISHED'
  ORDER BY RANDOM()
  LIMIT 10;
`;
  return blogs;
};
