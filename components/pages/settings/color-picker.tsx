import { Input } from "@/components/ui/input";
import React from "react";

interface ColorPickerProps {
  color: string;
  setColor: (val: string) => void;
}

export default function ColorPicker({ color, setColor }: ColorPickerProps) {
  return (
    <div className="relative  flex items-center">
      {/* Text Input */}
      <Input
        id="brandingColor"
        name="brandingColor"
        type="text"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        placeholder="#000000"
        className="pl-12 w-full"
      />

      {/* Hidden Color Input */}
      <input
        id="hiddenColorInput"
        name="hiddenColorInput"
        type="color"
        className="absolute left-0 h-full w-8 opacity-0 cursor-pointer"
        onChange={(e) => setColor(e.target.value)}
      />

      {/* Color Preview Swatch */}
      <div
        className="absolute left-0 h-6 ml-1 rounded-md w-8 bg-transparent cursor-pointer"
        style={{ backgroundColor: color || "#000000" }}
        title="Pick color"
        onClick={() => document.getElementById("hiddenColorInput")?.click()}
      />
    </div>
  );
}
