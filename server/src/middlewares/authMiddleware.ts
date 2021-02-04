import { NextFunction, Request, Response } from "express";

function isUserAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.user) {
    next();
  } else {
    res.sendStatus(403);
  }
}
export default { isUserAuthenticated };
