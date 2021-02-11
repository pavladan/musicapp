import Playlist from "../api/models/Playlist";
import Track from "../api/models/Track";
import Player from "../services/Player";
import playlistController from "../services/PlaylistController";

export default async (playlistId: string) => {
  const playlist = await Playlist.findById(playlistId).exec();

  const tracks = await Track.find({
    _id: { $in: [...playlist.trackList.map((track) => track.trackId)] },
  }).exec();
  const paths = tracks.map((track) => track.track.path);
  const player = new Player(paths);
  playlistController.addPlayer(playlistId, player);
  playlist.play && player.play();
  return player;
};
