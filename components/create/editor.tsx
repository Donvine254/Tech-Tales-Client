import React, { useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce'
import Script from "next/script";
import PrismLoader from "@/components/custom/prism-loader";
import { FileText, HelpCircle } from 'lucide-react';
import { BlogData } from "@/types";
import { codeSampleLanguages } from "@/constants";
import { handleImageUpload } from "@/lib/helpers/handle-image-upload";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "next-themes";
interface EditorSectionProps {
    data: BlogData;
    onChange: React.Dispatch<React.SetStateAction<BlogData>>;
}

export const EditorSection: React.FC<EditorSectionProps> = ({
    data,
    onChange
}) => {
    const editorRef = useRef<TinyMCEEditor | null>(null);
    const { theme } = useTheme()
    const handleEditorChange = () => {
        if (editorRef.current) {
            const newContent = editorRef.current?.getContent();
            onChange((prev: BlogData) => ({
                ...prev,
                body: newContent
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
                        <label htmlFor='body' className="font-semibold text-primary flex items-center gap-2">
                            Write Your Blog
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <HelpCircle className="h-4 w-4" />
                                    </TooltipTrigger>
                                    <TooltipContent className="max-w-72 text-sm" side="bottom">
                                        <p>Click Alt+0 to view editor help commands</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </label>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-2 px-3 py-1 bg-green-50 rounded-full">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-green-700 font-medium">Auto-saving</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <Editor
                    tinymceScriptSrc="/tinymce/tinymce.min.js"
                    licenseKey="gpl"
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue={data.body}
                    onChange={handleEditorChange}
                    init={{
                        toolbar_mode: "sliding",
                        menubar: true,
                        min_height: 500,
                        resize: true,
                        autocomplete: true,
                        toolbar_sticky: true,
                        toolbar_sticky_offset: 75,
                        skin: theme === "dark"
                            ? "oxide-dark"
                            : "oxide",
                        content_css: theme === "dark"
                            ? "dark"
                            : "default",
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
                            "tableofcontents"
                        ],
                        toolbar:
                            "undo redo| blocks | fontfamily | bold italic forecolor underline| align numlist bullist indent| link image table media pageembed| backcolor  emoticons advcodesample blockquote| code ai importword removeformat",
                        menu: {
                            tools: {
                                title: "Tools",
                                items: "ai advcodesample wordcount help",
                            },
                        },
                        image_advtab: true,
                        images_upload_handler: handleImageUpload,
                        file_picker_types: "image",
                        file_picker_callback: (cb: (url: string, meta?: { title?: string }) => void) => {
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

        </div>
    );
};