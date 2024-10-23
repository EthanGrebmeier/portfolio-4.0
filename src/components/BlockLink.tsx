import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { type ReactNode, useRef, useState } from "react";
import useMeasure from "react-use-measure";
interface BubbleLinkProps {
  href: string;
  text?: string;
  isHover: boolean | "internal";
  className?: string;
  icon?: ReactNode;
}

const BubbleLink = ({
  href,
  text,
  icon,
  isHover,
  className = "",
}: BubbleLinkProps) => {
  const textRef = useRef(null);
  const [isInternalHover, setIsInternalHover] = useState(false);
  const [ref, { width }] = useMeasure();

  return (
    <Link
      className={`${className} w-fit outline-offset-4 outline-blue-200 focus-visible:outline-2  `}
      href={href}
      onMouseEnter={() => setIsInternalHover(true)}
      onMouseLeave={() => setIsInternalHover(false)}
    >
      <motion.div
        className={`group flex h-7 items-center gap-2 overflow-hidden rounded-l-full rounded-r-full border border-black bg-white  text-black `}
        animate={{
          width: width,
        }}
      >
        <div className="flex items-center gap-2 px-2" ref={ref}>
          <AnimatePresence mode="popLayout">
            {(isHover === "internal" ? isInternalHover : isHover) ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                className="relative w-max"
                ref={textRef}
              >
                {text}
              </motion.span>
            ) : null}
          </AnimatePresence>
          <motion.div>{icon}</motion.div>
        </div>
      </motion.div>
    </Link>
  );
};

export default BubbleLink;
