import type { ImdbItem } from "../types";

export const POPULAR_MOVIES: { imdbId: string; title: string; year: number }[] =
  [];
export const POPULAR_TV: { imdbId: string; title: string; year: number }[] = [];

// Stub — this file is superseded by lib/imdb.ts
export function getImageUrl(path: string | null | undefined): string {
  return path ?? "/assets/images/placeholder.svg";
}

export function fetchTrending(): Promise<{ results: ImdbItem[] }> {
  return Promise.resolve({ results: [] });
}
export function fetchPopularMovies(): Promise<{ results: ImdbItem[] }> {
  return Promise.resolve({ results: [] });
}
export function fetchPopularTV(): Promise<{ results: ImdbItem[] }> {
  return Promise.resolve({ results: [] });
}
export function fetchSearchTMDB(): Promise<{
  results: ImdbItem[];
  total_results: number;
  page: number;
  total_pages: number;
}> {
  return Promise.resolve({
    results: [],
    total_results: 0,
    page: 1,
    total_pages: 0,
  });
}
export function fetchExternalIds(): Promise<{ imdb_id: string | null }> {
  return Promise.resolve({ imdb_id: null });
}
