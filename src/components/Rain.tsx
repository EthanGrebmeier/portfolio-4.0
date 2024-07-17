"use client";
import { motion, type Variants } from "framer-motion";
import { memo } from "react";

const variants: Variants = {
  hover: (custom) => ({
    y: 600,
    x: custom,
    opacity: [0, 0.4, 0.6, 0.6, 0.4, 0],
    transition: {
      delay: Math.random() * 3,
      repeatDelay: Math.random() * 3,
      duration: 2,
      repeat: Infinity,
      ease: "circIn",
    },
  }),
  initial: {
    x: 0,
    y: 0,
    opacity: 0,
  },
};
const Rain = () => {
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
          className="absolute -left-10 top-2 z-10 flex "
        >
          <div className="relative isolate">
            <div className="absolute  h-12 w-24 rounded-l-full rounded-r-full border-2  border-black  bg-gray-300" />
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
          className="absolute right-32 top-1 z-10  flex"
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
          className="absolute right-8 top-0 z-10 flex "
        >
          <div className="relative isolate">
            <div className="absolute  h-12 w-24 rounded-l-full rounded-r-full border-2  border-black  bg-gray-300" />
            <div className="absolute -top-[14px] left-4  h-12 w-12 rounded-full border-2 border-black border-b-transparent bg-gray-300" />
          </div>
        </motion.div>

        {Array.from(new Array(120)).map((id, index) => {
          const offset = Math.random() * 120 - 10;
          return (
            <motion.div
              key={index}
              custom={id}
              variants={variants}
              className="absolute top-0 h-[6px] w-[2px] rounded-full bg-blue-500"
              style={{
                left: offset + "%",
                // top: `${offset / 80 + index / 25}%`,
              }}
            ></motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(Rain);
