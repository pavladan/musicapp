import SocketIO from "socket.io";
import playlistController from "../../services/PlaylistController";

export default (io: SocketIO.Server) => {
  const matchTemplate = "/playlist/";

  io.of(new RegExp("^" + matchTemplate + ".*$")).on(
    "connection",
    (socket: SocketIO.Socket) => {
      const playlistName = socket.nsp.name.replace(matchTemplate, "");
      playlistController.increaseConnect(playlistName, socket);
      socket.on("disconnect", function () {
        playlistController.decreaseConnect(playlistName);
      });
    }
  );
};
