import React from "react";
import { cn } from "~/helpers/cn";

type IconProps = {
  className?: string;
  children?: React.ReactNode;
};

const Icon = ({ className, children }: IconProps) => {
  return (
    <div
      className={cn(
        "hover:animate-shake rounded-lg border-2 border-black p-1",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Icon;
