import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
import toast from "react-hot-toast";
import Axios from "axios";
import Response from "./Responses";
import {
  DeleteBtn,
  FlagButton,
  HideButton,
  EditButton,
  ReportAbuseBtn,
  ReplyButton,
} from "../ui/Buttons";
import parse from "html-react-parser";
import { formatDate } from "@/lib/utils";
import { baseUrl, deleteComment } from "@/lib";
import dynamic from "next/dynamic";
import { UserImage, Loader } from "@/components";
const ResponseEditor = dynamic(
  () => import("@/components/editors/ResponseEditor"),
  {
    loading: () => <Loader size={30} />,
  }
);
export default function Comment({
  comment,
  editComment,
  hideOrFlagComment,
  user,
  blogAuthorId,
  key,
  setComments,
}) {
  const [isReplying, setIsReplying] = useState(false);
  const [response, setResponse] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [responseToEdit, setResponseToEdit] = useState(null);
  const [newResponse, setNewResponse] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);
  async function handleReply(e) {
    e.preventDefault();
    toast.success("Processing");
    const data = {
      body: response,
      authorId: user.id,
      commentId: comment.id,
    };

    try {
      const result = await Axios.post(
        `${baseUrl}/comments/${comment.id}`,
        data
      );
      setResponse("");
      setIsReplying(false);
      setComments((prevComments) =>
        prevComments.map((prevComment) =>
          prevComment.id === comment.id
            ? {
                ...prevComment,
                responses: [...(prevComment.responses || []), result.data],
              }
            : prevComment
        )
      );
    } catch (error) {
      console.error("Error posting reply:", error);
      toast.error("Failed to post response");
    }
  }
  // Function to edit comment responses
  const handleEditing = (response) => {
    // Set the response to be edited and toggle the editing state
    setResponseToEdit(response);
    setIsEditing(true);
    setComments((prevComments) =>
      prevComments.map((prevComment) => {
        if (prevComment.id === response.commentId) {
          return {
            ...prevComment,
            responses: prevComment.responses.map((resp) =>
              resp.id === response.id ? { ...resp, ...response } : resp
            ),
          };
        }
        return prevComment;
      })
    );
  };

  return (
    <div className="py-1 font-poppins " key={key}>
      <div className="flex gap-4 relative">
        {/* first child */}
        {isExpanded ? (
          <>
            <UserImage
              url={comment.author.picture}
              className={`ring-2 ring-offset-2 ring-cyan-400
                   italic comment-avatar`}
            />
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              height="1em"
              width="1em"
              onClick={() => setIsExpanded(false)}
              className="cursor-pointer absolute xsm:top-[45px] top-[50px] my-2 left-3">
              <title>Hide Comment</title>
              <path d="M12 19.24l-4.95-4.95-1.41 1.42L12 22.07l6.36-6.36-1.41-1.42L12 19.24zM5.64 8.29l1.41 1.42L12 4.76l4.95 4.95 1.41-1.42L12 1.93 5.64 8.29z" />
            </svg>

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
                      <EditButton handleClick={() => editComment(comment)} />
                      <DeleteBtn
                        handleClick={() =>
                          deleteComment(comment.id, setComments)
                        }
                      />
                    </>
                  ) : blogAuthorId == user?.id && user?.role !== "admin" ? (
                    <>
                      {/* second scenario where the current user is the author of the blog but not an admin*/}
                      <ReplyButton handleClick={() => setIsReplying(true)} />
                      <HideButton
                        handleClick={() =>
                          hideOrFlagComment("HIDDEN", comment.id)
                        }
                      />
                      <FlagButton
                        handleClick={() =>
                          hideOrFlagComment("FLAGGED", comment.id)
                        }
                      />
                    </>
                  ) : user?.id !== comment.authorId &&
                    user?.role === "admin" ? (
                    <>
                      {/* third scenario where the comment where the comment does not belong to the current user, and the the user is admin */}

                      <ReplyButton
                        handleClick={() => setIsReplying(comment.id)}
                      />
                      <HideButton
                        handleClick={() =>
                          hideOrFlagComment("HIDDEN", comment.id)
                        }
                      />
                      <FlagButton
                        handleClick={() =>
                          hideOrFlagComment("FLAGGED", comment.id)
                        }
                      />
                      <DeleteBtn
                        handleClick={() =>
                          deleteComment(comment.id, setComments)
                        }
                      />
                    </>
                  ) : (
                    <>
                      <ReplyButton handleClick={() => setIsReplying()} />
                      <ReportAbuseBtn />
                    </>
                  )}
                </div>
              )}

              {/* div for replying */}
              {isReplying && (
                <form className="mt-1" id="response-form text-sm xsm:text-xs">
                  <ResponseEditor
                    handleChange={setResponse}
                    disable={setIsDisabled}
                  />
                  <div className="mt-2 flex space-x-2 justify-end">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleReply}
                          disabled={isDisabled}
                          title="submit response"
                          className="px-3 py-1 text-sm border-2 border-blue-500 rounded-md bg-blue-500 disabled:bg-transparent disabled:border-gray-800 disabled:text-gray-800 disabled:cursor-not-allowed text-white hover:bg-blue-600 focus:outline-none  ">
                          Update
                        </button>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setResponseToEdit(false);
                            setNewResponse(null);
                          }}
                          title="cancel"
                          type="reset"
                          className="px-3 py-1 text-sm text-gray-600 bg-transparent rounded-md border-2 border-green-500 hover:border-red-500 focus:outline-none ">
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        {" "}
                        <button
                          onClick={handleReply}
                          disabled={isDisabled}
                          title="submit response"
                          className="px-3 py-1 text-sm border-2 border-blue-500 rounded-md bg-blue-500 disabled:bg-transparent disabled:border-gray-800 disabled:text-gray-800 disabled:cursor-not-allowed text-white hover:bg-blue-600 focus:outline-none  ">
                          Submit
                        </button>
                        <button
                          onClick={() => {
                            setIsReplying(false);
                            setResponse("");
                          }}
                          title="cancel"
                          type="reset"
                          className="px-3 py-1 text-sm text-gray-600 bg-transparent rounded-md border-2 border-green-500 hover:border-red-500 focus:outline-none ">
                          Cancel
                        </button>
                      </>
                    )}
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
                    handleEditing={handleEditing}
                  />
                ))}
            </div>
          </>
        ) : (
          <>
            <div className="bg-slate-50 rounded-r-xl xsm:text-sm rounded-bl-xl text-sm  border shadow p-2 w-fit inline-flex gap-2 items-center my-1">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="1em"
                width="1em"
                onClick={() => setIsExpanded(true)}
                className="cursor-pointer">
                <title>Show Comment</title>
                <path d="M12 7.59L7.05 2.64 5.64 4.05 12 10.41l6.36-6.36-1.41-1.41L12 7.59zM5.64 19.95l1.41 1.41L12 16.41l4.95 4.95 1.41-1.41L12 13.59l-6.36 6.36z" />
              </svg>
              <p>
                <span className="capitalize">
                  {comment.author.username} {""}
                </span>
                {comment.responses && comment.responses.length > 0
                  ? `+ ${comment.responses.length} replies`
                  : ""}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
