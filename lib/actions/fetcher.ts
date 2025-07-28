import { unstable_cache } from "next/cache";
import prisma from "@/prisma/prisma";
// function to fetch blogs based on the order by field
export const blogFetcher = (
  orderByField: "createdAt" | "views" | "likes",
  cacheKey: string
) =>
  unstable_cache(
    async () => {
      "use server";
      return await prisma.blog.findMany({
        where: {
          status: "PUBLISHED",
        },
        include: {
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
        take: 10,
      });
    },
    [cacheKey],
    { revalidate: 600 }
  );
