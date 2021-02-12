import mongoose, { Schema, Document } from "mongoose";
import { IPlaylist } from "../interfaces/IPlaylist";

const playlistSchema = new Schema({
  play: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
    minLength: 2,
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
  author: {
    type: String,
    required: true,
    ref: "User",
  },
});

export default mongoose.model<IPlaylist & Document>("Playlist", playlistSchema);
