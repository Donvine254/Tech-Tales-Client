import { Edit, Trash } from "@/assets";

export const EditButton = (handleClick) => (
  <button
    onClick={handleClick}
    className="flex items-center gap-2 text-sm hover:text-white px-1 py-0.5
    rounded-md hover:bg-blue-500"
    title="edit comment">
    <Edit size={14} />
    <span>Edit</span>
  </button>
);

export const HideButton = (handleClick) => {
  <button
    onClick={handleClick}
    className="flex items-center gap-2 text-sm   hover:text-white px-1 py-0.5 rounded-md hover:bg-blue-500"
    title="hide comment">
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
  </button>;
};

export const FlagButton = (handleClick) => (
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
    <span>Flag</span>
  </button>
);

export const DeleteButton = (handleClick) => {
  <button
    onClick={handleClick}
    className="flex items-center gap-2 text-sm  hover:text-white px-1 py-0.5 rounded-md hover:bg-red-500"
    title="delete comment">
    {" "}
    <Trash size={14} />
    <span> Delete</span>
  </button>;
};

export const ReportAbuseBtn = () => (
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
);
