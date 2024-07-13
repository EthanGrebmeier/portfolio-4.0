import React, { ReactNode } from "react";
import { cn } from "~/helpers/cn";

type ImageTextProps = {
  image?: ReactNode;
  text: ReactNode;
  isFlipped?: boolean;
  withBorder?: boolean;
};

const ImageText = ({
  image,
  text,
  isFlipped = false,
  withBorder,
}: ImageTextProps) => {
  return (
    <div
      className={cn(
        "relative grid gap-8 md:grid-cols-[2fr_1fr] md:gap-14",
        isFlipped && "md:grid-cols-[1fr_2fr]",
      )}
    >
      <div
        className={cn(
          "top-4 mx-auto w-full max-w-[340px] overflow-hidden rounded-xl border-black md:sticky md:max-w-none",
          isFlipped && "md:order-2",
          withBorder && "border",
        )}
      >
        {image}
      </div>
      <div className={cn("flex flex-col gap-2", isFlipped && "md:order-1")}>
        {text}
      </div>
    </div>
  );
};

export default ImageText;
