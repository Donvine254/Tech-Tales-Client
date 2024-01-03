import React from "react";
import MyBlogsComponent from "../../my-blogs/blogs";
export const metadata = {
  title: "Explore Author Blogs - Tech Tales",
  description:
    "Tech Tales is a simple school blog for software developers students and senior developers who would like to share their solutions to various coding problems or practice blogging as a way of learning",
};
export default function page({ params }) {
  return (
    <section>
      <MyBlogsComponent id={params.userId} />
    </section>
  );
}
