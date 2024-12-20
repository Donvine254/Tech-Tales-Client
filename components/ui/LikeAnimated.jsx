"use client";
import React, { useState, useEffect } from "react";
import { useUserContext } from "@/providers";
import toast from "react-hot-toast";
import { handleBlogLiking, CheckFavoriteStatus } from "@/lib/actions";
import Swal from "sweetalert2";
import { usePathname, useRouter } from "next/navigation";
import { Tooltip } from "react-tooltip";
export default function AnimatedLikeBtn({ blogId, setLikes, likes }) {
  const [liked, setLiked] = useState();
  const user = useUserContext();
  const router = useRouter();
  const pathname = usePathname().replace(/^\/+/, "");

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
      Swal.fire({
        icon: "warning",
        title: "Login To Continue",
        text: "Kindly login to favorite this blog",
        showCancelButton: true,
        showCloseButton: true,
        footer:
          "By continuing you agree with our <b><a href='/terms' style='text-decoration-line:underline; color: blue'>terms and conditions</a></b>.",
        confirmButtonText: "Login",
        customClass: {
          confirmButton:
            "px-2 py-1 mx-2 bg-green-500 text-white rounded-md hover:text-white hover:bg-green-600",
          cancelButton: "px-2 py-1 mx-2 bg-red-500 rounded-md text-white",
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push(`/login?post_login_redirect_url=${pathname}`);
        }
      });
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

  //function to play audio
  function playSoundEffect() {
    let sound = new Audio();
    sound.src =
      "https://utfs.io/f/d74018ac-813d-452c-9414-4aa1ee4fb595-ry5vyc.mp3";
    sound.play();
  }
  return (
    <div className="placement">
      <div
        style={{ backgroundPosition: liked ? "right" : "left" }}
        className="heart hover:-translate-y-1 transition-transform duration-300 hover:text-red-500"
        onClick={handleLikeClick}
        onMouseDown={playSoundEffect}
        data-tooltip-id="favorite">
        <span className="text-base font-bold content whitespace-nowrap">
          {likes} <span className="xsm:hidden">Likes</span>
        </span>
      </div>
      <Tooltip
        id="favorite"
        content={
          liked
            ? "Remove this blog from favorites"
            : "Add this blog to favorites"
        }
        variant="info"
        style={{ padding: "2px", fontSize: "12px" }}
      />
    </div>
  );
}
