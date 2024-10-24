"use client";
import React from "react";
import ShareModal from "../alerts/ShareModal";
import { Tooltip } from "react-tooltip";
export default function ShareButton({
  size = 24,
  className,
  slug,
  title,
  variant,
}) {
  const showShareModal = () => {
    const shareModal = document.getElementById("shareModal");
    if (shareModal) {
      shareModal.showModal();
    }
  };
  return (
    <div
      className={
        variant === "button"
          ? "bg-[#f3f6f9]  rounded-md flex items-center justify-center h-8 px-1 py-0  border-2 border-blue-300 focus:outline-none hover:bg-[#e4ebf2;] hover:shadow gap-1 hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
          : "w-6 h-6 rounded-full  p-1 flex items-center outline-none"
      }
      onClick={() => {
        if (variant === "button") showShareModal();
      }}>
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        height={size}
        width={size}
        data-tooltip-id="share-blog"
        onClick={showShareModal}
        className={`cursor-pointer hover:fill-blue-500 ${className}`}>
        <title>share this blog</title>
        <path d="M5.5 15a3.51 3.51 0 002.36-.93l6.26 3.58a3.06 3.06 0 00-.12.85 3.53 3.53 0 101.14-2.57l-6.26-3.58a2.74 2.74 0 00.12-.76l6.15-3.52A3.49 3.49 0 1014 5.5a3.35 3.35 0 00.12.85L8.43 9.6A3.5 3.5 0 105.5 15zm12 2a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm0-13A1.5 1.5 0 1116 5.5 1.5 1.5 0 0117.5 4zm-12 6A1.5 1.5 0 114 11.5 1.5 1.5 0 015.5 10z" />
      </svg>
      {variant === "button" && <p>Share</p>}
      <Tooltip
        id="share-blog"
        content="Share this blog with others"
        variant="info"
        style={{ padding: "2px", fontSize: "12px" }}
      />
      <ShareModal slug={slug} title={title} />
    </div>
  );
}
