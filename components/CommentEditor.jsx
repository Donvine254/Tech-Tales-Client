import React, { useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CommentEditor({ data, handleChange, handleFocus }) {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "code-block"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <div className="flex-1 flex-grow" id="write-comment">
      <ReactQuill
        theme="snow"
        id="editor-container"
        className="rounded-md h-36 border-2 border-gray-500 font-poppins text-base"
        style={{
          display: "flex",
          flexDirection: "column-reverse",
        }}
        formats={[
          "bold",
          "italic",
          "underline",
          "blockquote",
          "list",
          "bullet",
          "link",
          "image",
          "emoji",
          "code-block",
        ]}
        placeholder="Start by typing something..."
        modules={modules}
        onChange={handleChange}
        value={data}
        onClick={handleFocus}
        onFocus={handleFocus}
      />
    </div>
  );
}
