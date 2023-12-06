"use client";
import { useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import "editorjs-style";
import tools from "@/lib/tools";

export default function Editor() {
  useEffect(() => {
    const editorContainer = document.getElementById("editorjs");

    if (editorContainer) {
      const editor = new EditorJS({
        holder: "editorjs",
        tools,
        onReady: () => {
          console.log("editor ready");
          // Handle editor events here
        },
      });

      editorContainer.addEventListener("input", () => {
        const contentHeight = editorContainer.scrollHeight;
        editorContainer.style.height = contentHeight + "px";
      });
    }
  }, []);

  return (
    <div
      id="editorjs"
      className="cdx-input text-black text-xl h-[200px] bg-base-100"></div>
  );
}
