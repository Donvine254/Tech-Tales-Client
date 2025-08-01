import React from "react";
import prisma from "@/prisma/prisma";
import { redirect } from "next/navigation";
import Slug from "@/components/pages/slug/slug";
import { metaobject } from "@/lib/metadata";
import { Metadata } from "next";
import { CoverImage, FullBlogData } from "@/types";

export async function generateStaticParams() {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        status: {
          notIn: ["DRAFT", "UNPUBLISHED"],
        },
      },
      select: {
        path: true,
      },
    });

    const pathArray = blogs.map((blog) => ({
      path: blog.path?.split("/") ?? [],
    }));
    return pathArray;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}

async function getData(path: string) {
  "use server";
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        path: path,
        status: {
          notIn: ["DRAFT", "UNPUBLISHED"],
        },
      },
      include: {
        author: {
          select: {
            username: true,
            picture: true,
            handle: true,
            bio: true,
            role: true,
            socials: true,
            branding: true,
          },
        },
        comments: {
          where: { show: true, status: { not: "ARCHIVED" } },
          include: {
            author: {
              select: {
                username: true,
                picture: true,
                role: true,
                status: true,
              },
            },
            responses: {
              include: {
                author: {
                  select: {
                    username: true,
                    picture: true,
                    role: true,
                  },
                },
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    return blog;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}
// Function to generate MetaData
export async function generateMetadata({
  params,
}: {
  params: Promise<{ path: string[] }>;
}) {
  const { path } = await params;
  const pathname = path.join("/");
  const blog = (await getData(pathname)) as unknown as FullBlogData;
  if (!blog) {
    return {
      ...metaobject,
      title: "Blog Post Not Found - Tech Tales",
      description: "The requested blog post could not be found.",
    };
  }
  const image = blog.image as CoverImage;
  return {
    ...metaobject,
    title: `${blog.title} - Tech Tales`,
    description: blog.description ?? "This blog has not been updated yet",
    keywords: blog.tags?.split(",") ?? metaobject.keywords,
    creator: blog.author.username,
    authors: [
      {
        name: blog.author.username,
        url: `https://techtales.vercel.app/explore/${blog.author.handle}`,
      },
    ],
    openGraph: {
      ...metaobject.openGraph,
      title: `${blog.title} - Tech Tales`,
      description: blog.description ?? "This blog has not been updated yet",
      url: `https://techtales.vercel.app/read/${blog.path}`,

      images: [
        {
          url: image?.secure_url || "https://techtales.vercel.app/og-image.png",
          width: 1200,
          height: 630,
          alt: blog.title ?? "Tech Tales",
        },
      ],
    },
    twitter: {
      ...metaobject.twitter,
      title: `${blog.title} - Tech Tales`,
      description: blog.description ?? "This blog has not been updated yet",
      images: [image.secure_url || "https://techtales.vercel.app/logo.png"],
    },
  } satisfies Metadata;
}
// TODO: Optimize seo images to avif format

export default async function page({
  params,
}: {
  params: Promise<{ path: string[] }>;
}) {
  const { path } = await params;
  const pathname = path.join("/");
  const blog = (await getData(pathname)) as FullBlogData;
  if (!blog) {
    redirect("/not-found");
  }
  return (
    <section
      className="@container bg-muted/50 dark:bg-background min-h-screen"
      suppressHydrationWarning>
      <Slug blog={blog} />
    </section>
  );
}
