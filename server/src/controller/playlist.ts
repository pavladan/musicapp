import Playlist from "../models/Playlist";
import { IPlaylistDTO } from "../interfaces/IPlaylist";
import { ITrack } from "../interfaces/ITrack";

export default {
  add: async (data: IPlaylistDTO) => {
    const playlist = new Playlist(data);
    return await playlist.save();
  },
  delete: async (id: string) => {
    return Playlist.findByIdAndDelete(id);
  },
  get: async (id: string) => {
    return Playlist.findById(id).populate(["owner", "trackList.track"]).exec();
  },
  getAll: async () => {
    return Playlist.find().populate(["owner", "trackList.track"]).exec();
  },
  getTracks: async (id: string) => {
    const playlist = await Playlist.findById(id)
      .populate(["owner", "trackList.track"])
      .exec();
    return playlist.trackList
      .map((item) => (<ITrack>item.track)?.track.path)
      .filter((e) => e);
  },
  getPlaying: async () => {
    return Playlist.find({ "state.play": true })
      .populate(["owner", "trackList.track"])
      .exec();
  },
  edit: async (id: string, editData: IPlaylistDTO) => {
    return Playlist.findByIdAndUpdate(id, editData, { new: true });
  },
  play: (id: string) => {
    return Playlist.findByIdAndUpdate(
      id,
      { "state.play": true },
      { new: true }
    );
  },
  pause: (id: string, trackId: number, timestamp: number) => {
    return Playlist.findByIdAndUpdate(
      id,
      {
        state: {
          play: false,
          trackId,
          timestamp,
        },
      },
      { new: true }
    );
  },
  stop: (id: string) => {
    return Playlist.findByIdAndUpdate(
      id,
      {
        state: {
          play: false,
          trackId: 0,
          timestamp: 0,
        },
      },
      { new: true }
    );
  },
};
