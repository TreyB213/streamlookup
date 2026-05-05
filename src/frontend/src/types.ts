export type MediaType = "movie" | "tv";

export interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  media_type: "movie";
  genre_ids: number[];
  popularity: number;
}

export interface TMDBTVShow {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  media_type: "tv";
  genre_ids: number[];
  popularity: number;
}

export interface TMDBPerson {
  id: number;
  name: string;
  profile_path: string | null;
  media_type: "person";
  popularity: number;
  known_for_department: string;
}

export type TMDBResult = TMDBMovie | TMDBTVShow | TMDBPerson;

export interface TMDBSearchResponse {
  page: number;
  results: TMDBResult[];
  total_pages: number;
  total_results: number;
}

export interface TMDBExternalIds {
  imdb_id: string | null;
  tvdb_id?: number | null;
  facebook_id?: string | null;
  instagram_id?: string | null;
  twitter_id?: string | null;
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
