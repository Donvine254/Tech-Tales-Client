import { useState } from "react";
import { Settings, HeadphonesIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface BlogSettingsModalProps {
  onSettingsChange?: (settings: BlogSettings) => void;
}

interface BlogSettings {
  commentsEnabled: boolean;
  audioUrl: string | null;
  seoDescription: string;
}

export function BlogSettingsModal({
  onSettingsChange,
}: BlogSettingsModalProps) {
  const [open, setOpen] = useState(false);
  const [commentsEnabled, setCommentsEnabled] = useState<boolean>(true);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [seoDescription, setSeoDescription] = useState<string>("");
  const [hasAudioError, setHasAudioError] = useState(false);
  const [audioKey, setAudioKey] = useState(0);
  const [audioAccordionOpen, setAudioAccordionOpen] = useState(false);

  const handleUrlChange = (url: string) => {
    setAudioUrl(url);
    setAudioKey((prev) => prev + 1);
    setHasAudioError(false);
  };

  const handleSave = () => {
    const settings: BlogSettings = {
      commentsEnabled,
      audioUrl: audioUrl || null,
      seoDescription,
    };
    onSettingsChange?.(settings);
    setOpen(false);
  };

  const handleCancel = () => {
    setAudioAccordionOpen(false);
    setOpen(false);
  };

  const getSeoLength = () => seoDescription.length;
  const getSeoStatus = () => {
    const length = getSeoLength();
    if (length < 50) return "text-yellow-600";
    if (length > 160) return "text-red-600";
    return "text-green-600";
  };

  return (
    <>
      {/* Floating Settings Button */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            className="fixed bottom-6 left-6 h-12 w-12 rounded-full shadow-lg z-50"
            aria-label="Open post settings">
            <Settings className="h-5 w-5" />
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Post Settings</DialogTitle>
          </DialogHeader>

          <div className="overflow-y-auto flex-1 space-y-6 pr-2">
            {/* Comments Section */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Allow comments from...
                  </p>
                  <RadioGroup
                    value={commentsEnabled ? "everyone" : "none"}
                    onValueChange={(value) =>
                      setCommentsEnabled(value === "everyone")
                    }>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="everyone" id="everyone" />
                      <Label htmlFor="everyone">Everyone</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="none" id="none" />
                      <Label htmlFor="none">No one (disable comments)</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Audio Section */}
            <Card>
              <CardContent className="p-6">
                <Accordion
                  type="single"
                  collapsible
                  value={audioAccordionOpen ? "audio" : ""}
                  onValueChange={(value) =>
                    setAudioAccordionOpen(value === "audio")
                  }>
                  <AccordionItem value="audio" className="border-none">
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-medium text-lg">Audio Voiceover</h3>
                        <p className="text-sm text-muted-foreground">
                          Upload or record a new voiceover: an audio version of
                          your post.
                        </p>
                      </div>

                      <Button
                        variant="outline"
                        type="button"
                        className="w-full items-center justify-center py-3 h-12"
                        onClick={() =>
                          setAudioAccordionOpen(!audioAccordionOpen)
                        }>
                        <HeadphonesIcon className="size-4 mr-2" />
                        Add Audio Narration
                      </Button>

                      <AccordionContent className="space-y-6 pt-2">
                        <div className="space-y-3">
                          <Label htmlFor="audio-url">Audio URL</Label>
                          <Input
                            id="audio-url"
                            type="url"
                            value={audioUrl}
                            onChange={(e) => handleUrlChange(e.target.value)}
                            placeholder="https://example.com/audio.mp3"
                            className={cn(
                              hasAudioError &&
                                "ring-destructive/20 border-destructive"
                            )}
                          />
                        </div>

                        {audioUrl && (
                          <>
                            <hr />
                            <Card>
                              <CardContent className="space-y-3 p-4">
                                <Label>Preview</Label>
                                <audio
                                  controls
                                  className="w-full"
                                  key={audioKey}
                                  onError={() => setHasAudioError(true)}
                                  onCanPlay={() => setHasAudioError(false)}>
                                  <source src={audioUrl} type="audio/ogg" />
                                  <source src={audioUrl} type="audio/mp3" />
                                  <source src={audioUrl} type="audio/wav" />
                                  <source src={audioUrl} type="audio/m4a" />
                                  Your browser does not support the audio
                                  element.
                                </audio>
                                {hasAudioError && (
                                  <p className="text-destructive text-sm">
                                    Failed to load audio. Please check the URL.
                                  </p>
                                )}
                              </CardContent>
                            </Card>
                          </>
                        )}

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setAudioAccordionOpen(false)}>
                            Cancel
                          </Button>
                          <Button size="sm">Save Audio</Button>
                        </div>
                      </AccordionContent>
                    </div>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* SEO Section */}
            <Card>
              <CardContent className="p-6">
                <Accordion type="single" collapsible>
                  <AccordionItem value="seo" className="border-none">
                    <AccordionTrigger className="px-0">
                      <span className="font-medium">SEO Settings</span>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="space-y-3">
                        <Label htmlFor="seo-description">SEO Description</Label>
                        <Textarea
                          id="seo-description"
                          value={seoDescription}
                          onChange={(e) => setSeoDescription(e.target.value)}
                          placeholder="Enter a brief description for search engines..."
                          maxLength={160}
                          className="min-h-[100px]"
                        />
                        <p className={cn("text-xs", getSeoStatus())}>
                          The recommended length for a SEO description is
                          between 50-160 characters. Your SEO description is
                          currently {getSeoLength()} characters.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Settings</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
