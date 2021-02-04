import SocketIO from "socket.io";
import fs from "fs";
import path from "path";

export default (io: SocketIO.Server) => {
  // Full path to the current directory
  const listenersPath = path.resolve(__dirname, "listeners");
  // Reads all the files in a directory
  fs.readdir(listenersPath, (err, files) => {
    if (err) {
      process.exit(1);
    }
    files.map(async (fileName) => {
      if (fileName !== "index.ts") {
        console.debug("Initializing listener at: %s", fileName);
        // Requires all the files in the directory that is not a index.js.
        const listener = await import(path.resolve(listenersPath, fileName));
        // Initialize it with io as the parameter.
        listener.default(io);
      }
    });
  });
};
