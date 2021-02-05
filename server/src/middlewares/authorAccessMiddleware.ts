import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";

export default function authorAccessMiddleware(
  Model: Model<any>,
  paramName = "id"
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) return res.sendStatus(403);
      const id = req.params[paramName];
      const found = await Model.findById(id);
      if (!found) return res.status(202).json({ message: "Not found" });
      if (found.authorId !== req.user.id)
        return res.status(403).json({ message: "No access" });
      next();
    } catch (err) {
      res.status(500).json(err);
    }
  };
}
