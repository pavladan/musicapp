import Throttle from "throttle";
import fs from "fs";
import EventEmitter from "events";

type Event = "start-play" | "playing" | "end-play";
declare interface Player {
  on(event: Event, listener: Function): this;
  emit(event: Event, ...args: any[]): boolean;
}

class Player extends EventEmitter {
  private readonly playlist: string[];
  private throttle: Throttle;
  private state: {
    currentTrack: number | undefined;
  } = {
    currentTrack: undefined,
  };
  private readStream: fs.ReadStream = null;

  constructor(playlist: string[] = []) {
    super();
    this.playlist = playlist;
    this.state.currentTrack = 0;
    this.throttle = new Throttle(128000 / 8);
  }
  play() {
    const filePath = this.playlist[this.state.currentTrack];
    const stat = fs.statSync(filePath);
    this.emit("start-play", stat);
    this.readStream = fs.createReadStream(filePath);
    this.readStream
      .pipe(this.throttle)
      .on("data", (data) => {
        this.emit("playing", data);
      })
      .on("end", () => {
        this.emit("end-play");
      });
  }
  stop() {
    this.readStream.close();
    this.readStream = null;
  }
}

export default Player;
