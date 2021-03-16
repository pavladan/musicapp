import Playlist from "../models/Playlist";
import Track from "../models/Track";
import User from "../models/User";

export default {
  getUser: async (id: string) => User.findById(id).select("-password").exec(),
  getUserPlaylists: async (id: string) => {
    return Playlist.find({ owner: id }).exec();
  },
  getUserTracks: async (id: string) => {
    return Track.find({ owner: id }).exec();
  },
};
