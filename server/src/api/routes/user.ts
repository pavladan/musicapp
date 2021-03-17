import { Router } from "express";
import userController from "../../controller/user";
import isAuth from "../middlewares/isAuth";
import { Request } from "express";
import { IApi } from "../../../../interfaces/IApi";

const route = Router();

export default (app: Router) => {
  app.use("/user", route);

  route.get(
    "/",
    async (req: Request<{}, {}, IApi["user"]["get"]["req"]>, res, next) => {
      try {
        const user = req.user;
        if (user) {
          const newUser = await userController.getUser(user.id);
          res.json(<IApi["user"]["get"]["res"]>{ user: newUser });
        } else {
          res.json(<IApi["user"]["get"]["res"]>{ user: null });
        }
      } catch (err) {
        next(err);
      }
    }
  );

  route.get(
    "/tracks",
    isAuth,
    async (
      req: Request<{}, {}, IApi["user"]["tracks"]["get"]["req"]>,
      res,
      next
    ) => {
      try {
        const userId = req.user.id;
        const tracks = await userController.getUserTracks(userId);
        res.json(<IApi["user"]["tracks"]["get"]["res"]>{ tracks });
      } catch (err) {
        next(err);
      }
    }
  );

  route.get(
    "/playlists",
    isAuth,
    async (
      req: Request<{}, {}, IApi["user"]["playlists"]["get"]["req"]>,
      res,
      next
    ) => {
      try {
        const userId = req.user.id;
        const playlists = await userController.getUserPlaylists(userId);
        res.json(<IApi["user"]["playlists"]["get"]["res"]>{ playlists });
      } catch (err) {
        next(err);
      }
    }
  );
};
