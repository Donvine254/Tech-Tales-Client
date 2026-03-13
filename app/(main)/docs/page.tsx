import DocsPage from "./docs-page";

export const metadata = {
  title: "Documentation Page- Tech Tales",
};

export default function page() {
  return (
    <section className="min-h-screen bg-accent dark:bg-background">
      <DocsPage />
    </section>
  );
}
