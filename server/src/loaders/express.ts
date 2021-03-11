import { ErrorRequestHandler, Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "../api";
import config from "../config";
import morgan from "morgan";
import { BadRequestError } from "../utils/BadRequestError";

export default (app: Express) => {
  app.get("/status", (req, res) => {
    res.end();
  });

  app.enable("trust proxy");

  app.use(cors({ origin: config.cors.origin, credentials: true }));

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(morgan("dev"));

  app.use(config.api.prefix, routes());

  app.use((req, res, next) => {
    const err = new BadRequestError("Not Found", 404);
    next(err);
  });

  const errorRequestHandler: ErrorRequestHandler = (
    err: BadRequestError,
    req,
    res,
    _next
  ) => {
    res.status(err.statusCode || 500).json({
      message: err.message,
    });
  };
  app.use(errorRequestHandler);
};
