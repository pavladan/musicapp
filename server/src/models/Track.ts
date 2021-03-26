import mongoose, { Schema, Document } from "mongoose";
import { ITrack } from "../../../interfaces/ITrack";
const mongooseLeanId = require("mongoose-lean-id");

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
  owner: {
    type: String,
    required: true,
    ref: "User",
  },
  duration: {
    type: String,
    required: true,
    default: "0",
  },
  mediaUrl: {
    type: String,
    required: true,
  },
});
trackSchema.plugin(mongooseLeanId);

export default mongoose.model<ITrack & Document>("Track", trackSchema);
