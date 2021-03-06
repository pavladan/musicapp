import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";
import { BadRequestError } from "../../utils/BadRequestError";
import ERR from "../../constants/ERRORS";

export default function isOwner(Model: Model<any>, paramName = "id") {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new BadRequestError(ERR.UNAUTHORIZED, 401);
      const id = req.params[paramName];
      const found = await Model.findById(id);
      if (!found) throw new BadRequestError(ERR.NOT_FOUND, 202);
      if (found.owner !== req.user.id)
        throw new BadRequestError(ERR.ACCESS_DENIED, 403);
      next();
    } catch (err) {
      next(err);
    }
  };
}
