import React from "react";
import SearchPage from "./search-page";
import { Metadata } from "next";

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
