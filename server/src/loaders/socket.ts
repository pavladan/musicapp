import SocketIO from "socket.io";
import config from "../config";
import http from "http";
import initSocketListeners from "../socket";

export default async (server: http.Server) => {
  const io: SocketIO.Server = require("socket.io")(server, {
    cors: config.cors,
  });
  initSocketListeners(io);
};
