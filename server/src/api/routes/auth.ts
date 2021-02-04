import { Router } from "express";
import authController from "../controller/authController";
const router = Router();

router.get("/", authController.getUser);
router.post("/login", authController.register);
router.get("/logout", authController.logout);

export default router;
