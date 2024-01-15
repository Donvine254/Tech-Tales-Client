"use client";
import { getCurrentUser, deleteComment, patchComment } from "@/lib";
import { useState } from "react";
import { Edit, Trash } from "@/assets";
import { UserImage } from "./Avatar";
import toast from "react-hot-toast";
import Link from "next/link";

export default function Comments({ comments, setComments, blogId }) {
  const [newComment, setNewComment] = useState("");
  const [commentToEdit, setCommentToEdit] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const user = getCurrentUser();
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
        setComments((prev) => [...prev, data]);
      })
      .catch((error) => console.error("Error posting comment:", error));
    setIsInputFocused(false);
  }

  function editComment(comment) {
    setCommentToEdit(comment);
    setIsEditing(true);
    setIsInputFocused(true);
    setNewComment(comment.body);
    setComments((prev) =>
      prev.filter((prevComment) => prevComment.id !== comment.id)
    );
  }
  function handleUpdate(e) {
    e.preventDefault();
    patchComment(commentToEdit?.id, setComments, newComment);
    setNewComment("");
    setIsEditing(false);
  }

  function undoEditing() {
    setIsInputFocused(false);
    setComments((prev) => [...prev, commentToEdit]);
    setNewComment("");
    setIsEditing(false);
  }

  return (
    <section id="comments">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-bold text-xl md:text-2xl py-2 font-bold">
          Comments
        </h1>
        {!user && (
          <Link
            href={`/login?post_login_redirect_url=blogs/${blogId}`}
            className="py-0.5 px-2 border text-blue-500 cursor-pointer">
            Login to Comment ↗️
          </Link>
        )}
      </div>
      <p className="my-1">
        Before you comment please read our{" "}
        <Link
          href="/community"
          className="text-blue-500 p-1 border rounded-md whitespace-nowrap hover:underline py-1">
          community guidelines
        </Link>
      </p>
      <hr className="text-blue-500" />
      <form className="mt-4">
        <div className="flex gap-2 xsm:gap-1 items-center">
          <UserImage url={user?.picture} className="flex-initial" />
          <textarea
            placeholder="add to the discussion"
            value={newComment}
            spellCheck="true"
            rows={2}
            id="write-comment"
            disabled={inputDisabled}
            onClick={() => {
              if (!user) {
                toast.error("Login Required to join the discussion");
                setInputDisabled(true);
                setIsInputFocused(false);
              } else {
                setInputDisabled(false);
              }
            }}
            onFocus={() => setIsInputFocused(true)}
            onChange={(e) => setNewComment(e.target.value)}
            className="p-4 xsm:p-2 xsm:ml-2 flex-2 flex-grow bg-white border-2  focus:outline-none md:text-xl h-16 focus:h-20 rounded-lg text-black min-h-fit"
          />
        </div>
        <div className="flex items-center justify-end gap-2 md:gap-6 py-3">
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
                    onClick={undoEditing}
                    className="border-2  border-green-500 hover:border-red-500 px-2 p-2 rounded-md">
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
                    className="border-2  border-green-500 hover:border-red-500 px-2 p-2 rounded-md"
                    onClick={() => {
                      setNewComment("");
                      setIsInputFocused(false);
                      setIsEditing(false);
                    }}>
                    Cancel
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </form>
      <div>
        {comments?.length > 0 ? (
          comments?.map((comment) => (
            <div className="py-1 font-poppins " key={comment.id}>
              <div className="flex gap-4">
                <UserImage url={comment.user_avatar} />
                <div className="">
                  <p className="text-gray-600">
                    <span className="font-bold">{comment?.author} </span>&nbsp;{" "}
                    {comment?.created_at_date}
                  </p>
                  <div
                    className={`bg-blue-100 bg-opacity-50 border p-3 rounded-r-xl rounded-bl-xl`}>
                    <p className="text-gray-800">{comment?.body}</p>
                  </div>
                  <div className="py-1 flex items-center gap-4">
                    {comment?.user_id === user?.id ? (
                      <>
                        <button
                          className="flex items-center gap-2 text-sm  font-bold hover:text-white border px-1 py-0.5 rounded-md hover:bg-blue-500"
                          title="edit comment"
                          onClick={() => editComment(comment)}>
                          <Edit size={14} />
                          <span>Edit</span>
                        </button>

                        <button
                          className="flex items-center gap-2 text-sm  font-bold hover:text-white border px-1 py-0.5 rounded-md hover:bg-red-500"
                          title="delete comment"
                          onClick={() =>
                            deleteComment(comment.id, setComments)
                          }>
                          <Trash size={14} />
                          <span> Delete</span>
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="my-2 text-xl md:text-2xl text-gray-600 font-bold">
            Be the first to comment
          </p>
        )}
      </div>
    </section>
  );
}
