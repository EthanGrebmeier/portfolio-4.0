import { useAtom } from "jotai";
import React, { useRef } from "react";
import { savedImagesAtom } from "./atom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { cn } from "~/helpers/cn";

const imageSkews = [10, -12, 4, -4, 3, -2, 0, -5];

const SavedImages = () => {
  const [savedImages, setSavedImages] = useAtom(savedImagesAtom);

  const removeImage = (index: number) => {
    const newImages = [...savedImages];
    newImages.splice(index, 1);
    setSavedImages(newImages);
  };

  const canDrag = React.useMemo(() => savedImages.length > 1, [savedImages]);

  const boundingRef = useRef<HTMLDivElement>(null);
  return (
    <div
      className="relative flex flex-1 flex-col gap-4 overflow-x-hidden  py-4"
      ref={boundingRef}
    >
      {savedImages.length ? (
        <motion.div
          dragConstraints={boundingRef}
          whileDrag={{
            cursor: "grabbing",
          }}
          whileHover={{
            cursor: canDrag ? "grab" : "default",
          }}
          drag={canDrag ? "x" : false}
          className={cn(
            "flex w-max  flex-row-reverse flex-nowrap items-center  px-4 ",
          )}
        >
          {[...savedImages].map((image, index) => (
            <AnimatePresence key={image.slice(80, 120)}>
              <motion.div
                initial={{
                  scale: 0.4,
                  rotate: 0,
                }}
                animate={{
                  scale: 1,
                  rotate: imageSkews[index % imageSkews.length],
                }}
                whileHover={{
                  rotate: 0,
                  scale: 1.1,
                  zIndex: 4,
                }}
                exit={{
                  scale: 0,
                  rotate: 0,
                }}
                className="relative h-28 w-28 overflow-hidden [&:not(:first-child)]:-ml-2"
              >
                <button className="absolute right-1 top-1 rounded-lg border-2 border-black bg-red-400 p-1">
                  <Trash2 size={15} onClick={() => removeImage(index)} />
                </button>
                <img
                  src={image}
                  className="pointer-events-none h-full w-full  select-none overflow-hidden rounded-lg border-2 border-black object-cover"
                />
              </motion.div>
            </AnimatePresence>
          ))}
        </motion.div>
      ) : (
        <div className="flex h-28 w-full items-center justify-center">
          <p className="-translate-1/2 absolute left-1/2 top-1/2 w-max  -translate-x-1/2">
            {" "}
            No saved images{" "}
          </p>
        </div>
      )}
    </div>
  );
};

export default SavedImages;
