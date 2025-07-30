import { unstable_cache } from "next/cache";
import prisma from "@/prisma/prisma";
import { blogSelect } from "@/prisma/select";
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
