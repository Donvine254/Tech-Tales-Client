"use client";
import { useState, useEffect, useRef, SetStateAction, Dispatch } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw, RotateCw, XIcon } from "lucide-react";

interface AudioPlayerProps {
  audioUrl?: string;
  setShowPlayButton: Dispatch<SetStateAction<boolean>>;
}

export default function AudioPlayer({
  audioUrl,
  setShowPlayButton,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(326); // 5:26 in seconds
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [blogText, setBlogText] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      const v = speechSynthesis.getVoices();
      if (v.length > 0) {
        setVoices(v);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  useEffect(() => {
    const blogElement = document.getElementById("blog-body");
    setBlogText(blogElement?.textContent ?? "");
  }, []);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
    if (utteranceRef.current) {
      utteranceRef.current.rate = playbackSpeed;
    }
  }, [playbackSpeed]);

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  // Simulate audio progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!audioUrl && isPlaying) {
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
  }, [isPlaying, duration, playbackSpeed, audioUrl]);

  const togglePlayPause = () => {
    if (audioUrl) {
      if (!audioRef.current) return;
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    } else if (blogText) {
      if (isPlaying) {
        speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(blogText);
        utterance.lang = "en-US";
        utterance.rate = playbackSpeed;
        utterance.voice =
          voices.find((v) => v.lang.startsWith("en")) || voices[0];
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);
        utteranceRef.current = utterance;
        speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    }
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
    const newTime = value[0];
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  // Sound wave animation component
  const SoundWave = () => {
    const bars = Array.from({ length: 5 }, (_, i) => i);
    return (
      <div className="hidden sm:flex items-center gap-1 h-8 overflow-hidden">
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
    <div className="w-full bg-card dark:bg-accent border border-border rounded-lg shadow relative overflow-hidden mb-2">
      {/* close button */}
      <button
        type="button"
        title="click to close player"
        onClick={() => setShowPlayButton(false)}
        className="absolute top-0 right-0.5 z-20 p-0.5 bg-card border border-border hover:shadow hover:scale-110 transition-all duration-700 rounded-full cursor-pointer text-primary/80 hover:text-destructive">
        <XIcon className="size-3.5" />
      </button>

      {/* Main player controls */}
      <div className="flex items-center justify-between gap-4 px-2 py-3">
        {/* Play/Pause button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={togglePlayPause}
          className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-400 dark:hover:text-gray-950">
          {isPlaying ? (
            <Pause className="fill-current ml-1" />
          ) : (
            <Play className="fill-current ml-1" />
          )}
        </Button>
        {/* Sound wave */}
        <SoundWave />
        {/* Title */}
        <div className="hidden md:block flex-1 text-center">
          <span className="text-primary/80 font-medium">Listen to article</span>
        </div>

        {/* Speed control */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSpeed}
          title="Change Playback Speed"
          className="text-primary/80 cursor-pointer hover:bg-accent/90 px-3 py-1 rounded-full ">
          {playbackSpeed}x
        </Button>

        {/* Skip backward 10s */}
        <div
          onClick={skipBackward}
          className="h-6 w-6 rounded-full hover:bg-accent/90 flex items-center justify-center text-primary/80 hover:text-primary  cursor-pointer relative"
          title="Rewind 10 seconds">
          <RotateCcw className="h-8 w-8" strokeWidth={1} />
          <span className="absolute text-[8px] font-medium">10</span>
        </div>

        {/* Skip forward 30s */}
        <div
          onClick={skipForward}
          className="h-6 w-6 rounded-full hover:bg-accent/90 text-primary/80 hover:text-primary flex items-center justify-center cursor-pointer relative"
          title="Skip Forward 30s">
          <RotateCw className="h-8 w-8" strokeWidth={1} />
          <span className="absolute text-[8px] font-medium">30</span>
        </div>
        {/* Time display */}
        <div className="text-primary/80 font-medium min-w-[3rem]">
          {formatTime(currentTime)}
        </div>
      </div>

      {/* Progress bar */}
      <div>
        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={handleProgressChange}
          className="w-full [&>span:first-child]:h-1 [&>span:first-child]:bg-gray-500  [&_[role=slider]]:hidden  [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-gray-900 dark:[&>span:first-child_span]:bg-cyan-500  [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0"
        />
      </div>

      {/* Hidden audio element for future integration */}
      {audioUrl && (
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
          }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}>
          <source src={audioUrl} type="audio/x-m4a" />
        </audio>
      )}
    </div>
  );
}
