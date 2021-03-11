import { Router } from "express";
import userController from "../../controller/user";
import isAuth from "../middlewares/isAuth";
import { Request } from "express";
const route = Router();

export default (app: Router) => {
  app.use("/user", route);

  route.get("/", async (req: Request, res, next) => {
    try {
      const user = req.user;
      if (user) {
        const newUser = await userController.getUser(user.id);
        res.json({ user: newUser });
      } else {
        res.json({ user: null });
      }
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
      const playlists = await userController.getUserPlaylists(userId);
      res.json({ tracks: playlists });
    } catch (err) {
      next(err);
    }
  });
};
