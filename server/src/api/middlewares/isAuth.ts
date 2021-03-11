import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../../utils/BadRequestError";
import ERRORS from "../../constants/ERRORS";

export default function isAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    return next(new BadRequestError(ERRORS.UNAUTHORIZED, 401));
  }
  next();
}
