import { IUser } from "./IUser";
import { ITrack } from "./ITrack";

export interface IPlaylistDTO {
  state: {
    play: boolean;
    trackId: number;
    timestamp: number;
  };
  title: string;
  trackList: { track: string | ITrack; orderId: number }[];
  owner: string | IUser;
}

export interface IPlaylist extends IPlaylistDTO {
  id: string;
  created: Date;
}
