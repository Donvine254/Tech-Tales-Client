import { SideNav } from "@/components";
import Slug from "./slug";
export const revalidate = 600;
import prisma from "@/prisma/prisma";
import { customMetaDataGenerator } from "@/lib/customMetadataGenerator";

export async function generateStaticParams() {
  try {
    const slugs = await prisma.blog.findMany({
      where: {
        status: "PUBLISHED",
      },
      select: {
        slug: true,
      },
    });
    const slugArray = slugs.map((slugObj) => slugObj.slug);
    return slugArray;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}

async function getBlogData(slug) {
  "use server";
  try {
    const blog = await prisma.blog.update({
      where: {
        slug: slug,
        status: "PUBLISHED",
      },
      data: { views: { increment: 1 } },
      include: {
        author: {
          select: {
            username: true,
            picture: true,
            handle: true,
            bio: true,
            socials: true,
          },
        },
        comments: {
          where: {
            status: "VISIBLE",
          },
          include: {
            author: {
              select: {
                username: true,
                picture: true,
                role: true,
                status: true,
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

export async function generateMetadata({ params }) {
  const blog = await getBlogData(params.slug);
  if (!blog) {
    return customMetaDataGenerator({
      title: "Blog Not Found | Tech Tales",
      description: "The requested blog could not be found on Tech Tales.",
    });
  }

  const description = `Created by: ${blog.author.username} - ${blog.body.slice(
    0,
    150
  )}... Read More`;

  return customMetaDataGenerator({
    title: blog.title,
    description,
    ogImage: blog.image,
    keywords: blog.tags.split(","),
    url: `https://techtales.vercel.app/blog/${blog.slug}`,
  });
}

export default async function BlogsPage({ params }) {
  let blog = await getBlogData(params.slug);
  return (
    <div className="w-full mx-auto m-2 min-h-[75%] px-8 xsm:px-4 md:w-4/5 md:mt-10 font-poppins ">
      <SideNav />
      <Slug blog={blog} />
    </div>
  );
}
