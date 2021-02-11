import Playlist from "../api/models/Playlist";
import addPlayerToPlaylistController from "./addPlayerToPlaylistController";

export default async () => {
  const playlists = await Playlist.find().exec();
  playlists.forEach((playlist) => {
    addPlayerToPlaylistController(playlist.id);
  });
};
