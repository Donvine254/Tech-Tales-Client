"use client";

import { baseUrl, patchComment } from "@/lib";
import { useState } from "react";
import Axios from "axios";
import { UserImage, Loader } from "@/components";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { updateCommentStatus } from "@/lib/actions";
import Comment from "./Comment";

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
      {/* start of comments div */}
      <div id="comments">
        {comments && comments?.length > 0 ? (
          comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              user={user}
              editComment={editComment}
              blogAuthorId={blogAuthorId}
              setComments={setComments}
              hideOrFlagComment={hideOrFlagComment}
            />
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
