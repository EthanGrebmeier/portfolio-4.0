"use client";
import { motion } from "framer-motion";
import React from "react";

type PrintOutImageProps = {
  ditheredSource: string;
  children?: React.ReactNode;
};

const PrintOutImage = ({ ditheredSource, children }: PrintOutImageProps) => {
  return (
    <motion.div
      initial={{
        translateY: "100%",
        opacity: 0,
      }}
      animate={{
        translateY: 0,
        opacity: 1,
      }}
      exit={{
        translateY: "100%",
        opacity: 0,
      }}
      transition={{
        type: "spring",
        bounce: 0.1,
        duration: 1.3,
        ease: "easeInOut",
      }}
      className="relative min-h-0 w-fit justify-center overflow-hidden rounded-3xl border-2 border-black"
    >
      <img src={ditheredSource} className="object-contain object-center" />
      {children}
    </motion.div>
  );
};

export default PrintOutImage;
