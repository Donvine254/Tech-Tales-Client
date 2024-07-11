import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function CommentEditor({ data, handleChange, handleFocus }) {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <div className="flex-1 p-4 xsm:p-2 xsm:ml-2 flex-grow" id="write-comment">
      <Editor
        apiKey="s91bfina8wqeldhbyfzpf16bkodlx2gz2s0nx1zg9dfugp3e"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={data}
        onChange={() => handleChange(editorRef.current.getContent())}
        onFocus={handleFocus}
        name="body"
        isReadOnly={true}
        init={{
          height: 100,
          toolbar_location: "bottom",
          toolbar_mode: "sliding",
          menubar: false,
          skin: "borderless",
          icons: "small",
          statusbar: false,
          placeholder: "Start by writing text here....",
          browser_spellcheck: true,
          autocomplete: true,
          plugins: [
            "autolink",
            "lists",
            "link",
            "autoresize",
            "emoticons",
            "fullscreen",
          ],
          toolbar:
            "bold italic underline  forecolor| numlist bullist| blockquote emoticons link ",
          content_style:
            "@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500&display=swap'); body { font-family: Poppins; }",
        }}
      />
    </div>
  );
}
