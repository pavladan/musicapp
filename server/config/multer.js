const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}_${file.originalname}`);
  },
});
const fileFilter = (req, file, cb) => {
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
exports.upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
});
