import Image from "next/image";
import React from "react";
import parse from "html-react-parser";
import { CommentStatus } from "@prisma/client";
export default function CommentBody({
  body,
  hideComment,
  status,
}: {
  body: string;
  hideComment?: () => void;
  status: CommentStatus;
}) {
  const parseCommentBody = (htmlString: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    // Extract all images
    const images = Array.from(doc.images).map((img, index) => (
      <Image
        key={index}
        src={img.src}
        width={160}
        height={90}
        layout="intrinsic"
        className="my-1 rounded-md"
        alt={img.alt || "comment image"}
      />
    ));

    // Remove all images from body
    doc.querySelectorAll("img").forEach((img) => img.remove());
    const textHtml = doc.body.innerHTML;
    return { textHtml, images };
  };
  const { textHtml, images } = parseCommentBody(body || "");
  const cleanHtml = textHtml
    .replace(/<p>(\s|&nbsp;|<br>)*<\/p>/gi, "")
    .replace(/<div>(\s|&nbsp;|<br>)*<\/div>/gi, "")
    .trim();
  return (
    <div className="mt-1">
      {cleanHtml.length > 0 && (
        <article
          className="px-3 py-2 rounded-r-xl sm:text-sm rounded-bl-xl border shadow bg-card text-xs md:text-sm mb-1 max-w-max font-serif"
          id="comment-body">
          {" "}
          {parse(textHtml)}
          {status === "HIDDEN" && (
            <button
              className="text-sm cursor-pointer text-blue-500 font-bold underline underline-offset-2"
              onClick={hideComment}>
              Hide Comment
            </button>
          )}
        </article>
      )}

      {images.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-2">{images}</div>
      )}
    </div>
  );
}
