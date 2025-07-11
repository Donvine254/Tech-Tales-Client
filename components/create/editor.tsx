"use client";
import React, { useRef } from "react";
import dynamic from "next/dynamic";
import Script from "next/script";
import PrismLoader from "@/components/custom/prism-loader";
import { FileText, HelpCircle, Loader2 } from "lucide-react";
import { BlogData, FormStatus } from "@/types";
import { codeSampleLanguages } from "@/constants";
import { handleImageUpload } from "@/lib/helpers/handle-image-upload";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "next-themes";
import MonacoLoader from "../custom/monaco-loader";
import { toast } from "sonner";
interface EditorSectionProps {
  data: BlogData;
  onChange: React.Dispatch<React.SetStateAction<BlogData>>;
  formStatus: FormStatus;
  uuid: string;
}
const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[500px] flex flex-col gap-x-5 items-center justify-center bg-gray-500/10">
        <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
        <p>Loading Editor...</p>
      </div>
    ),
  }
);
export const EditorSection: React.FC<EditorSectionProps> = ({
  data,
  onChange,
  formStatus,
  uuid,
}) => {
  // eslint-disable-next-line
  const editorRef = useRef<any | null>(null);
  const { theme } = useTheme();
  const handleEditorChange = () => {
    if (editorRef.current) {
      const newContent = editorRef.current?.getContent();
      onChange((prev: BlogData) => ({
        ...prev,
        body: newContent,
      }));
    }
  };

  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden hover:shadow-md transition-all duration-300">
      <Script
        src="https://unpkg.com/mammoth/mammoth.browser.min.js"
        type="text/javascript"></Script>
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <label
              htmlFor="body"
              className="font-semibold text-primary flex items-center gap-2">
              Write Your Blog
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-72 text-sm" side="bottom">
                    <p>
                      Click Alt+0 to view editor help commands. Use Ctrl+S to
                      save draft
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2 px-3 py-1 md:bg-green-50 rounded-full">
              <div
                className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                title="auto-save"></div>
              <span className="text-green-700 font-medium hidden md:block">
                Auto-saving
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-2 sm:p-4 md:p-6">
        <Editor
          tinymceScriptSrc="/tinymce/tinymce.min.js"
          licenseKey="gpl"
          onInit={(evt, editor) => {
            editorRef.current = editor;
            editor.shortcuts.add(
              "meta+s",
              "Save Content",
              function (e: KeyboardEvent) {
                e?.preventDefault?.();
                if (editorRef.current) {
                  const dataStr = JSON.stringify(data);
                  localStorage.setItem(`Draft-${uuid}`, dataStr);
                  toast.success("Draft saved successfully");
                }
              }
            );
          }}
          disabled={formStatus === "loading"}
          initialValue={data.body ?? ""}
          onChange={handleEditorChange}
          init={{
            toolbar_mode: "sliding",
            menubar: true,
            min_height: 500,
            resize: true,
            autocomplete: true,
            toolbar_sticky: true,
            toolbar_sticky_offset: 75,
            skin: theme === "dark" ? "oxide-dark" : "oxide",
            content_css: theme === "dark" ? "dark" : "default",
            placeholder: "Start by writing or pasting (Ctrl + V) text here....",
            browser_spellcheck: true,
            contextmenu: false,
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
              "advcodesample",
              "emoticons",
              "insertdatetime",
              "media",
              "table",
              "help",
              "wordcount",
              "autoresize",
              "accordion",
              "ai",
              "quickbars",
              "pageembed",
              "importword",
              "code",
              "codesample",
              "tableofcontents",
            ],
            toolbar:
              "undo redo| blocks | bold italic forecolor underline| align numlist bullist indent| link image table media pageembed| backcolor  emoticons advcodesample blockquote| code ai importword removeformat",
            menu: {
              tools: {
                title: "Tools",
                items: "ai advcodesample wordcount help",
              },
            },
            image_advtab: true,
            content_style:
              "@import url('https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap'); body { font-family: 'Spectral'; height: 'auto'; overflow: 'hidden'; }",
            images_upload_handler: handleImageUpload,
            file_picker_types: "image",
            file_picker_callback: (
              cb: (url: string, meta?: { title?: string }) => void
            ) => {
              const input = document.createElement("input") as HTMLInputElement;
              input.setAttribute("type", "file");
              input.setAttribute("accept", "image/*");
              input.addEventListener("change", (e: Event) => {
                const target = e.target as HTMLInputElement;
                if (!target.files || target.files.length === 0) return;

                const file = target.files[0];
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                  const id = "blobid" + new Date().getTime();
                  if (!editorRef.current) return;
                  const blobCache = editorRef?.current.editorUpload.blobCache;
                  const base64 = (reader.result as string).split(",")[1];
                  const blobInfo = blobCache.create(id, file, base64);
                  blobCache.add(blobInfo);
                  cb(blobInfo.blobUri(), { title: file.name });
                });
                reader.readAsDataURL(file);
              });

              input.click();
            },
            codesample_languages: codeSampleLanguages,
            codesample_global_prismjs: true,
          }}
        />
      </div>
      <PrismLoader />
      <MonacoLoader />
    </div>
  );
};
