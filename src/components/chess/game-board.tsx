"use client";
import React, { useEffect } from "react";
import { cn } from "~/helpers/cn";
import { Chess, Piece, Square } from "chess.js";
import ChessPiece from "./pieces";
import { formatDate } from "date-fns";
import { useAction } from "next-safe-action/hooks";
import { getGameAction, makeMove, startNewGame } from "~/actions/chess";
import { env } from "~/env/client.mjs";
import TactileButton from "../TactileButton";
import { useRouter } from "next/navigation";

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

type GameBoardProps = {
  gameFEN?: string;
  lastMoveTime?: string;
  gameStats: {
    wins: number;
    draws: number;
    losses: number;
  };
};

const GameBoard = ({
  gameFEN = "",
  lastMoveTime = "2024 7 16",
  gameStats,
}: GameBoardProps) => {
  const router = useRouter();
  const { execute } = useAction(makeMove, {
    onSuccess: ({ data }) => {
      if (data?.fen) {
        setChess(new Chess(data.fen));
      }
      if (!data?.success) {
        router.refresh();
      }
    },
  });
  const { execute: executeGetGame } = useAction(getGameAction, {
    onSuccess: ({ data }) => {
      if (data?.fen) {
        setChess(new Chess(data.fen));
      }
    },
  });
  const { execute: executeResetGame } = useAction(startNewGame);
  const [chess, setChess] = React.useState<Chess>(
    new Chess(gameFEN || undefined),
  );
  const [activeSquare, setActiveSquare] = React.useState<Square | undefined>(
    undefined,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      executeGetGame();
    }, 10000);
    return () => clearInterval(interval);
  }, [executeGetGame]);

  const boardRef = React.useRef<HTMLDivElement>(null);

  const board = chess.board();

  const perspective = "white";
  const isReversed = perspective === "white";
  const isGameOver = chess.isGameOver();
  const isOwner = env.NEXT_PUBLIC_CHESS_CLIENT_IS_OWNER === "true";
  const isDisabled = isGameOver || (chess.turn() !== "w" && !isOwner);

  const possibleMoves = chess.moves({ square: activeSquare });

  const getMoveFromCoords = (rankNumber: number, fileNumber: number) => {
    const file = FILES[fileNumber];
    if (!file) {
      throw new Error(`Invalid file number ${fileNumber}`);
    }
    if (rankNumber < 0 || rankNumber > 8) {
      throw new Error(`Invalid rank number ${rankNumber}`);
    }
    const squareString = `${file}${rankNumber}`;
    if (possibleMoves.find((move) => move.toString().includes(squareString))) {
      return squareString;
    }
  };

  const handleMove = (rankNumber: number, fileNumber: number) => {
    try {
      const squareToMoveTo = getMoveFromCoords(rankNumber, fileNumber);
      if (squareToMoveTo && activeSquare) {
        const premoveFen = chess.fen();
        chess.move({
          from: activeSquare,
          to: squareToMoveTo,
        });
        const newChess = chess.fen();
        setChess(new Chess(newChess));
        setActiveSquare(undefined);
        execute({
          moveFromSquare: activeSquare,
          moveToSquare: squareToMoveTo,
          inputFen: premoveFen,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const resetGame = () => {
    setChess(new Chess());
    setActiveSquare(undefined);
    executeResetGame();
  };

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <div>
          {isGameOver ? (
            <p>
              {chess.isCheckmate()
                ? chess.turn() === "b"
                  ? "You Win!"
                  : "Ethan Wins!"
                : "Stalemate"}{" "}
            </p>
          ) : (
            <p>{chess.turn() === "w" ? "Your turn (white)" : "Ethan’s turn"}</p>
          )}
          <p> Move {chess.moveNumber()}</p>
          {lastMoveTime && (
            <p> Last Move {formatDate(new Date(lastMoveTime), "Pp")}</p>
          )}
        </div>
        <div className="text-end">
          <p> Record (W/D/L)</p>
          <p> {`${gameStats.wins}/${gameStats.draws}/${gameStats.losses}`} </p>
        </div>
      </div>

      <div
        ref={boardRef}
        className="relative mx-auto flex w-full select-none flex-col overflow-hidden rounded-md border-2 border-black"
        data-vaul-no-drag
      >
        {isGameOver && (
          <div className="absolute left-1/2 top-1/2 z-[30] -translate-x-1/2 -translate-y-1/2 ">
            <TactileButton className="bg-green-400" onClick={resetGame}>
              Start New Game
            </TactileButton>
          </div>
        )}
        {board.map((row, rankIndex) => (
          <div key={rankIndex} className={"grid grid-cols-8"}>
            {row.map((square, fileIndex) => {
              const squareString = ((FILES[fileIndex] || "a") +
                (isReversed ? 8 - rankIndex : rankIndex + 1)) as Square;

              const moveAtPosition = possibleMoves.find((move) =>
                move.toString().includes(squareString),
              );

              const isMoveCapture = moveAtPosition?.toString().includes("x");

              const handleSquareClick = () => {
                if (activeSquare && moveAtPosition) {
                  const premoveFen = chess.fen();
                  chess.move({
                    from: activeSquare,
                    to: squareString,
                  });
                  const newChess = chess.fen();
                  setChess(new Chess(newChess));
                  setActiveSquare(undefined);
                  execute({
                    inputFen: premoveFen,
                    moveFromSquare: activeSquare,
                    moveToSquare: squareString,
                  });
                } else {
                  setActiveSquare(
                    activeSquare !== squareString
                      ? (squareString as Square)
                      : undefined,
                  );
                }
              };

              return (
                <div
                  key={fileIndex}
                  className={cn(
                    "relative flex aspect-square w-full items-center justify-center border-black outline outline-2 outline-black",
                    (rankIndex + fileIndex) % 2
                      ? " bg-green-400"
                      : " bg-orange-200",
                  )}
                  onClick={handleSquareClick}
                >
                  {activeSquare &&
                    moveAtPosition &&
                    (isMoveCapture ? (
                      <div className="pointer-events-none absolute left-1/2 top-1/2 z-[30] size-4/5 -translate-x-1/2 -translate-y-1/2 select-none rounded-full border-2 border-black"></div>
                    ) : (
                      <div className="pointer-events-none absolute left-1/2 top-1/2 z-[30] size-2/5 -translate-x-1/2 -translate-y-1/2 select-none rounded-full bg-black"></div>
                    ))}
                  {square?.type && (
                    <ChessPiece
                      boardRef={boardRef}
                      onFocus={() => setActiveSquare(squareString as Square)}
                      handleMove={handleMove}
                      piece={square.type}
                      color={square.color === "w" ? "white" : "black"}
                      disabled={isDisabled || square.color !== chess.turn()}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
