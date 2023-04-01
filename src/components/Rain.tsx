"use client";
import { motion, Variants } from "framer-motion";
import { useId } from "react";

const Rain = () => {
  const variants: Variants = {
    hover: (custom) => ({
      y: 800,
      x: custom,
      opacity: [0, 0.8, 0.8, 0.8, 0.2, 0],
      transition: {
        delay: Math.floor(Math.random() * 5) + 0.5,
        repeatDelay: Math.floor(Math.random() * 3) + 3,
        duration: Math.floor(Math.random() * 4) + 3,
        repeat: Infinity,
      },
    }),
    initial: {
      x: 0,
      y: -30,
      opacity: 0,
    },
  };

  return (
    <div className="absolute -top-1 left-0 flex h-full w-full select-none items-end justify-center gap-2 p-4">
      <div className="relative h-full w-full ">
        <motion.div
          variants={{
            hover: {
              y: 0,
            },
            initial: {
              y: -80,
            },
          }}
          className="absolute top-2 -left-10 z-10 flex "
        >
          <div className="relative isolate">
            <div className="absolute  h-12 w-24 rounded-r-full rounded-l-full border-2  border-black  bg-gray-300" />
            <div className="absolute -top-[14px] left-4  h-12 w-12 rounded-full border-2 border-black border-b-transparent bg-gray-300" />
          </div>
        </motion.div>
        <motion.div
          variants={{
            hover: {
              y: 0,
            },
            initial: {
              y: -80,
            },
          }}
          className="absolute -top-2 left-16 z-10 flex"
        >
          <div className="relative isolate">
            <div className="absolute  h-8 w-16 rounded-l-full rounded-r-full border-2  border-black  bg-gray-300" />
            <div className="absolute -top-[8px] left-[10px]  h-8 w-8 rounded-full border-2 border-black border-b-transparent bg-gray-300" />
          </div>
        </motion.div>
        <motion.div
          variants={{
            hover: {
              y: 0,
            },
            initial: {
              y: -80,
            },
          }}
          className="absolute top-1 right-32 z-10  flex"
        >
          <div className="relative isolate">
            <div className="absolute  h-6 w-12 rounded-l-xl rounded-r-xl border-2  border-black  bg-gray-300" />
            <div className="absolute -top-[8px] left-2  aspect-square w-6 rounded-full border-2 border-black border-b-transparent bg-gray-300" />
          </div>
          {/* <div className="aspect-square w-14 -translate-y-2 rounded-full bg-inherit" /> */}
        </motion.div>
        <motion.div
          variants={{
            hover: {
              y: 0,
            },
            initial: {
              y: -80,
            },
          }}
          className="absolute top-0 right-8 z-10 flex "
        >
          <div className="relative isolate">
            <div className="absolute  h-12 w-24 rounded-r-full rounded-l-full border-2  border-black  bg-gray-300" />
            <div className="absolute -top-[14px] left-4  h-12 w-12 rounded-full border-2 border-black border-b-transparent bg-gray-300" />
          </div>
        </motion.div>

        {Array.from(new Array(60)).map((id, index) => {
          const offset = Math.floor(Math.random() * 100);
          return (
            <motion.div
              key={index}
              custom={id}
              variants={variants}
              className="absolute top-0 h-[6px] w-[2px] rounded-b bg-blue-500 opacity-100"
              style={{
                left: offset + "%",
                transform: `translateX(-${offset}%)`,
              }}
            ></motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Rain;
