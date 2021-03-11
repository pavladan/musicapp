import playlistController from "../controller/playlist";
import config from "../config";
const NodeMediaServer = require("node-media-server");

export default () => {
  const nms = new NodeMediaServer(config.rtmp_server);
  nms.on("prePublish", async (id: number, StreamPath: string, args: any) => {
    let stream_key = getStreamKeyFromStreamPath(StreamPath);
    console.log(
      "[NodeEvent on prePublish]",
      `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
    );
    try {
      const playlist = await playlistController.get(stream_key);
      if (!playlist) {
        const session = nms.getSession(id);
        await session.reject();
      }
    } catch (err) {}
  });

  const getStreamKeyFromStreamPath = (path: string) => {
    let parts = path.split("/");
    return parts[parts.length - 1];
  };

  return nms.run();
};
