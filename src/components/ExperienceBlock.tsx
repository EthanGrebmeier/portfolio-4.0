"use client";

import { motion } from "framer-motion";

interface ExperienceBlockProps {
  company: string;
  title: string;
  location: string;
  timeframe: string;
  description: string[];
}

const ExperienceBlock = ({
  company,
  title,
  location,
  timeframe,
  description,
}: ExperienceBlockProps) => {
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };
  return (
    <motion.div
      variants={item}
      className="flex flex-col sm:flex-row sm:justify-between"
    >
      <div className="grid grid-cols-2 sm:block">
        <h3 className="text-3xl font-bold"> {company} </h3>
        <p className="flex items-end justify-end sm:mb-2 sm:block"> {title} </p>
        <p className="flex items-end  text-xs sm:block "> {location} </p>
        <p className="flex items-end justify-end text-xs sm:block ">
          {timeframe}{" "}
        </p>
      </div>
      <ul className="mt-4 flex list-disc flex-col gap-2 sm:mt-0 sm:max-w-[380px]">
        {description.map((item) => (
          <li className="list-inside sm:list-outside" key={item}>
            {" "}
            {item}{" "}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ExperienceBlock;
