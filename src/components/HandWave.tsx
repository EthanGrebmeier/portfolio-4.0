"use client";

import { motion } from "framer-motion";

const HandWave = () => {
  return (
    <motion.div
      className="text-right text-[74px] md:text-[54px]"
      style={{
        marginBottom: "-20px",
        marginRight: "-45px",
        paddingBottom: "20px",
        paddingRight: "45px",
        display: "inline-block",
      }}
      animate={{ rotate: [0, 20, 0, 20, 0, 20, 0, 0, 0, 0, 0] }}
      transition={{
        repeat: Infinity,
        from: 0,
        duration: 6,
        ease: "easeInOut",
        type: "tween",
        repeatType: "loop",
      }}
    >
      👋
    </motion.div>
  );
};

export default HandWave;
