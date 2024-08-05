import SearchPage from "./search";
import { Suspense } from "react";
export const metadata = {
  title: "Search Results - Tech Tales",
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
