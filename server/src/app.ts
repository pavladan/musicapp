import http from "http";
import express from "express";
import config from "./config";
import loaders from "./loaders";

async function startServer() {
  const app = express();
  const server = http.createServer(app);

  await loaders(app, server);

  server
    .listen(config.port, () => {
      console.info(`
      ################################################
      🛡️  Server listening on port: ${config.port}  🛡️
      ################################################
    `);
    })
    .on("error", (err) => {
      console.error(err);
      process.exit(1);
    });
}

startServer();
