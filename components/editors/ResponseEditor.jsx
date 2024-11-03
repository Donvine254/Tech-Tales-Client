import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { handleImageUpload } from "./index";

export default function ResponseEditor({ handleChange, disable }) {
  const editorRef = useRef(null);

  return (
    <div className="flex-1  flex-grow w-full" id="write-response">
      <Editor
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        licenseKey="gpl"
        onInit={(evt, editor) => (editorRef.current = editor)}
        onChange={() => handleChange(editorRef.current.getContent())}
        onKeyUp={() =>
          disable(
            editorRef.current.getContent({ format: "text" }).length < 5 ||
              editorRef.current.getContent({ format: "text" }).length > 250
          )
        }
        name="response body"
        init={{
          min_height: 50,
          toolbar_location: "bottom",
          toolbar_mode: "sliding",
          menubar: false,
          statusbar: false,
          auto_focus: true,
          placeholder: "Type your response here...",
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
    </div>
  );
}
