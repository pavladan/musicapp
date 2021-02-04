import { IUser } from "../models/Users";
import { Request, Response } from "express";
import passport from "../../passport";

const getUser = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(200).json();
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
};

const register = (req: Request, res: Response, next: () => void) => {
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
};

const logout = (req: Request, res: Response) => {
  req.logout();
  return res.send();
};
export default {
  register,
  logout,
  getUser,
};
