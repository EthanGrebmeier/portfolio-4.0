import { atom } from "jotai";
import { Color } from "./types";

const colorOne = {
  color: "#fefefe",
  id: 1,
};

const colorTwo = {
  color: "#000000",
  id: 2,
};
const initialColors: Color[] = [
  colorOne,
  colorTwo,
  {
    color: "#ff0000",
    id: 3,
  },
  {
    color: "#0000ff",
    id: 4,
  },
  {
    color: "#00ff00",
    id: 5,
  },
] as const;

export const paletteSwatchesAtom = atom<Color[]>(initialColors);
export const ditherColorOneAtom = atom<Color>(colorOne);
export const ditherColorTwoAtom = atom<Color>(colorTwo);