const TMDB_BASE = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

function getApiKey(): string {
  return import.meta.env.VITE_TMDB_API_KEY ?? "";
}

export function getImageUrl(
  path: string | null | undefined,
  size: "w200" | "w300" | "w500" | "w780" | "original" = "w500",
): string {
  if (!path) return "/assets/images/placeholder.svg";
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

async function tmdbFetch<T>(
  endpoint: string,
  params: Record<string, string> = {},
): Promise<T> {
  const url = new URL(`${TMDB_BASE}${endpoint}`);
  url.searchParams.set("api_key", getApiKey());
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`TMDB ${res.status}: ${endpoint}`);
  return res.json() as Promise<T>;
}

export function fetchTrending() {
  return tmdbFetch<{ results: import("../types").TMDBResult[] }>(
    "/trending/all/week",
  );
}

export function fetchPopularMovies() {
  return tmdbFetch<{ results: import("../types").TMDBMovie[] }>(
    "/movie/popular",
  );
}

export function fetchPopularTV() {
  return tmdbFetch<{ results: import("../types").TMDBTVShow[] }>("/tv/popular");
}

export function fetchSearchTMDB(query: string) {
  return tmdbFetch<import("../types").TMDBSearchResponse>("/search/multi", {
    query,
  });
}

export function fetchExternalIds(tmdbId: number, mediaType: "movie" | "tv") {
  return tmdbFetch<import("../types").TMDBExternalIds>(
    `/${mediaType}/${tmdbId}/external_ids`,
  );
}
