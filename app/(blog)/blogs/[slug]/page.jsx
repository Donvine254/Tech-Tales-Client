import { SideNav } from "@/components";
import Slug from "./slug";
import { baseUrl } from "@/lib";
export const revalidate = 600;

export const metadata = {
  title: "Blog Page - Tech Tales",
  description:
    "Tech Tales is a simple blog for tech students and professionals who would like to share their solutions to various coding problems or practice blogging as a way of learning",
};
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
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        slug: slug,
        status: "PUBLISHED",
      },
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

export default async function BlogsPage({ params }) {
  let blog = await getBlogData(params.slug);

  return (
    <div className="w-full mx-auto m-2 min-h-[75%] px-8 md:w-4/5 md:mt-10 font-poppins ">
      <SideNav />
      <Slug blog={blog} />
    </div>
  );
}
