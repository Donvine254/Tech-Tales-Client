import React, { useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CommentEditor({ data, handleChange, handleFocus }) {
  const editorRef = useRef(null);

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "code-block"],
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
        ref={editorRef}
        id="editor-container"
        className="rounded-md min-h-[120px] max-w-full border-2 border-gray-500 font-poppins text-base"
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
          "code-block",
        ]}
        placeholder="Start by typing something..."
        modules={modules}
        onChange={handleChange}
        value={data}
        onKeyDown={handleFocus}
      />
      <span className="text-red-500 text-sm font-medium">
        * Min 5 Characters, Maximum 250
      </span>
    </div>
  );
}
