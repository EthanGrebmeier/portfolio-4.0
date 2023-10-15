"use client";

import { type NextPage } from "next";
import ExperienceBlock from "./ExperienceBlock";
import { motion } from "framer-motion";
import BubbleLink from "./BlockLink";

const Resume: NextPage = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col items-start justify-center overflow-hidden bg-blue-100 md:min-h-screen">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto my-12 flex h-full w-full max-w-[756px] flex-col gap-4 px-6 sm:px-2 md:gap-8"
      >
        <BubbleLink
          isHover="internal"
          text="Home"
          href="/"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          }
        />
        <div className="flex flex-col sm:items-end sm:gap-4 md:flex-row">
          {" "}
          <h1 className="xs:text-6xl mt-4 text-4xl font-bold sm:-mt-2 sm:text-7xl">
            {" "}
            Ethan Grebmeier{" "}
          </h1>
          <p className="text-xl font-medium sm:text-end">Frontend Developer </p>
        </div>
        <p className="text-xs font-medium sm:text-end sm:text-xl md:text-start">
          {" "}
          React, Next.js, Tailwind, and Framer Motion{" "}
        </p>
        <div className="mt-4 flex flex-col gap-8 sm:mt-8 sm:gap-4">
          <motion.h2
            variants={item}
            className="-mb-4 w-full text-3xl sm:mb-4 sm:text-4xl"
          >
            {" "}
            Experience{" "}
          </motion.h2>
          <ExperienceBlock
            company="Assemble Inc."
            location="Seattle, WA"
            timeframe="2021 - Present"
            title="Frontend Developer"
            description={[
              "Developing a Next.js retail starter kit that integrates with multiple Ecommerce and CMS platforms, reducing the time to set up a headless storefront by 60%.",
              "Leading frontend development and maintenance of multiple Ecommerce storefronts.",
            ]}
          />
          <ExperienceBlock
            company="The Future is Good"
            location="San Luis Obispo, CA"
            timeframe="2020 - 2021"
            title="Full Stack Web Developer"
            description={[
              "Built a gamified user progression system that was utilized by 283 registered users in the month of our launch.",
              "Led the development of a dashboard that enables customers to track and actively reduce their carbon footprint through a series of weekly modules.",
            ]}
          />
          <ExperienceBlock
            company="Mustang Media Group"
            location="San Luis Obispo, CA"
            timeframe="2020 - 2021"
            title="Frontend Web Developer"
            description={[
              "Worked with designers to establish implement & branding across multiple websites.",
              "Designed, built and maintained a housing website in React to sell upwards of $6000 in ad space to local property managers.",
            ]}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 sm:mt-0">
          <motion.h2
            variants={item}
            className=" w-full text-3xl sm:mb-4 sm:text-4xl"
          >
            {" "}
            Education{" "}
          </motion.h2>
          <motion.div variants={item} className="flex justify-between">
            <div>
              <h3 className="text-3xl font-bold">
                {" "}
                California Polytechnic State University{" "}
              </h3>
              <p> Bachelor of Science, Information Systems </p>
              <p> San Luis Obispo, CA </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
};

export default Resume;
