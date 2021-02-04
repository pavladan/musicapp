import mongoose, { Schema, Document } from "mongoose";
import { Express } from "express";

export interface ITrack extends Document {
  title: string;
  track: Express.Multer.File;
  artist: string;
  created: Date;
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
});
const Track = mongoose.model<ITrack>("Track", musicSchema);

export default Track;
