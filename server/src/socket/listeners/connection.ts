import SocketIO from "socket.io";

export default (io: SocketIO.Server) => {
  const matchTemplate = "/playlist/";

  const nspSocket = io
    .of(new RegExp("^" + matchTemplate + ".*$"))
    .on("connection", (socket: SocketIO.Socket) => {
      console.log("connect", socket.nsp.name);
      const playlistName = socket.nsp.name.replace(matchTemplate, "");
      socket.on("disconnect", function () {

      });
    });
};
