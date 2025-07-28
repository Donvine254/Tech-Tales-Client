"use server";
import { revalidateTag, unstable_cache } from "next/cache";
import prisma from "@/prisma/prisma";
import { Preferences, SocialLink } from "@/types";
import { getSession } from "./session";
import { Prisma, UserStatus } from "@prisma/client";
import { createAndSetAuthTokenCookie } from "./jwt";

// function to getAllUserBlogs
export const getUserBlogs = unstable_cache(
  async (userId: number) => {
    const blogs = await prisma.blog.findMany({
      where: {
        authorId: userId,
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
    });

    return blogs;
  },
  ["user-blogs"],
  { revalidate: 600 }
);

export const getUserData = unstable_cache(
  async (userId: number) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        handle: true,
        picture: true,
        bio: true,
        role: true,
        branding: true,
        skills: true,
        createdAt: true,
        socials: true,
        _count: {
          select: {
            comments: true,
            blogs: true,
          },
        },
      },
    });

    const blogs = await prisma.blog.findMany({
      where: {
        authorId: userId,
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
        views: "desc",
      },
      take: 5,
    });

    return { user, blogs };
  },
  ["author-blogs"],
  {
    revalidate: 600,
    tags: ["user-blogs"],
  }
);
//function to get user profile data
export async function fetchProfileData(id: number) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        handle: true,
        picture: true,
        bio: true,
        role: true,
        branding: true,
        skills: true,
        preferences: true,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

// function to saveuser socials

export async function updateSocials(data: SocialLink[]) {
  const session = await getSession();
  if (!session || !session.userId) {
    return { success: false, message: "No logged-in user found" };
  }
  try {
    const user = await prisma.user.update({
      where: { id: Number(session.userId) },
      data: {
        socials: data as unknown as Prisma.InputJsonValue, // ✅ fix type error
      },
      select: {
        socials: true, // ✅ only return socials
      },
    });
    // ✅ revalidate relevant tags
    revalidateTag("author-blogs");
    revalidateTag("user-blogs");
    return {
      success: true,
      socials: user.socials,
      message: "Socials updated successfully",
    };
  } catch (error) {
    console.error("Failed to update socials", error);
    return {
      success: false,
      message: "Something went wrong while updating socials",
    };
  }
}

// fuction to update user details
type UpdateData = {
  username: string;
  handle: string;
  bio?: string | null;
  skills?: string | null;
  branding: string | null;
  picture?: string | null;
  preferences?: Preferences;
  deactivatedAt?: Date;
  email_verified?: boolean;
  deleted?: boolean;
  status?: UserStatus;
};

export async function updateUserDetails(
  userId: number,
  data: Partial<UpdateData>
) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data,
      select: {
        id: true,
        email: true,
        username: true,
        picture: true,
        role: true,
      },
    });
    await createAndSetAuthTokenCookie(updatedUser);
    return {
      success: true,
      message: "user details updated successfully",
      user: updatedUser,
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Could not update user." };
  } finally {
    await prisma.$disconnect();
  }
}
