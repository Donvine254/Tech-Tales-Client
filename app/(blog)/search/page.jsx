import SearchPage from "./search";

export const metadata = {
  title: "Search Results - Tech Tales",
  description:
    "Tech Tales is a simple blog for tech students and professionals who would like to share their solutions to various coding problems or practice blogging as a way of learning",
};

export default function Page() {
  return (
    <section>
      <SearchPage />
    </section>
  );
}
