import { useQuery } from "@tanstack/react-query";
import {
  fetchPopularMovies,
  fetchPopularTV,
  fetchTrending,
  searchImdb,
} from "../lib/imdb";
import type { ImdbItem } from "../types";

export function useTrending() {
  return useQuery<ImdbItem[]>({
    queryKey: ["trending", "all", "week"],
    queryFn: fetchTrending,
    staleTime: 5 * 60 * 1000,
  });
}

export function usePopularMovies() {
  return useQuery<ImdbItem[]>({
    queryKey: ["popular", "movies"],
    queryFn: fetchPopularMovies,
    staleTime: 5 * 60 * 1000,
  });
}

export function usePopularTV() {
  return useQuery<ImdbItem[]>({
    queryKey: ["popular", "tv"],
    queryFn: fetchPopularTV,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSearchImdb(query: string) {
  return useQuery<ImdbItem[]>({
    queryKey: ["search", query],
    queryFn: () => searchImdb(query),
    enabled: query.trim().length > 0,
    staleTime: 2 * 60 * 1000,
  });
}
