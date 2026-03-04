"use server";
import prisma from "@/prisma/prisma";

export const getSessionData = async (token: string) => {
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
};
