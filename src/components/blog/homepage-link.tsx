"use client";

import { Scroll } from "lucide-react";
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
      width: 500,
      height: 408,
      alt: "a balance scale",
    },
  ];

  useEffect(() => {
    const interval = setTimeout(() => {
      setCurrentImageIndex(
        currentImageIndex + 1 < images.length ? currentImageIndex + 1 : 0,
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [currentImageIndex]);

  const currentImage = images[currentImageIndex];

  return (
    <Link
      href="/blog/fillaneed"
      className="group flex h-full flex-col justify-between hover:cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="-mb-2 font-serif text-2xl">Fillaneed</h2>
          <p className="text-sm group-hover:underline">Read the case study</p>
        </div>
        <div className="h-fit w-fit rounded-lg border-2 border-black bg-green-300 p-2">
          <Scroll size={20} />
        </div>
      </div>
      {currentImage && (
        <Image
          src={currentImage.src}
          width={currentImage.width}
          height={currentImage.height}
          alt="a sand scraper digging up data"
        />
      )}
    </Link>
  );
};

export default HomepageLink;
