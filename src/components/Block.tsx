"use client";

import { type ReactNode, useEffect, useState } from "react";
import {
  motion,
  type MotionStyle,
  useAnimationControls,
  type Variants,
} from "framer-motion";
import useGridAnimation from "./context/GridAnimationContext";
import BubbleLink from "./BlockLink";
import useScreenSize from "./hooks/useScreenSize";
import { cn } from "~/helpers/cn";

interface BlockProps {
  children?: ReactNode;
  className?: string;
  style?: MotionStyle;
  linkHref?: string;
  linkText?: string;
  zIndex?: number;
  height?: string;
  width?: string;
  animationDelay?: number;
}

const Block = ({
  children,
  className = "",
  style = {},
  linkHref,
  linkText,
  zIndex,
  height,
  width,
  animationDelay,
}: BlockProps) => {
  const {
    gridState,
    setGridState,
    zIndex: gridZIndex,
    incrementZIndex,
  } = useGridAnimation();
  const [isHover, setIsHover] = useState(false);
  const screenSize = useScreenSize();

  useEffect(() => {
    if (screenSize && !["lg", "xl", "2sl"].includes(screenSize)) {
      setGridState("init");
    }
  }, [screenSize, setGridState]);

  const variants: Variants = {
    hover: {
      scale: 1.02,
      boxShadow:
        "0 20px 15px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.2)",
      zIndex: 100,
    },
    drag: {
      opacity: 0.7,
    },
    initial: {
      scale: 1,
      y: 0,
      opacity: 1,
    },
  };

  const animationControls = useAnimationControls();

  useEffect(() => {
    animationControls.start({
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
        delay: animationDelay,
      },
    });
  }, [animationControls, animationDelay]);

  useEffect(() => {
    if (gridState === "init") {
      console;
      animationControls.start({
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          bounce: 0.4,
          duration: 0.8,
          // delay: animationDelay,
        },
      });
    }
  }, [gridState, animationControls, setGridState, animationDelay]);

  return (
    <motion.div
      className={cn(
        `isolate ${height ? height : "h-full"}  ${
          width ? width : "w-full"
        }  relative overflow-hidden rounded-2xl border-2 border-black p-2 @container sm:py-4 md:p-4`,
        className,
      )}
      style={{ ...style, zIndex: zIndex || gridZIndex }}
      variants={variants}
      initial="initial"
      whileHover="hover"
      whileDrag="drag"
      onDrag={() => {
        setGridState("dragged");
        incrementZIndex();
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onFocus={() => setIsHover(true)}
      onBlur={() => setIsHover(false)}
      drag={screenSize ? ["lg", "xl", "2xl"].includes(screenSize) : false}
      dragConstraints={{
        left: -40,
        right: 40,
        top: -40,
        bottom: 40,
      }}
      animate={animationControls}
      layout
    >
      {children}
      {linkHref ? (
        <BubbleLink
          className="absolute bottom-2 left-2"
          isHover={isHover}
          href={linkHref}
          text={linkText}
          icon={
            <motion.svg
              layout
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3.5"
              stroke="black"
              className="flex aspect-square h-3 w-3 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
              />
            </motion.svg>
          }
        />
      ) : null}
    </motion.div>
  );
};

export default Block;
