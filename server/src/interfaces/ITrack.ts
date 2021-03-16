import { Express } from "express";
import { IUser } from "./IUser";

export interface ITrack {
  id: string;
  title: string;
  track: Express.Multer.File;
  artist: string;
  created: Date;
  owner: IUser | string;
}

export interface ITrackDTO {
  title: string;
  track: Express.Multer.File;
  artist: string;
}
