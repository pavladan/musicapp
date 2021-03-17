import { IUser } from "./IUser";
import { Readable } from "stream";

interface IMulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  stream: Readable;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

export interface ITrack {
  id: string;
  title: string;
  track: IMulterFile;
  artist: string;
  created: Date;
  owner: IUser | string;
  duration: string;
}

export interface ITrackDTO {
  title: string;
  track: IMulterFile;
  artist: string;
}
