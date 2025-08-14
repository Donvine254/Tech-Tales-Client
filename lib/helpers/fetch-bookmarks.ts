import { BlogWithComments } from "@/types";
import { getBlogsByIds } from "../actions/library";

export const fetchBookmarks = async (): Promise<BlogWithComments[]> => {
  const cachedBookmarks = localStorage.getItem("bookmarked_blogs");
  if (!cachedBookmarks) return [];

  const bookmarkedBlogs = JSON.parse(cachedBookmarks) || {};
  const bookmarkedBlogIds = Object.keys(bookmarkedBlogs)
    .filter((id) => bookmarkedBlogs[id])
    .map((id) => Number(id));

  if (bookmarkedBlogIds.length === 0) return [];

  return await getBlogsByIds(bookmarkedBlogIds) as BlogWithComments[];
};