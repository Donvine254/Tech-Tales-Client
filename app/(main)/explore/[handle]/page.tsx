import { getUserAndBlogsByHandle } from "@/lib/actions/blogs";
import ExplorePage from "./explore";
import { redirect } from "next/navigation";
import prisma from "@/prisma/prisma";
export const metadata = {
  title: "Explore Author Blogs - Tech Tales",
};

export async function generateStaticParams() {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        author: {
          // ✅ Only include blogs with non-deactivated authors
          is: {
            deactivated: false,
          },
        },
      },
      select: {
        author: {
          select: {
            handle: true,
          },
        },
      },
    });

    const userHandlesSet = new Set();
    for (const blog of blogs) {
      if (blog.author) {
        userHandlesSet.add(blog.author.handle);
      }
    }
    return Array.from(userHandlesSet).map((handle) => ({ handle }));
  } catch (error) {
    console.error("Error fetching blog authors:", error);
    return [];
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const data = await getUserAndBlogsByHandle(handle);
  if (!handle || !data) {
    redirect("/");
  }
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-accent">
      <ExplorePage data={data} />
    </div>
  );
}
