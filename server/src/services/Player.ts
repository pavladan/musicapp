import { ChildProcess, spawn } from "child_process";
import config from "../config";

const cmd = config.rtmp_server.trans.ffmpeg;

class Player {
  private readonly id: string;
  private readonly playlist: string[];
  public state: {
    track: number;
    time: number;
  } = {
    track: 0,
    time: 0,
  };
  private process: ChildProcess;

  constructor(id: string, playlist: string[] = []) {
    this.id = id;
    this.playlist = playlist;
    this.state.track = 0;
  }
  play(position: number = 0) {
    this.process = spawn(cmd, [
      "-stream_loop",
      "-1",
      "-re",
      `-i`,
      this.playlist[this.state.track],
      "-c",
      "copy",
      "-f",
      "flv",
      `rtmp://localhost${config.rtmp_server.http.prefix}/${this.id}`,
    ]);

    this.process.stderr.setEncoding("utf8");
    this.process.stderr.on("data", function (data) {
      console.log(data);
    });
    this.process.on("close", () => console.log("close"));
    this.process.on("disconnect", () => console.log("disconnect"));
    this.process.on("error", () => console.log("error"));
    this.process.on("exit", () => console.log("exit"));
    this.process.on("message", () => console.log("message"));
    this.process.on("spawn", () => console.log("spawn"));
  }
  stop() {
    this.process?.kill("SIGHUP");
  }
}

export default Player;
