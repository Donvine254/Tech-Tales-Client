import React from "react";
import SearchPage from "./search-page";
import { getAllBlogs } from "@/lib/actions/blogs";
import { BlogWithComments } from "@/types";

export default async function page() {
  const blogs = (await getAllBlogs()) as BlogWithComments[] | [];
  return (
    <div className="min-h-screen bg-background">
      <SearchPage blogs={blogs} />
    </div>
  );
}
