"use client";
import React, { useState } from "react";
import { useUserContext } from "@/providers";
import { handleBlogLiking } from "@/lib/actions";
import { Like } from "@/assets";
import toast from "react-hot-toast";
export default function LikeButton({ blogId, setLikes }) {
  const [liked, setLiked] = useState(false);
  const [animate, setAnimate] = useState(false);
  const user = useUserContext();

  async function handleLikeClick() {
    if (!user) {
      toast.error("Kindly login to like this blog!");
      return false;
    }
    const newLikedState = !liked;
    setLiked(newLikedState);
    setAnimate(true);

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
    } finally {
      setTimeout(() => setAnimate(false), 2000);
    }
  }
  return (
    <>
      {" "}
      {!liked ? (
        <Like
          handleClick={handleLikeClick}
          title="like blog"
          className={`cursor-pointer hover:scale-105 font-bold ${
            animate ? "heartbeat" : ""
          }`}
        />
      ) : (
        <Like
          handleClick={handleLikeClick}
          title="unlike blog"
          className={`cursor-pointer  fill-red-500 stroke-none ${
            animate ? "heartbeat" : ""
          }`}
        />
      )}
    </>
  );
}
