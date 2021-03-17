import MESS from "../../constants/MESSAGES";
import { Request, Router } from "express";
import playlistController from "../../controller/playlist";
import isOwner from "../middlewares/isOwner";
import Playlist from "../../models/Playlist";
import isAuth from "../middlewares/isAuth";
import players from "../../stores/players";
import { IApi } from "../../../../interfaces/IApi";

const route = Router();

const ID_PARAM = "playlistId";

export default (app: Router) => {
  app.use("/playlist", route);
  route.get(
    `/:${ID_PARAM}`,
    async (
      req: Request<{ [ID_PARAM]: string }, {}, IApi["playlist"]["get"]["req"]>,
      res,
      next
    ) => {
      try {
        const playlist = await playlistController.get(req.params[ID_PARAM]);
        res.json(<IApi["playlist"]["get"]["res"]>{ playlist });
      } catch (err) {
        next(err);
      }
    }
  );

  route.post(
    "/add",
    isAuth,
    async (
      req: Request<{}, {}, IApi["playlist"]["add"]["post"]["req"]>,
      res,
      next
    ) => {
      try {
        const playlist = await playlistController.add({
          title: req.body.title,
          trackList: req.body.trackList || [],
          owner: req.user.id,
          state: req.body.state,
        });
        res.json(<IApi["playlist"]["add"]["post"]["res"]>{ playlist });
      } catch (err) {
        next(err);
      }
    }
  );
  route.delete(
    `/:${ID_PARAM}`,
    isOwner(Playlist, ID_PARAM),
    async (
      req: Request<
        { [ID_PARAM]: string },
        {},
        IApi["playlist"]["delete"]["req"]
      >,
      res,
      next
    ) => {
      try {
        const id = req.params[ID_PARAM];
        const playlist = await playlistController.delete(id);
        res.json(<IApi["playlist"]["delete"]["res"]>{
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
    isOwner(Playlist, ID_PARAM),
    async (
      req: Request<{ [ID_PARAM]: string }, {}, IApi["playlist"]["put"]["req"]>,
      res,
      next
    ) => {
      try {
        const id = req.params[ID_PARAM];
        const playlist = await playlistController.edit(id, { ...req.body });
        res.json(<IApi["playlist"]["put"]["res"]>{
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
    isOwner(Playlist, ID_PARAM),
    async (
      req: Request<{ [ID_PARAM]: string }, {}, IApi["playlist"]["play"]["req"]>,
      res,
      next
    ) => {
      try {
        const id = req.params[ID_PARAM];
        const playlist = await playlistController.play(id);
        const message = MESS.PLAYLIST.PLAY;
        res.json(<IApi["playlist"]["play"]["res"]>{
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
    isOwner(Playlist, ID_PARAM),
    async (
      req: Request<
        { [ID_PARAM]: string },
        {},
        IApi["playlist"]["pause"]["req"]
      >,
      res,
      next
    ) => {
      try {
        const id = req.params[ID_PARAM];
        const player = players.get(id);
        const playlist = await playlistController.pause(
          id,
          player.state.track,
          player.state.time
        );
        const message = MESS.PLAYLIST.PAUSE;
        res.json(<IApi["playlist"]["pause"]["res"]>{
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
    isOwner(Playlist, ID_PARAM),
    async (
      req: Request<{ [ID_PARAM]: string }, {}, IApi["playlist"]["stop"]["req"]>,
      res,
      next
    ) => {
      try {
        const id = req.params[ID_PARAM];
        const playlist = await playlistController.stop(id);
        res.json(<IApi["playlist"]["stop"]["res"]>{
          playlist,
          message: MESS.PLAYLIST.STOP,
        });
      } catch (err) {
        next(err);
      }
    }
  );
};
