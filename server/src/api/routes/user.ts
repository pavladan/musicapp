import { Router } from "express";
import userController from "../../controller/user";
import isAuth from "../middlewares/isAuth";
import { Request } from "express";
const route = Router();

export default (app: Router) => {
  app.use("/user", route);

  route.get("/", async (req, res, next) => {
    try {
      const user = req.user;
      res.json({ user });
    } catch (err) {
      next(err);
    }
  });

  route.get("/tracks", isAuth, async (req: Request, res, next) => {
    try {
      const userId = req.user.id;
      const tracks = await userController.getUserTracks(userId);
      res.json({ tracks });
    } catch (err) {
      next(err);
    }
  });

  route.get("/playlists", isAuth, async (req: Request, res, next) => {
    try {
      const userId = req.user.id;
      const tracks = await userController.getUserPlaylists(userId);
      res.json({ tracks });
    } catch (err) {
      next(err);
    }
  });
};
