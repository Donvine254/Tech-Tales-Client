import CreateNewBlog from "./create";

export const metadata = {
  title: "Write a New Blog - Tech Tales",
  description:
    "Tech Tales is a simple blog for tech students and professionals who would like to share their solutions to various coding problems or practice blogging as a way of learning",
};

export default async function page() {
  return (
    <section>
      <CreateNewBlog />
    </section>
  );
}
