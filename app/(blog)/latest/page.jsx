import { BlogsComponent, SideNav } from "@/components";
import { baseUrl } from "@/lib";
export const revalidate = 600;
import { formatDate } from "@/lib/utils";
import prisma from "@/prisma/prisma";
// fetch the data based on created time

export const metadata = {
  title: "Latest Blogs - Tech Tales",
  description:
    "Tech Tales is a simple blog for tech students and professionals who would like to share their solutions to various coding problems or practice blogging as a way of learning",
};
export default async function Latest() {
  async function getBlogs() {
    try {
      const latestBlogs = await prisma.blogs.findMany({
        orderBy: {
          created_at: "desc",
        },
        take: 5,
      });

      const formattedBlogs = await Promise.all(
        latestBlogs.map(async (blog) => {
          const user = await prisma.users.findUnique({
            where: {
              id: blog.user_id,
            },
            select: {
              username: true,
              picture: true,
            },
          });

          return {
            id: blog.id.toString(),
            image: blog.image,
            title: blog.title,
            body: blog.body,
            tags: blog.tags,
            slug: blog.slug,
            user_avatar: user.picture,
            author: user.username,
            created_at_date: formatDate(blog.created_at),
          };
        })
      );
      return formattedBlogs;
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      await prisma.$disconnect();
    }
  }
  let blogs = await getBlogs();
  return (
    <div className="relative md:min-h-[320px] md:mt-10">
      <section className="w-full !z-0 mx-auto md:my-4 px-4 md:px-8 md:w-2/3 relative font-poppins">
        <SideNav />
        <BlogsComponent blogs={blogs} />
      </section>
    </div>
  );
}
