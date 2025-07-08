import { getUserAndBlogsByHandle } from "@/lib/actions/blogs";
import ExplorePage from "./explore";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Explore Author Blogs - Tech Tales",
};
// generateStaticProps for all possible user blogs

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
    <div className="min-h-screen bg-background">
      <ExplorePage data={data} />
    </div>
  );
}
