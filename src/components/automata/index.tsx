"use client";

import React, { useEffect, useLayoutEffect } from "react";
import p5 from "p5";

const PIXELSIZE = 5;

const Automata = () => {
  const [sketch, setSketch] = React.useState<p5>();
  const [rule, setRule] = React.useState(0);
  const binaryRule = React.useMemo(
    () => rule.toString(2).padStart(8, "0"),
    [rule],
  );
  const sketchRef = React.useRef(null);
  const getState = (i: number, j: number, k: number) => {
    const value = 7 - parseInt("" + i + j + k, 2);
    const nextState = binaryRule[value];

    return parseInt(nextState ?? `0`);
  };

  const width = React.useMemo(() => window.innerWidth, [window.innerWidth]);
  const height = React.useMemo(() => window.innerHeight, [window.innerHeight]);

  const handleDraw = () => {
    if (!sketch) return;
    let y = 0;
    let cells: number[] = new Array(Math.floor(width / PIXELSIZE)).fill(0);

    cells[Math.floor(cells.length / 2)] = 1;
    sketch.draw = () => {
      for (let x = 0; x < cells.length; x++) {
        const cell = cells[x];
        sketch.fill(cell ? "#fff" : "#f3aefe");
        sketch.square(x * PIXELSIZE, y * PIXELSIZE, PIXELSIZE);
      }

      const nextCells = [...cells];
      for (let x = 0; x < cells.length; x++) {
        const prevCell = cells[(cells.length + (x - 1)) % cells.length] ?? 0;
        const cell = cells[x];
        const nextCell =
          nextCells[(cells.length + (x + 1)) % cells.length] ?? 0;
        if (typeof cell !== "number") continue;
        const state = getState(prevCell, cell, nextCell);
        nextCells[x] = state;
      }
      cells = nextCells;
      if (y * PIXELSIZE < height) {
        y++;
      }
    };
  };

  useEffect(() => {
    handleClear();
  }, [rule]);

  const handleClear = () => {
    if (!sketch) return;
    sketch.clear();
    sketch.background("#f3aefe");

    handleDraw();
  };

  useLayoutEffect(() => {
    if (!sketchRef.current) return;
    const sketch = new p5((p: p5) => {
      p.setup = () => {
        p.createCanvas(width, height);
        p.background("#f3aefe");
        p.frameRate(144);
      };
      setSketch(p);
    }, sketchRef.current);

    setSketch(sketch);
    handleClear();

    return () => {
      sketch.remove();
    };
  }, []);

  return (
    <div className="relative h-[100svh] w-screen" ref={sketchRef}>
      <div className=" absolute right-4 top-4 rounded-xl border border-black bg-white px-2 py-1 font-sans text-xl text-black">
        Rule:
        <input
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (value > 256 || value < 1) return setRule(rule);
            setRule(value);
          }}
          value={rule}
          min={1}
          type="number"
          className="w-24 bg-transparent text-center"
        />
      </div>
    </div>
  );
};

export default Automata;
