import multer from "multer";
import { Request, Express } from "express";

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}_${file.originalname}`);
  },
});
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error, destination: boolean) => void
) => {
  if (
    ["audio/mpeg", "audio/wave", "audio/wav", "audio/mp3"].some(
      (mimetype) => mimetype === file.mimetype
    )
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
export default multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
});
