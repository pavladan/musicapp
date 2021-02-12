import session from "express-session";
import mongoose from "mongoose";
import passport from "../passport";
import connectMongo from "connect-mongo";
import express from "express";

export default async (app: express.Application) => {
  const MongoStore = connectMongo(session);

  app.use(
    session({
      secret: "secret key",
      resave: false,
      saveUninitialized: true,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
};
