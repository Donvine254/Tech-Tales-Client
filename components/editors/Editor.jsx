import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import toast from "react-hot-toast";
import Axios from "axios";
import secureLocalStorage from "react-secure-storage";
export default function App({ data, handleChange, onFocus }) {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const handleImageUpload = (blobInfo, progress) =>
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open(
        "POST",
        "https://api.cloudinary.com/v1_1/dipkbpinx/image/upload"
      );

      // Update progress as the image is uploading
      xhr.upload.onprogress = (e) => {
        progress((e.loaded / e.total) * 100);
      };

      xhr.onload = () => {
        if (xhr.status === 403) {
          reject({ message: "HTTP Error: " + xhr.status, remove: true });
          return;
        }

        if (xhr.status < 200 || xhr.status >= 300) {
          reject("HTTP Error: " + xhr.status);
          return;
        }

        const json = JSON.parse(xhr.responseText);

        if (!json || typeof json.secure_url !== "string") {
          reject("Invalid JSON: " + xhr.responseText);
          return;
        }

        resolve(json.secure_url); // Return the Cloudinary image URL
      };

      xhr.onerror = () => {
        reject(
          "Image upload failed due to a XHR Transport error. Code: " +
            xhr.status
        );
      };

      // Create a FormData object to send the image file
      const formData = new FormData();
      formData.append("file", blobInfo.blob(), blobInfo.filename());
      formData.append("cloud_name", "dipkbpinx");
      formData.append("upload_preset", "ekomtspw");

      xhr.send(formData); // Send the form data with the image file
    });

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
          ],
          toolbar:
            "undo redo | blocks | fontfamily | bold italic forecolor underline| align numlist bullist indent| link image table media | backcolor  emoticons codesample blockquote|removeformat",
          content_style:
            "@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500&display=swap'); body { font-family: 'Segoe UI'; height: 'auto'; overflow: 'hidden'; }",
          image_advtab: true,
          images_upload_handler: handleImageUpload,
        }}
      />
    </div>
  );
}
