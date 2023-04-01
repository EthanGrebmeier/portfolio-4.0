import { getRecentListening } from "../../helpers/getRecentListeningData";
import Block from "../Block";
import Player from "./Player";

const Spotify = async () => {
  const recentListeningData = await getRecentListening();

  return (
    <div className="h-full w-full ">
      {recentListeningData ? (
        <Player initialSongData={recentListeningData} />
      ) : null}
    </div>
  );
};

export default Spotify;
