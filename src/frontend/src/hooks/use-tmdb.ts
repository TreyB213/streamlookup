import { useQuery } from "@tanstack/react-query";
import {
  fetchExternalIds,
  fetchPopularMovies,
  fetchPopularTV,
  fetchSearchTMDB,
  fetchTrending,
} from "../lib/tmdb";
import type {
  TMDBExternalIds,
  TMDBMovie,
  TMDBResult,
  TMDBSearchResponse,
  TMDBTVShow,
} from "../types";

export function useTrending() {
  return useQuery<TMDBResult[]>({
    queryKey: ["trending", "all", "week"],
    queryFn: async () => {
      const data = await fetchTrending();
      return data.results;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function usePopularMovies() {
  return useQuery<TMDBMovie[]>({
    queryKey: ["popular", "movies"],
    queryFn: async () => {
      const data = await fetchPopularMovies();
      return data.results;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function usePopularTV() {
  return useQuery<TMDBTVShow[]>({
    queryKey: ["popular", "tv"],
    queryFn: async () => {
      const data = await fetchPopularTV();
      return data.results;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useSearchTMDB(query: string) {
  return useQuery<TMDBSearchResponse>({
    queryKey: ["search", query],
    queryFn: () => fetchSearchTMDB(query),
    enabled: query.trim().length > 0,
    staleTime: 2 * 60 * 1000,
  });
}

export function useExternalIds(
  tmdbId: number | null,
  mediaType: "movie" | "tv",
) {
  return useQuery<TMDBExternalIds>({
    queryKey: ["external-ids", mediaType, tmdbId],
    queryFn: () => fetchExternalIds(tmdbId!, mediaType),
    enabled: tmdbId !== null,
    staleTime: 10 * 60 * 1000,
  });
}
