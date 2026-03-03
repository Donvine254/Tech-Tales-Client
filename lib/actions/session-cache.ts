import prisma from "@/prisma/prisma";
import { unstable_cache } from "next/cache";


export const getCachedSession = unstable_cache(
  async (token: string) => {
    return prisma.session.findUnique({
      where: { token },
      select: {
        id: true,
        expiresAt: true,
        user: {
          select: {
            id: true,
            email: true,
            role: true,
            username: true,
            picture: true,
            status: true,
            deactivated: true,
          },
        },
      },
    });
  },
  ["session-lookup"],
  { revalidate: 60 } // one DB hit per token per 60s
);