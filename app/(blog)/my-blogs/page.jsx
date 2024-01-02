import MyBlogsComponent from "./blogs";
export const metadata = {
  title: "My Blogs - Tech Tales",
  description:
    "Tech Tales is a simple school blog for software developers students and senior developers who would like to share their solutions to various coding problems or practice blogging as a way of learning",
};

export default function page() {
  return (
    <section>
      <MyBlogsComponent />
    </section>
  );
}
