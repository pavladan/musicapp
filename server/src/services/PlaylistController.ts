import Player from "./Player";
import SocketIO from "socket.io";
import trackEvents from "../socket/events/track";

class PlaylistController {
  private playlists: {
    id: string;
    numberOfConnections: number;
    player: Player;
    socket: SocketIO.Socket;
  }[] = [];

  constructor() {}

  private getPlaylistById(id: String) {
    return this.playlists.find((e) => e.id === id);
  }

  private subscribeToPlayer(
    player: Player,
    socket: SocketIO.Socket | undefined
  ) {
    player.on("start-play", () => socket && trackEvents.start(socket));
    player.on(
      "playing",
      (data: Buffer) => socket && trackEvents.playing(socket, data)
    );
    player.on("end-play", () => socket && trackEvents.end(socket));
  }

  increaseConnect(id: string, socket: SocketIO.Socket) {
    const playlist = this.getPlaylistById(id);
    if (playlist) playlist.numberOfConnections++;
    else {
      this.playlists.push({ id, numberOfConnections: 1, player: null, socket });
    }
  }

  decreaseConnect(id: string) {
    const playlist = this.getPlaylistById(id);
    if (!playlist) throw "no find playlist";

    playlist.numberOfConnections--;
  }

  addPlayer(id: string, player: Player) {
    let playlist = this.getPlaylistById(id);
    if (playlist) playlist.player = player;
    else {
      playlist = { id, numberOfConnections: 0, player, socket: null };
      this.playlists.push(playlist);
    }
    this.subscribeToPlayer(player, playlist.socket);
  }

  getPlayerById(id: string) {
    return this.getPlaylistById(id)?.player;
  }

  get() {
    return this.playlists;
  }

  deletePlayer(id: string) {
    const playlist = this.getPlaylistById(id);
    playlist.player.stop();
    playlist.player = null;
  }
}

const playlistController = new PlaylistController();
export default playlistController;
