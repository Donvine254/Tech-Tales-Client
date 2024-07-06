import React, { useState } from "react";

export default function AudioPlayer({ blog }) {
  // function to read the blog
  const [isPlaying, setIsPlaying] = useState(true);
  const readArticle = () => {
    if (isPlaying) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = blog.body;
      speech.lang = "en-US";
      speech.rate = 1.5;
      speech.pitch = 1;
      window.speechSynthesis.speak(speech);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      window.speechSynthesis.pause();
    } else {
      readArticle();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-[#2C63AE] my-2 px-4 py-2 rounded-md flex items-center gap-2 text-gray-200 w-fit whitespace-nowrap min-w-[60%] xsm:w-full">
      {isPlaying ? (
        <svg
          viewBox="0 0 1024 1024"
          fill="currentColor"
          onClick={togglePlayPause}
          height="30"
          width="30"
          className="cursor-pointer">
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm-88-532h-48c-4.4 0-8 3.6-8 8v304c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V360c0-4.4-3.6-8-8-8zm224 0h-48c-4.4 0-8 3.6-8 8v304c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V360c0-4.4-3.6-8-8-8z" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          height="30"
          width="30"
          className="bg-transparent cursor-pointer"
          onClick={togglePlayPause}>
          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />

          <path d="M9 17l8-5-8-5z" />
          <title>Listen to this blog</title>
        </svg>
      )}

      <span>0:00 / 0:00</span>
      <span className="bg-gray-300 rounded-md flex-1 h-1.5"></span>
      <svg
        viewBox="0 0 16 16"
        fill="currentColor"
        height="20"
        width="20"
        className="cursor-pointer">
        <path
          fill="currentColor"
          d="M11.243 12.993a.75.75 0 01-.53-1.281 5.256 5.256 0 000-7.425.75.75 0 111.061-1.061c1.275 1.275 1.977 2.97 1.977 4.773s-.702 3.498-1.977 4.773a.748.748 0 01-.53.22zm-2.665-1.415a.75.75 0 01-.53-1.281 3.254 3.254 0 000-4.596.75.75 0 111.061-1.061 4.756 4.756 0 010 6.718.748.748 0 01-.53.22zM6.5 15a.504.504 0 01-.354-.146L2.292 11H.499a.5.5 0 01-.5-.5v-5a.5.5 0 01.5-.5h1.793l3.854-3.854A.499.499 0 017 1.5v13a.5.5 0 01-.5.5z"
        />
        <title>volume controls</title>
      </svg>
      <svg
        fill="currentColor"
        viewBox="0 0 16 16"
        height="1em"
        width="1em"
        className="cursor-pointer">
        <path d="M9.5 13a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        <title>more actions</title>
      </svg>
    </div>
  );
}
