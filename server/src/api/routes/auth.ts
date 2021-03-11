import { Router } from "express";
import passport from "../../passport";
import { IUser } from "../../interfaces/IUser";
import { BadRequestError } from "../../utils/BadRequestError";
import ERR from "../../constants/ERRORS";
import MESS from "../../constants/MESSAGES";

const route = Router();

export default (app: Router) => {
  app.use("/auth", route);

  route.post("/login", (req, res, next) => {
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
        return res.json({ user: userWithoutPass });
      });
    })(req, res, next);
  });

  route.get("/logout", (req, res, next) => {
    try {
      req.logout();
      res.json({ message: MESS.LOGOUT });
    } catch (err) {
      next(new BadRequestError(err.message));
    }
  });
};
