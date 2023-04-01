"use client";

import useGridAnimation from "./context/GridAnimationContext";
import { motion } from "framer-motion";

const ResetTiles = () => {
  const { resetGridPositions, gridState } = useGridAnimation();

  return (
    <motion.button
      whileHover={{
        scale: 1.05,
      }}
      className="shadow-m fixed bottom-12 left-1/2 z-[100] w-fit rounded-xl border-2 border-black bg-white px-8 py-4 font-bold"
      style={{
        translateX: "-50%",
      }}
      initial={{ y: 200 }}
      animate={{
        y: gridState === "init" ? 200 : 0,
        transition: {
          delay: 0.2,
          duration: 0.2,
        },
      }}
      onClick={resetGridPositions}
    >
      Reset Tiles
    </motion.button>
  );
};
export default ResetTiles;
