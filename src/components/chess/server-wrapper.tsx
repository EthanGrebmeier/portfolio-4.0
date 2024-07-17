import React from "react";
import { getGame, getStats } from "~/actions/chess";
import ChessBlock from "./chess-block";

const ChessServerWrapper = async () => {
  const game = await getGame();
  const gameStats = await getStats();
  return (
    <ChessBlock
      gameStats={gameStats}
      gameFEN={game?.fen}
      lastMoveTime={game?.timestamp}
    />
  );
};

export default ChessServerWrapper;
