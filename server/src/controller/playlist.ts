import Playlist from "../models/Playlist";
import { IPlaylistDTO } from "../interfaces/IPlaylist";

export default {
  add: async (data: IPlaylistDTO) => {
    const playlist = new Playlist(data);
    return await playlist.save();
  },
  delete: async (id: string) => {
    return Playlist.findByIdAndDelete(id);
  },
  get: async (id: string) => {
    return Playlist.findById(id).populate(["author", "trackList.track"]).exec();
  },
  edit: async (id: string, editData: IPlaylistDTO) => {
    return Playlist.findByIdAndUpdate(id, editData, { new: true });
  },
  play: (id: string, { isPlay = true }: { isPlay: boolean }) => {
    return Playlist.findByIdAndUpdate(id, { play: isPlay }, { new: true });
  },
};
