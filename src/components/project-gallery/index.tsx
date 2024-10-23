import React from "react";
import ResponsiveDialog from "../ui/responsive-dialog";
import Image from "next/image";
import Link from "next/link";
import GalleryItem from "./gallery-item";

const projects = [
  {
    name: "Dither",
    href: "/dither",
    image: {
      src: "/images/mona.png",
      alt: "Dithered Mona Lisa",
    },
  },
  {
    name: "Fillaneed",
    href: "https://fillaneed.xyz",
    image: {
      src: "/images/fillaneed/Scraper.svg",
      alt: "a sand scraper digging up shapes",
    },
  },
];

const ProjectGallery = () => {
  return (
    <ResponsiveDialog
      trigger={
        <div>
          <button className="flex items-center justify-center gap-8">
            <span className="mt-1 w-min font-serif text-3xl sm:text-5xl md:text-end md:text-3xl">
              Project Gallery
            </span>
            <Image
              src="/images/Gallery.png"
              alt="Gallery"
              width={120}
              height={120}
            />
          </button>
        </div>
      }
      title="Gallery"
      description="A collection of my projects of all sizes"
    >
      <div className="flex items-start gap-4 pt-4">
        {projects.map((project) => (
          <GalleryItem key={project.name} {...project} />
        ))}
      </div>
    </ResponsiveDialog>
  );
};

export default ProjectGallery;
