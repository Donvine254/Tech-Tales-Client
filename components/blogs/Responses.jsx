import { useState } from "react";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
export default function Response({ response, key, index, user }) {
  const [isExpanded, setIsExpanded] = useState([]);
  return (
    <div
      className={`flex items-start gap-4 text-sm xsm:text-xs my-1 p-2 xsm:p-2 xsm:gap-2 ${
        index === 0 ? "border-l-2  border-gray-400" : ""
      }`}
      key={key}>
      {/* User Picture */}
      {isExpanded ? (
        <>
          <div className="flex flex-col gap-2 items-center">
            <Image
              src={response.author.picture}
              alt={response.author.username}
              className="w-8 h-8 rounded-full ring-2 ring-offset-2 ring-pink-600 self-start response-avatar"
              height="32"
              width="32"
            />
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              height="1em"
              width="1em"
              onClick={() => setIsExpanded(false)}
              className="cursor-pointer  rounded-full">
              <title>Hide Reply</title>
              <path d="M12 19.24l-4.95-4.95-1.41 1.42L12 22.07l6.36-6.36-1.41-1.42L12 19.24zM5.64 8.29l1.41 1.42L12 4.76l4.95 4.95 1.41-1.42L12 1.93 5.64 8.29z" />
            </svg>
          </div>
          <div>
            <div className="flex flex-col bg-zinc-100 rounded-lg text-sm  border shadow p-3">
              <div className="flex items-center flex-wrap gap-x-2">
                <p className="font-semibold capitalize xsm:text-xs ">
                  {response.author.username}
                </p>
                <small className=" text-gray-700">
                  &#x2022; {formatDate(response.createdAt)}
                </small>
              </div>
              <div id="comment-body" className="mt-1">
                {response.body}
              </div>
            </div>
            <div
              id="response-actions"
              className="flex items-center gap-2 text-sm mt-1">
                {/* render the buttons based on the user role, we are getting the user as prop. We have 4 scenarios. The first scenario is where the logged in user is the author of the response, in this case we show the edit and delete buttons. The second scenario is where the logged in user is the author of the blog but not the author of the response. In this case we show the flag and hide buttons. The third scenario is when the logged in user is the author of the blog but also an admin, in which case we show the deleter, flag and hide buttons. The last scenario is where the logged in user is not the author of the response, not the author of the blog and not an admin. In this case we show report abuse button. Render the buttons dynamically instead of using endless if statements*/}
              <button>Edit</button>
              <button>Delete</button>
              <button>Report Abuse</button>
              <button>Flag</button>
              <button>Hide</button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="bg-slate-50 rounded-r-xl xsm:text-sm rounded-bl-xl text-sm  border shadow p-2 w-fit inline-flex gap-2 items-center">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              height="1em"
              width="1em"
              onClick={() => setIsExpanded(true)}
              className="cursor-pointer">
              <title>Show Reply</title>
              <path d="M12 7.59L7.05 2.64 5.64 4.05 12 10.41l6.36-6.36-1.41-1.41L12 7.59zM5.64 19.95l1.41 1.41L12 16.41l4.95 4.95 1.41-1.41L12 13.59l-6.36 6.36z" />
            </svg>
            <p>
              <span className="capitalize">{response.author.username}</span> + 1
              reply
            </p>
          </div>
        </>
      )}
    </div>
  );
}
