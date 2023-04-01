"use client";
import { motion, type Variants } from "framer-motion";

const CodeBackground = () => {
  const variants: Variants = {
    hover: (custom) => ({
      y: 400,
      x: custom,
      opacity: [0, 0.8, 0.8, 0.8, 0.2, 0],
      transition: {
        delay: Math.floor(Math.random() * 4) + 0.2,
        repeatDelay: Math.floor(Math.random() * 3) + 1,
        duration: Math.floor(Math.random() * 3) + 2,
        repeat: Infinity,
      },
    }),
    initial: {
      x: 0,
      y: -60,
      opacity: 0,
    },
  };

  return (
    <div className="absolute -top-1 left-0 z-0 flex h-full w-full select-none items-end justify-center gap-2 p-4">
      <div className="relative h-full w-full ">
        {Array.from(new Array(140)).map((id, ind) => {
          const offsetX = Math.floor(Math.random() * 100);
          const offsetY = 20 - Math.floor(Math.random() * 50);
          return (
            <motion.div
              key={ind}
              custom={id}
              variants={variants}
              className="absolute top-0 rounded-b text-xl text-green-500 opacity-100"
              style={{
                left: offsetX + "%",
                transform: `translateX(-${offsetX}%), translateY(-${offsetY}%)`,
                top: offsetY + "%",
              }}
            >
              {String(Math.floor(ind % 2))}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CodeBackground;
