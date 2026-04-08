import { notFound } from "next/navigation";
import {
  getUserAndBlogsByHandle,
  getUserIdByHandle,
} from "@/lib/actions/explore";
import prisma from "@/prisma/prisma";
import ExplorePage from "./explore";

export const metadata = {
  title: "Explore Author Blogs - Tech Tales",
};

// Allow pages not in generateStaticParams to be rendered on-demand
// instead of crashing the build
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        author: {
          is: { deactivated: false },
        },
      },
      select: {
        author: {
          select: { handle: true },
        },
      },
    });

    const seen = new Set<string>();
    const params: { handle: string }[] = [];

    for (const blog of blogs) {
      const handle = blog.author?.handle;
      if (handle && !seen.has(handle)) {
        seen.add(handle);
        params.push({ handle });
      }
    }

    return params;
  } catch (error) {
    console.error("generateStaticParams failed, skipping prerender:", error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;

  try {
    const userId = await getUserIdByHandle(handle);
    if (!userId) notFound();

    const data = await getUserAndBlogsByHandle(userId);
    if (!data) notFound();

    return (
      <div className="min-h-screen bg-gray-100 dark:bg-accent">
        <ExplorePage data={data} />
      </div>
    );
  } catch (error) {
    console.error(`Failed to render /explore/${handle}:`, error);
    notFound();
  }
}
