import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import toast from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";
export default function App({ data, handleChange }) {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const autoSave = () => {
    secureLocalStorage.setItem("draft_blog_data__", JSON.stringify(data));
    toast.success("Blog draft saved successfully");
  };

  return (
    <div>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={data.body}
        onKeyDown={(e) => {
          if (e.key === "s" && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            autoSave();
          }
        }}
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
          autocomplete: true,
          placeholder: "Start by writing or pasting (Ctrl + V) text here....",
          browser_spellcheck: true,
          contextmenu: false,
          autocomplete: true,
          autosave_interval: "5s",
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
            "autosave",
          ],
          toolbar:
            "undo redo | blocks | bold italic forecolor underline| align numlist bullist | link image table media pageembed | backcolor  emoticons codesample blockquote| preview removeformat restoredraft",
          content_style:
            "@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500&display=swap'); body { font-family: 'Segoe UI'; }",
          image_advtab: true,
        }}
      />
    </div>
  );
}
