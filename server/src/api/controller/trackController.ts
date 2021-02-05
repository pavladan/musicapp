import Track, { ITrack } from "../models/Track";
import fsPromises from "fs/promises";
import fs from "fs";
import { ObjectID } from "mongodb";
import { Request, Response } from "express";

export default {
  addNewTrack: async (req: Request<{}, {}, ITrack>, res: Response) => {
    try {
      const track = new Track({
        title: req.body.title,
        artist: req.body.artist,
        track: req.file,
        authorId: req.user._id,
      });

      let newTrack = await track.save();
      res.status(200).json({ data: newTrack });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  deleteTrack: async (req: Request<{ trackId: string }>, res: Response) => {
    try {
      const id = req.params.trackId;
      const found = await Track.findById(id);
      await fsPromises.unlink(found.track.path);
      const result = await Track.findByIdAndDelete(id);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getTrack: async (req: Request<{ trackId: string }>, res: Response) => {
    try {
      const trackID = new ObjectID(req.params.trackId);
      const track = await Track.findById(trackID);
      if (!track) return res.status(202).json({ message: "File not found" });
      var path = track.track.path;
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
    const stat = await fsPromises.stat(path);
    res.writeHead(200, {
      "Content-Type": "audio/mpeg",
      "Content-Length": stat.size,
      "accept-ranges": "bytes",
    });
    let readStream = fs.createReadStream(path);
    readStream.pipe(res);
  },
  getTrackInfo: async (req: Request<{ trackId: string }>, res: Response) => {
    try {
      const trackID = new ObjectID(req.params.trackId);
      const track = await Track.findById(trackID).exec();
      res.status(200).json(track);
    } catch (err) {
      res.status(400).json({
        message: err.message,
      });
    }
  },
};
