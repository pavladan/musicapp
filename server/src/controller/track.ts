import Track from "../models/Track";
import fsPromises from "fs/promises";
import { ITrack } from "../../../interfaces/ITrack";
import { BadRequestError } from "../utils/BadRequestError";
import config from "../config";
import ERRORS from "../constants/ERRORS";
const ffprobe = require("ffprobe");

export default {
  addNewTrack: async (data: Partial<ITrack> & { owner: string }) => {
    const fileInfo = await ffprobe(data.track.path, { path: config.ffprobe });
    const duration = fileInfo.streams[0].duration;
    const track = new Track({ ...data, duration });
    return track.save();
  },

  getTrackInfo: async (id: string) => {
    return Track.findById(id).populate("owner").lean();
  },

  getTrack: async (id: string) => {
    const track = await Track.findById(id);
    if (!track) throw new BadRequestError(ERRORS.NOT_FOUND, 202);
    let path = track.track.path;

    const stat = await fsPromises.stat(path);

    let file = await fsPromises.readFile(path);
    return {
      size: stat.size,
      file,
    };
  },

  deleteTrack: async (id: string) => {
    const found = await Track.findById(id);
    await fsPromises.unlink(found.track.path);
    return Track.findByIdAndDelete(id);
  },
};
