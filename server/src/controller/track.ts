import Track from "../models/Track";
import fsPromises from "fs/promises";
import { ITrackDTO } from "../interfaces/ITrack";
import { BadRequestError } from "../utils/BadRequestError";
import ERRORS from "../constants/ERRORS";

export default {
  addNewTrack: async (data: ITrackDTO & { author: string }) => {
    const track = new Track(data);
    return track.save();
  },

  getTrackInfo: async (id: string) => {
    return Track.findById(id).populate("author").exec();
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
