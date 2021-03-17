import playlistController from "../controller/playlist";
import players from "../stores/players";
import Player from "../services/Player";
import { ITrack } from "../../../interfaces/ITrack";

export default async () => {
  const playlists = await playlistController.getAll();
  playlists.forEach((playlist) => {
    const paths = playlist.trackList
      .map((item) => (<ITrack>item.track)?.track.path)
      .filter((e) => e);
    const player = new Player(playlist.id, paths);
    if (playlist.state.play) {
      player.play(playlist.state.timestamp);
    }
    players.add(playlist.id, player);
  });
};
