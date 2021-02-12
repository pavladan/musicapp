import MESS from "../../constants/MESSAGES";
import { NextFunction, Request, Response, Router } from "express";
import playlistController from "../../controller/playlist";
import isAuthor from "../middlewares/isAuthor";
import Playlist from "../../models/Playlist";
import isAuth from "../middlewares/isAuth";
import { IPlaylist, IPlaylistDTO } from "../../interfaces/IPlaylist";

const route = Router();

const ID_PARAM = "playlistId";

const playPauseHandler = (isPlay: boolean) => {
  return async (
    req: Request<{ [ID_PARAM]: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params[ID_PARAM];
      const playlist = await playlistController.play(id, {
        isPlay,
      });
      const message = isPlay ? MESS.PLAYLIST.PLAY : MESS.PLAYLIST.PAUSE;
      res.json({
        playlist,
        message,
      });
    } catch (err) {
      next(err);
    }
  };
};

export default (app: Router) => {
  app.use("/playlist", route);
  route.get(
    `/:${ID_PARAM}`,
    async (req: Request<{ [ID_PARAM]: string }>, res, next) => {
      try {
        const playlist = await playlistController.get(req.params[ID_PARAM]);
        res.json({ playlist });
      } catch (err) {
        next(err);
      }
    }
  );

  route.post(
    "/add",
    isAuth,
    async (req: Request<{}, {}, IPlaylistDTO>, res, next) => {
      try {
        const playlist = await playlistController.add({
          title: req.body.title,
          trackList: req.body.trackList || [],
          author: req.user.id,
          play: req.body.play || false,
        });
        res.json({ playlist });
      } catch (err) {
        next(err);
      }
    }
  );
  route.delete(
    `/:${ID_PARAM}`,
    isAuthor(Playlist, ID_PARAM),
    async (req: Request<{ [ID_PARAM]: string }>, res, next) => {
      try {
        const id = req.params[ID_PARAM];
        const playlist = await playlistController.delete(id);
        res.json({
          message: MESS.DELETE,
          playlist,
        });
      } catch (err) {
        next(err);
      }
    }
  );
  route.put(
    `/:${ID_PARAM}`,
    isAuthor(Playlist, ID_PARAM),
    async (req: Request<{ [ID_PARAM]: string }, {}, IPlaylist>, res, next) => {
      try {
        const id = req.params[ID_PARAM];
        const playlist = await playlistController.edit(id, { ...req.body });
        res.json({
          message: MESS.EDIT,
          playlist,
        });
      } catch (err) {
        next(err);
      }
    }
  );

  route.post(
    `/:${ID_PARAM}/play`,
    isAuthor(Playlist, ID_PARAM),
    playPauseHandler(true)
  );

  route.post(
    `/:${ID_PARAM}/play`,
    isAuthor(Playlist, ID_PARAM),
    playPauseHandler(false)
  );
};
