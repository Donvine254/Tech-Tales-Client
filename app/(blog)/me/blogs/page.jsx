import MyBlogsComponent from "./blogs";
export const metadata = {
  title: "My Blogs - Tech Tales",
  description:
    "Tech Tales is a simple blog for tech students and professionals who would like to share their solutions to various coding problems or practice blogging as a way of learning",
};

export default async function Page() {
  return (
    <section className="md:mt-10">
      <MyBlogsComponent />
    </section>
  );
}
