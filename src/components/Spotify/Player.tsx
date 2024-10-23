"use client";

import type { SongData } from "./types";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

import Notes from "./Notes";
import useMeasure from "react-use-measure";

interface PlayerProps {
  initialSongData: SongData;
}

const Player = ({ initialSongData }: PlayerProps) => {
  const [songData, setSongData] = useState(initialSongData);
  const [textRef, { width: textWidth }] = useMeasure();
  const [containerRef, { width: containerWidth }] = useMeasure();
  const controls = useAnimationControls();

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-1500, 1500], [0, 360]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const songData = await fetch("/current-song");
      const songDataResponseBody = await songData.json();

      if (songDataResponseBody) {
        setSongData(songDataResponseBody);
      }
    }, 1000 * 60);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    controls.set({
      x: 0,
    });
    if (textWidth > containerWidth) {
      controls.start({
        x: containerWidth - textWidth,
      });
    } else {
      controls.start({ x: 0 });
    }
  }, [songData, textWidth, containerWidth, controls]);

  if (!songData) {
    return null;
  }

  return (
    <motion.div className="flex h-full w-full flex-col items-start justify-between gap-4 sm:flex-row sm:items-center lg:flex-col lg:items-start lg:gap-0">
      <div className="w-full">
        <div
          ref={containerRef}
          className="-mx-4 w-full flex-col justify-start px-4"
        >
          <h2 className="font-serif text-2xl"> Listening To:</h2>
          <span>
            <motion.p
              animate={controls}
              transition={{
                repeat: textWidth > containerWidth ? Infinity : 0,
                repeatType: "mirror",
                duration: 8,
                repeatDelay: 3,
              }}
              className="w-max font-serif text-3xl"
              key={songData.name}
              ref={textRef}
            >
              {" "}
              {songData.name} -{" "}
              {songData.artists?.map(
                (artist, index) => (index !== 0 ? ", " : "") + artist.name,
              )}{" "}
            </motion.p>
            <p className="text-base">
              {" "}
              {songData.albumName} - {new Date(songData.date).getFullYear()}{" "}
            </p>
          </span>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={songData.name + songData.date}
          exit={{ y: 120 }}
          animate={{ y: 0 }}
          initial={{ y: 120 }}
          transition={{
            type: "spring",
            duration: 1.3,
          }}
          className="relative z-[10] mx-auto aspect-square h-36 md:mx-0 lg:mx-auto"
        >
          <Notes />
          <div className="relative h-full w-full overflow-hidden rounded-full">
            <motion.div
              animate={{
                rotate: [0, 360],
                scaleY: [1, 1.02, 0.99, 0.96, 1.02, 1],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="relative mx-auto h-full w-full overflow-hidden rounded-full bg-black p-8 lg:mx-0 "
              style={{ rotate }}
              key={JSON.stringify(songData)}
            >
              {songData.image ? (
                <Image
                  alt={`cover art for ${songData.name}`}
                  className="h-full w-full select-none rounded-full border-2 border-black"
                  width={songData.image.width}
                  height={songData.image.height}
                  src={songData.image.url}
                />
              ) : (
                <div className="h-full w-full select-none rounded-full border-2 border-black bg-green-500"></div>
              )}
              <div className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black bg-green-500">
                {" "}
              </div>
              <div className="absolute bottom-1 left-1 right-1 top-1 z-10 rounded-full border border-gray-600 "></div>
              <div className="absolute bottom-2 left-2 right-2 top-2 z-10 rounded-full border border-gray-600 "></div>
              <div className="absolute bottom-3 left-3 right-3 top-3 z-10 rounded-full border border-gray-600 "></div>
              <div className="absolute bottom-4 left-4 right-4 top-4 z-10 rounded-full border border-gray-700 "></div>
              <div className="absolute bottom-5 left-5 right-5 top-5 z-10 rounded-full border border-gray-600 "></div>
              <div className="absolute bottom-6 left-6 right-6 top-6 z-10 rounded-full border border-gray-700 "></div>
            </motion.div>
            <div className="record-glow "></div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute right-0 z-[1] hidden h-full w-44 bg-green-400 sm:flex  lg:hidden"></div>
    </motion.div>
  );
};

export default Player;
