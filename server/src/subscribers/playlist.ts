import Playlist from "../models/Playlist";
import playlistController from "../controller/playlist";
import Player from "../services/Player";
import players from "../stores/players";

export default () => {
  Playlist.watch().on("change", async (changeEvent) => {
    if (changeEvent.operationType === "insert") {
      const id = changeEvent.documentKey._id.toString();
      const paths = await playlistController.getTracks(id);
      players.add(id, new Player(id, paths));
    } else if (changeEvent.operationType === "update") {
      const id = changeEvent.documentKey._id.toString();
      const updatedFields = changeEvent.updateDescription.updatedFields;
      if (
        updatedFields["state.play"] !== undefined ||
        updatedFields.state?.play !== undefined
      ) {
        let player = players.get(id);
        if (!player) {
          const paths = await playlistController.getTracks(id);
          player = new Player(id, paths);
          players.add(id, player);
        }
        if (updatedFields["state.play"] || updatedFields.state?.play) {
          const timestamp = (await playlistController.get(id)).state.timestamp;
          player.play(timestamp);
        } else player.stop();
      }
      if (updatedFields["state.timestamp"] !== undefined) {
      }
    } else if (changeEvent.operationType === "delete") {
      const id = changeEvent.documentKey._id.toString();
      players.delete(id);
    }
  });
};
