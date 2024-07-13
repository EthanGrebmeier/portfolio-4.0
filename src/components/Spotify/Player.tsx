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

interface PlayerProps {
  initialSongData: SongData;
}

const Player = ({ initialSongData }: PlayerProps) => {
  const [songData, setSongData] = useState(initialSongData);
  const [textWidth, setTextWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const controls = useAnimationControls();

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-1500, 1500], [0, 360]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const songData = await fetch("/current-song");
      const songDataResponseBody = await songData.json();

      if (songDataResponseBody) {
        console.log(songDataResponseBody);
        setSongData(songDataResponseBody);
      }
    }, 1000 * 60);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    controls.stop();

    if (textWidth > containerWidth - 24) {
      controls.start({
        x: containerWidth - textWidth - 24,
      });
    } else {
      controls.start({ x: undefined });
    }
  }, [songData, textWidth, containerWidth, controls]);

  if (!songData) {
    return null;
  }

  return (
    <motion.div className="flex h-full w-full flex-col items-start justify-between gap-4 sm:flex-row sm:items-center lg:flex-col lg:items-start lg:gap-0">
      <div className="w-full max-w-[400px]">
        <div
          ref={(containerRef) =>
            setContainerWidth(containerRef?.offsetWidth || 0)
          }
          className="-mx-4 flex-col justify-start px-4"
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
              ref={(textRef) => setTextWidth(textRef?.offsetWidth || 0)}
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
          className="relative z-[10] aspect-square h-36 lg:mx-auto"
        >
          <Notes />
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="mx-auto h-full w-full overflow-hidden rounded-full border-[32px] border-black lg:mx-0 "
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
          </motion.div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute right-0 z-[1] hidden h-full w-44 bg-green-300 sm:flex  lg:hidden"></div>
    </motion.div>
  );
};

export default Player;
