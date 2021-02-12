import Playlist from "../models/Playlist";
import playlistController from "../services/PlaylistService";
import addPlayerToPlaylistService from "../services/addPlayerToPlaylistService";

export default () => {
  Playlist.watch().on("change", async (changeEvent: any) => {
    const { operationType } = changeEvent;
    const id = changeEvent.documentKey._id.toString();

    if (operationType === "insert") {
      await addPlayerToPlaylistService(id);
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
