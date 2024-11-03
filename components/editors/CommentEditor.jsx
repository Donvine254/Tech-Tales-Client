import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { handleImageUpload } from "./index";

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
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <div className="flex-1  flex-grow" id="write-comment">
      <Editor
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        licenseKey="gpl"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={data}
        onChange={() => handleChange(editorRef.current.getContent())}
        onFocus={() => setIsInputFocused(true)}
        onKeyUp={() =>
          setLength(editorRef.current.getContent({ format: "text" }).length)
        }
        name="body"
        isReadOnly={length > 500}
        init={{
          min_height: 100,
          toolbar_location: "bottom",
          toolbar_mode: "sliding",
          menubar: false,
          statusbar: false,
          placeholder: "Start by typing text here....",
          browser_spellcheck: true,
          autocomplete: true,
          plugins: [
            "autolink",
            "lists",
            "link",
            "image",
            "autoresize",
            "emoticons",
            "fullscreen",
            "insertdatetime",
            "gif",
          ],
          toolbar:
            "bold italic underline forecolor|numlist bullist|blockquote link image|gif emoticons",
          image_advtab: true,
          images_upload_handler: handleImageUpload,
        }}
      />
      <div
        className={`flex items-center ${
          length > 500 ? "justify-between" : "justify-end"
        }`}>
        {" "}
        {length > 500 && (
          <small className="text-red-500">* Maximum length exceeded!</small>
        )}
        <p className="p-0 text-sm font-medium ">
          <span className={`${length > 500 ? "text-red-500" : ""}`}>
            {length}
          </span>
          / 500
        </p>
      </div>

      <div className="flex items-center justify-end gap-2 md:gap-4 py-1 ">
        {isInputFocused && (
          <>
            {isEditing ? (
              <>
                <button
                  type="submit"
                  disabled={length <= 5 || length > 500}
                  className="bg-blue-500 border-2 border-blue-500 text-white  px-6 py-0.5 lg:mr-4 rounded-md hover:bg-blue-600  disabled:bg-gray-100 disabled:border-gray-600 disabled:text-gray-600"
                  onClick={handleUpdate}>
                  Update
                </button>
                <button
                  type="reset"
                  onClick={undoEditing}
                  className="border-2  border-green-500 hover:border-red-500 px-6 py-0.5 rounded-md">
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  type="submit"
                  disabled={length <= 10 || length > 500}
                  className="bg-blue-500 text-white border-2 border-blue-500 px-6 py-0.5 lg:mr-3 rounded-md hover:bg-blue-600 disabled:bg-gray-100 disabled:border-gray-600 disabled:text-gray-600 disabled:pointer-events-none"
                  onClick={handleSubmit}
                  title="add comment">
                  Respond
                </button>
                <button
                  type="button"
                  className="border-2  border-green-500 hover:border-red-500 px-6 py-0.5 rounded-md"
                  onClick={() => {
                    setIsInputFocused(false);
                    setNewComment("");
                    setLength(0);
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
