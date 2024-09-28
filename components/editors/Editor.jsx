import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import toast from "react-hot-toast";
import { handleImageUpload } from "./index";
import secureLocalStorage from "react-secure-storage";
import { codeSampleLanguages } from "@/constants";
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
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        licenseKey="gpl"
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
          min_height: 400,
          resize: true,
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
            "ai",
          ],
          toolbar:
            "undo redo | blocks | fontfamily | bold italic forecolor underline| align numlist bullist indent| link image table media | backcolor  emoticons codesample blockquote| ai removeformat",
          content_style:
            "@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500&display=swap'); body { font-family: 'Segoe UI'; height: 'auto'; overflow: 'hidden'; }",
          image_advtab: true,
          images_upload_handler: handleImageUpload,
          file_picker_types: "image",
          file_picker_callback: (cb, value, meta) => {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.addEventListener("change", (e) => {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.addEventListener("load", () => {
                const id = "blobid" + new Date().getTime();
                const blobCache = tinymce.activeEditor.editorUpload.blobCache;
                const base64 = reader.result.split(",")[1];
                const blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);
                cb(blobInfo.blobUri(), { title: file.name });
              });
              reader.readAsDataURL(file);
            });

            input.click();
          },
          codesample_languages: codeSampleLanguages,
        }}
      />
    </div>
  );
}
