// @ts-check
import { Chess } from "chess.js";
import { z } from "zod";

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  SPOTIFY_SECRET: z.string(),
  SPOTIFY_CLIENT_ID: z.string(),
  SPOTIFY_USER_TOKEN: z.string(),
  SPOTIFY_REFRESH_TOKEN: z.string(),
  EMAIL_ADDRESS: z.string(),
  EMAIL_TOKEN: z.string(),
  REDIS_URL: z.string(),
  MONGO_URL: z.string(),
  CHESS_IS_OWNER: z.string(),
});

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
  // NEXT_PUBLIC_CLIENTVAR: z.string(),
  NEXT_PUBLIC_CHESS_CLIENT_IS_OWNER: z.string(),
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
  // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  NEXT_PUBLIC_CHESS_CLIENT_IS_OWNER:
    process.env.NEXT_PUBLIC_CHESS_CLIENT_IS_OWNER,
};
