"use client";
import { getCurrentUser, deleteComment, patchComment } from "@/lib";
import { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { GoTrash } from "react-icons/go";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { BsHeart } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import Image from "next/image";

const user = getCurrentUser();

export default function Comments({ blogId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState(0);
  const [liked, setLiked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (blogId) {
      const fetchComments = async () => {
        try {
          const url = `http://localhost:9292/comments/blogs/${blogId}`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          const data = await response.json();
          setComments(data.comments);
        } catch (error) {
          console.error(error);
        }
      };

      fetchComments();
    }
  }, [blogId]);

  function handleSubmit(e) {
    e.preventDefault();
    const commentData = {
      user_id: user.id,
      blog_id: blogId,
      body: newComment,
    };
    const url = "http://localhost:9292/comments";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then((data) => {
        setNewComment("");
        setComments((prevComments) => [...prevComments, data.comment]);
      })
      .catch((error) => console.error("Error posting comment:", error));
  }

  function editComment(commentId, commentBody) {
    setIsEditing(true);
    setNewComment(commentBody);
    setId(commentId);
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
  }
  function handleUpdate(e) {
    e.preventDefault();
    patchComment(id, setComments, newComment);
    setNewComment("");
    setIsEditing(false);
  }

  if (!blogId) {
    return <div>Loading comments...</div>;
  }
  return (
    <>
      <form className="mt-4">
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
              {isEditing ? (
                <>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white font-bold px-4 py-2 lg:mr-4 rounded-md hover:bg-blue-800"
                    onClick={handleUpdate}>
                    Update
                  </button>
                  <button
                    type="button"
                    className="bg-transparent hover:bg-slate-300 border text-blue-500 border-blue-500 px-2 p-2 rounded-md">
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white font-bold px-4 py-2 lg:mr-4 rounded-md hover:bg-blue-800"
                    onClick={handleSubmit}>
                    Respond
                  </button>
                  <button
                    type="button"
                    className="bg-transparent hover:bg-slate-300 border text-blue-500 border-blue-500 px-2 p-2 rounded-md">
                    Cancel
                  </button>
                </>
              )}
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
                  src={
                    comment.user_id === user.id
                      ? "https://d2win24dv6pngl.cloudfront.net/media/generated/profile-photos/profile-1298663/60cc7564d4a37d90.af828114ed82.jpg"
                      : "https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA="
                  }
                  width={32}
                  height={32}
                  className="avatar"
                  alt="user-avatar"
                />
                <div className="flex items-center xsm:flex-col gap-2 xsm:gap-0 xsm:items-start">
                  <p className="font-bold xsm:text-base text-xl">
                    {comment.username}
                  </p>
                  <p className="font-bold xsm:text-base text-xl">
                    {comment.created_at
                      ? comment.created_at.split("T")[0]
                      : comment.created_at}
                  </p>
                </div>
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
                      <MdEdit
                        className="text-xl font-bold hover:text-blue-500"
                        onClick={() => editComment(comment.id, comment.body)}
                      />
                      Edit
                    </p>
                    <p className="flex items center gap-2">
                      <GoTrash
                        className="text-xl font-bold hover:text-red-500"
                        onClick={() => deleteComment(comment.id, setComments)}
                      />
                      Delete
                    </p>{" "}
                  </>
                ) : (
                  <>
                    {isLiked ? (
                      <BiSolidLike
                        className="text-xl font-bold text-blue-500"
                        onClick={() => setIsLiked(false)}
                      />
                    ) : (
                      <BiLike
                        className="text-xl font-bold hover:text-blue-500 "
                        onClick={() => setIsLiked(true)}
                      />
                    )}

                    {liked ? (
                      <FcLike
                        className="text-xl font-bold mx-2"
                        onClick={() => setLiked(false)}
                      />
                    ) : (
                      <BsHeart
                        className="text-xl font-bold  hover:text-red-700 mx-2"
                        onClick={() => setLiked(true)}
                      />
                    )}
                    <FaRegComment className="text-xl font-bold mx-2" />
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
