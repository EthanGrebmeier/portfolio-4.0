"use client";

import React from "react";
import ResponsiveDialog from "../ui/responsive-dialog";
import Image from "next/image";
import Link from "next/link";
import GalleryItem from "./gallery-item";

export type Project = {
  name: string;
  href: string;
  image: {
    src: string;
    alt: string;
    className?: string;
  };
};

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
      src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNjcm9sbCI+PHBhdGggZD0iTTE5IDE3VjVhMiAyIDAgMCAwLTItMkg0Ii8+PHBhdGggZD0iTTggMjFoMTJhMiAyIDAgMCAwIDItMnYtMWExIDEgMCAwIDAtMS0xSDExYTEgMSAwIDAgMC0xIDF2MWEyIDIgMCAxIDEtNCAwVjVhMiAyIDAgMSAwLTQgMHYyYTEgMSAwIDAgMCAxIDFoMyIvPjwvc3ZnPg==",
      alt: "a sand scraper digging up shapes",
      className: "bg-green-400",
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
              src="/images/gallery.png"
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
