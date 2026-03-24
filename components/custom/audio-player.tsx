"use client";
import { useState, useEffect, useRef, SetStateAction, Dispatch } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw, RotateCw, XIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Voice } from "@/assets/icons";

interface AudioPlayerProps {
  audioUrl?: string;
  setShowPlayButton: Dispatch<SetStateAction<boolean>>;
}

const PREFERRED_VOICE_NAMES = [
  // Edge on Windows — best quality available in any browser
  "Microsoft Aria Online (Natural) - English (United States)",
  "Microsoft Jenny Online (Natural) - English (United States)",
  "Microsoft Guy Online (Natural) - English (United States)",
  "Microsoft Natasha Online (Natural) - English (Australia)",
  "Microsoft Libby Online (Natural) - English (United Kingdom)",

  // Chrome / Android — Google voices are solid
  "Google US English",
  "Google UK English Female",
  "Google UK English Male",

  // macOS / iOS — Apple neural voices
  "Samantha", // macOS default, best local voice on Mac
  "Karen", // macOS Australian
  "Daniel", // macOS UK
  "Moira", // macOS Irish
  "Tessa", // macOS South African

  // Android fallbacks — these appear on stock Android without Google TTS
  "English United States",
  "English (United States)",
];

function getPreferredVoice(
  voices: SpeechSynthesisVoice[],
): SpeechSynthesisVoice | null {
  if (!voices.length) return null;

  // 1. Exact name match — covers Edge neural, Google, Apple named voices
  for (const name of PREFERRED_VOICE_NAMES) {
    const match = voices.find((v) => v.name === name);
    if (match) return match;
  }

  // 2. Any online/remote English voice — catches future neural voices
  //    we haven't named yet (e.g. new Edge voices, future Chrome voices)
  const onlineEnglish = voices.find(
    (v) => v.lang.startsWith("en") && !v.localService,
  );
  if (onlineEnglish) return onlineEnglish;

  // 3. Android — Google TTS shows up with a name containing "google"
  //    and is local (localService: true) but still higher quality than
  //    the generic Android fallback engine
  const googleVoice = voices.find(
    (v) => v.lang.startsWith("en") && v.name.toLowerCase().includes("google"),
  );
  if (googleVoice) return googleVoice;

  // 4. Prefer en-US over other English locales
  const enUS = voices.find((v) => v.lang === "en-US");
  if (enUS) return enUS;

  // 5. Any English
  const anyEnglish = voices.find((v) => v.lang.startsWith("en"));
  if (anyEnglish) return anyEnglish;

  // 6. Absolute fallback
  return voices[0];
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
  const [voicesReady, setVoicesReady] = useState(false);
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null);
  // function to load voices
  useEffect(() => {
    function loadVoices() {
      const available = speechSynthesis.getVoices();
      if (available.length === 0) return;
      setVoices(available);
      setSelectedVoice(getPreferredVoice(available));
      setVoicesReady(true);
    }

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  //get the blog to be read and skip code samples
  useEffect(() => {
    const blogElement = document.getElementById("blog-body");
    if (!blogElement) {
      return;
    }
    const clone = blogElement.cloneNode(true) as HTMLElement;
    // Elements to strip before speaking
    clone
      .querySelectorAll(
        [
          "pre",
          ".code-block",
          "figure",
          "figcaption",
          "svg",
          "[aria-hidden='true']",
          ".embed",
        ].join(","),
      )
      .forEach((el) => {
        if (el.matches("pre, .code-block")) {
          el.replaceWith("See code sample below.");
        } else {
          el.remove();
        }
      });
    // Replace headings with a short pause cue so sections feel distinct
    clone.querySelectorAll("h1,h2,h3,h4").forEach((el) => {
      el.textContent = `. ${el.textContent} .`;
    });

    const text = clone.textContent?.trim() ?? "";
    const resolved = text.length > 100 ? text : "";
    setBlogText(resolved);

    const wordCount = resolved.split(/\s+/).length;
    setDuration(Math.round((wordCount / 150) * 60));
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
        setCurrentTime(0);
        utterance.rate = playbackSpeed;
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);
        utteranceRef.current = utterance;
        speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    }
  };

  const skipTo = (newTime: number) => {
    const clamped = Math.max(0, Math.min(duration, newTime));
    setCurrentTime(clamped);

    // If real audio is being used, just seek
    if (audioUrl) {
      if (audioRef.current) audioRef.current.currentTime = clamped;
      return;
    }

    // TTS mode
    if (!blogText) return;

    const wasPlaying = isPlaying;

    const wordsPerSecond = 150 / 60; // ~2.5 words/sec baseline
    const wordIndex = Math.floor(clamped * wordsPerSecond * playbackSpeed);

    const words = blogText.split(/\s+/);
    const slicedText = words.slice(wordIndex).join(" ");

    // Prevent cancel() from firing old onend handlers
    if (utteranceRef.current) {
      utteranceRef.current.onend = null;
      utteranceRef.current.onerror = null;
    }

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(slicedText);
    utterance.lang = "en-US";
    utterance.rate = playbackSpeed;

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    utteranceRef.current = utterance;

    // Only resume speaking if it was playing before
    if (wasPlaying) {
      speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  const skipBackward = () => skipTo(currentTime - 10);
  const skipForward = () => skipTo(currentTime + 30);
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

    if (audioUrl) {
      if (audioRef.current) {
        audioRef.current.currentTime = newTime;
      }
      setCurrentTime(newTime);
      return;
    }
    // TTS mode — reuse skip logic
    skipTo(newTime);
  };
  // Voice selector — only shown in TTS mode (no audioUrl), and only once
  // voices have loaded. Shows top 5 English voices so the user can pick
  // if the auto-selected voice doesn't suit them.
  const englishVoices = voices.filter((v) => v.lang.startsWith("en"));
  // Sound wave animation component
  const SoundWave = () => {
    const delays = [
      0, 0.07, 0.14, 0.21, 0.28, 0.35, 0.42, 0.49, 0.42, 0.35, 0.28, 0.21,
    ];

    return (
      <div className="hidden sm:flex items-center gap-[3px] h-8">
        {delays.map((delay, i) => (
          <div
            key={i}
            className="w-[2.5px] rounded-full bg-cyan-500 self-center"
            style={
              isPlaying
                ? {
                    animation: `eq 0.75s ease-in-out infinite`,
                    animationDelay: `${delay}s`,
                  }
                : { height: "3px", opacity: 0.25 }
            }
          />
        ))}
        <style>{`
        @keyframes eq {
          0%, 100% { height: 3px; opacity: 0.3; }
          50%       { height: 28px; opacity: 1; }
        }
      `}</style>
      </div>
    );
  };

  return (
    <div className="w-full bg-card dark:bg-accent/50 border border-border  shadow relative overflow-hidden mb-2">
      {/* close button */}
      <button
        type="button"
        title="click to close player"
        onClick={() => setShowPlayButton(false)}
        className="absolute top-0 right-1 z-20 p-0.5 cursor-pointer text-primary/80 hover:text-destructive">
        <XIcon className="size-3.5 hover:text-destructive" />
      </button>

      {/* Main player controls */}
      <div className="flex items-center justify-between gap-4 px-2 py-3">
        {/* Play/Pause button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={togglePlayPause}
          title={isPlaying ? "Pause" : "Play"}
          className="h-8 w-8">
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
          className="text-primary/80 cursor-pointer hover:bg-accent/90 px-3 py-1 w-10">
          {playbackSpeed}x
        </Button>
        {/* Voice picker — TTS mode only, hidden when a real audioUrl is provided */}
        {!audioUrl && voicesReady && englishVoices.length > 1 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="cursor-pointer flex items-center gap-1"
                title="Select voice">
                <Voice className="size-7" />
                <span className="text-xs hidden md:block">Voice Options</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              {englishVoices.map((v) => (
                <DropdownMenuItem
                  key={v.name}
                  onClick={() => {
                    const voice =
                      voices.find((voice) => voice.name === v.name) ?? null;
                    setSelectedVoice(voice);
                    if (isPlaying) {
                      speechSynthesis.cancel();
                      setIsPlaying(false);
                      setCurrentTime(0);
                    }
                  }}
                  className="text-sm text-sans">
                  {v.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {/* Skip backward 10s */}
        <button
          onClick={skipBackward}
          type="button"
          onKeyDown={skipBackward}
          className="h-6 w-6 rounded-full hover:bg-accent/90 flex items-center justify-center text-primary/80 hover:text-primary  cursor-pointer relative"
          title="Rewind 10 seconds">
          <RotateCcw className="h-8 w-8" strokeWidth={1} />
          <span className="absolute text-[8px] font-medium">10</span>
        </button>

        {/* Skip forward 30s */}
        <button
          onClick={skipForward}
          type="button"
          className="h-6 w-6 rounded-full hover:bg-accent/90 text-primary/80 hover:text-primary flex items-center justify-center cursor-pointer relative"
          title="Skip Forward 30s">
          <RotateCw className="h-8 w-8" strokeWidth={1} />
          <span className="absolute text-[8px] font-medium">30</span>
        </button>
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
          className="w-full [&>span:first-child]:h-1 [&>span:first-child]:bg-gray-500  [&_[role=slider]]:hidden  [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-cyan-500 dark:[&>span:first-child_span]:bg-cyan-500  [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0"
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
          <track kind="captions" />
        </audio>
      )}
    </div>
  );
}
