import SocketIO from "socket.io";
import connected from "../events/connected";
import path from "path";
import fs from "fs";
import Throttle from "throttle";

const ss = require("socket.io-stream");

export default (io: SocketIO.Server) => {
  const stream = ss.createStream();

  const throttle = new Throttle(128000 / 8);

  const filePath = path.resolve(
    __dirname,
    "../../../uploads",
    "./1612182464082_Александр Гудков - АКВАДИСКОТЕКА (feat. Cream Soda, СЛИВ ТРЕКА).mp3"
  );
  // get file info
  const stat = fs.statSync(filePath);
  const readStream = fs.createReadStream(filePath);
  // pipe stream with response stream
  // readStream.pipe(throttle).on("data", console.log);
  // ss(socket).emit("track-stream", stream, { stat });

  let clients = 0;

  io.on("connection", (socket: SocketIO.Server) => {
    socket.on("track", () => {
      clients++;
      io.sockets.emit("broadcast", {
        description: clients + " clients connected!",
      });
      socket.on("disconnect", function () {
        clients--;
        io.sockets.emit("broadcast", {
          description: clients + " clients connected!",
        });
      });
    });
  });
};
