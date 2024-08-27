import Bookmarks from "./bookmarks";
export const metadata = {
  title: "My Blogs - Tech Tales",
};

export default async function Page() {
  return (
    <section className="md:mt-10">
      <Bookmarks />
    </section>
  );
}
