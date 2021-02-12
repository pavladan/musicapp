import { Express } from "express";

export interface ITrack {
  id: string;
  title: string;
  track: Express.Multer.File;
  artist: string;
  created: Date;
  author: string;
}

export interface ITrackDTO {
  title: string;
  track: Express.Multer.File;
  artist: string;
}
