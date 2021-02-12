import mongoose, { Schema, Document } from "mongoose";
import { ITrack } from "../interfaces/ITrack";

const trackSchema = new Schema({
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
  author: {
    type: String,
    required: true,
    ref: "User",
  },
});

export default mongoose.model<ITrack & Document>("Track", trackSchema);
