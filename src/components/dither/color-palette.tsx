import React, { useLayoutEffect } from "react";
import { Color } from "./types";
import DitherColorSelector from "./dither-color";
import { cn } from "~/helpers/cn";
import { Plus, Trash2, XCircle } from "lucide-react";
import { useAtom } from "jotai";
import { paletteSwatchesAtom } from "./atom";
import { getRgbaFromHex } from "~/lib/dither";
import { AnimatePresence, motion } from "framer-motion";
import useMeasure from "react-use-measure";

type ColorPaletteProps = {
  ditherColor: Color;
  setDitherColor: (color: Color) => void;
};

const ColorPalette = ({ ditherColor, setDitherColor }: ColorPaletteProps) => {
  const [colorInput, setColorInput] = React.useState<string>("");
  const [panelName, setPanelName] = React.useState<"palette" | "input">(
    "palette",
  );
  const [paletteSwatches, setPaletteSwatches] = useAtom(paletteSwatchesAtom);
  const [elementRef, bounds] = useMeasure();

  const colorInputRef = React.useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (!colorInputRef.current) return;
    colorInputRef.current.focus();
  }, [panelName]);

  const isInputValid = React.useMemo(() => {
    return getRgbaFromHex(colorInput);
  }, [colorInput]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className="flex h-auto w-max flex-col gap-2 rounded-xl border-2 border-black bg-background px-2"
    >
      <motion.div
        animate={{
          height: bounds.height,
          width: bounds.width,
        }}
        className="overflow-hidden"
      >
        <div ref={elementRef}>
          {panelName === "palette" ? (
            <div className="z-20 flex justify-between gap-2">
              <div className="grid w-full grid-cols-4 grid-rows-2 gap-1 py-1">
                {Object.values(paletteSwatches).map((color) => (
                  <DitherColorSelector
                    key={color.id}
                    color={color}
                    style={{ backgroundColor: color.color }}
                    className={cn(
                      ditherColor.id === color.id
                        ? "border-[4px]"
                        : "hover:border-[4px]",
                    )}
                    onSelect={(color) => setDitherColor(color)}
                  />
                ))}
              </div>
              <div className="grid gap-1 border-l-2 border-black py-1 pl-2">
                <button
                  onClick={() => setPanelName("input")}
                  className="group flex size-7 items-center justify-center rounded-full border-2 border-black bg-green-400 transition-colors disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  <Plus size={17} aria-hidden="true" fill="green" />
                </button>
                <button
                  className="group flex size-7 items-center justify-center rounded-full border-2 border-black bg-red-400 transition-colors disabled:cursor-not-allowed disabled:bg-gray-400"
                  disabled={ditherColor.id === 1}
                  onClick={() => {
                    if (ditherColor.id === 1) return;
                    const ditherColorIndex = paletteSwatches.findIndex(
                      (color) => color.id === ditherColor.id,
                    );
                    setDitherColor(
                      paletteSwatches[ditherColorIndex - 1] ??
                        paletteSwatches[0] ?? {
                          color: "#fefefe",
                          id: 1,
                        },
                    );
                    const newColors = [...paletteSwatches];
                    newColors.splice(ditherColorIndex, 1);
                    setPaletteSwatches(newColors);
                  }}
                >
                  <Trash2 size={17} aria-hidden="true" />
                </button>
              </div>
            </div>
          ) : (
            <div className="relative w-full py-2">
              <div className="absolute right-0 top-2">
                <button onClick={() => setPanelName("palette")}>
                  <XCircle size={25} aria-hidden="true" fill="red" />
                </button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const isValid = getRgbaFromHex(colorInput);
                  if (!isValid) return;
                  const formattedColor = {
                    id: Date.now(),
                    color:
                      colorInput[0] === "#" ? colorInput : "#" + colorInput,
                  };
                  setPaletteSwatches([...paletteSwatches, formattedColor]);
                  setDitherColor(formattedColor);
                  setPanelName("palette");
                  setColorInput("");
                }}
                className="flex flex-col gap-2"
              >
                <label>Hex Color</label>

                <input
                  className="h-10 rounded-xl border-2 border-black px-2 py-1"
                  placeholder="#000000"
                  value={colorInput}
                  ref={colorInputRef}
                  onChange={(e) => setColorInput(e.target.value)}
                />

                <button
                  className="rounded-xl border-2 border-black bg-green-500 px-3 py-1 font-bold transition-all disabled:opacity-40"
                  disabled={!isInputValid}
                >
                  Add Color
                </button>
              </form>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ColorPalette;
