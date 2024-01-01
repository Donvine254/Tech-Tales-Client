"use client";
import { getCurrentUser, deleteComment, patchComment } from "@/lib";
import { useState } from "react";
import { Edit, Trash } from "@/assets";
import { UserImage } from "./Avatar";

export default function Comments({ comments, setComments, blogId }) {
  const [newComment, setNewComment] = useState("");
  const [commentToEdit, setCommentToEdit] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
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
  }

  function editComment(comment) {
    setCommentToEdit(comment);
    setIsEditing(true);
    setIsInputFocused(true);
    setNewComment(comment.body);
    setComments((prev) =>
      prev.filter((prevcomment) => prevcomment.id !== comment.id)
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
    <section>
      <form className="mt-4">
        <div className="flex gap-2 xsm:gap-1 items-center">
          <UserImage url={user?.picture} />
          <textarea
            placeholder="add to the discussion"
            value={newComment}
            rows={2}
            id="write-comment"
            disabled={!user}
            onFocus={() => setIsInputFocused(!isInputFocused)}
            onBlur={() => setIsInputFocused(false)}
            onChange={(e) => setNewComment(e.target.value)}
            className="p-4 xsm:p-2 xsm:ml-2 w-[90%]  bg-white border-2  focus:outline-none md:text-xl h-16 focus:h-20 rounded-lg text-black min-h-fit"
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
                    onClick={undoEditing}
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
        {comments?.length > 0 ? (
          comments?.map((comment) => (
            <div className="py-1 font-poppins" key={comment?.id}>
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
              <p className="text-base md:text-xl py-1 leading-normal ml-16 xsm:ml-12 sm:ml-14 md:ml-16">
                {comment?.body}
              </p>

              <div className="py-2 flex items-center gap-4 ml-16 xsm:ml-10">
                {comment?.user_id === user?.id ? (
                  <>
                    <button
                      className="flex items center gap-2 text-sm md:text-xl font-bold hover:text-blue-500"
                      onClick={() => editComment(comment)}>
                      <Edit />
                      <span>Edit</span>
                    </button>

                    <button
                      className="flex items center gap-2 text-sm md:text-xl font-bold hover:text-red-500"
                      onClick={() => deleteComment(comment.id, setComments)}>
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
