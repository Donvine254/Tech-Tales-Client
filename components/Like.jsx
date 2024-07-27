"use client";
import React, { useState } from "react";
import { useUserContext } from "@/providers";
import { handleBlogLiking } from "@/lib/actions";
import { Like } from "@/assets";
export default function LikeButton({ blogId, setLikes }) {
  const [liked, setLiked] = useState(false);
  const user = useUserContext();

  async function handleLikeClick() {
    if (!user) {
      toast.error("Kindly login to like this blog!");
      return false;
    }
    const newLikedState = !liked;
    setLiked(newLikedState);

    try {
      if (newLikedState) {
        setLikes((prev) => prev + 1);
        const result = await handleBlogLiking(blogId, "LIKE");
      } else {
        setLikes((prev) => prev - 1);
        const result = await handleBlogLiking(blogId, "DISLIKE");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      // Revert the state in case of an error
      setLiked(!newLikedState);
      setLikes((prev) => (newLikedState ? prev - 1 : prev + 1));
    }
  }
  return (
    <>
      {" "}
      {!liked ? (
        <Like
          handleClick={handleLikeClick}
          className="cursor-pointer font-bold"
        />
      ) : (
        <Like
          handleClick={handleLikeClick}
          className="text-red-500 cursor-pointer fill-red-500 font-bold"
        />
      )}
    </>
  );
}
