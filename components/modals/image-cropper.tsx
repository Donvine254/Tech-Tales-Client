"use client";

import React, { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { createCroppedImage } from "@/lib/helpers/image-cropper";
import { Crop, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { validateImage } from "@/lib/helpers/cloudinary";
import { toast } from "sonner";

interface CropModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  file: File | null; // we pass the actual file now
  onCropComplete: (croppedFile: File) => void;
}

export const ImageCropModal: React.FC<CropModalProps> = ({
  open,
  onOpenChange,
  file,
  onCropComplete,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropCompleteHandler = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleCropConfirm = async () => {
    if (!croppedAreaPixels || !file) return;

    setIsProcessing(true);
    try {
      const imageSrc = URL.createObjectURL(file);
      const croppedFile = await createCroppedImage(
        imageSrc,
        croppedAreaPixels,
        file.type,
        file.name
      );
      const result = await validateImage(croppedFile);
      if (!result.isValid) {
        toast.info("Cropped image still does not meet requirements");
        setIsProcessing(false);
        return;
      }

      onCropComplete(croppedFile);
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating cropped image:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!file) return null; // no file to crop

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm dark:bg-black/70 transition-all" />
      <DialogContent className="max-w-6xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Crop Image to 16:9 Aspect Ratio</DialogTitle>
        </DialogHeader>
        <div className="relative flex-1 min-h-[50vh] bg-muted rounded-lg overflow-hidden p-4 ">
          <Cropper
            image={URL.createObjectURL(file)}
            crop={crop}
            zoom={zoom}
            aspect={16 / 9}
            onCropChange={setCrop}
            onCropComplete={onCropCompleteHandler}
            onZoomChange={setZoom}
            cropShape="rect"
            showGrid={true}
            zoomSpeed={0.05}
            style={{
              containerStyle: {
                background: "hsl(var(--muted))",
              },
            }}
          />
        </div>
        <div className="space-y-4 p-4 flex-shrink-0">
          <div className="space-y-4">
            <Label className="text-sm font-medium">Zoom</Label>
            <Slider
              value={[zoom]}
              onValueChange={(value) => setZoom(value[0])}
              min={1}
              max={3}
              step={0.05}
              className="w-full"
            />
          </div>
        </div>

        <DialogFooter className="gap-2 flex-shrink-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isProcessing}>
            Cancel
          </Button>
          <Button
            onClick={handleCropConfirm}
            className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
            disabled={isProcessing || !croppedAreaPixels}>
            {isProcessing ? (
              <>
                {" "}
                <Loader2 className="size-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Crop className="size-4" />
                Apply Crop
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
