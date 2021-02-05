import { Request, Response } from "express";
import Playlist from "../models/Playlist";
import Track from "../models/Track";

export default {
  getUser: async (req: Request, res: Response) => {
    try {
      const user = req.user;
      if (!user) return res.status(200).json();
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getUserPlaylists: async (req: Request, res: Response) => {
    try {
      const userId = req.user._id;
      const found = await Playlist.find({ authorId: userId }).exec();
      res.status(200).json(found);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  getUserTracks: async (req: Request, res: Response) => {
    try {
      let track = await Track.find({ authorId: req.user._id }).exec();
      res.status(200).json(track);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
