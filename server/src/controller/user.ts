import Playlist from "../models/Playlist";
import Track from "../models/Track";

export default {
  getUserPlaylists: async (id: string) => {
    return Playlist.find({ author: id }).exec();
  },
  getUserTracks: async (id: string) => {
    return Track.find({ author: id }).exec();
  },
};
