import SocketIO from "socket.io";

const trackEvents = {
  start(socket: SocketIO.Namespace) {
    socket.emit("play-start");
  },
  playing(socket: SocketIO.Namespace, data: Buffer) {
    console.log("playing");
    socket.emit("playing", { data });
  },
  end(socket: SocketIO.Namespace) {
    socket.emit("play-end");
  },
};

export default trackEvents;
