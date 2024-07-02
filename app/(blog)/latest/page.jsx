import { BlogsComponent } from "@/components";

export const revalidate = 600;
// fetch the data based on created time

export const metadata = {
  title: "Latest Blogs - Tech Tales",
  description:
    "Tech Tales is a simple blog for tech students and professionals who would like to share their solutions to various coding problems or practice blogging as a way of learning",
};
export default async function Latest() {
  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api/latest"
      : "https://techtales.vercel.app/api/latest";
  let blogs = await fetch(url, {
    next: { revalidate: 600 },
  }).then((response) => response.json());

  return (
    <div className="relative md:min-h-[320px] md:mt-10">
      <BlogsComponent blogs={blogs} />
    </div>
  );
}
