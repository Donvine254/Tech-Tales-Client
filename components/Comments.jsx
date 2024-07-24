"use client";

import { baseUrl, deleteComment, patchComment } from "@/lib";
import { useState } from "react";
import Axios from "axios";
import Loader from "./Loader";
import { Edit, Trash } from "@/assets";
import { UserImage } from "./Avatar";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { formatDate } from "@/lib/utils";
import { getCurrentUser } from "@/lib";
import toast from "react-hot-toast";
import parse from "html-react-parser";
const user = getCurrentUser();

const DynamicEditor = dynamic(() => import("@/components/CommentEditor"), {
  loading: () => <Loader size={60} />,
});

export default function Comments({
  blogId,
  slug,
  comments,
  setComments,
  blogAuthorId,
}) {
  const [newComment, setNewComment] = useState("");
  const [commentToEdit, setCommentToEdit] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (newComment.length <= 10) {
      toast.error("Kindly write something");
      return false;
    }
    const commentData = {
      user_id: user.id,
      blog_id: blogId,
      body: newComment,
    };
    try {
      const res = await Axios.post(`${baseUrl}/comments`, commentData);
      const data = await res.data;
      setNewComment("");
      setComments((prev) => [...prev, data]);
      toast.success("Comment posted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.errors);
    } finally {
      setIsInputFocused(false);
    }
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
  const getPlainTextLength = (htmlString) => {
    if (typeof window !== "undefined") {
      const doc = new DOMParser().parseFromString(htmlString, "text/html");
      return doc.body.textContent.length;
    } else {
      return 0;
    }
  };

  return (
    <div className="">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-bold text-xl md:text-2xl py-2 font-bold">
          Comments
        </h1>
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
      {user ? (
        <form className="mt-4" id="write-comment">
          <div className="flex gap-2 xsm:gap-1.5">
            <UserImage
              url={user?.picture}
              className="flex-initial ring-2 ring-offset-2 mt-5  ring-blue-600 italic "
            />
            <DynamicEditor
              data={newComment}
              handleChange={setNewComment}
              handleFocus={() => setIsInputFocused(true)}
            />
          </div>
          <div className="flex items-center justify-end gap-2 md:gap-4 py-1 px-4">
            {isInputFocused && (
              <>
                {isEditing ? (
                  <>
                    <button
                      type="submit"
                      disabled={!commentToEdit}
                      className="bg-blue-500 border-2 border-blue-500 text-white  px-6 py-0.5 lg:mr-4 rounded-md hover:bg-blue-600  disabled:bg-gray-100 disabled:border-gray-600 disabled:text-gray-600"
                      onClick={handleUpdate}>
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={undoEditing}
                      className="border-2  border-green-500 hover:border-red-500 px-6 py-0.5 rounded-md">
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white border-2 border-blue-500 px-6 py-0.5 lg:mr-3 rounded-md hover:bg-blue-600 disabled:bg-gray-100 disabled:border-gray-600 disabled:text-gray-600 disabled:pointer-events-none"
                      onClick={handleSubmit}>
                      Respond
                    </button>
                    <button
                      type="button"
                      className="border-2  border-green-500 hover:border-red-500 px-6 py-0.5 rounded-md"
                      onClick={() => {
                        setIsInputFocused(false);
                        setNewComment("");
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
      ) : (
        <div className="flex flex-col items-center justify-center  gap-2 xsm:gap-1 border rounded-md h-fit min-h-10 px-2 py-4 my-2 bg-blue-100 bg-opacity-50 ">
          <h1 className="font-semibold md:text-xl ">
            Please Login or Register to comment
          </h1>
          <div className="flex justify-center xsm:flex-col xsm:items-start items-center gap-6 xsm:gap-2 w-full">
            <Link
              href={`/login?post_login_redirect_url=blogs/${slug}#write-comment`}
              scroll
              className="px-6 py-1 rounded-md border bg-gray-300 hover:bg-black hover:text-white xsm:w-full text-center">
              Login
            </Link>
            <Link
              href={`/register?post_login_redirect_url=blogs/${slug}#write-comment`}
              scroll
              className="px-6 py-1 rounded-md border bg-blue-500 hover:bg-blue-600 text-white xsm:w-full text-center">
              Sign Up
            </Link>
          </div>
        </div>
      )}
      <div id="comments">
        {comments && comments?.length > 0 ? (
          comments.map((comment) => (
            <div className="py-1 font-poppins " key={comment.id}>
              <div className="flex gap-4">
                <UserImage
                  url={comment.author.picture}
                  className={`ring-2 ring-offset-2 ring-"cyan-400"
                   italic `}
                />
                <div className="">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold capitalize">
                        {comment?.author.username}
                      </p>
                      {comment?.authorId === blogAuthorId && (
                        <button className="bg-cyan-100 text-cyan-500 font-light rounded-md px-1 text-sm xsm:text-[12px] pointer-events-none border border-cyan-500">
                          Author
                        </button>
                      )}
                      {comment?.author.role === "admin" &&
                        comment?.authorId !== blogAuthorId && (
                          <button className="bg-yellow-100 text-yellow-600 font-light rounded-md px-1 text-sm xsm:text-[12px] pointer-events-none border border-[#FFD700]">
                            Admin
                          </button>
                        )}
                      {comment.author.status === "ACTIVE" && (
                        <div>
                          <div className="online-indicator">
                            <span className="blink"></span>
                          </div>
                          <span className="text-green-500">online</span>
                        </div>
                      )}
                    </div>
                    <p>
                      <span className="font-light xsm:text-sm">
                        Published on
                      </span>{" "}
                      <time dateTime={comment?.createdAt}>
                        {" "}
                        {formatDate(comment.createdAt)}
                      </time>
                    </p>
                  </div>

                  <div
                    className="p-3 rounded-r-xl xsm:text-sm rounded-bl-xl border border-cyan-400 bg-cyan-100"
                    id="comment-body">
                    {comment.body && getPlainTextLength(comment.body) > 350 ? (
                      <div>
                        <p className="">
                          &#x1F6C8; This comment is too long! Click{" "}
                          <mark>show full comment</mark> to read the full
                          comment
                        </p>
                        <details>
                          <summary className="border bg-gray-50 shadow px-1 py-0.5 w-fit rounded-md">
                            Show Full Comment
                          </summary>
                          {parse(comment.body)}
                        </details>
                      </div>
                    ) : (
                      <>{comment.body ? parse(comment?.body) : comment.body}</>
                    )}
                  </div>
                  <div className="py-1 flex items-center gap-4">
                    {(user && comment?.authorId === user?.id) ||
                    user?.role === "admin" ? (
                      <>
                        <button
                          className="flex items-center gap-2 text-sm   hover:text-white border px-1 py-0.5 rounded-md hover:bg-blue-500"
                          title="edit comment"
                          onClick={() => editComment(comment)}>
                          <Edit size={14} />
                          <span>Edit</span>
                        </button>

                        <button
                          className="flex items-center gap-2 text-sm  hover:text-white border px-1 py-0.5 rounded-md hover:bg-red-500"
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
          <div className="flex flex-col items-center place-content-center gap-1  p-2 my-2">
            <Image src="/comment.svg" alt="comment" height={100} width={100} />
            <p className="font-semibold md:text-lg">
              This thread is open to discussion
            </p>
            <p className="font-extralight">Be the first to comment</p>
          </div>
        )}
      </div>
    </div>
  );
}
