import { SideNav } from "@/components";
import Slug from "./slug";

//I will need to fetch all blogs and generate static params for faster load time

export default async function BlogsPage({ params }) {
  let blog = await fetch(
    `https://techtales.up.railway.app/blogs/${params.blogId}`,
    { next: { revalidate: 3600 } }
  ).then((response) => response.json());
  console.log(blog);
  return (
    <div className="w-full mx-auto m-2 min-h-[75%] px-8 md:w-2/3 font-poppins">
      <SideNav />
      <Slug blog={blog} />
    </div>
  );
}
