import Playlist from "../api/models/Playlist";
import playlistController from "../services/PlaylistController";
import addPlayerToPlaylistController from "./addPlayerToPlaylistController";

export default () => {
  Playlist.watch().on("change", async (changeEvent: any) => {
    const { operationType } = changeEvent;
    const id = changeEvent.documentKey._id.toString();

    if (operationType === "insert") {
      await addPlayerToPlaylistController(id);
    } else if (operationType === "update") {
      const updatedFields = changeEvent.updateDescription.updatedFields;
      if (updatedFields.play !== undefined) {
        const player = playlistController.getPlayerById(id);
        if (updatedFields.play) player.play();
        else player.stop();
      }
    } else if (operationType === "delete") {
      playlistController.deletePlayer(id);
    }
  });
};
