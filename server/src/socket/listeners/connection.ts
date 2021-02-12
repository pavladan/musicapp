import SocketIO from "socket.io";
import playlistController from "../../services/PlaylistService";

export default (io: SocketIO.Server) => {
  const matchTemplate = "/playlist/";

  const nspSocket = io
    .of(new RegExp("^" + matchTemplate + ".*$"))
    .on("connection", (socket: SocketIO.Socket) => {
      console.log(socket.nsp.name);
      const playlistName = socket.nsp.name.replace(matchTemplate, "");
      playlistController.increaseConnect(playlistName, nspSocket);
      socket.on("disconnect", function () {
        playlistController.decreaseConnect(playlistName);
      });
    });
};
