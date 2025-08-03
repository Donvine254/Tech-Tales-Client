import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AudioLines, HeadphonesIcon, HelpCircle } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useState } from "react";
import { Card, CardContent } from "../../ui/card";
import { cn } from "@/lib/utils";

export default function AudioComponent({
  audio,
  onAudioUpload,
}: {
  audio: string | null;
  onAudioUpload: (audio: string | null) => void;
}) {
  const [audioUrl, setAudioUrl] = useState<string | null>(audio);
  const [hasAudioError, setHasAudioError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  //   force audio to render when input value changes
  const [audioKey, setAudioKey] = useState(0);
  const handleUrlChange = (value: string) => {
    console.log(value);
    setAudioUrl(value);
    setAudioKey((prev) => prev + 1);
  };
  const handleSave = () => {
    onAudioUpload(audioUrl);
    setIsOpen(false);
  };
  const isSubmissionDisabled = !audio && !audioUrl;
  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border p-6 hover:shadow-md transition-all duration-300">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <AudioLines className="h-5 w-5 text-blue-600" />
        </div>
        <label
          htmlFor="image"
          className="font-semibold text-primary flex items-center gap-2">
          Audio (optional)
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent className="max-w-72 text-sm" side="bottom">
                <p>
                  Add audio narration to make your blog posts more engaging and
                  accessible
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </label>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogOverlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm dark:bg-black/70 transition-all" />
        <DialogTrigger asChild>
          <Button
            variant="outline"
            type="button"
            className="w-full items-center">
            {" "}
            <HeadphonesIcon className="size-4" /> Add Audio Narration
          </Button>
        </DialogTrigger>
        <DialogContent className="py-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AudioLines className="h-5 w-5" />
              Audio Narration
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-center space-y-1">
              {" "}
              Right now, we only support adding a url to your cloud hosted audio
              file. Enter a direct link to your audio file (MP3, WAV, OGG, etc.)
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Label htmlFor="audio-url">Audio URL</Label>
            <Input
              id="audio-url"
              type="url"
              value={audioUrl || ""}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="https://example.com/audio.mp3"
              className={cn(
                hasAudioError && "ring-destructive/20 border-destructive"
              )}
            />
          </div>
          <hr />
          {audioUrl && (
            <Card>
              <CardContent className="space-y-3">
                <Label htmlFor="audio-url">Preview</Label>
                <audio
                  controls
                  className="w-full"
                  key={audioKey}
                  onError={() => setHasAudioError(true)}
                  onCanPlay={() => setHasAudioError(false)}>
                  <source src={audioUrl} type="audio/ogg" />
                  <source src={audioUrl} type="audio/mp3" />{" "}
                  <source src={audioUrl} type="audio/wav" />
                  <source src={audioUrl} type="audio/m4a" />
                  Your browser does not support the audio element.
                </audio>
                {hasAudioError && (
                  <p className="text-red-500 text-sm">
                    Failed to load audio. Please check the URL.
                  </p>
                )}
              </CardContent>
            </Card>
          )}
          <DialogFooter className="border-t flex-row justify-end border-border pt-4">
            <DialogClose asChild>
              <Button size="sm" variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button
              size="sm"
              type="button"
              onClick={handleSave}
              disabled={isSubmissionDisabled || hasAudioError}
              className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white">
              Save Audio
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
