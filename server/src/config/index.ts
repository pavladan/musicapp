import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
dotenv.config();

export default {
  port: +process.env.PORT || 4000,
  databaseURL: process.env.MONGO_URI,
  api: {
    prefix: "/api/v1",
  },
  cors: {
    origin: "*",
  },
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
};
