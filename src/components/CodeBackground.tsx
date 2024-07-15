"use client";
import { motion, type Variants } from "framer-motion";
import { memo, useEffect, useState } from "react";

const matrixArray =
  `ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ日ｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝ:.=*+-<></>¦012345789Z"`.split(
    "",
  );

const CodeBackground = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const nextIndex = Math.floor(Math.random() * matrixArray.length);
      setCurrentIndex(nextIndex);
    }, 300);
    return () => clearTimeout(timeout);
  }, [currentIndex]);

  return (
    <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-300 hover:opacity-100 ">
      <div className="relative isolate h-full w-full">
        <p className="absolute -left-2 -right-2 bottom-0 top-0 z-0 select-none tabular-nums">
          {Array.from(new Array(364)).map((id, ind) => {
            const characterIndex =
              (Math.floor(Math.random() * matrixArray.length) + currentIndex) %
              matrixArray.length;
            const character = matrixArray[characterIndex];
            return (
              <motion.span
                key={id}
                className=" size-3 text-2xl text-green-500 opacity-100"
              >
                {character}
              </motion.span>
            );
          })}
        </p>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
    </div>
  );
};

export default memo(CodeBackground);
