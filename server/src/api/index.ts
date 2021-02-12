import auth from "./routes/auth";
import user from "./routes/user";
import track from "./routes/track";
import playlist from "./routes/playlist";
import { Router } from "express";

export default () => {
  const app = Router();

  auth(app);
  playlist(app);
  track(app);
  user(app);

  return app;
};
