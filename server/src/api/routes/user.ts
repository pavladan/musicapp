import { Router } from "express";
import userController from "../controller/userController";
import isUserAuthenticatedMiddleware from "../../middlewares/isUserAuthenticatedMiddleware";
const router = Router();

router.get("/", userController.getUser);
router.get(
  "/tracks",
  isUserAuthenticatedMiddleware,
  userController.getUserTracks
);
router.get(
  "/playlists",
  isUserAuthenticatedMiddleware,
  userController.getUserPlaylists
);

export default router;
