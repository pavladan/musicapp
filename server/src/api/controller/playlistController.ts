import { Request, Response } from "express";
import Playlist, { IPlaylist } from "../models/Playlist";
import Track from "../models/Track";

export default {
  add: async (req: Request<{}, {}, IPlaylist>, res: Response) => {
    try {
      const playlist = new Playlist({
        title: req.body.title,
        trackList: req.body.trackList || [],
        authorId: req.user._id,
      });

      let newPlaylist = await playlist.save();
      res.status(200).json({ data: newPlaylist });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  delete: async (req: Request<{ playlistId: string }>, res: Response) => {
    try {
      const id = req.params.playlistId;
      const result = await Playlist.findByIdAndDelete(id);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  get: async (req: Request<{ playlistId: string }>, res: Response) => {
    try {
      const playlist = await Playlist.findById(req.params.playlistId).exec();
      res.status(200).json(playlist);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  edit: async (
    req: Request<{ playlistId: string }, {}, IPlaylist>,
    res: Response
  ) => {
    try {
      const id = req.params.playlistId;
      const found = await Playlist.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true }
      );
      res.status(200).json(found);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  play: (state = true) => {
    return async (req: Request<{ playlistId: string }>, res: Response) => {
      try {
        const id = req.params.playlistId;
        const found = await Playlist.findByIdAndUpdate(
          id,
          { play: state },
          { new: true }
        );
        res.status(200).json(found);
      } catch (err) {
        res.status(500).json(err);
      }
    };
  },
};
