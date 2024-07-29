"use client";
import React, { useState, useEffect } from "react";
import { useUserContext } from "@/providers";
import toast from "react-hot-toast";
import { handleBlogLiking, CheckFavoriteStatus } from "@/lib/actions";
export default function AnimatedLikeBtn({ blogId, setLikes, likes }) {
  const [liked, setLiked] = useState();
  const user = useUserContext();

  useEffect(() => {
    if (user) {
      const fetchFavoriteStatus = async () => {
        try {
          const isFavorited = await CheckFavoriteStatus(user.id, blogId);
          setLiked(isFavorited);
        } catch (error) {
          console.error("Error fetching favorite status:", error);
        }
      };
      fetchFavoriteStatus();
    }
  }, [user, blogId]);

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
        const result = await handleBlogLiking(blogId, user.id, "LIKE");
        toast.success("Blog added to favorites");
      } else {
        setLikes((prev) => prev - 1);
        const result = await handleBlogLiking(blogId, user.id, "DISLIKE");
        toast.success("Blog removed from favorites");
      }
    } catch (error) {
      console.error(error);
      toast.error("You have already favorited this blog");
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
        title="favorite this blog">
        <span className="text-base font-bold content whitespace-nowrap">
          {likes} <span className="xsm:hidden">Likes</span>
        </span>
      </div>
    </div>
  );
}
