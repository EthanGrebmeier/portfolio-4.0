import { cookies } from "next/headers";

import { createClient } from "redis";
import { env } from "../../env/server.mjs";

export async function GET() {
  const cookieStore = cookies();
  const client = createClient({
    url: env.REDIS_URL,
  });

  client.on("error", async (err) => {
    await client.disconnect();
    console.log("Redis Client Error", err);
    return new Response("This probably shouldnt happen", {
      status: 500,
    });
  });

  await client.connect();

  const value = await client.get("visitCount");

  if (!value) {
    await client.disconnect();

    return new Response("This probably shouldnt happen", {
      status: 500,
    });
  }

  if (cookieStore.get("hasVisited")) {
    await client.disconnect();
    return new Response(value || undefined, {
      status: 200,
      headers: { "Set-Cookie": `hasVisited=1` },
      statusText: value,
    });
  }

  await client.set("visitCount", parseInt(value) + 1);

  const newValue = await client.get("visitCount");

  await client.disconnect();

  return new Response(newValue || undefined, {
    status: 200,
    headers: { "Set-Cookie": `hasVisited=1` },
    statusText: newValue || undefined,
  });
}
