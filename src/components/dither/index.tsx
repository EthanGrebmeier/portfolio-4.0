"use client";

import React, { useEffect } from "react";

import PrintOutImage from "./print-out-image";
import DitherControls from "./dither-controls";
import { useMediaQuery } from "usehooks-ts";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import TactileButton from "../TactileButton";

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

const getRgbaFromHex = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;
  const resultRed = result[1];
  const resultGreen = result[2];
  const resultBlue = result[3];
  if (!resultRed || !resultGreen || !resultBlue) {
    return null;
  }
  return result
    ? {
        red: parseInt(resultRed, 16),
        green: parseInt(resultBlue, 16),
        blue: parseInt(resultGreen, 16),
        alpha: 1,
      }
    : null;
};

const getModifiedRgba = (value: number, rgba: RGBA) => {
  return {
    red: rgba.red * value,
    green: rgba.green * value,
    blue: rgba.blue * value,
    alpha: 1,
  };
};

const ditherImageFSB = (
  ctx: CanvasRenderingContext2D,
  image: ImageData,
  color: RGBA,
) => {
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

      setRGBA(image, x, y, getModifiedRgba(newGray, color));

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
  color: RGBA,
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

      setRGBA(image, x, y, getModifiedRgba(newValue, color));
    }
  }
  ctx.putImageData(image, 0, 0);
};

export type DitherType = keyof typeof ditherTypes;

const ditherColors = {
  red: {
    name: "red",
    value: "#ff0000",
  },
  green: {
    name: "green",
    value: "#0000ff",
  },
  blue: {
    name: "blue",
    value: "#00ff00",
  },
  black: {
    name: "black",
    value: "#ffffff",
  },
} as const;

export type DitherColor = keyof typeof ditherColors;

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
  const [ditherColor, setDitherColor] = React.useState<DitherColor>("black");
  const [customHex, setCustomHex] = React.useState<string>("#ae3bd1");

  const isDesktop = useMediaQuery("(min-width: 924px)");

  const handleImageLoad = (
    image: HTMLImageElement,
    color: RGBA,
    ditherFunction: (
      ctx: CanvasRenderingContext2D,
      image: ImageData,
      color: RGBA,
    ) => void,
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
    ditherFunction(ctx, imageData, color);
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
      const hex = ditherColors[ditherColor].value;
      const rgba = getRgbaFromHex(hex);
      if (!rgba) return;
      handleImageLoad(image, rgba, ditherTypes[ditherType]);
    };
  }, [imageSrc, ditherType, ditherColor]);

  return (
    <div className="flex w-full flex-1 justify-center lg:items-center">
      <div className="flex flex-1 flex-col items-center gap-4 overflow-hidden p-2 lg:flex-row">
        {isDesktop ? (
          <div className="rounded-xl border-2 border-black p-2">
            <DitherControls
              ditherType={ditherType}
              setDitherType={setDitherType}
              ditherColor={ditherColor}
              setDitherColor={setDitherColor}
              setImageSrc={setImageSrc}
              ditherColors={ditherColors}
            />
          </div>
        ) : (
          <Drawer>
            <div className="mt-2">
              <DrawerTrigger asChild>
                <TactileButton>
                  {ditheredSource ? "Edit Image" : "Dither Image"}
                </TactileButton>
              </DrawerTrigger>
            </div>
            <DrawerContent>
              <div className="flex flex-col items-center gap-8 p-4">
                <DrawerTitle>Dither Controls</DrawerTitle>
                <DitherControls
                  ditherType={ditherType}
                  setDitherType={setDitherType}
                  ditherColor={ditherColor}
                  setDitherColor={setDitherColor}
                  setImageSrc={setImageSrc}
                  ditherColors={ditherColors}
                />
              </div>
            </DrawerContent>
          </Drawer>
        )}

        {ditheredSource && (
          <PrintOutImage key={ditheredSource} ditheredSource={ditheredSource} />
        )}
      </div>
      <canvas ref={canvasRef} className="relative hidden"></canvas>
    </div>
  );
};

export default Dither;
