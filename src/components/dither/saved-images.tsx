import { useAtom } from "jotai";
import React, { useRef } from "react";
import { savedImagesAtom } from "./atom";
import Image from "next/image";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { Download, Trash2 } from "lucide-react";
import { cn } from "~/helpers/cn";

const imageSkews = [10, -12, 4, -4, 3, -2, 0, -5];

const variants: Variants = {
  initial: () => ({
    scale: 0.4,
    rotate: 0,
  }),

  hover: {
    scale: 1.1,
    rotate: 0,
    zIndex: 4,
  },
  animate: (i) => ({
    scale: 1,
    rotate: imageSkews[i % imageSkews.length],
  }),
};

const SavedImages = () => {
  const [savedImages, setSavedImages] = useAtom(savedImagesAtom);
  const [offset, setOffset] = React.useState(0);
  const [dragField, setDragField] = React.useState(0);

  const removeImage = (index: number) => {
    const newImages = [...savedImages];
    newImages.splice(index, 1);
    setSavedImages(newImages);
  };

  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dragFieldRef = useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    const updateOffset = () => {
      if (wrapperRef.current && contentRef.current) {
        const { width } = wrapperRef.current.getBoundingClientRect();

        const offSetWidth = contentRef.current.scrollWidth;
        const newOffset = offSetWidth - width;

        setOffset(newOffset);
        setDragField(offSetWidth);
      }
    };

    // Set Initial Value
    updateOffset();

    // Check for resizing Events.
    window.addEventListener("resize", updateOffset);
    return () => {
      window.removeEventListener("resize", updateOffset);
    };
  }, []);

  const canDrag = React.useMemo(() => offset > 0, [offset]);
  return (
    <div
      className="relative flex flex-1 flex-col gap-4 overflow-hidden  py-4"
      ref={wrapperRef}
    >
      {savedImages.length ? (
        <motion.div
          ref={contentRef}
          dragConstraints={{
            left: -offset,
            right: 16,
          }}
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
                custom={savedImages.length - index}
                initial="initial"
                animate="animate"
                whileHover="hover"
                variants={variants}
                exit={{
                  scale: 0,
                  rotate: 0,
                }}
                className="relative size-44 overflow-hidden  lg:size-28 [&:not(:first-child)]:-ml-2"
              >
                <button className="absolute right-1 top-1 rounded-lg border-2 border-black bg-red-400 p-1">
                  <Trash2 size={15} onClick={() => removeImage(index)} />
                </button>
                <a
                  href={image}
                  download="Dithered Image"
                  className="absolute bottom-1 right-1 rounded-lg border-2 border-black bg-green-400 p-1"
                >
                  <Download size={15} />
                </a>
                <img
                  src={image}
                  // draggable={false}
                  className=" h-full w-full  overflow-hidden rounded-lg border-2 border-black object-cover"
                />
              </motion.div>
            </AnimatePresence>
          ))}
        </motion.div>
      ) : (
        <div className="flex h-44 w-full items-center justify-center lg:h-28">
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
