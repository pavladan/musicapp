import { Router } from "express";
import musicController from "../controller/trackController";
import upload from "../../services/multer";
const router = Router();

router.get("/", musicController.getAllTracks);
router.post("/", upload.single("music"), musicController.addNewTrack);
router.delete("/:trackId", musicController.deleteTrack);
router.get("/:trackId", musicController.getTrack);

export default router;
