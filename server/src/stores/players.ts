import Player from "../services/Player";

class Players {
  private players: { [id: string]: Player } = {};

  add(id: string, player: Player) {
    this.players[id] = player;
  }

  delete(id: string) {
    delete this.players[id];
  }

  get(id: string) {
    return this.players[id];
  }

  remove() {
    this.players = {};
  }
}

export default new Players();
