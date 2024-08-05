import React, { useRef, useEffect, useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2";

export default function CommentEditor({
  data,
  handleChange,
  length,
  setLength,
  setIsEditing,
  isEditing,
  isInputFocused,
  setIsInputFocused,
  handleUpdate,
  setNewComment,
  handleSubmit,
  undoEditing,
}) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      const quill = editorRef.current.getEditor();
      setLength(quill.getLength());
    }
  }, [data, setLength]);
  // const imageHandler = useCallback(() => {
  //   const url = prompt("Enter the image URL");
  //   if (url && editorRef.current) {
  //     const quill = editorRef.current.getEditor();
  //     const range = quill.getSelection(true);
  //     quill.insertEmbed(range.index, "image", url, "user");
  //   }
  // }, []);
  const imageHandler = useCallback(() => {
    Swal.fire({
      text: "Enter the image URL",
      input: "url",
      confirmButtonText: "Insert",
      showCloseButton: true,
      showCancelButton: true,
      customClass: {
        confirmButton:
          "px-2 py-1 mx-2 bg-green-500 text-white rounded-md hover:text-white hover:bg-green-500",
        cancelButton: "px-2 py-1 mx-2 bg-red-500 rounded-md text-white",
      },
      buttonsStyling: false,
    }).then((input) => {
      let url = input.value;
      console.log(url);
      if (url && editorRef.current) {
        const quill = editorRef.current.getEditor();
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, "image", url, "user");
      }
    });
  }, [editorRef]);

  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
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
          "image",
        ]}
        placeholder="Start by typing something..."
        modules={modules}
        onChange={handleChange}
        value={data}
        onKeyDown={() => setIsInputFocused(true)}
      />
      <span className="p-0 text-sm font-medium flex items-end justify-end">
        {length}/500
      </span>
      <div className="flex items-center justify-end gap-2 md:gap-4 py-1 ">
        {isInputFocused && (
          <>
            {isEditing ? (
              <>
                <button
                  type="submit"
                  disabled={length <= 5}
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
                  disabled={length <= 5}
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
    </div>
  );
}
