import { IUser } from "./IUser";
import { ITrack } from "./ITrack";

export interface IPlaylistDTO {
  cover: {
    path: string;
    url: string;
    originalname: string;
    mimetype: string;
  };
  title: string;
  trackList: { track: string | ITrack; orderId: number }[];
}

export interface IPlaylistDTOClient extends Omit<IPlaylistDTO, "cover"> {
  cover?: File;
}

export interface IPlaylist extends IPlaylistDTO {
  id: string;
  state: {
    play: boolean;
    trackId: number;
    timestamp: number;
  };
  owner: string | IUser;
  created: Date;
}
