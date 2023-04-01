"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const VisitorCounter = () => {
  const clientSide = typeof window !== "undefined";

  const prefersReducedMotion =
    (clientSide &&
      window?.matchMedia("(prefers-reduced-motion: reduce)")?.matches) ||
    false;
  const [count, setCount] = useState(0);
  const tickerTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestMade = useRef<boolean | null>(null);
  const counterRef = useRef(null);
  const isInView = useInView(counterRef);
  useEffect(() => {
    const checkIn = async () => {
      requestMade.current = true;
      const res = await fetch("/visitor");
      const visitorCount = await res.text();
      setCount(parseInt(visitorCount));
    };
    if (!requestMade.current) {
      checkIn();
    }
  }, []);
  const [displayedCount, setDisplayedCount] = useState(
    prefersReducedMotion ? count : 0
  );

  useEffect(() => {
    const timeout = Math.min(200, 3000 / count);

    if (isInView) {
      tickerTimeout.current = setTimeout(() => {
        displayedCount < count && setDisplayedCount(displayedCount + 1);
      }, timeout);
    }

    return () => {
      if (tickerTimeout.current) {
        clearTimeout(tickerTimeout.current);
      }
    };
  }, [displayedCount, count, isInView]);
  return (
    <motion.p
      ref={counterRef}
      className="inline-block text-7xl tracking-tighter md:text-9xl"
    >
      {count ? (
        String(displayedCount)
          .split("")
          .map((number, i) => (
            <motion.span
              key={number + i}
              initial={{
                y: "0.25em",
              }}
              animate={{
                y: 0,
              }}
              transition={{
                duration: 0.04,
                ease: [0.2, 0.65, 0.3, 0.9],
              }}
              className="inline-block"
            >
              {number}
            </motion.span>
          ))
      ) : (
        <span className="text-4xl tracking-normal"> Loading ...</span>
      )}
    </motion.p>
  );
};

export default VisitorCounter;
