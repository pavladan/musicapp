import { NextFunction, Request, Response } from "express";
import config from "../../config";

const sharp = require("sharp");

const resizeImage = async (req: Request, res: Response, next: NextFunction) => {
  const file = req.file;
  if (!file) return next();

  const ext = file.mimetype.split("/")[1];
  const filename = `playlist-${req.user.id}-${Date.now()}.${ext}`;
  const path = `${config.img_path}/${filename}`;
  await sharp(file.buffer)
    .resize(300, 300)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(path);

  req.body.cover = {
    url: `${config.host}:${config.port}${config.imgPrefix}/${filename}`,
    path,
    originalname: file.originalname,
    mimetype: file.mimetype,
  };
  next();
};
export default resizeImage;
