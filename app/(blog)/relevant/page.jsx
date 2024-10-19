import { BlogsComponent, SideNav } from "@/components";
import prisma from "@/prisma/prisma";
export const revalidate = 60;

export const metadata = {
  title: "Relevant Blogs - Tech Tales",
};
async function getBlogs() {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
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
      take: 10,
      cacheStrategy: { ttl: 360 },
    });
    return blogs;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch blogs", error);
  }
}

export default async function Relevant() {
  const blogs = (await getBlogs()) || [];
  return (
    <div className="relative md:min-h-[320px] md:mt-10">
      <section className="w-full !z-0 mx-auto md:my-4 px-4 md:px-8 md:w-2/3 relative font-poppins">
        <SideNav />
        <BlogsComponent blogs={blogs} />
      </section>
    </div>
  );
}
