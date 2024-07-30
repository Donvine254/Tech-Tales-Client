"use client";
import React, { useState, useEffect } from "react";
import { generateSummary } from "@/lib/generateSummary";
import toast from "react-hot-toast";
import parse from "html-react-parser";
import secureLocalStorage from "react-secure-storage";

export default function BlogSummary({ body, show, id }) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const requestData = {
    message:
      "generate a summary of this blog and return the key takeaways only as a unordered list element. Limit the key takeaways to a maximum of 10 points and keep them short as possible. In your response, do not say here are the key takeaways, just be direct and only provide the takeaways. return each point in <li><li/> tags",
    body: body,
  };
  //fetch the summary from local storage if it exists
  useEffect(() => {
    const cachedData = secureLocalStorage.getItem(`blog_${id}_summary`);
    if (cachedData) {
      const data = JSON.parse(cachedData);
      setSummary(data);
      setShowButton(false);
    }
  }, [id]);

  async function getBlogSummary() {
    setLoading(!loading);
    try {
      const data = await generateSummary(requestData);
      setSummary(data.message);
      setLoading(false);
      secureLocalStorage.setItem(
        `blog_${id}_summary`,
        JSON.stringify(data.message)
      );
      setTimeout(() => {
        setShowButton(false);
      }, 1000);
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Something went wrong when generating summary");
    }
  }
  return (
    <div
      className={`border-2 border-dotted  border-blue-500 bg-gray-200 rounded-md my-1 mt-2 ${
        show ? "" : "hidden"
      }`}>
      {showButton && (
        <div className="mx-auto sm:w-1/2 md:w-1/3 p-4">
          <button
            className="py-1 w-full bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 shadow shadow-purple-400 text-white relative rounded-full hover:shadow-lg hover:shadow-purple-400 hover:-translate-y-1 transition-transform duration-300"
            onClick={getBlogSummary}>
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin mr-2">✨</span> Generating...
                <span className="animate-spin ml-2">✨</span>
              </span>
            ) : (
              <span>✨ Generate Summary ✨</span>
            )}
            <span className="text-white bg-green-400 text-sm px-2 rounded-md absolute top-[-10px] right-2">
              New
            </span>
          </button>
        </div>
      )}

      {summary && (
        <>
          <div className="p-2">
            <h1 className="font-bold text-base md:text-xl underline">
              Key Takeaways:
            </h1>
            <ul className="list-disc pl-4 text-base xsm:text-sm">
              {parse(summary)}
            </ul>
          </div>
          <div className="w-full bg-cyan-50 text-cyan-500 rounded-b-md flex items-center gap-1 p-2 border-t border-cyan-600">
            <svg
              fill="currentColor"
              viewBox="0 0 16 16"
              height="1em"
              width="1em">
              <path d="M8 15A7 7 0 118 1a7 7 0 010 14zm0 1A8 8 0 108 0a8 8 0 000 16z" />
              <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
            <small className=" flex-1">
              This summary is AI generated and we cannot guarantee it&apos;s
              accuracy. We encourage you to read the full blog post.
            </small>
          </div>
        </>
      )}
    </div>
  );
}
