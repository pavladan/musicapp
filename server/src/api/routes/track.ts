import { NextFunction, Request, Response, Router } from "express";
import trackController from "../../controller/track";
import upload from "../../services/multer";
import isAuthor from "../middlewares/isAuthor";
import Track from "../../models/Track";
import isAuth from "../middlewares/isAuth";
import { ITrackDTO } from "../../interfaces/ITrack";

const route = Router();

const ID_PARAM = "trackId";

export default (app: Router) => {
  app.use("/track", route);

  route.post(
    "/",
    [isAuth, upload.single("track")],
    async (
      req: Request<{}, {}, ITrackDTO>,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const track = await trackController.addNewTrack({
          title: req.body.title,
          artist: req.body.artist,
          track: req.file,
          author: req.user.id,
        });
        res.json({ track });
      } catch (err) {
        next(err);
      }
    }
  );

  route.get(
    `/:${ID_PARAM}`,
    isAuthor(Track, ID_PARAM),
    async (req: Request<{ [ID_PARAM]: string }>, res, next) => {
      try {
        const id = req.params[ID_PARAM];
        const track = await trackController.getTrackInfo(id);
        res.json({ track });
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

        res.writeHead(200, {
          "Content-Type": "audio/mpeg",
          "Content-Length": size,
          "accept-ranges": "bytes",
        });
        res.json({ file });
      } catch (err) {
        next(err);
      }
    }
  );

  route.delete(
    `/:${ID_PARAM}`,
    isAuthor(Track, ID_PARAM),
    async (req: Request<{ [ID_PARAM]: string }>, res, next) => {
      try {
        const id = req.params[ID_PARAM];
        const track = trackController.deleteTrack(id);
        res.json({ track });
      } catch (err) {
        next(err);
      }
    }
  );
};
