"use server";
import { revalidatePath, revalidateTag, updateTag } from "next/cache";
import prisma from "@/prisma/prisma";
import { Preferences, SocialLink } from "@/types";
import { redirect } from "next/navigation";
import { isVerifiedUser } from "@/dal/auth-check";
import {
  sendDeactivationNotificationEmail,
  sendDeleteNotificationEmail,
} from "@/emails/mailer";
import { baseUrl, DELETED_USER_ID } from "../utils";
import { blogSelect } from "@/prisma/select";
import { cachedCall } from "./cache";
import { Prisma, UserStatus } from "@/src/generated/prisma/client";
import { deleteSession } from "./session-utils";
import { createVerificationToken } from "./verification";

/* function to getAllUserBlogs. Used in app/(main)/me/posts */
export const getUserBlogs = async () => {
  const user = await isVerifiedUser();
  const userId = Number(user.userId);
  return cachedCall(
    [userId],
    `user-${userId}-blogs`,
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
    {
      tags: [`user-${userId}-blogs`, "blogs"],
      revalidate: 600, // revalidate every 10 minutes
    },
  );
};
/* This function just user information and top 5 blogs. Used in /me route and profile.ts component (app\(main)\me) */
export const getUserTopBlogs = async () => {
  const user = await isVerifiedUser();
  return cachedCall(
    [],
    `user-${user.userId}-top`,
    async () => {
      return prisma.blog.findMany({
        where: {
          authorId: Number(user.userId),
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
    },
    {
      tags: [`user-${user.userId}-top`],
      revalidate: 600, // revalidate every 600 seconds
    },
  );
};

/* This function returns all user information */
export const getUserData = async () => {
  const user = await isVerifiedUser();
  return cachedCall(
    [user.userId],
    `user:${user.userId}:data`, // 👈 unique per-user cache key
    async (id) => {
      return prisma.user.findUnique({
        where: { id: Number(id), deactivated: false },
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
          _count: {
            select: {
              comments: true,
              blogs: true,
            },
          },
          userPreferences: {
            select: {
              cookies: true,
              analytics: true,
              email_notifications: true,
              newsletter_subscription: true,
              keep_blogs_on_delete: true,
              keep_comments_on_delete: true,
            },
          },
        },
      });
    },
    {
      tags: [`user:${user.userId}:data`], // revalidate only when profile updates
      revalidate: 600, // revalidate every 10 minutes
    },
  );
};

/*This function only handles updating user social media links*/
export async function updateSocials(data: SocialLink[]) {
  const session = await isVerifiedUser();
  const userId = Number(session.userId);
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        socials: data as unknown as Prisma.InputJsonValue, // ✅ fix type error
      },
      select: {
        socials: true, // ✅ only return socials
      },
    });

    revalidateTag(`user-${userId}-blogs`, "max");
    updateTag(`user:${userId}:data`);
    updateTag(`author-${userId}:data`);
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
  deactivatedAt?: Date;
  email_verified?: boolean;
  deleted?: boolean;
  status?: UserStatus;
};

export async function updateUserDetails(data: Partial<UpdateData>) {
  // auth check
  const session = await isVerifiedUser();
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
    updateTag(`user:${session.userId}:data`);
    revalidateTag(`author-${session.userId}:data`, "max");
    // revalidate user data cache
    return {
      success: true,
      message: "user details updated successfully",
      user: updatedUser,
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Could not update user." };
  }
}

/* **Function to update user preferences, only updates few properties */
export async function updateUserPreferences(
  data: Omit<Partial<Preferences>, "cookies">,
) {
  const session = await isVerifiedUser();
  try {
    await prisma.userPreferences.update({
      where: { userId: Number(session.userId) },
      data, // 👈 was incorrectly wrapped in an object
      select: {
        id: true,
      },
    });
    updateTag(`user:${session.userId}:data`);
    return {
      success: true,
      message: "user details updated successfully",
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Could not update user preferences." };
  }
}
/*----------function to deactivate user account and archive their blogs---------*/
export async function deactivateUserAccount(
  keepBlogs: boolean,
  keepComments: boolean,
) {
  const session = await isVerifiedUser();
  const userId = Number(session.userId);
  try {
    // Capture IDs to archive BEFORE the transaction so the snapshot is consistent
    const [blogsToArchive, commentsToHide] = await Promise.all([
      !keepBlogs
        ? prisma.blog.findMany({
            where: { authorId: userId, status: "PUBLISHED" },
            select: { id: true },
          })
        : [],
      !keepComments
        ? prisma.comment.findMany({
            where: { authorId: userId },
            select: { id: true },
          })
        : [],
    ]);

    const [user] = await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: {
          deactivated: true,
          deactivatedAt: new Date(),
          status: "DEACTIVATED",
          keep_blogs_on_delete: keepBlogs,
          keep_comments_on_delete: keepComments,
        },
        select: { id: true, email: true, username: true },
      }),
      prisma.session.deleteMany({ where: { userId } }),
    ]);

    setImmediate(async () => {
      await Promise.all([
        blogsToArchive.length > 0 &&
          prisma.blog.updateMany({
            where: { id: { in: blogsToArchive.map((b) => b.id) } },
            data: { status: "ARCHIVED" },
          }),
        commentsToHide.length > 0 &&
          prisma.comment.updateMany({
            where: { id: { in: commentsToHide.map((c) => c.id) } },
            data: { show: false },
          }),
      ]);

      const token = await createVerificationToken({
        identifier: user.email,
        type: "ACCOUNT_RESTORE",
        expiresInMinutes: 60 * 24 * 30, // 30 days,
        value: {
          userId: user.id,
          expectedChallenge: crypto.randomUUID(),
          archivedBlogIds: blogsToArchive.map((b) => b.id),
          hiddenCommentIds: commentsToHide.map((c) => c.id),
        },
      });

      await sendDeactivationNotificationEmail(
        user.username,
        user.email,
        keepBlogs,
        keepComments,
        `${baseUrl}/account/restore?token=${token}`,
      );
    });

    revalidateTag(`author-${userId}:data`, "max");
    deleteSession();
    return { success: true, message: "User account deactivated successfully" };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Something unexpected happened",
    };
  }
}
/* function to permanently delete user account and associated data */
export async function deleteUserAccount(
  keepBlogs: boolean,
  keepComments: boolean,
) {
  const session = await isVerifiedUser();
  const userId = Number(session.userId);

  // Guard against accidentally deleting the deleted-user placeholder
  if (!userId || userId === DELETED_USER_ID) {
    return { success: false, message: "User not found" };
  }
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      handle: true,
    },
  });
  if (!user) {
    return { success: false, message: "record to delete not found" };
  }
  try {
    // Reassign content in parallel before deletion if user opts to keep them
    await Promise.all([
      keepBlogs &&
        prisma.blog.updateMany({
          where: { authorId: userId },
          data: { authorId: DELETED_USER_ID },
        }),
      keepComments &&
        prisma.comment.updateMany({
          where: { authorId: userId },
          data: { authorId: DELETED_USER_ID },
        }),
      keepComments &&
        prisma.response.updateMany({
          where: { authorId: userId },
          data: { authorId: DELETED_USER_ID },
        }),
    ]);
    await prisma.$transaction([
      prisma.verification.deleteMany({ where: { identifier: session.email } }),
      prisma.user.delete({ where: { id: userId } }),
    ]);
    // Fire-and-forget notification email after successful deletion
    setImmediate(async () => {
      await sendDeleteNotificationEmail(
        session.username,
        session.email,
        keepBlogs,
        keepComments,
      ).catch(console.error);
    });
    // update cache to reflect archived blogs
    revalidateTag(`author-${userId}:data`, "max");
    revalidatePath(`/read/${user.handle}`);
    updateTag(`user-${userId}-blogs`);
    updateTag("featured");
    updateTag("latest");
    updateTag("trending");
    updateTag("blogs");
    deleteSession();
    return { success: true, message: "User account deleted successfully" };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Something unexpected happened",
    };
  }
}
