"use client";
import React, { useState, useEffect } from "react";
import { generateSummary } from "@/lib/generateSummary";
import toast from "react-hot-toast";
import parse from "html-react-parser";
import secureLocalStorage from "react-secure-storage";
import { Tooltip } from "react-tooltip";

export default function BlogSummary({ body, show, id }) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const requestData = {
    message:
      "generate a summary of this blog and return the key takeaways only as a unordered list element. Limit the key takeaways to a maximum of 5 points and keep them short as possible. In your response, do not say here are the key takeaways, just be direct and only provide the takeaways. return each point in <li><li/> tags",
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
    <div className={` ${show ? "" : "hidden"}`}>
      {summary ? (
        <div className="border bg-gray-50 rounded-md my-1 mt-2">
          <div className="p-2">
            <div className="flex items-center gap-1 font-bold text-xl ">
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                height="20"
                width="20">
                <path d="M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0z" />
              </svg>
              <div className="flex justify-between items-center flex-1">
                <h1>SUMMARY</h1>
                <button
                  className="bg-cyan-400 shadow h-6 w-6 flex items-center justify-center p-1  font-medium hover:bg-green-500 text-white rounded-full text-sm"
                  onClick={getBlogSummary}
                  data-tooltip-id="regenerate"
                  disabled={loading}>
                  <Tooltip
                    id="regenerate"
                    content="Regenerate blog summary"
                    variant="info"
                    style={{ padding: "2px" }}
                  />
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    height="24"
                    width="24"
                    className={`${loading ? "animate-spin" : ""}`}>
                    <path d="M23 4v6h-6M1 20v-6h6" />
                    <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
                  </svg>
                </button>
              </div>
            </div>
            <ul className="summary text-base xsm:text-[12px] font-extralight ">
              {parse(summary)}
            </ul>
          </div>
          <div className="w-full bg-green-50 text-green-600 rounded-b-md flex items-center gap-1 p-2 border-t border-green-600">
            <svg
              fill="currentColor"
              viewBox="0 0 16 16"
              height="1em"
              width="1em">
              <path d="M8 15A7 7 0 118 1a7 7 0 010 14zm0 1A8 8 0 108 0a8 8 0 000 16z" />
              <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
            <small className="flex-1 xsm:text-xs ">
              This summary is AI generated and we cannot guarantee it&apos;s
              accuracy. We encourage you to read the full blog post.
            </small>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dotted border-blue-500 bg-gray-200 rounded-md my-1 mt-2 ">
          {showButton && (
            <div className="mx-auto sm:w-1/2 md:w-1/3 p-4">
              <button
                className="py-1 w-full bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 shadow shadow-purple-400 text-white relative rounded-full hover:shadow-lg hover:shadow-purple-400 hover:-translate-y-1 transition-transform duration-300"
                onClick={getBlogSummary}
                disabled={loading}
                id="generate-summary">
                {loading ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin mr-2">✨</span> Generating...
                    <span className="animate-spin ml-2">✨</span>
                  </span>
                ) : (
                  <span>✨ Generate Summary ✨</span>
                )}
                <span className="text-white bg-green-400 text-xs px-2 rounded-sm absolute top-[-10px] right-2">
                  BETA
                </span>
                <Tooltip
                  id="generate-summary"
                  content="Generate blog summary using AI"
                  variant="info"
                  style={{ padding: "2px" }}
                />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
