import { unstable_cache } from "next/cache";
import prisma from "@/prisma/prisma";
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
        select: {
          id: true,
          uuid: true,
          title: true,
          slug: true,
          description: true,
          reading_time: true,
          createdAt: true,
          views: true,
          likes: true,
          image: true,
          author: {
            select: {
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
        orderBy: {
          [orderByField]: "desc",
        },
        take: take,
      });
    },
    [cacheKey],
    { revalidate: 600 }
  );
