"use client";
import React, { useState } from "react";
import { useUserContext } from "@/providers";
import toast from "react-hot-toast";
import { handleBlogLiking } from "@/lib/actions";
export default function AnimatedLikeBtn({ blogId, setLikes, likes }) {
  const [liked, setLiked] = useState();
  const user = useUserContext();

  const toggleClass = () => {
    const btn = document.querySelector(".heart");
    if (btn) {
      btn.classList.toggle("is_animating");
    }
  };
  async function handleLikeClick() {
    if (!user) {
      toast.error("Kindly login to like this blog!");
      return false;
    }
    const newLikedState = !liked;
    setLiked(newLikedState);
    toggleClass();

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
      setTimeout(() => toggleClass(), 2000);
    }
  }

  return (
    <div className="placement">
      <div
        style={{ backgroundPosition: liked ? "right" : "left" }}
        className="heart"
        onClick={handleLikeClick}
        title="Like this blog">
        <span className="text-base font-bold content whitespace-nowrap">
          {likes} <span className="xsm:hidden">Likes</span>
        </span>
      </div>
    </div>
  );
}
