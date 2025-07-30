import React from "react";
import SearchPage from "./search-page";
import { BlogWithComments } from "@/types";
import { Metadata } from "next";
import { blogFetcher } from "@/lib/actions/fetcher";

export const metadata: Metadata = {
  title: "Search for stories and topics - Tech Tales",
};
export default async function page() {
  // TODO: optimize the blog search page to use meilisearch or other engines
  const getAllBlogs = blogFetcher("createdAt", "blogs", 100);
  const blogs = (await getAllBlogs()) as BlogWithComments[] | [];
  return (
    <div className="min-h-screen bg-background">
      <SearchPage blogs={blogs} />
    </div>
  );
}
