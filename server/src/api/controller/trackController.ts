import Track, { ITrack } from "../models/Track";
import fsPromises from "fs/promises";
import fs from "fs";
import { ObjectID } from "mongodb";
import { Request, Response } from "express";

export default {
  getAllTracks: async (req: Request, res: Response) => {
    try {
      let track = await Track.find();
      res.status(200).json(track);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  addNewTrack: async (req: Request, res: Response) => {
    try {
      const track = new Track({
        title: req.body.title,
        artist: req.body.artist,
        track: req.file,
      });

      let newTrack = await track.save();
      res.status(200).json({ data: newTrack });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  deleteTrack: async (req: Request, res: Response) => {
    try {
      const id = req.params.trackId;
      const found: ITrack = await Track.findOne({ _id: id });
      if (!found) return res.status(202).json({ message: "File not found" });
      await fsPromises.unlink(found.track.path);
      const result = await Track.deleteOne({ _id: id });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getTrack: async (req: Request, res: Response) => {
    try {
      const trackID = new ObjectID(req.params.trackId);
      const track = await Track.findOne({ _id: trackID });
      if (!track) return res.status(202).json({ message: "File not found" });
      var path = track.track.path;
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
    // res.set("content-type", "audio/mp3");
    // res.set("accept-ranges", "bytes");
    const stat = await fsPromises.stat(path);
    res.writeHead(200, {
      "Content-Type": "audio/mpeg",
      "Content-Length": stat.size,
      "accept-ranges": "bytes",
    });
    let readStream = fs.createReadStream(path);
    readStream.pipe(res);
  },
};
