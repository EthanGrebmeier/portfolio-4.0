"use client";

import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import GameBoard from "./game-board";
import { cn } from "~/helpers/cn";
import TactileButton from "../TactileButton";
import { useMediaQuery } from "usehooks-ts";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

type ChessBlockProps = {
  gameFEN?: string;
  lastMoveTime?: string;
  gameStats: {
    wins: number;
    draws: number;
    losses: number;
  };
};

const ChessBlock = ({ gameFEN, lastMoveTime, gameStats }: ChessBlockProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="relative h-full w-full">
      <div className="absolute -bottom-4 -left-4 -right-4 -top-4 overflow-visible">
        <div className="grid h-full w-full grid-cols-8">
          {new Array(8)
            .fill(0)
            .map((_, index) =>
              new Array(8)
                .fill(0)
                .map((_, index2) => (
                  <div
                    className={cn(
                      "aspect-square h-full w-full border border-black",
                      (index2 + index) % 2 === 0
                        ? "bg-green-400"
                        : "bg-orange-200",
                    )}
                    key={`${index}-${index2}`}
                  ></div>
                )),
            )}
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        {isDesktop ? (
          <Dialog>
            <div className="mt-4">
              <DialogTrigger asChild>
                <TactileButton className=" bg-yellow-300 font-bold">
                  Play me in chess
                </TactileButton>
              </DialogTrigger>
            </div>
            <DialogContent>
              <DialogHeader>
                <DialogTitle> Play me in chess</DialogTitle>
              </DialogHeader>

              <GameBoard
                gameStats={gameStats}
                gameFEN={gameFEN}
                lastMoveTime={lastMoveTime}
              />
            </DialogContent>
          </Dialog>
        ) : (
          <Drawer>
            <div className="mt-4">
              <DrawerTrigger asChild>
                <TactileButton className=" bg-yellow-300 font-bold">
                  Play me in chess
                </TactileButton>
              </DrawerTrigger>
            </div>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Play me in chess</DrawerTitle>
              </DrawerHeader>
              <div className="px-2">
                <GameBoard
                  gameStats={gameStats}
                  gameFEN={gameFEN}
                  lastMoveTime={lastMoveTime}
                />
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </div>
  );
};

export default ChessBlock;
