import multer from "multer";
import { Request, Express } from "express";
import { BadRequestError } from "../utils/BadRequestError";

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error, destination: boolean) => void
) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      new BadRequestError("Not an image! Please upload an image.", 400),
      false
    );
  }
};
export default multer({
  storage: multer.memoryStorage(),
  fileFilter,
});
