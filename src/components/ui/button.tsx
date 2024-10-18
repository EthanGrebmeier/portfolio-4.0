import React, { ButtonHTMLAttributes } from "react";
import { cn } from "~/helpers/cn";

const Button = ({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <div className="rounded-2xl bg-black ">
      <button
        className={cn(
          "-translate-y-1.5 rounded-2xl border-2 border-black px-2 py-1 text-lg font-semibold transition-all hover:-translate-y-1 active:-translate-y-0.5",
          className,
        )}
        {...props}
      ></button>
    </div>
  );
};

export default Button;
