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
      y: -10,
    },
    hover: {
      y: -5,
    },
    tap: {
      y: 0,
    },
  };
  return (
    <button
      className={`mb-2 w-fit rounded-full bg-black p-0`}
      onClick={onClick}
      disabled={disabled}
    >
      <motion.div
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
        className={`flex w-fit items-center gap-4 rounded-l-full rounded-r-full border-4 border-black  px-4 py-1 ${className}`}
      >
        <FlipText
          text={children}
          className=" text-xl font-bold"
          moveDistance="0.1em"
        ></FlipText>
        {icon ? icon : null}
      </motion.div>
    </button>
  );
};

export default TactileButton;
