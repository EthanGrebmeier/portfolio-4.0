"use client";

import React, { useEffect } from "react";

import PrintOutImage from "./print-out-image";

import { Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type RGBA = {
  red: number;
  green: number;
  blue: number;
  alpha: number;
};

const getRGBA = (imageData: ImageData, x: number, y: number) => {
  const offset = (y * imageData.width + x) * 4;
  const red = imageData.data[offset];
  const green = imageData.data[offset + 1];
  const blue = imageData.data[offset + 2];
  const alpha = imageData.data[offset + 3];
  if (
    (!red && red !== 0) ||
    (!green && green !== 0) ||
    (!blue && blue !== 0) ||
    (!alpha && alpha !== 0)
  ) {
    throw new Error("Invalid pixel");
  }
  return {
    red,
    green,
    blue,
    alpha,
  };
};

const setRGBA = (imageData: ImageData, x: number, y: number, rgba: RGBA) => {
  const offset = (y * imageData.width + x) * 4;
  imageData.data[offset] = rgba.red;
  imageData.data[offset + 1] = rgba.green;
  imageData.data[offset + 2] = rgba.blue;
};

const ditherImageFSB = (ctx: CanvasRenderingContext2D, image: ImageData) => {
  for (let y = 0; y < image.height - 1; y++) {
    for (let x = 0; x < image.width - 1; x++) {
      // Get current pixel rgba
      const sampleRGBA = getRGBA(image, x, y);

      const gray = Math.round(
        0.299 * sampleRGBA.red +
          0.587 * sampleRGBA.green +
          0.114 * sampleRGBA.red,
      );

      // Apply threshold
      const newGray = gray < 128 ? 0 : 255;

      // Calculate error
      const error = gray - newGray;

      // Assign new pixel values

      setRGBA(image, x, y, {
        red: newGray,
        green: newGray,
        blue: newGray,
        alpha: 1,
      });

      const rightPixel = getRGBA(image, x + 1, y);

      setRGBA(image, x + 1, y, {
        red: rightPixel.red + (error * 7) / 16,
        green: rightPixel.green + (error * 7) / 16,
        blue: rightPixel.blue + (error * 7) / 16,
        alpha: 1,
      });

      const bottomLeftPixel = getRGBA(image, x - 1, y + 1);

      setRGBA(image, x - 1, y + 1, {
        red: bottomLeftPixel.red + (error * 3) / 16,
        green: bottomLeftPixel.green + (error * 3) / 16,
        blue: bottomLeftPixel.blue + (error * 3) / 16,
        alpha: 1,
      });

      const bottomPixel = getRGBA(image, x, y + 1);

      setRGBA(image, x, y + 1, {
        red: bottomPixel.red + (error * 5) / 16,
        green: bottomPixel.green + (error * 5) / 16,
        blue: bottomPixel.blue + (error * 5) / 16,
        alpha: 1,
      });

      const bottomRightPixel = getRGBA(image, x + 1, y + 1);

      setRGBA(image, x + 1, y + 1, {
        red: bottomRightPixel.red + (error * 1) / 16,
        green: bottomRightPixel.green + (error * 1) / 16,
        blue: bottomRightPixel.blue + (error * 1) / 16,
        alpha: 1,
      });
    }
  }
  ctx.putImageData(image, 0, 0);
};

const ditherImageOrdered = (
  ctx: CanvasRenderingContext2D,
  image: ImageData,
) => {
  const ditherMatrix = [
    [1, 49, 13, 61, 4, 52, 16, 64],
    [33, 17, 45, 29, 36, 20, 48, 32],
    [9, 57, 5, 53, 12, 60, 8, 56],
    [41, 25, 37, 21, 44, 28, 40, 24],
    [3, 51, 15, 63, 2, 50, 14, 62],
    [35, 19, 47, 31, 34, 18, 46, 30],
    [11, 59, 7, 55, 10, 58, 6, 54],
    [43, 27, 39, 23, 42, 26, 38, 22],
  ];

  for (let y = 0; y < image.height - 1; y++) {
    for (let x = 0; x < image.width - 1; x++) {
      // Get current pixel rgba
      const sampleRGBA = getRGBA(image, x, y);
      const gray = Math.round(
        0.299 * sampleRGBA.red +
          0.587 * sampleRGBA.green +
          0.114 * sampleRGBA.red,
      );
      const ditherValue = (gray / 255) * 65;

      const matrixValue = ditherMatrix?.[x % 8]?.[y % 8];
      const newValue =
        typeof matrixValue !== "undefined" && ditherValue > matrixValue
          ? 255
          : 0;

      setRGBA(image, x, y, {
        red: newValue,
        green: newValue,
        blue: newValue,
        alpha: 1,
      });
    }
  }
  ctx.putImageData(image, 0, 0);
};

type DitherType = keyof typeof ditherTypes;

const ditherTypes = {
  fsb: ditherImageFSB,
  ordered: ditherImageOrdered,
};

const Dither = () => {
  const [imageSrc, setImageSrc] = React.useState<string>();
  const [ditherType, setDitherType] = React.useState<DitherType>("fsb");
  const [ditheredSource, setDitheredSource] = React.useState<string>();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const offScreenCanvasRef = React.useRef<HTMLCanvasElement>(null);

  const handleImageLoad = (
    image: HTMLImageElement,
    ditherFunction: (ctx: CanvasRenderingContext2D, image: ImageData) => void,
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    });
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const imageAspectRatio = image.width / image.height;
    const newImageWidth = 500;
    const newImageHeight = 500 / imageAspectRatio;
    image.width = newImageWidth;
    image.height = newImageHeight;
    canvas.width = newImageWidth;
    canvas.height = newImageHeight;
    ctx.drawImage(image, 0, 0, newImageWidth, newImageHeight);
    const imageData = ctx.getImageData(0, 0, newImageWidth, newImageHeight);
    ditherFunction(ctx, imageData);
    setDitheredSource(canvas.toDataURL());
  };

  const width = React.useMemo(() => window.innerWidth, [window.innerWidth]);
  const height = React.useMemo(() => window.innerHeight, [window.innerHeight]);

  useEffect(() => {
    if (!canvasRef.current || !offScreenCanvasRef.current) return;
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    offScreenCanvasRef.current.width = width;
    offScreenCanvasRef.current.height = height;
  }, []);

  useEffect(() => {
    if (!imageSrc) return;
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      handleImageLoad(image, ditherTypes[ditherType]);
    };
  }, [imageSrc, ditherType]);

  return (
    <div>
      <div className="flex flex-col items-center gap-4 overflow-hidden p-2 md:p-4">
        <div className="flex items-end justify-center gap-12">
          <div className="flex flex-col gap-2">
            <label>Dither Type</label>
            <Select
              onValueChange={(value: DitherType) =>
                value && setDitherType(value)
              }
              value={ditherType}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Floyd-Steinberg" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fsb">Floyd-Steinberg</SelectItem>
                <SelectItem value="ordered">Ordered</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="z-10 font-sans text-xl text-black">
            <div className="rounded-xl bg-black">
              <div className="w-full -translate-y-1 cursor-pointer overflow-hidden rounded-xl border-2 border-black bg-green-400 px-2 py-1 font-sans text-xl  text-black transition-all hover:translate-y-0">
                <label
                  htmlFor="image-upload"
                  className="flex  cursor-pointer items-center gap-2"
                >
                  <span>Select Image </span>
                  <Upload size={20} aria-hidden="true" />
                </label>
              </div>
            </div>
            <input
              id="image-upload"
              className="hidden"
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (e) => {
                  const image = new Image();
                  image.src = e.target?.result as string;
                  image.onload = () => {
                    setImageSrc(image.src);
                  };
                };
                reader.readAsDataURL(file);
              }}
            />
          </div>
        </div>
        {ditheredSource && (
          <PrintOutImage key={ditheredSource} ditheredSource={ditheredSource} />
        )}
      </div>
      <canvas ref={canvasRef} className="relative hidden"></canvas>
    </div>
  );
};

export default Dither;
