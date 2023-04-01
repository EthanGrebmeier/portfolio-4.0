"use client";
import { motion } from "framer-motion";

const Rainbow = () => {
  const colors = [
    "bg-red-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-yellow-400",
    "bg-orange-400",
    "bg-purple-400",
  ];

  const variants = {
    hover: (i: number) => ({
      width: "800px",
      height: "800px",

      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.7,
        delay: i * 0.2,
      },
    }),
    initial: (i: number) => ({
      width: "44px",
      height: "44px",
      transition: {
        duration: 0.5,
        delay: (colors.length - 1 - i) * 0.2,
      },
    }),
  };

  return (
    <motion.div
      animate="initial"
      initial="initial"
      whileHover="hover"
      className="h-full w-full"
    >
      {colors.map((color, i) => (
        <motion.div
          key={color}
          variants={variants}
          custom={i}
          className={`${color} absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-solid border-black`}
        ></motion.div>
      ))}
    </motion.div>
  );
};

export default Rainbow;
