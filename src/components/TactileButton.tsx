"use client";
import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

import FlipText from "./FlipText";

interface TactileButtonProps {
  onClick?: () => void;
  children: string;
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
}

const TactileButton = ({
  onClick,
  children,
  icon,
  disabled,
  className = "bg-blue-500",
}: TactileButtonProps) => {
  const buttonVariants: Variants = {
    initial: {
      y: 0,
    },
    hover: {
      y: 3,
      filter: "drop-shadow(0px 9px 0px #000)",
    },
    tap: {
      y: 9,
      filter: "drop-shadow(0px 3px 0px #000)",
    },
  };
  return (
    <motion.button
      className={` ${className} mb-2 flex w-fit items-center gap-4 rounded-l-full rounded-r-full border-4 border-black  py-1 px-4 drop-shadow-[0px_12px_0px_#000]`}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
      onClick={onClick}
      disabled={disabled}
    >
      <FlipText
        text={children}
        className="-mt-1 text-xl font-bold"
        moveDistance="0.1em"
      ></FlipText>
      {icon ? icon : null}
    </motion.button>
  );
};

export default TactileButton;
