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
import { Tooltip } from "react-tooltip";
import Response from "./Responses";

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
  const [response, setResponse] = useState("");
  const [commentToEdit, setCommentToEdit] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [replyingToCommentId, setReplyingToCommentId] = useState(null);
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

  async function handleReply(e, commentId) {
    e.preventDefault();
    toast.success("Processing");
    const data = {
      body: response,
      authorId: user.id,
      commentId: commentId,
    };

    try {
      const result = await Axios.post(`${baseUrl}/comments/${commentId}`, data);
      setResponse("");
      setReplyingToCommentId(null);
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                responses: [...(comment.responses || []), result.data],
              }
            : comment
        )
      );
    } catch (error) {
      console.error("Error posting reply:", error);
      toast.error("Failed to post response");
    }
  }

  return (
    <div className="">
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
                {/* first child */}
                <UserImage
                  url={comment.author.picture}
                  className={`ring-2 ring-offset-2 ring-"cyan-400"
                   italic comment-avatar`}
                  id="start"
                />
                {/* second child */}
                <div className="">
                  <div>
                    <div className="flex items-center gap-1 xsm:text-xs xsm:flex-wrap">
                      <p className="font-semibold capitalize">
                        {comment?.author.username}
                      </p>
                      {comment?.authorId === blogAuthorId && (
                        <div className="text-[#08a0f8] font-bold px-1 text-sm xsm:text-xs flex items-center">
                          <svg
                            viewBox="0 0 693 1000"
                            fill="currentColor"
                            height="1em"
                            width="1em">
                            <path d="M55 988c-4 13.333-12.667 16-26 8-12-5.333-17.333-16.667-16-34 2.667-66.667 19.333-142 50-226-66.667-102.667-84-208-52-316 6.667 21.333 17.333 47.333 32 78 14.667 30.667 29.333 57.333 44 80 14.667 22.667 25.333 32.667 32 30 5.333-2.667 5.333-30.333 0-83s-9-108-11-166 6.333-110.333 25-157c14.667-29.333 41.333-60.667 80-94s73.333-56.667 104-70c-16 30.667-27 62-33 94s-7.333 58-4 78 10.333 30.667 21 32c8 0 36-40 84-120S468.333 1.333 491 0c30.667-2.667 68.667 7 114 29s72.667 43.667 82 65c8 16 8 42.333 0 79s-21.333 64.333-40 83c-29.333 29.333-78 50-146 62s-106 20-114 24c-10.667 6.667-6.667 18 12 34 36 32 94.667 38.667 176 20-37.333 53.333-82.667 91.333-136 114s-97.333 35.333-132 38c-34.667 2.667-52.667 6-54 10-2.667 16 13.667 34 49 54s69 24.667 101 14c-20 37.333-41 65.333-63 84s-40 30.333-54 35c-14 4.667-39.333 8.333-76 11s-65 5.333-85 8L55 988" />
                          </svg>{" "}
                          Author
                        </div>
                      )}
                      {comment?.author.role === "admin" && (
                        <div className="text-[#ab0cf5] font-bold px-1 text-sm xsm:text-xs flex items-center">
                          <svg
                            viewBox="0 0 512 512"
                            fill="currentColor"
                            height="1em"
                            width="1em">
                            <path
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={32}
                              d="M35.42 188.21l207.75 269.46a16.17 16.17 0 0025.66 0l207.75-269.46a16.52 16.52 0 00.95-18.75L407.06 55.71A16.22 16.22 0 00393.27 48H118.73a16.22 16.22 0 00-13.79 7.71L34.47 169.46a16.52 16.52 0 00.95 18.75zM48 176h416"
                            />
                            <path
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={32}
                              d="M400 64l-48 112-96-128M112 64l48 112 96-128M256 448l-96-272M256 448l96-272"
                            />
                          </svg>{" "}
                          Admin
                        </div>
                      )}
                      {comment.author.status === "ACTIVE" && (
                        <div>
                          <div
                            className="online-indicator"
                            title="this user is online"
                            data-tooltip-id="online">
                            <span className="blink"></span>
                          </div>
                        </div>
                      )}
                      <Tooltip
                        id="online"
                        content="This user is online"
                        style={{ padding: "5px" }}
                        variant="info"
                      />
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
                    <div className="py-1 flex items-center gap-4 flex-wrap">
                      {" "}
                      {user && comment.authorId === user.id ? (
                        <>
                          {/* first scenario where the comment belongs to the user */}
                          <button
                            className="flex items-center gap-2 text-sm   hover:text-white px-1 py-0.5 rounded-md hover:bg-blue-500"
                            title="edit comment"
                            onClick={() => editComment(comment)}>
                            <Edit size={14} />
                            <span>Edit</span>
                          </button>

                          <button
                            className="flex items-center gap-2 text-sm  hover:text-white px-1 py-0.5 rounded-md hover:bg-red-500"
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
                            className="flex items-center gap-2 text-sm   hover:text-white  px-1 py-0.5 rounded-md hover:bg-blue-500"
                            title="reply"
                            onClick={() => setReplyingToCommentId(comment.id)}>
                            <svg
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              height="14"
                              width="14"
                              className="cursor-pointer text-gray-600">
                              <path d="M6.598 5.013a.144.144 0 01.202.134V6.3a.5.5 0 00.5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 00-1.921-.306 7.404 7.404 0 00-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 00-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254a.503.503 0 00-.042-.028.147.147 0 010-.252.499.499 0 00.042-.028l3.984-2.933zM7.8 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 00.933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 00-1.767-.96l-3.994 2.94a1.147 1.147 0 000 1.946l3.994 2.94a1.144 1.144 0 001.767-.96v-.667z" />
                            </svg>
                            <span>reply</span>
                          </button>

                          <button
                            className="flex items-center gap-2 text-sm   hover:text-white px-1 py-0.5 rounded-md hover:bg-blue-500"
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
                            className="flex items-center gap-2 text-sm  hover:text-white px-1 py-0.5 rounded-md hover:bg-red-500"
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
                            className="flex items-center gap-2 text-sm   hover:text-white  px-1 py-0.5 rounded-md hover:bg-blue-500 group"
                            title="reply"
                            onClick={() => setReplyingToCommentId(comment.id)}>
                            <svg
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              height="14"
                              width="14"
                              className="cursor-pointer text-gray-600 group-hover:text-white">
                              <path d="M6.598 5.013a.144.144 0 01.202.134V6.3a.5.5 0 00.5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 00-1.921-.306 7.404 7.404 0 00-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 00-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254a.503.503 0 00-.042-.028.147.147 0 010-.252.499.499 0 00.042-.028l3.984-2.933zM7.8 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 00.933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 00-1.767-.96l-3.994 2.94a1.147 1.147 0 000 1.946l3.994 2.94a1.144 1.144 0 001.767-.96v-.667z" />
                            </svg>
                            <span>reply</span>
                          </button>
                          <button
                            className="flex items-center gap-2 text-sm   hover:text-white  px-1 py-0.5 rounded-md hover:bg-blue-500 group"
                            title="hide comment"
                            onClick={() =>
                              hideOrFlagComment("HIDDEN", comment.id)
                            }>
                            <svg
                              viewBox="0 0 64 64"
                              fill="currentColor"
                              height="14"
                              width="14"
                              className="group-hover:text-white">
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
                            className="flex items-center gap-2 text-sm  hover:text-white  px-1 py-0.5 rounded-md hover:bg-red-500 group"
                            title="report as offensive/inappropriate"
                            onClick={() =>
                              hideOrFlagComment("FLAGGED", comment.id)
                            }>
                            <svg
                              viewBox="0 0 64 64"
                              fill="currentColor"
                              height="14"
                              width="14"
                              className="group-hover:text-white">
                              <path
                                fill="none"
                                stroke="currentColor"
                                strokeMiterlimit={10}
                                strokeWidth={2}
                                d="M12 0v64M12 6h41l-6 12 6 12H12"
                              />
                            </svg>
                            <span className="xsm:hidden">Flag</span>
                          </button>
                          <button
                            className="flex items-center gap-2 text-sm  hover:text-white  px-1 py-0.5 rounded-md hover:bg-red-500 "
                            title="delete comment"
                            onClick={() =>
                              deleteComment(comment.id, setComments)
                            }>
                            <Trash size={14} />
                            <span className="xsm:hidden"> Delete</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="flex items-center gap-1 text-sm   hover:text-white  px-1 py-0.5 rounded-md hover:bg-blue-500 group "
                            title="reply"
                            onClick={() => setReplyingToCommentId(comment.id)}>
                            <svg
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              height="14"
                              width="14"
                              className="cursor-pointer text-gray-600 group-hover:text-white">
                              <path d="M6.598 5.013a.144.144 0 01.202.134V6.3a.5.5 0 00.5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 00-1.921-.306 7.404 7.404 0 00-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 00-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254a.503.503 0 00-.042-.028.147.147 0 010-.252.499.499 0 00.042-.028l3.984-2.933zM7.8 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 00.933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 00-1.767-.96l-3.994 2.94a1.147 1.147 0 000 1.946l3.994 2.94a1.144 1.144 0 001.767-.96v-.667z" />
                            </svg>
                            <span>Reply</span>
                          </button>
                          <button className="text-sm hover:text-white  px-1 py-0.5 rounded-md hover:bg-red-400 flex items-center gap-1">
                            <svg
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              height="14"
                              width="14"
                              className="group-hover:text-red-500">
                              <path fill="none" d="M0 0h24v24H0z" />
                              <path d="M4 20v-6a8 8 0 1116 0v6h1v2H3v-2h1zm2 0h12v-6a6 6 0 10-12 0v6zm5-18h2v3h-2V2zm8.778 2.808l1.414 1.414-2.12 2.121-1.415-1.414 2.121-2.121zM2.808 6.222l1.414-1.414 2.121 2.12L4.93 8.344 2.808 6.222zM7 14a5 5 0 015-5v2a3 3 0 00-3 3H7z" />
                            </svg>
                            Report Abuse
                          </button>
                        </>
                      )}
                    </div>
                  )}

                  {/* div for replying */}
                  {replyingToCommentId === comment.id && (
                    <form
                      className="mt-1"
                      id="response-form text-sm xsm:text-xs">
                      <textarea
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        placeholder="Write your reply..."
                        className="w-full p-2 text-base border rounded-md h-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoCorrect="on"
                        autoComplete={true}
                        spellCheck={true}
                        maxLength={200}
                        minLength={5}
                        rows={2}
                        autoFocus
                        onKeyUp={(e) => {
                          e.target.style.height = "auto";
                          e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
                      />
                      <div className="mt-2 flex space-x-2 justify-end">
                        <button
                          onClick={(e) => handleReply(e, comment.id)}
                          disabled={response.length < 5}
                          title="submit response"
                          className="px-3 py-1 text-sm border-2 border-blue-500 rounded-md bg-blue-500 disabled:bg-transparent disabled:border-gray-800 disabled:text-gray-800 disabled:cursor-not-allowed disabled:pointer-events-none text-white hover:bg-blue-600 focus:outline-none  ">
                          Submit
                        </button>
                        <button
                          onClick={() => {
                            setReplyingToCommentId(null);
                            setResponse("");
                          }}
                          title="cancel"
                          type="reset"
                          className="px-3 py-1 text-sm text-gray-600 bg-transparent rounded-md border-2 border-green-500 hover:border-red-500 focus:outline-none ">
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                  {/* div for responses */}
                  {comment.responses &&
                    comment.responses.length > 0 &&
                    comment.responses.map((response, index) => (
                      <Response
                        response={response}
                        key={response.id}
                        index={index}
                        user={user}
                        blogAuthorId={blogAuthorId}
                      />
                    ))}
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
