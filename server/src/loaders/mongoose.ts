import mongoose from "mongoose";
import config from "../config";
import { Db } from "mongodb";

export default async (): Promise<Db> => {
  const connection = await mongoose.connect(config.databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  return connection.connection.db;
};
