"use client";
import React, { Dispatch, SetStateAction } from "react";
import Pawn from "./pawn";
import Knight from "./knight";
import Bishop from "./bishop";
import Rook from "./rook";
import Queen from "./queen";
import King from "./king";
import { motion } from "framer-motion";

type ChessPieceProps = {
  piece: "k" | "q" | "r" | "b" | "n" | "p";
  color: "white" | "black";
  onFocus: () => void;
  handleMove: (rankNumber: number, fileNumber: number) => void;
  disabled?: boolean;
  boardRef: React.RefObject<HTMLDivElement>;
};

const pieceMap = {
  k: King,
  q: Queen,
  r: Rook,
  b: Bishop,
  n: Knight,
  p: Pawn,
};

const ChessPiece = ({
  piece,
  color,
  onFocus,
  disabled,
  boardRef,
  handleMove,
}: ChessPieceProps) => {
  const ChessPieceComponent = pieceMap[piece];
  return (
    <motion.button
      onDrag={(e) => {
        e.stopPropagation();
        onFocus();
      }}
      onDragEnd={(e, info) => {
        if (!boardRef.current) return;

        const { x: boardX, y: boardY } =
          boardRef.current?.getBoundingClientRect();
        const { x: dragX, y: dragY } = info.point;
        const boardWidth = boardRef.current?.offsetWidth;
        const boardHeight = boardRef.current?.offsetHeight;
        const squareWidth = boardWidth / 8;
        const squareHeight = boardHeight / 8;

        const x = dragX - boardX;
        const y = dragY - boardY;
        const file = Math.floor(x / squareWidth);
        const rank = 8 - Math.floor(y / squareHeight);
        handleMove(rank, file);
      }}
      disabled={disabled}
      drag={!disabled}
      dragConstraints={boardRef}
      dragElastic={0}
      dragMomentum={false}
      dragSnapToOrigin={true}
      whileDrag={{
        zIndex: 100,
      }}
      className="z-10 flex h-full w-full items-center justify-center"
    >
      <div className="pointer-events-none relative aspect-square w-[90%]">
        <ChessPieceComponent color={color} />
      </div>
    </motion.button>
  );
};

export default ChessPiece;
