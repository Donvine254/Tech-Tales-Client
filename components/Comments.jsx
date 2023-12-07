"use client";
import { getCurrentUser, deleteComment, patchComment } from "@/lib";
import { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { GoTrash } from "react-icons/go";
import { BiLike, BiSolidLike, BiDislike, BiSolidDislike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import Avatar from "./Avatar";

export default function Comments({ blogId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState(0);

  const user = getCurrentUser();

  useEffect(() => {
    if (blogId) {
      const fetchComments = async () => {
        try {
          const url = `https://techtales.up.railway.app/comments/blogs/${blogId}`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          const comments = await response.json();
          setComments(
            comments.map((comment) => ({ ...comment, liked: false }))
          );
        } catch (error) {
          console.error(error);
        }
      };

      fetchComments();
    }
  }, [blogId]);

  async function handleSubmit(e) {
    e.preventDefault();
    const commentData = {
      user_id: user.id,
      blog_id: blogId,
      body: newComment,
    };
    const url = "https://techtales.up.railway.app/comments";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    })
      .then((response) => {
        if (!response.status === 201) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then((data) => {
        setNewComment("");
        setComments((prevComments) => [
          ...prevComments,
          { ...data, liked: false, disliked: false },
        ]);
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
  function handleLike(commentId) {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              liked: !comment.liked,
              disliked: false,
            }
          : comment
      )
    );
  }
  function handleDislike(commentId) {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              liked: false,
              disliked: !comment.disliked,
            }
          : comment
      )
    );
  }

  if (!blogId) {
    return <div>Loading comments...</div>;
  }
  return (
    <>
      <form className="mt-4">
        <div className="flex gap-2 xsm:gap-1 items-center">
          <Avatar name={user?.username} />
          <textarea
            placeholder="add to the discussion"
            value={newComment}
            id="write-comment"
            disabled={!user}
            onClick={() => setIsInputFocused(!isInputFocused)}
            onChange={(e) => setNewComment(e.target.value)}
            className="p-4 xsm:p-2 xsm:ml-2 w-[90%]  bg-white border-2  focus:outline-none md:text-xl h-16 focus:h-20 rounded-lg text-black"
          />
        </div>
        <div className="flex align-center gap-2 py-5 ml-14 xsm:ml-10 lg:gap-4">
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
                    className="bg-blue-500 text-white font-bold px-4 py-2 lg:mr-3 rounded-md hover:bg-blue-800"
                    onClick={handleSubmit}>
                    Respond
                  </button>
                  <button
                    type="button"
                    className="bg-transparent hover:bg-slate-300 border text-blue-500 border-blue-500 px-4 p-2 rounded-md"
                    onClick={() => setIsInputFocused(false)}>
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
            <div className="py-2 mt-2 font-poppins" key={comment?.id}>
              <div className="flex gap-4 xsm:gap-2 xsm:items-center">
                {comment.user_id === user?.id ? (
                  <Avatar name={user?.username} />
                ) : (
                  <Avatar name={comment?.author} />
                )}
                <div className="flex items-center xsm:flex-col gap-2 xsm:gap-0 xsm:items-start">
                  <p className="font-bold xsm:text-base text-xl">
                    {comment?.author}
                  </p>
                  <p className="font-bold xsm:text-base text-xl">
                    {comment?.created_at}
                  </p>
                </div>
              </div>
              <p className="text-base md:text-xl py-2 leading-normal ml-16 xsm:ml-10">
                {comment?.body}
              </p>

              <div className="py-2 flex items-center gap-4 ml-16 xsm:ml-10">
                {comment?.user_id === user?.id ? (
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
                    {comment.liked ? (
                      <BiSolidLike
                        className="text-xl font-bold text-blue-500"
                        onClick={() => handleLike(comment.id)}
                      />
                    ) : (
                      <BiLike
                        className="text-xl font-bold hover:text-blue-500 "
                        onClick={() => handleLike(comment.id)}
                      />
                    )}

                    {!comment?.disliked ? (
                      <BiDislike
                        className="text-xl font-bold hover:text-blue-500 mx-2"
                        onClick={() => handleDislike(comment.id)}
                      />
                    ) : (
                      <BiSolidDislike
                        className="text-xl font-bold text-blue-500 mx-2"
                        onClick={() => handleDislike(comment.id)}
                      />
                    )}
                    <div className="flex items-center gap-0">
                      <FaRegComment className="text-xl font-bold mx-2 cursor-pointer hover:scale-125" />
                      reply
                    </div>
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
