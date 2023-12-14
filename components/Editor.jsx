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
        apiKey="s91bfina8wqeldhbyfzpf16bkodlx2gz2s0nx1zg9dfugp3e"
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
          toolbar_mode: "wrap",
          menubar: true,
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
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
            "tinymcespellchecker",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "spellchecker ",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:20px }",
          image_advtab: true,
        }}
      />

      {/* <button onClick={log} type="button" className="btn-primary">
        Log editor content
      </button> */}
    </div>
  );
}
