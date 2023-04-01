"use client";
import { motion } from "framer-motion";

interface PopInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  popInHeight?: number;
}

const PopIn = ({
  children,
  className = "",
  delay,
  staggerChildren,
  popInHeight = 40,
}: PopInProps) => {
  const variants = {
    offscreen: {
      y: popInHeight,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.4,
        staggerChildren,
        delay,
      },
    },
  };

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true }}
      variants={variants}
      className={`${className}`}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
};

export default PopIn;
