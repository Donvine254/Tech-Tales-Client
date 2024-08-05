import CreateNewBlog from "./create";

export const metadata = {
  title: "Write a New Blog - Tech Tales",
};

export default async function page() {
  return (
    <section>
      <CreateNewBlog />
    </section>
  );
}
