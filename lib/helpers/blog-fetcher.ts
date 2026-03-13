"use server";
import prisma from "@/prisma/prisma";
import { BlogResponse, BlogWithUser } from "@/types";
import { baseUrl } from "../utils";

// return random featured blogs
export const getRandomBlogs = async () => {
  const blogs = await prisma.$queryRaw<BlogWithUser[]>`
  SELECT b.*, json_build_object('username', u.username, 'picture', u.picture) AS author
  FROM "Blog" b
  JOIN "User" u ON b."authorId" = u.id
  WHERE b.status = 'PUBLISHED'
  ORDER BY RANDOM()
  LIMIT 10;
`;
  return blogs;
};

export const fetchBlogs = async ({
  pageParam = 1,
}: {
  pageParam?: number;
}): Promise<BlogResponse> => {
  const res = await fetch(`${baseUrl}/api/v1/blogs?page=${pageParam}`);
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
};
