import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import toast from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";
export default function App({ data, handleChange, onFocus }) {
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
            e.target.blur();
            autoSave();
          }
        }}
        onChange={() =>
          handleChange((prev) => ({
            ...prev,
            body: editorRef.current.getContent(),
          }))
        }
        onFocus={onFocus}
        name="body"
        init={{
          toolbar_mode: "sliding",
          menubar: true,
          min_height: 300,
          autocomplete: true,
          toolbar_sticky: true,
          toolbar_sticky_offset: 75,
          placeholder: "Start by writing or pasting (Ctrl + V) text here....",
          browser_spellcheck: true,
          contextmenu: false,
          autocomplete: true,
          autoresize_overflow_padding: 5,
          autoresize_bottom_margin: 25,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "autolink",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "codesample",
            "emoticons",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
            "autoresize",
            "accordion",
          ],
          toolbar:
            "undo redo | blocks | fontfamily | bold italic forecolor underline| align numlist bullist | link image table media | backcolor  emoticons codesample blockquote| preview removeformat",
          content_style:
            "@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500&display=swap'); body { font-family: 'Segoe UI'; height: 'auto'; overflow: 'hidden'; }",
          image_advtab: true,
        }}
      />
    </div>
  );
}
