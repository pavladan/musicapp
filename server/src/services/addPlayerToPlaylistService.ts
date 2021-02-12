import Playlist from "../models/Playlist";
import Track from "../models/Track";
import Player from "./Player";
import playlistController from "./PlaylistService";

export default async (playlistId: string) => {
  const playlist = await Playlist.findById(playlistId).exec();

  const tracks = await Track.find({
    _id: { $in: [...playlist.trackList.map((track) => track.track)] },
  }).exec();
  const paths = tracks.map((track) => track.track.path);
  const player = new Player(paths);
  playlistController.addPlayer(playlistId, player);
  playlist.play && player.play();
  return player;
};
