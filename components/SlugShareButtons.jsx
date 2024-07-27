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
      <div className="bg-cyan-200 bg-opacity-40 border py-5 px-2 flex flex-col md:flex-row items-center justify-between rounded-md my-2 font-roboto">
        <h1 className="font-semibold text-base text-gray-600 md:text-xl">
          Like what you see? Share with a Friend
        </h1>
        <div className="flex items-center  xsm:flex-wrap  xsm:gap-2 xsm:p-3 gap-4">
          <button
            onClick={handleSharing}
            className="bg-[#f3f6f9]  rounded-md flex items-center justify-center h-8 px-1 py-0  border-2 border-blue-300 focus:outline-none hover:bg-[#e4ebf2;] hover:shadow gap-1 hover:-translate-y-1 transition-transform duration-300"
            title="more">
            <Share size={20} /> share
          </button>
          <button
            onClick={handleCopying}
            title="copy link"
            className="bg-[#f3f6f9]  rounded-md flex items-center justify-center h-8  w-fit md:w-28 px-1 py-0  border-2 border-blue-300 focus:outline-none hover:bg-[#e4ebf2;] hover:shadow gap-1 hover:-translate-y-1 transition-transform duration-300">
            {copied ? (
              <>
                {" "}
                <svg
                  fill="none"
                  viewBox="0 0 15 15"
                  height="1em"
                  width="1em"
                  className="fill-green-400">
                  <path
                    fill="#4ade80"
                    fillRule="evenodd"
                    d="M0 7.5a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0zm7.072 3.21l4.318-5.398-.78-.624-3.682 4.601L4.32 7.116l-.64.768 3.392 2.827z"
                    clipRule="evenodd"
                  />
                </svg>
                copied!
              </>
            ) : (
              <>
                {" "}
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="24"
                  width="24">
                  <path d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 000 7.071 4.983 4.983 0 003.535 1.462A4.982 4.982 0 0012 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 01-4.243 0 3.005 3.005 0 010-4.243l2.122-2.121z" />
                  <path d="M12 4.929l-.707.707 1.414 1.414.707-.707a3.007 3.007 0 014.243 0 3.005 3.005 0 010 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 000-7.071 5.006 5.006 0 00-7.071 0z" />
                </svg>
                copy link
              </>
            )}
          </button>
          <button
            // modify the function to only print the blog
            onClick={handlePrint}
            className="bg-[#f3f6f9]  rounded-md flex items-center justify-center h-8 px-1 py-0  border-2 border-blue-300 focus:outline-none hover:bg-[#e4ebf2;] hover:shadow gap-1 hover:-translate-y-1 transition-transform duration-300"
            title="print">
            <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              height="20"
              width="20"
              strokeWidth="1">
              <path d="M820 436h-40c-4.4 0-8 3.6-8 8v40c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-40c0-4.4-3.6-8-8-8zm32-104H732V120c0-4.4-3.6-8-8-8H300c-4.4 0-8 3.6-8 8v212H172c-44.2 0-80 35.8-80 80v328c0 17.7 14.3 32 32 32h168v132c0 4.4 3.6 8 8 8h424c4.4 0 8-3.6 8-8V772h168c17.7 0 32-14.3 32-32V412c0-44.2-35.8-80-80-80zM360 180h304v152H360V180zm304 664H360V568h304v276zm200-140H732V500H292v204H160V412c0-6.6 5.4-12 12-12h680c6.6 0 12 5.4 12 12v292z" />
            </svg>
            print
          </button>
        </div>
      </div>
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
