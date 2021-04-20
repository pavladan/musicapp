import Playlist from "../models/Playlist";
import { IPlaylistDTO } from "../../../interfaces/IPlaylist";
import { ITrack } from "../../../interfaces/ITrack";
import fsPromises from "fs/promises";

export default {
  add: async (data: Partial<IPlaylist>) => {
    const playlist = new Playlist(data);
    return await playlist.save();
  },
  delete: async (id: string) => {
    const found = await Playlist.findById(id);
    if (found.cover) await fsPromises.unlink(found.cover.path);
    return Playlist.findByIdAndDelete(id).lean();
  },
  get: async (id: string) => {
    return Playlist.findById(id).populate(["owner", "trackList.track"]).lean();
  },
  getAll: async () => {
    return Playlist.find().populate(["owner", "trackList.track"]).lean();
  },
  getTracks: async (id: string) => {
    const playlist = await Playlist.findById(id)
      .populate(["owner", "trackList.track"])
      .lean();
    return playlist.trackList
      .map((item) => (<ITrack>item.track)?.track.path)
      .filter((e) => e);
  },
  getPlaying: async () => {
    return Playlist.find({ "state.play": true })
      .populate(["owner", "trackList.track"])
      .lean();
  },
  edit: async (id: string, editData: Partial<IPlaylist>) => {
    if (editData.cover) {
      const found = await Playlist.findById(id);
      if (found.cover) await fsPromises.unlink(found.cover.path);
    }
    return Playlist.findByIdAndUpdate(id, editData, { new: true })
      .populate(["owner", "trackList.track"])
      .lean();
  },
  play: (id: string) => {
    return Playlist.findByIdAndUpdate(
      id,
      { "state.play": true },
      { new: true }
    ).lean();
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
    ).lean();
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
    ).lean();
  },
};
