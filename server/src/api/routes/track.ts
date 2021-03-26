import { NextFunction, Request, Response, Router } from "express";
import trackController from "../../controller/track";
import upload from "../../config/multer";
import isOwner from "../middlewares/isOwner";
import Track from "../../models/Track";
import isAuth from "../middlewares/isAuth";
import MESS from "../../constants/MESSAGES";
import { IApi } from "../../../../interfaces/IApi";

const route = Router();

const ID_PARAM = "trackId";

export default (app: Router) => {
  app.use("/track", route);

  route.post(
    "/",
    [isAuth, upload.single("track")],
    async (
      req: Request<{}, {}, IApi["track"]["post"]["req"]>,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const track = await trackController.addNewTrack({
          title: req.body.title,
          artist: req.body.artist,
          track: req.file,
          owner: req.user.id,
        });
        res.json(<IApi["track"]["post"]["res"]>{ track });
      } catch (err) {
        next(err);
      }
    }
  );

  route.get(
    `/:${ID_PARAM}`,
    isOwner(Track, ID_PARAM),
    async (
      req: Request<{ [ID_PARAM]: string }, {}, IApi["track"]["get"]["req"]>,
      res,
      next
    ) => {
      try {
        const id = req.params[ID_PARAM];
        const track = await trackController.getTrackInfo(id);
        res.json(<IApi["track"]["get"]["res"]>{ track });
      } catch (err) {
        next(err);
      }
    }
  );

  route.get(
    `/:${ID_PARAM}/file`,
    async (req: Request<{ [ID_PARAM]: string }>, res, next) => {
      try {
        const id = req.params[ID_PARAM];

        const { file, size } = await trackController.getTrack(id);
        console.log(file, size);

        res.writeHead(200, {
          "Content-Type": "audio/mpeg",
          "Content-Length": size,
          "accept-ranges": "bytes",
        });
        res.json(file);
      } catch (err) {
        next(err);
      }
    }
  );

  route.delete(
    `/:${ID_PARAM}`,
    isOwner(Track, ID_PARAM),
    async (
      req: Request<{ [ID_PARAM]: string }, {}, IApi["track"]["delete"]["req"]>,
      res,
      next
    ) => {
      try {
        const id = req.params[ID_PARAM];
        await trackController.deleteTrack(id);
        res.json(<IApi["track"]["delete"]["res"]>{ message: MESS.DELETE });
      } catch (err) {
        next(err);
      }
    }
  );
};
