import SearchPage from "./search";
import { Suspense } from "react";
export const metadata = {
  title: "Search Results - Tech Tales",
  description:
    "Tech Tales is a simple blog for tech students and professionals who would like to share their solutions to various coding problems or practice blogging as a way of learning",
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="bg-[url('https://cdn.dribbble.com/users/46425/screenshots/1799682/media/f5cb1a59acb2f7ca5782b6ddae1f0a66.gif')] bg-auto bg-center h-[400px] mt-5 m-auto"></div>
      }>
      <section className="md:mt-10">
        <SearchPage />
      </section>
    </Suspense>
  );
}
