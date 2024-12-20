import { BlogsComponent, SideNav } from "@/components";
export const revalidate = 600;
import prisma from "@/prisma/prisma";
// fetch the data based on created time

export const metadata = {
  title: "Latest Blogs - Tech Tales",
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
        createdAt: "desc",
      },
      take: 10,
    });
    return blogs;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export default async function Latest() {
  let blogs = {};
  blogs = await getBlogs();
  return (
    <div className="relative md:min-h-[320px] md:mt-10">
      <section className="w-full !z-0 mx-auto md:my-4 px-4 md:px-8 md:w-2/3 relative font-poppins">
        <SideNav />
        <BlogsComponent blogs={blogs} />
      </section>
    </div>
  );
}
