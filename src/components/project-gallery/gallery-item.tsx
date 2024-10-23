"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { cn } from "~/helpers/cn";
import { Project } from ".";

const MotionLink = motion.create(Link);

const GalleryItem = ({ name, image, href }: Project) => {
  return (
    <MotionLink
      whileHover={{
        scale: 1.05,
      }}
      transition={{ type: "easeInOut", duration: 0.1 }}
      href={href}
      className="flex flex-col items-center justify-center gap-1"
    >
      <div
        className={cn(
          "relative h-20 w-20 overflow-hidden rounded-xl border-2 border-black bg-white",
          image.className,
        )}
      >
        <Image className=" object-cover" fill alt={image.alt} src={image.src} />
      </div>
      <p className="text-sm"> {name} </p>
    </MotionLink>
  );
};

export default GalleryItem;
