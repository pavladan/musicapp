import { Router } from "express";
import trackController from "../controller/trackController";
import upload from "../../services/multer";
import authorAccessMiddleware from "../../middlewares/authorAccessMiddleware";
import Track from "../models/Track";
import isUserAuthenticatedMiddleware from "../../middlewares/isUserAuthenticatedMiddleware";

const router = Router();

router.post(
  "/",
  [isUserAuthenticatedMiddleware, upload.single("track")],
  trackController.addNewTrack
);
router.get("/:trackId", trackController.getTrackInfo);
router.delete(
  "/:trackId",
  authorAccessMiddleware(Track, "trackId"),
  trackController.deleteTrack
);

export default router;
