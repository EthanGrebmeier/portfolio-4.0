"use client";
import { motion, type Variants } from "framer-motion";
import { Fragment } from "react";

const FlipText = ({
  text,
  className = "",
  moveDistance = "-0.25em",
}: {
  text: string;
  className?: string;
  moveDistance?: string;
}) => {
  const characterAnimation: Variants = {
    initial: {
      // opacity: [1, 1],
      y: `0`,
    },
    hover: (custom) => ({
      // opacity: [0, 1],
      y: moveDistance,
      transition: {
        delay: custom * 0.08,
        duration: 0.15,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }),
  };

  return (
    <motion.span
      className={`-mt-[0.25em] inline-block text-center ${className}`}
    >
      {text?.split(" ").map((word, wordIndex) => (
        <Fragment key={`${word + wordIndex}`}>
          <motion.span
            transition={{ staggerChildren: wordIndex * 1 }}
            className={`${
              wordIndex === text.split(" ").length - 1 ? "" : ""
            } inline-block whitespace-nowrap`}
            key={wordIndex}
            variants={{ initial: {}, hover: {} }}
          >
            {" "}
            {word.split("").map((letter, letterIndex) => (
              <motion.span
                className="inline-block"
                variants={characterAnimation}
                // initial="initial"
                key={letterIndex}
                custom={letterIndex}
              >
                {" "}
                {letter}
              </motion.span>
            ))}{" "}
          </motion.span>{" "}
        </Fragment>
      ))}
    </motion.span>
  );
};

export default FlipText;
