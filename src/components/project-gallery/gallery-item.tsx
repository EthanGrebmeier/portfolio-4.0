"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type GalleryItemProps = {
  name: string;
  image: {
    src: string;
    alt: string;
  };
  href: string;
};

const MotionLink = motion.create(Link);

const GalleryItem = ({ name, image, href }: GalleryItemProps) => {
  return (
    <MotionLink
      whileHover={{
        scale: 1.05,
      }}
      transition={{ type: "easeInOut", duration: 0.1 }}
      href={href}
      className="flex flex-col items-center justify-center gap-1"
    >
      <div className="relative h-20 w-20 overflow-hidden rounded-xl border border-black bg-white">
        <Image className=" object-cover" fill alt={image.alt} src={image.src} />
      </div>
      <p className="text-sm"> {name} </p>
    </MotionLink>
  );
};

export default GalleryItem;
