import { NextFunction, Request, Response } from "express";

export default function isUserAuthenticatedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user) {
    next();
  } else {
    res.sendStatus(403);
  }
}
