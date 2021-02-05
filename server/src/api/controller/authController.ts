import { IUser } from "../models/Users";
import { NextFunction, Request, Response } from "express";
import passport from "../../passport";

export default {
  login: (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", function (err: any, user: IUser) {
      if (err) {
        return res.status(400).json({ errors: err });
      }
      if (!user) {
        return res.status(400).json({ errors: "No user found" });
      }
      req.logIn(user, function (err) {
        if (err) {
          return res.status(400).json({ errors: err });
        }
        return res.status(200).json({ success: `logged in ${user.id}` });
      });
    })(req, res, next);
  },
  logout: (req: Request, res: Response) => {
    req.logout();
    return res.send();
  },
};
