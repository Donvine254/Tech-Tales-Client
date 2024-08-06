import Dashboard from "./Dashboard";
import Loader from "@/components/Loader";
import prisma from "@/prisma/prisma";
import { Suspense } from "react";
export const revalidate = 60;

export const metadata = {
  title: "Admin Dashboard - Tech Tales",
};

async function getTotalComments() {
  try {
    const comments = await prisma.comment.findMany({
      include: {
        author: {
          select: {
            username: true,
            picture: true,
          },
        },
        blog: {
          select: {
            slug: true,
            title: true,
          },
        },
      },
      cacheStrategy: { ttl: 60 },
    });
    return comments;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function getTotalUsers() {
  try {
    const users = await prisma.user.findMany({
      where: {
        deleted: false,
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        status: true,
        picture: true,
        handle: true,
        bio: true,
        _count: {
          select: {
            comments: true,
            blogs: true,
          },
        },
      },
      cacheStrategy: { ttl: 60 },
    });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function getBlogs() {
  try {
    const blogs = await prisma.blog.findMany({
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
      cacheStrategy: { ttl: 60 },
    });
    return blogs;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export default async function Page() {
  const blogs = (await getBlogs()) || [];
  const totalComments = (await getTotalComments()) || [];
  const allUsers = (await getTotalUsers()) || [];
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          <div className="loader"></div>
        </div>
      }>
      <section className="w-full mx-auto m-2 min-h-[320px] xsm:px-3 px-8 md:w-5/6 md:mt-10 font-poppins">
        <Dashboard
          blogs={blogs}
          totalComments={totalComments}
          users={allUsers}
        />
      </section>
    </Suspense>
  );
}
