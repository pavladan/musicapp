import SocketIO from "socket.io";
import connection from "./listeners/connection";

export default (io: SocketIO.Server) => {
  connection(io);
};
