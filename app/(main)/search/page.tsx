import React from "react";
import SearchPage from "./search-page";
import { getAllBlogs } from "@/lib/actions/blogs";
import { BlogWithComments } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search for stories and topics - Tech Tales",
};
export default async function page() {
  const blogs = (await getAllBlogs()) as BlogWithComments[] | [];
  return (
    <div className="min-h-screen bg-background">
      <SearchPage blogs={blogs} />
    </div>
  );
}
