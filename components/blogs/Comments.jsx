"use client";

import { baseUrl, deleteComment, patchComment } from "@/lib";
import { useState } from "react";
import Axios from "axios";
import { Edit, Trash } from "@/assets";
import { UserImage, Loader } from "@/components";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { formatDate } from "@/lib/utils";
import toast from "react-hot-toast";
import parse from "html-react-parser";
import { updateCommentStatus } from "@/lib/actions";

const DynamicEditor = dynamic(
  () => import("@/components/editors/CommentEditor"),
  {
    loading: () => <Loader size={60} />,
  }
);

export default function Comments({
  blogId,
  slug,
  comments,
  setComments,
  blogAuthorId,
  commentCount,
  setCommentCount,
  user,
}) {
  const [newComment, setNewComment] = useState("");
  const [commentToEdit, setCommentToEdit] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [length, setLength] = useState(0);
  const [isSorted, setIsSorted] = useState(false);

  //function to play notification sound
  function playSoundEffect() {
    if (typeof Audio !== "undefined" && Audio) {
      const sound = new Audio(
        "https://utfs.io/f/fc748604-514a-4bdf-b406-a3ceee2abeb0-462ej8.mp3"
      );
      sound.play();
    }
  }

  //function to submit comment form
  async function handleSubmit(e) {
    e.preventDefault();
    if (newComment.length <= 10) {
      toast.error("Kindly write something");
      return false;
    }
    const commentData = {
      authorId: user.id,
      blogId: blogId,
      body: newComment,
    };
    const toastId = toast.loading("Processing Request...", {
      position: "bottom-center",
    });
    try {
      const res = await Axios.post(`${baseUrl}/comments`, commentData);
      const data = await res.data;
      setNewComment("");
      playSoundEffect();
      setComments((prev) => [...prev, data]);
      setCommentCount((prev) => (prev += 1));
      toast.success("Comment posted successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.error ?? "Invalid data, user and blog must exist"
      );
    } finally {
      toast.dismiss(toastId);
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
    toast.success("Updating comment..");
    patchComment(commentToEdit?.id, setComments, newComment);
    setNewComment("");
    setIsEditing(false);
  }

  async function hideOrFlagComment(status, id) {
    try {
      const toastId = toast.loading("Processing Request...", {
        position: "bottom-center",
      });
      await updateCommentStatus(status, id);
      setComments((prev) =>
        prev.filter((prevComment) => prevComment.id !== id)
      );
      setCommentCount((prev) => (prev -= 1));
      toast.success("Comment updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Oops! Something went wrong");
    } finally {
      toast.dismiss();
    }
  }

  function undoEditing() {
    setIsInputFocused(false);
    setComments((prev) => [...prev, commentToEdit]);
    setNewComment("");
    setIsEditing(false);
  }

  //function to sort
  const handleSort = () => {
    setIsSorted(!isSorted);
    if (isSorted) {
      const sortedComments = [...comments].sort((a, b) => {
        return b.id - a.id;
      });
      setComments(sortedComments);
    } else {
      const sortedComments = [...comments].sort((a, b) => {
        return a.id - b.id;
      });
      setComments(sortedComments);
    }
  };

  return (
    <div className=" px-2 ">
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="text-bold text-xl md:text-2xl py-2 font-bold">
          Comments ({commentCount})
        </h1>
        <svg
          viewBox="0 0 320 512"
          fill="currentColor"
          height="24"
          width="24"
          onClick={handleSort}
          className={`hover:bg-gray-300 hover:border cursor-pointer rounded-full p-1 ${
            isSorted ? "bg-gray-300 fill-cyan-400 shadow" : ""
          }`}>
          <title>sort comments</title>
          <path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9S301 224.1 288 224.1H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9S19.1 288 32.1 288H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z" />
        </svg>
      </div>
      <p className="my-1">
        Before you comment please read our{" "}
        <Link
          href="/community"
          className="text-blue-500 p-1 border border-blue-500 bg-[#f5f5f5] rounded-md whitespace-nowrap hover:underline py-1">
          community guidelines
        </Link>
      </p>
      <hr className="border-blue-500" />
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
              length={length}
              setLength={setLength}
              isInputFocused={isInputFocused}
              setIsInputFocused={setIsInputFocused}
              isEditing={isEditing}
              handleUpdate={handleUpdate}
              undoEditing={undoEditing}
              handleSubmit={handleSubmit}
              setNewComment={setNewComment}
              setIsEditing={setIsEditing}
            />
          </div>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center  gap-2 xsm:gap-1 border-2 rounded-md h-fit min-h-10 px-2 py-4 my-2 bg-gray-100  border-cyan-400 ">
          <svg viewBox="0 0 512 512" fill="#3b82f6" height="3em" width="3em">
            <path d="M368 192h-16v-80a96 96 0 10-192 0v80h-16a64.07 64.07 0 00-64 64v176a64.07 64.07 0 0064 64h224a64.07 64.07 0 0064-64V256a64.07 64.07 0 00-64-64zm-48 0H192v-80a64 64 0 11128 0z" />
          </svg>
          <h1 className="font-semibold md:text-xl ">
            Please Login or Register to comment
          </h1>
          <div className="flex justify-center xsm:flex-col xsm:items-start items-center gap-6 xsm:gap-2 w-full">
            <Link
              href={`/login?post_login_redirect_url=blogs/${slug}#write-comment`}
              scroll
              className="px-6 py-1 rounded-md border bg-white border-blue-500 hover:bg-black hover:text-white xsm:w-full text-center">
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
                    <div className="flex items-center gap-2 xsm:text-xs xsm:flex-wrap">
                      <p className="font-semibold capitalize">
                        {comment?.author.username}
                      </p>
                      {comment?.authorId === blogAuthorId && (
                        <button className="bg-cyan-100 text-cyan-500 font-light rounded-md px-1 text-sm xsm:text-xs pointer-events-none border border-cyan-500">
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
                          <span className="text-green-500 xsm:hidden">
                            online
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="font-light text-sm xsm:text-xs">
                      <span>Published on</span>{" "}
                      <time dateTime={comment?.createdAt}>
                        {" "}
                        {formatDate(comment.createdAt)}
                      </time>
                    </p>
                  </div>
                  <div
                    className="p-3 rounded-r-xl xsm:text-sm rounded-bl-xl border shadow bg-white  text-extralight"
                    id="comment-body">
                    {comment.body ? parse(comment.body) : comment.body}
                  </div>
                  {user && (
                    <div className="py-1 flex items-center gap-4">
                      {" "}
                      {user && comment.authorId === user.id ? (
                        <>
                          {/* first scenario where the comment belongs to the user */}
                          <button
                            className="flex items-center gap-2 text-sm   hover:text-white border   px-1 py-0.5 rounded-md hover:bg-blue-500"
                            title="edit comment"
                            onClick={() => editComment(comment)}>
                            <Edit size={14} />
                            <span>Edit</span>
                          </button>

                          <button
                            className="flex items-center gap-2 text-sm  hover:text-white border   px-1 py-0.5 rounded-md hover:bg-red-500"
                            title="delete comment"
                            onClick={() =>
                              deleteComment(comment.id, setComments)
                            }>
                            <Trash size={14} />
                            <span> Delete</span>
                          </button>
                        </>
                      ) : blogAuthorId == user?.id && user?.role !== "admin" ? (
                        <>
                          {/* second scenario where the current user is the author of the blog but not an admin*/}
                          <button
                            className="flex items-center gap-2 text-sm   hover:text-white border border-white px-1 py-0.5 rounded-md hover:bg-blue-500"
                            title="hide comment"
                            onClick={() =>
                              hideOrFlagComment("HIDDEN", comment.id)
                            }>
                            <svg
                              viewBox="0 0 64 64"
                              fill="currentColor"
                              height="14"
                              width="14">
                              <path
                                fill="none"
                                stroke="currentColor"
                                strokeMiterlimit={10}
                                strokeWidth={1}
                                d="M1 32s11 15 31 15 31-15 31-15-11-15-31-15S1 32 1 32z"
                              />
                              <path
                                fill="none"
                                stroke="currentColor"
                                strokeMiterlimit={10}
                                strokeWidth={1}
                                d="M39 32 A7 7 0 0 1 32 39 A7 7 0 0 1 25 32 A7 7 0 0 1 39 32 z"
                              />
                              <path
                                fill="none"
                                stroke="currentColor"
                                strokeMiterlimit={10}
                                strokeWidth={1}
                                d="M9 55L55 9"
                              />
                            </svg>
                            <span>Hide</span>
                          </button>

                          <button
                            className="flex items-center gap-2 text-sm  hover:text-white border px-1 py-0.5 rounded-md hover:bg-red-500"
                            title="report as offensive/inappropriate"
                            onClick={() =>
                              hideOrFlagComment("FLAGGED", comment.id)
                            }>
                            <svg
                              viewBox="0 0 64 64"
                              fill="currentColor"
                              height="14"
                              width="14">
                              <path
                                fill="none"
                                stroke="currentColor"
                                strokeMiterlimit={10}
                                strokeWidth={2}
                                d="M12 0v64M12 6h41l-6 12 6 12H12"
                              />
                            </svg>
                            <span>Flag</span>
                          </button>
                        </>
                      ) : user?.id !== comment.authorId &&
                        user?.role === "admin" ? (
                        <>
                          {/* third scenario where the comment where the comment does not belong to the current user, and the the user is admin */}
                          <button
                            className="flex items-center gap-2 text-sm   hover:text-white border px-1 py-0.5 rounded-md hover:bg-blue-500"
                            title="hide comment"
                            onClick={() =>
                              hideOrFlagComment("HIDDEN", comment.id)
                            }>
                            <svg
                              viewBox="0 0 64 64"
                              fill="currentColor"
                              height="14"
                              width="14">
                              <path
                                fill="none"
                                stroke="currentColor"
                                strokeMiterlimit={10}
                                strokeWidth={1}
                                d="M1 32s11 15 31 15 31-15 31-15-11-15-31-15S1 32 1 32z"
                              />
                              <path
                                fill="none"
                                stroke="currentColor"
                                strokeMiterlimit={10}
                                strokeWidth={1}
                                d="M39 32 A7 7 0 0 1 32 39 A7 7 0 0 1 25 32 A7 7 0 0 1 39 32 z"
                              />
                              <path
                                fill="none"
                                stroke="currentColor"
                                strokeMiterlimit={10}
                                strokeWidth={1}
                                d="M9 55L55 9"
                              />
                            </svg>
                            <span>Hide</span>
                          </button>

                          <button
                            className="flex items-center gap-2 text-sm  hover:text-white border px-1 py-0.5 rounded-md hover:bg-red-500"
                            title="report as offensive/inappropriate"
                            onClick={() =>
                              hideOrFlagComment("FLAGGED", comment.id)
                            }>
                            <svg
                              viewBox="0 0 64 64"
                              fill="currentColor"
                              height="14"
                              width="14">
                              <path
                                fill="none"
                                stroke="currentColor"
                                strokeMiterlimit={10}
                                strokeWidth={2}
                                d="M12 0v64M12 6h41l-6 12 6 12H12"
                              />
                            </svg>
                            <span>Flag</span>
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
                      ) : null}{" "}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center gap-1  p-2 my-2 ">
            <Image
              src="/conversation.svg"
              alt="conversation-starter"
              height={150}
              width={150}
              className="italic w-auto max-w-[150px] "
            />
            <p className="font-semibold md:text-lg">
              This thread is open to discussion
            </p>
            <p className="font-extralight">✨ Be the first to comment ✨</p>
          </div>
        )}
      </div>
    </div>
  );
}
