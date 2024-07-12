"use client";

import { deleteComment, patchComment } from "@/lib";
import { useState, useEffect, useRef } from "react";
import Axios from "axios";
import Loader from "./Loader";
import { Edit, Trash } from "@/assets";
import { UserImage } from "./Avatar";
import Link from "next/link";
import dynamic from "next/dynamic";
import { getRandomColor } from "@/lib/utils";
import { baseUrl, getCurrentUser } from "@/lib";
import toast from "react-hot-toast";
import parse from "html-react-parser";
const user = getCurrentUser();

const DynamicEditor = dynamic(() => import("@/components/CommentEditor"), {
  loading: () => <Loader size={60} />,
});

export default function Comments({ blogId, slug, setCommentsCount, author }) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentToEdit, setCommentToEdit] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const commentsRef = useRef({});
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${baseUrl}/comments`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ blogId: blogId }),
          },
          { cache: "force-cache", revalidate: 600 }
        );
        const resData = await response.json();
        let commentsWithColors = resData;
        if (resData.length > 0) {
          commentsWithColors = resData.map((comment) => {
            if (!commentsRef.current[comment.id]) {
              commentsRef.current[comment.id] = getRandomColor();
            }
            return { ...comment, color: commentsRef.current[comment.id] };
          });
        }

        setComments(commentsWithColors);
        setCommentsCount(comments.length);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [blogId, setCommentsCount, comments.length]);

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
      const res = await Axios.post(
        "https://techtales.up.railway.app/comments",
        commentData
      );
      const data = await res.data;
      setNewComment("");
      const newCommentWithColor = {
        ...data,
        color: getRandomColor(),
      };
      setComments((prev) =>
        Array.isArray(prev)
          ? [...prev, newCommentWithColor]
          : [newCommentWithColor]
      );
      setCommentsCount((prev) => prev + 1);
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

  return (
    <div>
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
      <div>
        {comments?.length > 0 ? (
          comments?.map((comment) => (
            <div className="py-1 font-poppins " key={comment.id}>
              <div className="flex gap-4">
                <UserImage
                  url={comment.user_avatar}
                  className={`ring-2 ring-offset-2 ring-${
                    comment.color ?? "cyan-400"
                  } italic `}
                />
                <div className="">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{comment?.author}</p>
                      {comment?.user_id === author && (
                        <button className="bg-cyan-100 text-cyan-500 font-light rounded-md px-1 text-sm pointer-events-none border border-cyan-500">
                          Author
                        </button>
                      )}
                      {user && comment.user_id === user?.id && (
                        <div>
                          <div className="online-indicator">
                            <span className="blink"></span>
                          </div>
                          <span className="text-green-500">online</span>
                        </div>
                      )}
                    </div>
                    <p>
                      <span className="font-light xsm:hidden">
                        Published on
                      </span>{" "}
                      {comment?.created_at_date}
                    </p>
                  </div>

                  <div
                    className="p-3 rounded-r-xl rounded-bl-xl border border-[#67e8f9]"
                    style={{
                      backgroundColor: comment.color ?? "#cffafe",
                    }}>
                    {comment.body ? parse(comment?.body) : comment.body}
                  </div>
                  <div className="py-1 flex items-center gap-4">
                    {user && comment?.user_id === user?.id ? (
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
          <p className="my-2 text-xl font-semibold">Be the first to comment</p>
        )}
      </div>
    </div>
  );
}
