import React, { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Session } from "@/types";
import { handleImageUpload } from "@/lib/helpers/handle-image-upload";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";

interface CommentEditorProps {
  session: Session;
  initialData: string;
  onEditorChange: (value: string) => void;
  onSubmit: () => void;
  isEditing?: boolean;
}

export const CommentEditor: React.FC<CommentEditorProps> = ({
  session,
  initialData,
  onEditorChange,
  isEditing = false,
  onSubmit,
}) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [length, setLength] = useState(0);
  const { theme } = useTheme();
  //   eslint-disable-next-line
  const editorRef = useRef<any>(null);
  const handleChange = (content: string) => {
    onEditorChange(content);
  };
  return (
    <form>
      {/* TODO: create response edit with ml-12 */}
      <div className="flex space-x-4">
        {/* User Avatar */}
        <div className="flex-shrink-0">
          <Avatar className="h-12 w-12 ring-2 ring-cyan-500 ring-offset-2">
            <AvatarImage
              src={session.picture ?? "/placeholder.svg"}
              alt={session.username}
            />
            <AvatarFallback className="bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 text-sm">
              {session.username
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Editor Section */}
        <div className="flex-1 space-y-2">
          <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200">
            <Editor
              tinymceScriptSrc="/tinymce/tinymce.min.js"
              licenseKey="gpl"
              disabled={length > 500}
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={initialData}
              onChange={() => handleChange(editorRef.current.getContent())}
              onFocus={() => setIsInputFocused(true)}
              onKeyUp={() =>
                setLength(
                  editorRef.current.getContent({ format: "text" }).length
                )
              }
              init={{
                min_height: 50,
                toolbar_location: "bottom",
                toolbar_mode: "sliding",
                menubar: false,
                statusbar: false,
                placeholder: "Share your thoughts about this article...",
                browser_spellcheck: true,
                autocomplete: true,
                plugins: [
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "autoresize",
                  "emoticons",
                  "fullscreen",
                  "insertdatetime",
                  "gif",
                ],
                toolbar:
                  "bold italic underline|numlist bullist|blockquote link image|gif emoticons",
                image_advtab: true,
                content_style:
                  "@import url('https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap'); body { font-family: 'Spectral'; height: 'auto'; overflow: 'hidden'; }",
                images_upload_handler: handleImageUpload,
                skin: theme === "dark" ? "oxide-dark" : "oxide",
                content_css: theme === "dark" ? "dark" : "default",
                branding: false,
              }}
            />
          </div>
          {/* Character Count and Action Buttons */}
          {isInputFocused && (
            <div className="flex items-center justify-between gap-2 md:gap-4 py-1">
              {/* Action Buttons */}
              <p className="p-0 text-xs">
                <span
                  className={`${
                    length > 500 ? "text-red-500" : ""
                  }text-xs md:text-sm`}>
                  {length}
                </span>
                <span className="text-xs md:text-sm text-muted-foreground">
                  /500 words
                </span>
              </p>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  type="reset"
                  onClick={() => setIsInputFocused(false)}
                  variant="outline">
                  Cancel
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    onSubmit();
                  }}
                  type="submit"
                  disabled={!initialData.trim() || length > 500}
                  size="sm"
                  variant="default"
                  className="hover:bg-blue-500 hover:text-white">
                  {isEditing ? "Update" : "Respond"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};
