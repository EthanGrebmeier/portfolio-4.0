"use client";
import { motion, type Variants } from "framer-motion";

const Notes = () => {
  const variants: Variants = {
    hover: (custom) => ({
      y: -100,
      x: custom,
      opacity: 0,
      transition: {
        delay: Math.floor(Math.random() * 2),
        repeatDelay: Math.floor(Math.random() * 3) + 3,
        duration: Math.floor(Math.random() * 3) + 4,
        repeat: Infinity,
      },
    }),
    initial: {
      x: 0,
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="absolute top-0 left-0 flex h-full w-full items-end justify-center gap-2 p-4">
      <div className="relative h-full w-full ">
        {[-50, 40, 20, -30, -60].map((id) => (
          <motion.div
            key={id}
            custom={id}
            variants={variants}
            initial={{
              opacity: 1,
            }}
            className="absolute left-1/2 -translate-x-1/2 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
              />
            </svg>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
