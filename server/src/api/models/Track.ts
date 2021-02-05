import mongoose, { Schema, Document } from "mongoose";
import { Express } from "express";
import { ObjectID } from "mongodb";

export interface ITrack extends Document {
  title: string;
  track: Express.Multer.File;
  artist: string;
  created: Date;
  authorId: ObjectID;
}

const musicSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  track: {
    type: Object,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  authorId: {
    type: String,
    required: true,
  },
});
const Track = mongoose.model<ITrack>("Track", musicSchema);

export default Track;
