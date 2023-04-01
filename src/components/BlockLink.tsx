import Link from "next/link";
import { LayoutGroup, motion } from "framer-motion";
import { type ReactNode, useRef, useState } from "react";
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

  return (
    <Link
      className={`${className} w-fit outline-offset-4 outline-blue-200 focus-visible:outline-2  `}
      href={href}
      onMouseEnter={() => setIsInternalHover(true)}
      onMouseLeave={() => setIsInternalHover(false)}
    >
      <LayoutGroup>
        <motion.div
          layout
          className={`group flex w-fit items-center gap-2 overflow-hidden rounded-l-full rounded-r-full border border-black bg-white py-1 px-2 text-black `}
        >
          {(isHover === "internal" ? isInternalHover : isHover) ? (
            <motion.span className="relative" layout ref={textRef}>
              {text}
              <motion.span
                className="absolute bottom-1 left-0 h-[1px] w-full bg-black"
                layout
                ref={textRef}
              ></motion.span>
            </motion.span>
          ) : null}
          {icon}
        </motion.div>
      </LayoutGroup>
    </Link>
  );
};

export default BubbleLink;
