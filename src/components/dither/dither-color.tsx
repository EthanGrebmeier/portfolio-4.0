import React from "react";
import type { DitherColor } from ".";
import { cn } from "~/helpers/cn";
type DitherColorProps = {
  color: DitherColor;
  onSelect: (color: DitherColor) => void;
  className?: string;
};

const DitherColorSelector = ({
  onSelect,
  color,
  className,
}: DitherColorProps) => {
  return (
    <button
      style={{ backgroundColor: color }}
      onClick={() => onSelect(color)}
      className={cn(
        `size-8 rounded-full border-2 border-black transition-all`,
        className,
      )}
    ></button>
  );
};

export default DitherColorSelector;
