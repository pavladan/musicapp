import SocketIO from "socket.io";

const event = (socket: SocketIO.Server) => {
  // Do some interesting thing inside of this place!
  socket.emit("socker", { socket /* Some other interesting data, maybe*/ });
};
export default event;
