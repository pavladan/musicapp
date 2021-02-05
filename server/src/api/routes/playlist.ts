import { Router } from "express";
import playlistController from "../controller/playlistController";
import authorAccessMiddleware from "../../middlewares/authorAccessMiddleware";
import Playlist from "../models/Playlist";
import isUserAuthenticatedMiddleware from "../../middlewares/isUserAuthenticatedMiddleware";
const router = Router();

router.get("/:playlistId", playlistController.get);
router.post("/add", isUserAuthenticatedMiddleware, playlistController.add);
router.delete(
  "/:playlistId",
  authorAccessMiddleware(Playlist, "playlistId"),
  playlistController.delete
);
router.put(
  "/:playlistId",
  authorAccessMiddleware(Playlist, "playlistId"),
  playlistController.edit
);
router.post(
  "/:playlistId/play",
  authorAccessMiddleware(Playlist, "playlistId"),
  playlistController.play(true)
);
router.post(
  "/:playlistId/stop",
  authorAccessMiddleware(Playlist, "playlistId"),
  playlistController.play(false)
);

export default router;
