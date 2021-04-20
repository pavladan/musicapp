import dotenv from "dotenv";
import path from "path";
const pathToFfmpeg = require("ffmpeg-static");
const ffprobeStatic = require("ffprobe-static");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

dotenv.config();
dotenv.config({
  path: "../.env",
});

const allowOrigin = true;

export default {
  host: process.env.HOST || "http://localhost",
  port: +process.env.API_PORT || +process.env.PORT || 4000,
  mediaPrefix: "/audio",
  imgPrefix: "/img",
  databaseURL: process.env.MONGO_URI,
  media_path: path.resolve("./uploads/audio"),
  img_path: path.resolve("./uploads/img"),
  ffprobe: ffprobeStatic.path,
  api: {
    prefix: process.env.API_PREFIX || "/",
  },
  cors: {
    origin: allowOrigin,
  },
  rtmp_server: {
    rtmp: {
      port: 1935,
      chunk_size: 60000,
      gop_cache: true,
      ping: 60,
      ping_timeout: 30,
      allow_origin: allowOrigin,
    },
    http: {
      port: +process.env.STREAM_PORT || 4001,
      prefix: process.env.STREAM_PREFIX || "/live",
      mediaroot: "./live",
      allow_origin: allowOrigin,
    },
    trans: {
      ffmpeg: pathToFfmpeg,
      tasks: {
        app: "live",
        hls: true,
        hlsFlags: "[hls_time=2:hls_list_size=3:hls_flags=delete_segments]",
        dash: true,
        dashFlags: "[f=dash:window_size=3:extra_window_size=5]",
      },
    },
  },
};
