import React from "react";

export default function PreviewModal({ blog }) {
  const handleClose = () => {
    const modal = document.getElementById("preview-modal");
    if (modal) {
      modal.close();
    }
  };

  if (!blog) {
    return null;
  }
  return (
    <dialog
      id="preview-modal"
      className="rounded-md w-[90%] h-[90%] overflow-auto border px-4 py-2 ">
      <div className="relative w-full h-full ">
        <p className="text-lg">Preview</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          class="hover:fill-red-500 absolute top-1 right-1 bg-gray-100 p-1 rounded-md hover:text-red-500 cursor-pointer z-50"
          onClick={handleClose}>
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
        <div className="absolute bottom-0 right-0 flex items-end p-2 ">
          <button
            className="bg-[#0060CE] hover:bg-gray-200 hover:text-red-500 py-0.5 px-2 rounded-md text-white"
            onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}
