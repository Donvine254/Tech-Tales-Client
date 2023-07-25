"use client";
import { getCurrentUser, postComment } from "@/lib";
import { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { GoTrash } from "react-icons/go";
import { BiLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import Image from "next/image";
import Axios from "axios";

const user = getCurrentUser();

export default function Comments(blogId = 9) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const commentData = {
    user_id: user.id,
    blog_id: blogId,
    body: newComment,
  };

  const url = `http://localhost:9292/comments/blogs/${blogId}`;
  useEffect(() => {
    Axios.get(url)
      .then((response) => setComments(response.data))
      .catch((error) => console.error(error));
  }, [blogId]);

  function handleSubmit(e) {
    postComment(e, commentData, setComments);
  }

  return (
    <>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="flex gap-1 xsm:gap-0">
          <Image
            src="https://d2win24dv6pngl.cloudfront.net/media/generated/profile-photos/profile-1298663/60cc7564d4a37d90.af828114ed82.jpg"
            className="avatar xsm:mr-0 xsm:p-0"
            width={32}
            height={32}
            alt="user-avatar"
          />
          <textarea
            placeholder="add to the discussion"
            value={newComment}
            onClick={() => setIsInputFocused(!isInputFocused)}
            onChange={(e) => setNewComment(e.target.value)}
            className="p-4 xsm:p-2 xsm:ml-2 w-full border-none shadow-lg bg-gray-200  focus:outline-none md:text-xl h-16 focus:h-20 rounded-lg text-black"
          />
        </div>
        <div className="flex align-center gap-2 py-5 ml-16 xsm:ml-10 lg:gap-4">
          {isInputFocused && (
            <>
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold px-4 py-2 lg:mr-4 rounded-md hover:bg-blue-800">
                Respond
              </button>
              <button
                type="button"
                className="bg-transparent hover:bg-slate-300 border text-blue-500 border-blue-500 px-2 p-2 rounded-md">
                Cancel
              </button>
            </>
          )}
        </div>
      </form>
      <div>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div className="py-2 mt-2" key={comment.id}>
              <div className="flex gap-0 items-center">
                <Image
                  src="https://d2win24dv6pngl.cloudfront.net/media/generated/profile-photos/profile-1298663/60cc7564d4a37d90.af828114ed82.jpg"
                  className="avatar"
                  width={32}
                  height={32}
                  alt="user-avatar"
                />
                <p className="font-bold xsm:text-base text-xl">
                  {comment.username}
                </p>
              </div>
              <p className="text-base py-2 leading-normal ml-16 xsm:ml-10">
                {comment.body}
              </p>
              <div className="py-2 flex items-center gap-4 ml-16 xsm:ml-10">
                {comment.user_id === user.id ? (
                  <>
                    {" "}
                    <p className="flex items center gap-2">
                      {" "}
                      <MdEdit className="text-xl font-bold hover:text-blue-500" />
                      Edit
                    </p>
                    <p className="flex items center gap-2">
                      <GoTrash className="text-xl font-bold hover:text-red-500" />
                      Delete
                    </p>{" "}
                  </>
                ) : (
                  <>
                    <BiLike className="text-xl font-bold hover:text-blue-500" />
                    <FcLike className="text-xl font-bold hover:text-red-700" />
                    <FaRegComment className="text-xl font-bold" />
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No comments found.</p>
        )}
      </div>
    </>
  );
}
