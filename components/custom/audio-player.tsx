"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw, RotateCw } from "lucide-react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(326); // 5:26 in seconds
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Simulate audio progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, playbackSpeed]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const skipBackward = () => {
    setCurrentTime((prev) => Math.max(0, prev - 10));
  };

  const skipForward = () => {
    setCurrentTime((prev) => Math.min(duration, prev + 30));
  };

  const toggleSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIndex]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleProgressChange = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  // Sound wave animation component
  const SoundWave = () => {
    const bars = Array.from({ length: 5 }, (_, i) => i);
    return (
      <div className="flex items-center gap-1 h-8">
        {bars.map((bar) => (
          <div
            key={bar}
            className={`w-1 bg-primary rounded-full transition-all duration-150 ${
              isPlaying ? "animate-pulse" : ""
            }`}
            style={{
              height: isPlaying ? `${Math.random() * 20 + 10}px` : "8px",
              animationDelay: `${bar * 100}ms`,
              animationDuration: `${Math.random() * 500 + 300}ms`,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full bg-accent/90 border border-gray-200 dark:border-gray-400/50 rounded-lg shadow-sm">
      {/* Main player controls */}
      <div className="flex items-center gap-4 p-2">
        {/* Play/Pause button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={togglePlayPause}
          className="h-12 w-12 rounded-full hover:bg-gray-100 dark:hover:bg-gray-400">
          {isPlaying ? (
            <Pause className="h-10 w-10 fill-current" />
          ) : (
            <Play className="h-10 w-10 fill-current ml-1" />
          )}
        </Button>

        {/* Sound wave */}
        <SoundWave />

        {/* Title */}
        <div className="flex-1 text-center">
          <span className="text-muted-foreground font-medium">
            Listen to article
          </span>
        </div>

        {/* Speed control */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSpeed}
          className="text-primary cursor-pointer hover:bg-gray-100 px-3 py-1 rounded-full ">
          {playbackSpeed}x
        </Button>

        {/* Skip backward 10s */}
        <div
          onClick={skipBackward}
          className="h-10 w-10 rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer relative">
          <RotateCcw className="h-8 w-8 text-muted-foreground" />
          <span className="absolute text-xs font-bold text-primary">10</span>
        </div>

        {/* Skip forward 30s */}
        <div
          onClick={skipForward}
          className="h-10 w-10 rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer relative">
          <RotateCw className="h-8 w-8 text-muted-foreground" />
          <span className="absolute text-xs font-bold text-primary">30</span>
        </div>
        {/* Time display */}
        <div className="text-primary font-medium min-w-[3rem]">
          {formatTime(currentTime)}
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-4 pb-4">
        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={handleProgressChange}
          className="w-full [&>span:first-child]:h-1 [&>span:first-child]:bg-gray-300 [&_[role=slider]]:bg-gray-700 dark:[&_[role=slider]]:bg-cyan-700  [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-gray-700 dark:[&>span:first-child_span]:bg-cyan-500 [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0"
        />
      </div>

      {/* Hidden audio element for future integration */}
      <audio
        ref={audioRef}
        className="hidden"
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(Math.floor(audioRef.current.duration));
          }
        }}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(Math.floor(audioRef.current.currentTime));
          }
        }}>
        <source
          src="https://utfs.io/f/d3cb8e79-6000-4453-b933-fe0e1ed7720e-3sqahx.net).m4a"
          type="audio/m4a"
        />
      </audio>
    </div>
  );
}
