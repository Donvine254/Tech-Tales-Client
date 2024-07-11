import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function App({ data, handleChange }) {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <div>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={data}
        onChange={() =>
          handleChange((prev) => ({
            ...prev,
            body: editorRef.current.getContent(),
          }))
        }
        name="body"
        init={{
          height: 500,
          toolbar_mode: "sliding",
          toolbar_location: "bottom",
          menubar: false,
          placeholder: "Start by writing or pasting (Ctrl + V) text here....",
          browser_spellcheck: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "codesample",
            "emoticons",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | bold italic forecolor underline| align numlist bullist | link image table media pageembed | backcolor  emoticons codesample blockquote| preview removeformat",
          content_style: "body { font-size:16px }",
          image_advtab: true,
        }}
      />
    </div>
  );
}
