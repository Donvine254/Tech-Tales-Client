"use client";
import React, { useState } from "react";
import { generateSummary } from "@/lib/generateSummary";
import toast from "react-hot-toast";
import parse from "html-react-parser";
export default function BlogSummary({ body, show }) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const requestData = {
    message:
      "generate a summary of this blog and return the key takeaways only as a unordered list element. Limit the key takeaways to a maximum of 10 points and keep them short as possible. In your response, do not say here are the key takeaways, just be direct and only provide the takeaways. return each point in <li><li/> tags",
    body: body,
  };

  async function getBlogSummary() {
    setLoading(!loading);
    try {
      const data = await generateSummary(requestData);
      setSummary(data.message);
      setLoading(false);
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
      className={`border-2 border-dotted p-2 border-blue-500 bg-zinc-200 my-1 mt-2 ${
        show ? "" : "hidden"
      }`}>
      <div className="my-2 mt-4 mx-auto sm:w-1/2 md:w-1/3 ">
        {showButton && (
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
        )}
      </div>
      {summary && (
        <>
          <h1 className="font-bold text-base md:text-xl">Key Takeaways:</h1>
          <ul className="list-disc pl-4 text-base xsm:text-sm">
            {parse(summary)}
          </ul>
        </>
      )}
    </div>
  );
}
