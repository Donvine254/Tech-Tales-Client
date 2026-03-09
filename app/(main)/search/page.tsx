import type { Metadata } from "next";
import SearchPage from "./search-page";

export const metadata: Metadata = {
  title: "Search for stories and topics - Tech Tales",
};
export default function page() {
  return (
    <div className="min-h-screen bg-background">
      <SearchPage />
    </div>
  );
}
