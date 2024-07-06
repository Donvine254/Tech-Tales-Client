import React, { useState, useEffect, useRef } from "react";

export default function AudioPlayer({ blog }) {
  // function to read the blog
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showVolumeControls, setShowVolumeControls] = useState(false);
  const speechInstance = useRef(null);
  const volumeRef = useRef(null);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  useEffect(() => {
    const handlePlayPause = () => {
      if (isPlaying) {
        const speech = new SpeechSynthesisUtterance(
          blog.body.slice(currentPosition)
        );
        speech.lang = "en-US";
        speech.rate = 1.2;
        speech.pitch = 1;
        speech.volume = volume;
        speech.onend = () => {
          setIsPlaying(false);
          setCurrentPosition(0);
        };
        speech.onboundary = (event) => {
          if (event.name === "sentence") {
            setCurrentPosition(currentPosition + event.charIndex);
          }
        };
        speechInstance.current = speech;
        window.speechSynthesis.speak(speech);
      } else {
        if (speechInstance.current) {
          window.speechSynthesis.cancel();
        }
      }
    };

    handlePlayPause();

    return () => {
      if (speechInstance.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isPlaying, blog.body, currentPosition, volume]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (volumeRef.current && !volumeRef.current.contains(e.target)) {
        setShowVolumeControls(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="">
      <div className="bg-[#2C63AE] my-2 px-4 py-2 rounded-full flex items-center gap-2 text-gray-200 w-fit whitespace-nowrap min-w-[60%] xsm:w-full ">
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
        <div className="relative">
          {volume === 0 ? (
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
              height="24"
              width="24"
              className="cursor-pointer"
              onClick={() => setVolume(1)}
              onMouseEnter={() => setShowVolumeControls(true)}>
              <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
            </svg>
          ) : volume < 0.51 ? (
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
              height="24"
              width="24"
              className="cursor-pointer"
              onClick={() => setVolume(1)}
              onMouseEnter={() => setShowVolumeControls(true)}>
              <path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07" />
            </svg>
          ) : (
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
              height="24"
              width="24"
              className="cursor-pointer"
              onClick={() => setVolume(0)}
              onMouseEnter={() => setShowVolumeControls(true)}>
              <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
              <title>volume</title>
            </svg>
          )}
          <div
            id="volume-input"
            ref={volumeRef}
            className="bg-zinc-200 rounded-full right-8 px-2 absolute top-[-1px] ">
            <input
              type="range"
              id="volume"
              name="volume"
              min={0}
              step={0.02}
              max={1}
              className={`my-1 ${showVolumeControls ? "block" : "hidden"}`}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
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
    </div>
  );
}
