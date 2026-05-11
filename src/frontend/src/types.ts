export type MediaType = "movie" | "tv";

export interface ImdbItem {
  imdbId: string;
  title: string;
  year: number;
  type: "movie" | "tv";
  posterUrl: string;
  description?: string;
  rank?: number;
}

export interface ContentContext {
  imdbId: string;
  mediaType: MediaType;
  title?: string;
  posterPath?: string | null;
  season?: string;
  episode?: string;
}

export interface WatchEntry {
  ttId: string;
  mediaType: MediaType;
  title?: string;
  addedAt: number;
}
