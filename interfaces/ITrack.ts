import { IUser } from "./IUser";
import { IMulterFile } from "./IMulterFile";

export interface ITrack {
  id: string;
  title: string;
  track: IMulterFile;
  artist: string;
  created: Date;
  owner: IUser | string;
  duration: string;
  mediaUrl: string;
}

export interface ITrackDTO {
  title: string;
  track: File;
  artist: string;
}
