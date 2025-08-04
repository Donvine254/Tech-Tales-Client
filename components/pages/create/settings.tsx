import { useState } from "react";
import {
  Settings,
  HeadphonesIcon,
  AudioLines,
  HelpCircle,
  Globe,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
import { BlogSettings } from "@/types";
import { toast } from "sonner";

interface BlogSettingsModalProps {
  settingsData: BlogSettings;
  onChangeHandler: (data: Partial<BlogSettings>) => void;
}

/*
This needs to know about the description, show_comments and audio fields from the blogs. It needs to mass update the blog page with these values if they change. Description and audio can be a string or null
 */

export function BlogSettingsModal({
  settingsData,
  onChangeHandler,
}: BlogSettingsModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<BlogSettings>(settingsData);
  const [hasAudioError, setHasAudioError] = useState(false);
  const [audioKey, setAudioKey] = useState(0);

  const updateField = <K extends keyof BlogSettings>(
    key: K,
    value: BlogSettings[K]
  ) => {
    if (key === "audio") {
      setAudioKey((prev) => prev + 1);
    }
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleSave = () => {
    onChangeHandler(formData);
    setAudioKey(0);
    toast.success("Changes saved!");
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  const getSeoLength = () => formData.description?.length ?? 0;
  const getSeoStatus = () => {
    const length = getSeoLength();
    if (length < 150) return "text-yellow-600";
    if (length > 160) return "text-red-600";
    return "text-green-600";
  };
  const isSubmissionDisabled =
    (formData.audio && hasAudioError) ||
    (formData.description?.trim() && getSeoLength() < 150);
  return (
    <>
      {/* Floating Settings Button */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            className="rounded-md inline-flex gap-2 items-center text-sm text-muted-foreground cursor-pointer md:py-1.5 md:px-2 md:border md:border-border"
            aria-label="Open post settings">
            <Settings className="h-4 w-4" />
            <span className="hidden md:block">Settings</span>
          </button>
        </DialogTrigger>

        <DialogContent className="min-w-full h-full overflow-hidden flex flex-col p-0 bg-accent">
          <DialogHeader className="border-b bg-card border-border shadow ">
            <DialogTitle className="flex items-center justify-center text-center md:text-2xl lg:text-3xl text-xl p-2 md:p-4">
              Post Settings
            </DialogTitle>
          </DialogHeader>
          <DialogDescription />
          <TooltipProvider>
            <div className="overflow-y-auto flex-1 px-2 ">
              {/* Comments Section */}
              <div className="mx-auto max-w-3xl space-y-6 pb-4">
                <Card className="p-0">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <p className="text-sm font-medium text-muted-foreground">
                        Allow comments from...
                      </p>
                      <RadioGroup
                        value={formData.show_comments ? "everyone" : "none"}
                        onValueChange={(val) =>
                          updateField("show_comments", val === "everyone")
                        }>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="everyone" id="everyone" />
                          <Label htmlFor="everyone">Everyone</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="none" id="none" />
                          <Label htmlFor="none">
                            No one (disable comments)
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                </Card>

                {/* Audio Section */}
                <Card className="p-0">
                  <CardContent className="p-4">
                    <Accordion type="single" collapsible>
                      <AccordionItem value="audio" className="border-none">
                        <div className="space-y-4">
                          <Label className="font-medium text-lg flex items-center gap-2">
                            <AudioLines className="h-5 w-5" /> Audio Voiceover{" "}
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4" />
                              </TooltipTrigger>
                              <TooltipContent
                                className="max-w-72 text-sm"
                                side="bottom">
                                <p>
                                  Add audio narration to make your blog posts
                                  more engaging and accessible
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Upload a new voiceover: an audio version of your
                            post. Enter a direct link to your audio file (MP3,
                            WAV, OGG, etc.)
                          </p>
                        </div>
                        <AccordionTrigger className="w-fit">
                          <div className="flex font-medium items-center gap-2">
                            <HeadphonesIcon className="size-4" />
                            {formData.audio ? "Edit" : "Add"} Audio Narration
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-2 sm:px-2">
                          <div className="space-y-3">
                            <Label htmlFor="audio-url">Audio URL *</Label>
                            <Input
                              id="audio-url"
                              type="url"
                              name="audio"
                              value={formData.audio || ""}
                              onChange={(e) =>
                                updateField("audio", e.target.value)
                              }
                              placeholder="https://example.com/audio.mp3"
                              className={cn(
                                hasAudioError &&
                                  "ring-destructive/20 border-destructive"
                              )}
                            />
                          </div>
                          {formData.audio && (
                            <>
                              <hr />
                              <Card className="p-0 bg-blue-200 dark:bg-blue-900/40">
                                <CardContent className="space-y-3 p-4">
                                  <Label>Audio Preview</Label>
                                  <audio
                                    controls
                                    className="w-full"
                                    key={audioKey}
                                    onError={() => setHasAudioError(true)}
                                    onCanPlay={() => setHasAudioError(false)}>
                                    <source
                                      src={formData.audio}
                                      type="audio/ogg"
                                    />
                                    <source
                                      src={formData.audio}
                                      type="audio/mp3"
                                    />
                                    <source
                                      src={formData.audio}
                                      type="audio/wav"
                                    />
                                    <source
                                      src={formData.audio}
                                      type="audio/m4a"
                                    />
                                    Your browser does not support the audio
                                    element.
                                  </audio>
                                  {hasAudioError && (
                                    <p className="text-destructive text-sm">
                                      Failed to load audio. Please check the
                                      URL.
                                    </p>
                                  )}
                                </CardContent>
                              </Card>
                            </>
                          )}{" "}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
                {/* SEO Section */}
                <Card>
                  <CardContent className="">
                    <Accordion type="single" collapsible>
                      <AccordionItem value="seo" className="border-none">
                        <AccordionTrigger>
                          <Label className="font-medium text-lg flex items-center gap-2">
                            <Globe className="size-5" /> SEO Options & Settings
                          </Label>
                        </AccordionTrigger>
                        <AccordionContent className="sm:px-2">
                          <div className="space-y-2">
                            <Label
                              htmlFor="seo-description"
                              className="font-semibold text-primary flex items-center gap-2">
                              SEO Description
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="h-4 w-4" />
                                </TooltipTrigger>
                                <TooltipContent
                                  className="max-w-72 text-sm"
                                  side="bottom">
                                  <p>
                                    This corresponds to the meta description on
                                    the post. This will will be auto generated
                                    if left blank
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </Label>
                            <Textarea
                              id="seo-description"
                              name="description"
                              value={formData.description || ""}
                              onChange={(e) =>
                                updateField("description", e.target.value)
                              }
                              className="text-xs md:text-sm"
                              placeholder="Enter a brief description for search engines..."
                              maxLength={170}
                              minLength={150}
                              rows={2}
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
                <div className="flex gap-2 items-center">
                  <DialogClose asChild>
                    <Button variant="outline" title="close dialog">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    disabled={!!isSubmissionDisabled}
                    onClick={handleSave}
                    className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white">
                    Save Settings
                  </Button>
                </div>
              </div>
            </div>
          </TooltipProvider>
          {/* Action Buttons */}
        </DialogContent>
      </Dialog>
    </>
  );
}
