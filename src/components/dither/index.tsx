"use client";

import React, { useEffect } from "react";

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
const Dither = () => {
  const [imageSrc, setImageSrc] = React.useState<string>();
  const [ditheredSource, setDitheredSource] = React.useState<string>();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const offScreenCanvasRef = React.useRef<HTMLCanvasElement>(null);

  const ditherImage = (ctx: CanvasRenderingContext2D, image: ImageData) => {
    for (let y = 0; y < image.height - 1; y++) {
      for (let x = 0; x < image.width - 1; x++) {
        // Get current pixel rgba
        const sampleRGBA = getRGBA(image, x, y);

        const factor = 1;

        // Get new pixel rgba
        const newR =
          (Math.floor((sampleRGBA.red * factor) / 255) * 255) / factor;
        const newG =
          (Math.floor((sampleRGBA.green * factor) / 255) * 255) / factor;
        const newB =
          (Math.floor((sampleRGBA.blue * factor) / 255) * 255) / factor;
        const newA =
          (Math.floor((sampleRGBA.alpha * factor) / 255) * 255) / factor;

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
          alpha: newA,
        });

        const rightPixel = getRGBA(image, x + 1, y);

        setRGBA(image, x + 1, y, {
          red: rightPixel.red + (error * 7) / 16,
          green: rightPixel.green + (error * 7) / 16,
          blue: rightPixel.blue + (error * 7) / 16,
          alpha: rightPixel.alpha + (error * 7) / 16,
        });

        const bottomLeftPixel = getRGBA(image, x - 1, y + 1);

        setRGBA(image, x - 1, y + 1, {
          red: bottomLeftPixel.red + (error * 3) / 16,
          green: bottomLeftPixel.green + (error * 3) / 16,
          blue: bottomLeftPixel.blue + (error * 3) / 16,
          alpha: bottomLeftPixel.alpha + (error * 3) / 16,
        });

        const bottomPixel = getRGBA(image, x, y + 1);

        setRGBA(image, x, y + 1, {
          red: bottomPixel.red + (error * 5) / 16,
          green: bottomPixel.green + (error * 5) / 16,
          blue: bottomPixel.blue + (error * 5) / 16,
          alpha: bottomPixel.alpha + (error * 5) / 16,
        });

        const bottomRightPixel = getRGBA(image, x + 1, y + 1);

        setRGBA(image, x + 1, y + 1, {
          red: bottomRightPixel.red + (error * 1) / 16,
          green: bottomRightPixel.green + (error * 1) / 16,
          blue: bottomRightPixel.blue + (error * 1) / 16,
          alpha: bottomRightPixel.alpha + (error * 1) / 16,
        });
      }
    }
    ctx.putImageData(image, 0, 0);
  };

  const handleImageLoad = (image: HTMLImageElement) => {
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
    ditherImage(ctx, imageData);
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
      handleImageLoad(image);
    };
  }, [imageSrc]);

  return (
    <div>
      <div className="absolute right-4 top-4 z-10 rounded-xl border border-black bg-white px-2 py-1 font-sans text-xl text-black">
        <input
          type="file"
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
      <canvas ref={canvasRef} className="relative hidden"></canvas>
      <img src={ditheredSource} />
    </div>
  );
};

export default Dither;
