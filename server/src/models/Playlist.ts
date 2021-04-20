import mongoose, { Schema, Document } from "mongoose";
import { IPlaylist } from "../../../interfaces/IPlaylist";
const mongooseLeanId = require("mongoose-lean-id");

const playlistSchema = new Schema({
  state: {
    play: {
      type: Boolean,
      default: false,
    },
    trackId: {
      type: Number,
      default: 0,
    },
    timestamp: {
      type: Number,
      default: 0,
    },
  },
  title: {
    type: String,
    required: true,
    minLength: 2,
  },
  cover: {
    type: Object,
  },
  trackList: {
    type: [
      {
        track: {
          type: String,
          ref: "Track",
          required: true,
        },
        orderId: {
          type: Number,
        },
      },
    ],
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
});
playlistSchema.plugin(mongooseLeanId);

export default mongoose.model<IPlaylist & Document>("Playlist", playlistSchema);
