"use server";
import { createSafeActionClient } from "next-safe-action";
import { Chess } from "chess.js";
import { z } from "zod";
import client from "~/lib/mongodb";
import { revalidatePath } from "next/cache";
import { env } from "~/env/server.mjs";

const safeActionClient = createSafeActionClient();

const gameSchema = z.object({
  fen: z.string(),
  timestamp: z.string(),
});

const finishedGameSchema = z.object({
  fen: z.string(),
  victor: z.union([z.literal("black"), z.literal("white"), z.literal("tie")]),
  timestamp: z.string(),
});

const GAME_HISTORY_COLLECTION_NAME = "chess-moves";
const FINISHED_GAME_HISTORY_COLLECTION_NAME = "chess-finished-games";

export const getGame = async () => {
  await client.connect();

  const db = client.db("portfolio");

  const collection = db.collection(GAME_HISTORY_COLLECTION_NAME);

  const dbGame = await collection
    .find()
    .limit(1)
    .sort({ $natural: -1 })
    .toArray();

  const parsedGame = gameSchema.safeParse(dbGame[0]);

  return parsedGame.data;
};

export const getGameAction = safeActionClient.action(getGame);

export const startNewGame = safeActionClient.action(async () => {
  await client.connect();

  const db = client.db("portfolio");

  const collection = db.collection(GAME_HISTORY_COLLECTION_NAME);

  const payload = {
    fen: new Chess().fen(),
    timestamp: new Date().toISOString(),
  };

  await collection.insertOne(payload);

  revalidatePath("/");
  return payload;
});

export const getStats = async () => {
  await client.connect();

  const db = client.db("portfolio");

  const collection = db.collection(FINISHED_GAME_HISTORY_COLLECTION_NAME);

  const dbGames = await collection.find().sort({ $natural: -1 }).toArray();

  const parsedGames = z.array(finishedGameSchema).safeParse(dbGames);

  if (parsedGames.success) {
    return parsedGames.data.reduce(
      (acc, game) => {
        if (game.victor === "black") {
          acc.wins++;
        } else if (game.victor === "white") {
          acc.losses++;
        } else {
          acc.draws++;
        }
        return acc;
      },
      { wins: 0, draws: 0, losses: 0 },
    );
  }

  return {
    wins: 0,
    draws: 0,
    losses: 0,
  };
};

export const makeMove = safeActionClient
  .schema(
    z.object({
      inputFen: z.string(),
      moveFromSquare: z.string(),
      moveToSquare: z.string(),
    }),
  )
  .action(
    async ({ parsedInput: { inputFen, moveFromSquare, moveToSquare } }) => {
      await client.connect();

      const db = client.db("portfolio");

      const collection = db.collection(GAME_HISTORY_COLLECTION_NAME);

      const dbGame = await collection
        .find()
        .limit(1)
        .sort({ $natural: -1 })
        .toArray();

      let fen: string | undefined;

      const parsedGame = gameSchema.safeParse(dbGame[0]);

      if (parsedGame.success) {
        fen = parsedGame.data.fen;
      }

      const game = new Chess(fen);

      const isGameOver = game.isGameOver();

      if (fen && inputFen !== fen && !isGameOver) {
        revalidatePath("/");
        console.log("Invalid FEN");
        return {
          success: false,
          message: "Invalid FEN",
        };
      }

      if (game.turn() === "b" && env.CHESS_IS_OWNER !== "true") {
        revalidatePath("/");
        return {
          success: false,
          message: "It's not your turn",
        };
      }

      try {
        game.move({
          from: moveFromSquare,
          to: moveToSquare,
        });
      } catch (e) {
        console.log(e);
        revalidatePath("/");
        return {
          success: false,
          message: "Invalid move",
        };
      }

      const gameFen = game.fen();

      const gameTimestamp = new Date().toISOString();

      await collection.insertOne({
        fen: gameFen,
        timestamp: gameTimestamp,
      });

      if (game.isGameOver()) {
        const finishedGameCollection = db.collection(
          FINISHED_GAME_HISTORY_COLLECTION_NAME,
        );
        const existingGame = await finishedGameCollection.findOne({ fen: fen });
        if (!existingGame) {
          await finishedGameCollection.insertOne({
            fen: gameFen,
            victor: game.isCheckmate()
              ? game.turn() === "w"
                ? "black"
                : "white"
              : "tie",
            timestamp: new Date().toISOString(),
          });
        }
      }
      revalidatePath("/");
      return {
        success: true,
        fen: gameFen,
        timestamp: gameTimestamp,
      };
    },
  );
