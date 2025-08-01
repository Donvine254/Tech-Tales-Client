"use server";
import { revalidateTag, unstable_cache } from "next/cache";
import prisma from "@/prisma/prisma";
import { Preferences, SocialLink } from "@/types";
import { Prisma, UserStatus } from "@prisma/client";
import { createAndSetAuthTokenCookie } from "./jwt";
import { redirect } from "next/navigation";
import { isVerifiedUser } from "@/dal/auth-check";
import {
  sendDeactivationNotificationEmail,
  sendDeleteNotificationEmail,
} from "@/emails/mailer";
import { DELETED_USER_ID } from "../utils";
import { blogSelect } from "@/prisma/select";

// function to getAllUserBlogs. Used in app/(main)/me/posts
export const getUserBlogs = unstable_cache(
  async (userId: number) => {
    // check if user is verified
    if (!userId) {
      redirect("/login");
    }
    const blogs = await prisma.blog.findMany({
      where: {
        authorId: userId,
      },
      select: {
        authorId: true,
        updatedAt: true,
        status: true,
        show_comments: true,
        ...blogSelect,
      },
    });

    return blogs;
  },
  ["user-blogs"],
  { revalidate: 600 }
);
// This function just user information and top 5 blogs. Used in /me route and profile.ts component (app\(main)\me)
export const getUserTopBlogs = async () => {
  const session = await isVerifiedUser();
  if (!session) {
    redirect("/login");
  }
  return prisma.blog.findMany({
    where: {
      authorId: Number(session.userId),
      status: "PUBLISHED",
    },
    select: {
      status: true,
      ...blogSelect,
    },
    orderBy: {
      views: "desc",
    },
    take: 5,
  });
};
// This function returns all user information

export const getUserData = async () => {
  const session = await isVerifiedUser();
  if (!session) {
    redirect("/login");
  }
  const user = await prisma.user.findUnique({
    // do not return deactivated users data
    where: { id: Number(session.userId), deactivated: false },
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
      createdAt: true,
      socials: true,
      keep_blogs_on_delete: true,
      keep_comments_on_delete: true,
      preferences: true,
      _count: {
        select: {
          comments: true,
          blogs: true,
        },
      },
    },
  });

  return user;
};

/*This function only handles updating user social media links*/
export async function updateSocials(data: SocialLink[]) {
  const session = await isVerifiedUser();
  if (!session) {
    redirect("/login");
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

/*This function helps update user details and can receive any type of field*/
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
  keep_blogs_on_delete?: boolean;
  keep_comments_on_delete?: boolean;
};

export async function updateUserDetails(data: Partial<UpdateData>) {
  const session = await isVerifiedUser();
  if (!session) {
    redirect("/login");
  }
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: session.userId,
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
/* function to deactivate user account and make it possible for users to restore their accounts within 30 days */
export async function deactivateUserAccount(
  keepBlogs: boolean,
  keepComments: boolean
) {
  const session = await isVerifiedUser();
  if (!session) {
    redirect("/login");
  }
  try {
    const user = await prisma.user.update({
      where: {
        id: Number(session.userId),
      },
      data: {
        deactivated: true,
        deactivatedAt: new Date(),
        status: "DEACTIVATED",
        keep_blogs_on_delete: keepBlogs,
        keep_comments_on_delete: keepComments,
      },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });
    setImmediate(async () => {
      // Archive blog posts
      if (!keepBlogs) {
        await prisma.blog.updateMany({
          where: { authorId: user.id, status: "PUBLISHED" },
          data: { status: "ARCHIVED" },
        });
      }
      // Archive comments
      if (!keepComments) {
        await prisma.comment.updateMany({
          where: { authorId: user.id },
          data: { show: false },
        });
      }
      await sendDeactivationNotificationEmail(
        user.username,
        user.email,
        user.id,
        keepBlogs,
        keepComments
      );
    });
    return { success: true, message: "User account deleted successfully" };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Something unexpected happened",
    };
  } finally {
    await prisma.$disconnect();
  }
}

/* function to permanently delete user account and associated data */
export async function deleteUserAccount(
  keepBlogs: boolean,
  keepComments: boolean
) {
  const session = await isVerifiedUser();
  if (!session) {
    redirect("/login");
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(session.userId) },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });
    // This protects from accidentally deleting the user with id 49
    if (!user || user.id === 49) {
      return { success: false, message: "User not found" };
    }
    // Reassign content if user choses to keep them as per GDPR/CCPA rules. We reassign to a deleted user in the database with ID of 49.
    if (keepBlogs) {
      await prisma.blog.updateMany({
        where: { authorId: user.id },
        data: { authorId: DELETED_USER_ID },
      });
    }

    if (keepComments) {
      await prisma.comment.updateMany({
        where: { authorId: user.id },
        data: { authorId: DELETED_USER_ID },
      });
      await prisma.response.updateMany({
        where: { authorId: user.id },
        data: { authorId: DELETED_USER_ID },
      });
    }
    // send deletion notification email after returning
    setImmediate(async () => {
      await sendDeleteNotificationEmail(
        user.username,
        user.email,
        keepBlogs,
        keepComments
      );
    });
    // Finally, delete the user account
    await prisma.user.delete({
      where: { id: user.id },
    });

    return { success: true, message: "User account deleted successfully" };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Something unexpected happened",
    };
  } finally {
    await prisma.$disconnect();
  }
}
