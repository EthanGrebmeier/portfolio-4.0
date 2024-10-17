"use client";

import { ArrowRight, Hammer, Scroll } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const HomepageLink = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const images = [
    {
      src: "/images/fillaneed/Scraper.svg",
      width: 656,
      height: 330,
      alt: "a sand scraper digging up shapes",
    },
    {
      src: "/images/fillaneed/Chisel.svg",
      width: 485,
      height: 295,
      alt: "a chisel uncovering shapes",
    },
    {
      src: "/images/fillaneed/Brick.svg",
      width: 500,
      height: 191,
      alt: "brick wall",
    },
    {
      src: "/images/fillaneed/Balance.svg",
      width: 270,
      height: 220,
      alt: "a balance scale",
    },
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentImageIndex(
        currentImageIndex + 1 < images.length ? currentImageIndex + 1 : 0,
      );
    }, 3000);
    return () => clearTimeout(timeout);
  }, [currentImageIndex]);

  const currentImage = images[currentImageIndex];

  return (
    <Link
      href="/blog/fillaneed"
      className="group flex h-full flex-col justify-between hover:cursor-pointer "
    >
      <div className="flex justify-between">
        <div className="-mt-1 flex items-center gap-2">
          <h2 className="font-serif text-2xl">Fillaneed</h2>
          <div className="h-fit w-fit rounded-lg border-2 border-black bg-green-300 p-1">
            <Scroll size={15} />
          </div>
        </div>
        <span className="-mt-1 flex w-fit items-center gap-2 rounded-xl border-2 border-black bg-yellow-400 px-2 py-1 text-sm font-semibold">
          <Hammer size={15} />
          Project
        </span>
      </div>
      <div className="overflow-hidden py-6">
        {currentImage && (
          <Image
            src={currentImage.src}
            width={currentImage.width}
            height={currentImage.height}
            alt={currentImage.alt}
            className="mx-auto h-full w-full object-scale-down"
          />
        )}
      </div>
      <div className="flex items-center justify-end gap-2 group-hover:underline">
        <p className="-mt-1 font-semibold"> Read the case study </p>
        <ArrowRight strokeWidth={4} size={15} />
      </div>
    </Link>
  );
};

export default HomepageLink;
