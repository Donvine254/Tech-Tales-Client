import React from "react";
import Explore from "./blogs";
import prisma from "@/prisma/prisma";
import { convertToHandle } from "@/lib/utils";
export const revalidate = 600;
export const metadata = {
  title: "Explore Author Blogs - Tech Tales",
  description:
    "Tech Tales is a simple blog for tech students and professionals who would like to share their solutions to various coding problems or practice blogging as a way of learning",
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export async function generateStaticParams() {
  try {
    // Fetch all blogs
    const blogs = await prisma.blog.findMany();
    const userHandlesSet = new Set();
    for (const blog of blogs) {
      const user = await prisma.user.findUnique({
        where: {
          id: blog.userId,
        },
      });

      if (user) {
        const handle = convertToHandle(user.username);
        userHandlesSet.add(handle);
      }
    }
    return Array.from(userHandlesSet);
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return [];
  }
}

async function getUserBlogs(handle) {
  "use server";
  try {
    // Fetch all users
    const users = await prisma.users.findMany();
    // Find the user whose username converted to handle matches the provided handle
    const user = users.find(
      (user) => convertToHandle(user.username) === handle
    );

    if (!user) {
      throw new Error("User not found.");
    }

    // Use user.id to find blogs where blog.user_id matches user.id
    const blogs = await prisma.blogs.findMany({
      where: {
        user_id: BigInt(user.id), // Convert to BigInt if necessary
      },
    });

    // Map over the blogs and return the transformed data
    const formattedBlogs = blogs.map((blog) => ({
      id: blog.id.toString(),
      image: blog.image,
      title: blog.title,
      body: blog.body,
      tags: blog.tags,
      slug: blog.slug,
      user_avatar: user.picture,
      author: user.username,
      created_at_date: formatDate(blog.created_at),
    }));

    return formattedBlogs;
  } catch (error) {
    console.error("Error fetching user blogs:", error);
    throw error;
  }
}

export default async function page({ params }) {
  const blogs = await getUserBlogs(params.handle);

  return (
    <section className="md:mt-10">
      <Explore blogs={blogs} />
    </section>
  );
}
