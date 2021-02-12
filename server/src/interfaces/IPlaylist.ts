export interface IPlaylist {
  id: string;
  play: boolean;
  title: string;
  trackList: { track: string; orderId: number }[];
  created: Date;
  author: string;
}

export interface IPlaylistDTO {
  play: boolean;
  title: string;
  trackList: { track: string; orderId: number }[];
  author: string;
}
