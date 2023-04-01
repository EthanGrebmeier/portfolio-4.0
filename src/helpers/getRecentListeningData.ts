import { type SongData } from "../components/Spotify/types";

export const getRecentListening = async () => {
  const spotifyTokenRequestBody = new URLSearchParams();

  let accessToken;

  spotifyTokenRequestBody.append("grant_type", "refresh_token");
  spotifyTokenRequestBody.append(
    "refresh_token",
    process.env.SPOTIFY_REFRESH_TOKEN || ""
  );

  try {
    const spotifyToken = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_SECRET
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      next: { revalidate: 3599 },
      body: spotifyTokenRequestBody,
    });
    const accessTokenResponseBody = await spotifyToken.json();
    if (!accessTokenResponseBody.error) {
      accessToken = accessTokenResponseBody.access_token;
    }
  } catch (e) {
    console.log("Error fetching access token: ");
    console.error(e);
  }

  try {
    const spotifyRecentData = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
          Accept: "application/json",
        },
        next: { revalidate: 60 },
      }
    );

    const recentDataResBody = await spotifyRecentData.json();

    const mostRecentListen = recentDataResBody.items[0].track;

    // console.log(mostRecentListen);
    return {
      name: mostRecentListen.name,
      artists: mostRecentListen.album.artists,
      image: mostRecentListen.album.images[0],
      date: mostRecentListen.album.release_date,
      albumName: mostRecentListen.album.name,
    } as SongData;
  } catch (e) {
    console.log("Error fetching recently listened to: ");
    console.error(e);
  }
};
