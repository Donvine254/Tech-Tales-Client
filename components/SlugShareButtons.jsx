"use client";
import React, { useState, useRef } from "react";
import { baseUrl } from "@/lib";
import toast from "react-hot-toast";
import { Share } from "@/assets";
import { formatDate } from "@/lib/utils";
import parse from "html-react-parser";

export default function SlugShareButtons({
  slug,
  title,
  body,
  author,
  createdAt,
}) {
  const [copied, setCopied] = useState(false);
  const printRef = useRef(null);
  //function to open native share modal
  async function handleSharing() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${title}`,
          text: "See this interesting blog i found on Techtales!",
          url: `${baseUrl}/blogs/${slug}`,
        });
      } catch (error) {
        toast.error("Something went wrong");
        console.error("Error sharing content:", error);
      }
    } else {
      toast.error("Web Share API not supported in this browser.");
    }
  }
  //function to copy blog link
  async function handleCopying() {
    setCopied(true);
    try {
      navigator.clipboard.writeText(
        `https://techtales.vercel.app/blogs/${slug}`
      );
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch (err) {
      console.error("Copy to clipboard failed:", err);
      setCopied(false);
      toast.error("Failed to copy link to clipboard");
    }
  }
  //function to print blog
  const handlePrint = async () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  return (
    <section>
     
      <div ref={printRef} style={{ display: "none" }}>
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="italic">
          By {author} published on {formatDate(createdAt)}
        </p>
        <div className="blog-body">{parse(body)}</div>
      </div>
    </section>
  );
}
