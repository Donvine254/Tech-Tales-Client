import { Metadata } from "next";
import History from "./history";

export const metadata: Metadata = {
  title: "Reading History- Tech Tales",
  description: "Explore our top-picked tech stories curated just for you.",
};
export default function page() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-accent">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* header */}
        <div className="mb-8 text-center sm:text-start ">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
            Reading History
          </h1>
          <p className="text-muted-foreground">
            Revisit the blogs that you have read.
          </p>
        </div>
        {/* Add history page here */}
        <History />
      </div>
    </div>
  );
}
