"use client";
import { getCurrentUser, deleteComment, patchComment } from "@/lib";
import { useState } from "react";
import { Edit, Trash } from "@/assets";
import { UserImage } from "./Avatar";

export default function Comments({ comments, setBlog, blogId }) {
  const [newComment, setNewComment] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState(0);

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
        setBlog((prev) => ({ ...prev, comments: [...prev.comments, data] }));
      })
      .catch((error) => console.error("Error posting comment:", error));
  }

  function editComment(commentId, commentBody) {
    setIsEditing(true);
    setNewComment(commentBody);
    setId(commentId);
    setBlog((prev) => ({
      ...prev,
      comments: prev.comments.filter((comment) => comment.id !== commentId),
    }));
  }
  function handleUpdate(e) {
    e.preventDefault();
    patchComment(id, setBlog, newComment);
    setNewComment("");
    setIsEditing(false);
  }

  if (!comments) {
    return (
      <div className="flex items-center gap-2 py-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 4335 4335"
          width="30"
          className="animate-spin mr-3"
          height="30">
          <path
            fill="#008DD2"
            d="M3346 1077c41,0 75,34 75,75 0,41 -34,75 -75,75 -41,0 -75,-34 -75,-75 0,-41 34,-75 75,-75zm-1198 -824c193,0 349,156 349,349 0,193 -156,349 -349,349 -193,0 -349,-156 -349,-349 0,-193 156,-349 349,-349zm-1116 546c151,0 274,123 274,274 0,151 -123,274 -274,274 -151,0 -274,-123 -274,-274 0,-151 123,-274 274,-274zm-500 1189c134,0 243,109 243,243 0,134 -109,243 -243,243 -134,0 -243,-109 -243,-243 0,-134 109,-243 243,-243zm500 1223c121,0 218,98 218,218 0,121 -98,218 -218,218 -121,0 -218,-98 -218,-218 0,-121 98,-218 218,-218zm1116 434c110,0 200,89 200,200 0,110 -89,200 -200,200 -110,0 -200,-89 -200,-200 0,-110 89,-200 200,-200zm1145 -434c81,0 147,66 147,147 0,81 -66,147 -147,147 -81,0 -147,-66 -147,-147 0,-81 66,-147 147,-147zm459 -1098c65,0 119,53 119,119 0,65 -53,119 -119,119 -65,0 -119,-53 -119,-119 0,-65 53,-119 119,-119z"
          />
        </svg>
        <p className="text-2xl"> Loading Comments...</p>
      </div>
    );
  }
  return (
    <section>
      <form className="mt-4">
        <div className="flex gap-2 xsm:gap-1 items-center">
          <UserImage url={user?.picture} />
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
        <div className="flex align-center gap-2 py-3 ml-14 xsm:ml-10 lg:gap-4">
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
            <div className="py-2 font-poppins" key={comment?.id}>
              <div className="flex gap-4 xsm:gap-2 xsm:items-center">
                <UserImage url={comment.user_avatar} />
                <div className="flex items-center xsm:flex-col gap-2 xsm:gap-0 xsm:items-start">
                  <p className="font-bold xsm:text-base text-xl">
                    {comment?.author}
                  </p>
                  <p className="font-bold xsm:text-base text-xl">
                    {comment?.created_at_date}
                  </p>
                </div>
              </div>
              <p className="text-base md:text-xl py-2 leading-normal ml-16 xsm:ml-12 sm:ml-14 md:ml-16">
                {comment?.body}
              </p>

              <div className="py-2 flex items-center gap-4 ml-16 xsm:ml-10">
                {comment?.user_id === user?.id ? (
                  <>
                    <button
                      className="flex items center gap-2 text-sm md:text-xl font-bold hover:text-blue-500"
                      onClick={() => editComment(comment.id, comment.body)}>
                      <Edit />
                      <span>Edit</span>
                    </button>

                    <button
                      className="flex items center gap-2 text-sm md:text-xl font-bold hover:text-red-500"
                      onClick={() => deleteComment(comment.id, setBlog)}>
                      <Trash />
                      <span> Delete</span>
                    </button>
                  </>
                ) : null}
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
