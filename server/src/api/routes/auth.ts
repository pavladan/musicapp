import { Router } from "express";
import passport from "../../passport";
import { IUser } from "../../../../interfaces/IUser";
import { BadRequestError } from "../../utils/BadRequestError";
import ERR from "../../constants/ERRORS";
import MESS from "../../constants/MESSAGES";
import { Request } from "express";
import { IApi } from "../../../../interfaces/IApi";

const route = Router();

export default (app: Router) => {
  app.use("/auth", route);

  route.post(
    "/login",
    (req: Request<{}, {}, IApi["auth"]["login"]["post"]["req"]>, res, next) => {
      passport.authenticate("local", (err: Error, user: IUser) => {
        if (err) {
          return next(new BadRequestError(err.message));
        }
        if (!user) {
          return next(new BadRequestError(ERR.NO_FIND_USER));
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(new BadRequestError(err.message));
          }
          const userWithoutPass = JSON.parse(JSON.stringify(user));
          delete userWithoutPass.password;
          return res.json(<IApi["auth"]["login"]["post"]["res"]>{
            user: userWithoutPass,
          });
        });
      })(req, res, next);
    }
  );

  route.get(
    "/logout",
    (req: Request<{}, {}, IApi["auth"]["logout"]["get"]["req"]>, res, next) => {
      try {
        req.logout();
        res.json(<IApi["auth"]["logout"]["get"]["res"]>{
          message: MESS.LOGOUT,
        });
      } catch (err) {
        next(new BadRequestError(err.message));
      }
    }
  );
};
