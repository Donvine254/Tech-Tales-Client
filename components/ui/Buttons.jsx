import { Edit, Trash } from "@/assets";

export const EditButton = ({ handleClick = null }) => (
  <button
    onClick={handleClick}
    className="flex items-center gap-2 text-sm hover:text-white px-1 py-0.5
    rounded-md hover:bg-blue-500"
    title="edit response">
    <Edit size={14} />
    <span>Edit</span>
  </button>
);

export const HideButton = ({ handleClick = null }) => (
  <button
    onClick={handleClick}
    className="flex items-center gap-2 text-sm   hover:text-white px-1 py-0.5 rounded-md hover:bg-blue-500"
    title="hide response">
    <svg viewBox="0 0 64 64" fill="currentColor" height="14" width="14">
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
);

export const FlagButton = ({ handleClick = null }) => (
  <button
    onClick={handleClick}
    className="flex items-center gap-2 text-sm  hover:text-white px-1 py-0.5 rounded-md hover:bg-red-500"
    title="report as offensive/inappropriate">
    {" "}
    <svg viewBox="0 0 64 64" fill="currentColor" height="14" width="14">
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
);

export const DeleteBtn = ({ handleClick = null }) => (
  <button
    onClick={handleClick}
    className="flex items-center gap-2 text-sm  hover:text-white px-1 py-0.5 rounded-md hover:bg-red-500"
    title="delete comment">
    {" "}
    <Trash size={14} />
    <span className="xsm:hidden"> Delete</span>
  </button>
);

export const ReportAbuseBtn = ({ handleClick = null }) => (
  <button
    className="text-sm hover:text-white  px-1 py-0.5 rounded-md hover:bg-red-400 flex items-center gap-1"
    title="report abuse"
    onClick={handleClick}>
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="14"
      width="14"
      className="group-hover:text-red-500 xsm:text-xs">
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M4 20v-6a8 8 0 1116 0v6h1v2H3v-2h1zm2 0h12v-6a6 6 0 10-12 0v6zm5-18h2v3h-2V2zm8.778 2.808l1.414 1.414-2.12 2.121-1.415-1.414 2.121-2.121zM2.808 6.222l1.414-1.414 2.121 2.12L4.93 8.344 2.808 6.222zM7 14a5 5 0 015-5v2a3 3 0 00-3 3H7z" />
    </svg>
    Report Abuse
  </button>
);

export const ReplyButton = ({ handleClick = null }) => (
  <button
    className="flex items-center gap-2 text-sm   hover:text-white  px-1 py-0.5 rounded-md hover:bg-blue-500"
    title="reply"
    onClick={handleClick}>
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
);
