import React, { useState, useEffect, useRef } from "react";
import { calculateReadingTime } from "@/lib";
export default function AudioPlayer({ blog }) {
  // function to read the blog
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showVolumeControls, setShowVolumeControls] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showPlayBack, setShowPlayBack] = useState(false);
  const [showSelectOptions, setShowSelectOptions] = useState(false);
  const speechInstance = useRef(null);
  const volumeRef = useRef(null);
  const intervalRef = useRef(null);
  const playbackRef = useRef(null);

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
        speech.rate = playbackSpeed;
        speech.pitch = 1;
        speech.volume = volume;
        speech.onend = () => {
          setIsPlaying(false);
          setCurrentPosition(0);
          stopTimer();
        };
        speech.onboundary = (event) => {
          if (event.name === "sentence") {
            setCurrentPosition(currentPosition + event.charIndex);
          }
        };
        speechInstance.current = speech;
        window.speechSynthesis.speak(speech);
        startTimer();
      } else {
        if (speechInstance.current) {
          window.speechSynthesis.cancel();
          stopTimer();
        }
      }
    };

    handlePlayPause();

    return () => {
      if (speechInstance.current) {
        window.speechSynthesis.cancel();
        stopTimer();
      }
    };
  }, [isPlaying, blog.body, currentPosition, volume, playbackSpeed]);

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
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (playbackRef.current && !playbackRef.current.contains(e.target)) {
        setShowPlayBack(false);
        setShowSelectOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPlayBack, showSelectOptions]);
  // function to countdown the time taken to read
  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };
  const totalReadingTime = calculateReadingTime(blog.body); //convert to seconds
  const progressPercentage = (elapsedTime / (totalReadingTime * 60)) * 100;

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

        <span>
          {formatTime(elapsedTime) ?? "0:00"}/ {totalReadingTime}
          :00
        </span>
        <div className="flex-1 overflow-hidden  bg-white h-1.5 p-0 rounded-md">
          <div
            className="bg-green-500 h-1.5 rounded-md"
            style={{ width: `${progressPercentage}%` }}></div>
        </div>

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
              onMouseEnter={() => setShowVolumeControls(true)}
              onTouchStart={() => setShowVolumeControls(true)}>
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
              onMouseEnter={() => setShowVolumeControls(true)}
              onTouchStart={() => setShowVolumeControls(true)}>
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

        <div className="relative">
          <svg
            fill="currentColor"
            viewBox="0 0 16 16"
            height="24"
            width="24"
            className="cursor-pointer rounded-full p-1 hover:bg-gray-400"
            onClick={() => setShowPlayBack(!showPlayBack)}>
            <path d="M9.5 13a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            <title>more actions</title>
          </svg>
          {showPlayBack && (
            <div
              className="absolute  p-2 text-black bottom-5 right-0 rounded-md "
              ref={playbackRef}>
              <button
                className={`${
                  showSelectOptions ? "hidden" : "block"
                } flex items-center justify-center p-2 rounded-md bg-gray-300 border`}
                onClick={() => setShowSelectOptions(!showSelectOptions)}>
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="24"
                  width="24">
                  <path d="M10 16.5l6-4.5-6-4.5M22 12c0-5.54-4.46-10-10-10-1.17 0-2.3.19-3.38.56l.7 1.94c.85-.34 1.74-.53 2.68-.53 4.41 0 8.03 3.62 8.03 8.03 0 4.41-3.62 8.03-8.03 8.03-4.41 0-8.03-3.62-8.03-8.03 0-.94.19-1.88.53-2.72l-1.94-.66C2.19 9.7 2 10.83 2 12c0 5.54 4.46 10 10 10s10-4.46 10-10M5.47 3.97c.85 0 1.53.71 1.53 1.5C7 6.32 6.32 7 5.47 7c-.79 0-1.5-.68-1.5-1.53 0-.79.71-1.5 1.5-1.5z" />
                </svg>
                <span>Playback Speed</span>
              </button>

              {showSelectOptions && (
                <div className="flex flex-col overflow-y-scroll h-[100px]  bg-white rounded-md">
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                    <div
                      key={speed}
                      className={` py-1  pl-2 cursor-pointer hover:bg-gray-200 w-[150px]  ${
                        playbackSpeed === speed
                          ? "text-blue-500 font-semibold "
                          : ""
                      }`}
                      onClick={() => {
                        setPlaybackSpeed(speed);
                        setShowPlayBack(false);
                        setShowSelectOptions(false);
                      }}>
                      <p className="flex items-center justify-between gap-2">
                        <span> {speed === 1 ? "Normal" : speed}</span>
                        {playbackSpeed === speed && (
                          <svg
                            fill="none"
                            viewBox="0 0 15 15"
                            height="24"
                            width="24"
                            className="ml-12">
                            <path stroke="currentColor" d="M4 7.5L7 10l4-5" />
                          </svg>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
