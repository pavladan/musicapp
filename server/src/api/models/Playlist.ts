import mongoose, { Schema, Document } from "mongoose";
import { ObjectID } from "mongodb";

export interface IPlaylist extends Document {
  play: boolean;
  title: string;
  trackList: { trackId: ObjectID; orderId: number }[];
  created: Date;
  authorId: ObjectID;
}

const playlistSchema = new Schema({
  play: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  trackList: {
    type: [
      {
        trackId: {
          type: ObjectID,
          required: true,
        },
        orderId: {
          type: Number,
          required: true,
        },
      },
    ],
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

export default mongoose.model<IPlaylist>("Playlist", playlistSchema);
