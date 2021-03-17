import { IUser, IUserDTO } from "./IUser";
import { IPlaylist, IPlaylistDTO } from "./IPlaylist";
import { ITrack, ITrackDTO } from "./ITrack";

interface IMessageRes {
  message: string;
}
type IUserRes = { user: Exclude<IUser, "password"> };
type IPlaylistRes = { playlist: IPlaylist };
type IPlaylistsRes = { playlists: IPlaylist[] };
type ITrackRes = { track: ITrack };
type ITracksRes = { tracks: ITrack[] };

export interface IApi {
  auth: {
    logout: {
      get: {
        req: {};
        res: IMessageRes;
      };
    };
    login: {
      post: {
        req: IUserDTO;
        res: IUserRes;
      };
    };
  };
  user: {
    get: {
      req: {};
      res: IUserRes;
    };
    playlists: {
      get: {
        req: {};
        res: IPlaylistsRes;
      };
    };
    tracks: {
      get: {
        req: {};
        res: ITracksRes;
      };
    };
  };
  track: {
    post: {
      req: ITrackDTO;
      res: ITrackRes;
    };
    get: {
      req: {};
      res: ITrackRes;
    };
    delete: {
      req: {};
      res: IMessageRes;
    };
  };
  playlist: {
    add: {
      post: {
        req: IPlaylistDTO;
        res: IPlaylistRes;
      };
    };
    delete: {
      req: {};
      res: IMessageRes;
    };
    put: {
      req: Partial<IPlaylistDTO>;
      res: IPlaylistRes;
    };
    get: {
      req: {};
      res: IPlaylistRes;
    };
    play: {
      req: {};
      res: IPlaylistRes & IMessageRes;
    };
    pause: {
      req: {};
      res: IPlaylistRes & IMessageRes;
    };
    stop: {
      req: {};
      res: IPlaylistRes & IMessageRes;
    };
  };
}
