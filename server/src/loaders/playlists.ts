import Playlist from "../models/Playlist";
import addPlayerToPlaylistService from "../services/addPlayerToPlaylistService";

export default async () => {
  const playlists = await Playlist.find().exec();
  playlists.forEach((playlist) => {
    addPlayerToPlaylistService(playlist.id);
  });
};
