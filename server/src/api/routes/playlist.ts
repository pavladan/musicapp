import MESS from "../../constants/MESSAGES";
import { Request, Router } from "express";
import playlistController from "../../controller/playlist";
import isAuthor from "../middlewares/isAuthor";
import Playlist from "../../models/Playlist";
import isAuth from "../middlewares/isAuth";
import { IPlaylistDTO } from "../../interfaces/IPlaylist";
import players from "../../stores/players";

const route = Router();

const ID_PARAM = "playlistId";

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
          state: req.body.state,
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
    async (
      req: Request<{ [ID_PARAM]: string }, {}, IPlaylistDTO>,
      res,
      next
    ) => {
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
    async (req: Request<{ [ID_PARAM]: string }>, res, next) => {
      try {
        const id = req.params[ID_PARAM];
        const playlist = await playlistController.play(id);
        const message = MESS.PLAYLIST.PLAY;
        res.json({
          playlist,
          message,
        });
      } catch (err) {
        next(err);
      }
    }
  );

  route.post(
    `/:${ID_PARAM}/pause`,
    isAuthor(Playlist, ID_PARAM),
    async (req: Request<{ [ID_PARAM]: string }>, res, next) => {
      try {
        const id = req.params[ID_PARAM];
        const player = players.get(id);
        const playlist = await playlistController.pause(
          id,
          player.state.track,
          player.state.time
        );
        const message = MESS.PLAYLIST.PAUSE;
        res.json({
          playlist,
          message,
        });
      } catch (err) {
        next(err);
      }
    }
  );

  route.post(
    `/:${ID_PARAM}/stop`,
    isAuthor(Playlist, ID_PARAM),
    async (req, res, next) => {
      try {
        const id = req.params[ID_PARAM];
        const playlist = await playlistController.stop(id);
        res.json({
          playlist,
          message: MESS.PLAYLIST.STOP,
        });
      } catch (err) {
        next(err);
      }
    }
  );
};
