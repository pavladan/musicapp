import http from "http";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import SocketIO from "socket.io";
import initListeners from "./socket";
import session from "express-session";
import connectMongo from "connect-mongo";
import authRoutes from "./api/routes/auth";
import trackRoutes from "./api/routes/track";
import passport from "./passport";
import playlistRoutes from "./api/routes/playlist";
import userRouter from "./api/routes/user";

dotenv.config();
const app = express();
const server = http.createServer(app);
const PORT: number = +process.env.PORT || 4000;
const MONGO_URI: string = process.env.MONGO_URI;

const MongoStore = connectMongo(session);
const io: SocketIO.Server = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log({ database_error: err });
  });

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
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

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/track", trackRoutes);
app.use("/api/v1/playlist", playlistRoutes);

app.get("/api/v1/", (req, res) => {
  res.json("Hola MENV devs... Assemble");
});

// initListeners(io);

server.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
