import SocketIO from "socket.io";

const trackEvents = {
  start(socket: SocketIO.Socket) {
    socket.emit("play-start");
  },
  playing(socket: SocketIO.Socket, data: Buffer) {
    socket.emit("playing", { data });
  },
  end(socket: SocketIO.Socket) {
    socket.emit("play-end");
  },
};

export default trackEvents;
