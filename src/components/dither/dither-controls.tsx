import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DitherColor, DitherType } from ".";
import DitherColorSelector from "./dither-color";
import { cn } from "~/helpers/cn";
import { Upload } from "lucide-react";

type DitherControlsProps = {
  ditherType: DitherType;
  setDitherType: (type: DitherType) => void;
  ditherColor: DitherColor;
  setDitherColor: (color: DitherColor) => void;
  setImageSrc: (src: string) => void;
  ditherColors: Record<DitherColor, { name: DitherColor; value: string }>;
};

const DitherControls = ({
  ditherColors,
  ditherType,
  setDitherType,
  ditherColor,
  setDitherColor,
  setImageSrc,
}: DitherControlsProps) => {
  return (
    <div className="flex flex-col items-start justify-center gap-2 lg:h-full ">
      <div className="flex flex-col gap-2">
        <label>Type</label>
        <Select
          onValueChange={(value: DitherType) => value && setDitherType(value)}
          value={ditherType}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Floyd-Steinberg" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fsb">Floyd-Steinberg</SelectItem>
            <SelectItem value="ordered">Ordered</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <label>Color</label>
        <div className="flex gap-1">
          {Object.values(ditherColors).map(({ name, value }) => (
            <DitherColorSelector
              key={name}
              color={name}
              className={cn(ditherColor === name ? "border-[4px]" : "")}
              onSelect={(color) => setDitherColor(color)}
            />
          ))}
        </div>
      </div>
      <div className="z-10 mt-2 font-sans text-xl text-black">
        <div className="rounded-xl bg-black">
          <div className="w-full -translate-y-1 cursor-pointer overflow-hidden rounded-xl border-2 border-black bg-green-400 px-2 py-1 font-sans text-xl  text-black transition-all hover:translate-y-0">
            <label
              htmlFor="image-upload"
              className="flex  cursor-pointer items-center gap-2"
            >
              <span>Select Image </span>
              <Upload size={20} aria-hidden="true" />
            </label>
          </div>
        </div>
        <input
          id="image-upload"
          className="hidden"
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (e) => {
              const image = new Image();
              image.src = e.target?.result as string;
              image.onload = () => {
                setImageSrc(image.src);
              };
            };
            reader.readAsDataURL(file);
          }}
        />
      </div>
    </div>
  );
};

export default DitherControls;
