import mongooseLoader from "./mongoose";
import expressLoader from "./express";
import { Express } from "express";
import playlistsLoader from "./playlists";
import http from "http";
import socketLoader from "./socket";
import passportLoader from "./passport";
import subscribers from "./subscribers";

export default async (expressApp: Express, server: http.Server) => {
  await mongooseLoader();
  console.info("    🚀 DB loaded and connected!");

  await subscribers();
  console.info("    🚀 DB subscribers loaded");

  await passportLoader(expressApp);
  console.info("    🚀 Passport loaded");

  await playlistsLoader();
  console.info("    🚀 Playlists loaded");

  await expressLoader(expressApp);
  console.info("    🚀 Express loaded");

  await socketLoader(server);
  console.info("    🚀 Socket loaded");
};
