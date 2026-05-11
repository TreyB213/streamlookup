import type { ImdbItem } from "../types";

export const POPULAR_MOVIES: { imdbId: string; title: string; year: number }[] =
  [
    {
      imdbId: "tt9362722",
      title: "Spider-Man: Across the Spider-Verse",
      year: 2023,
    },
    { imdbId: "tt15398776", title: "Oppenheimer", year: 2023 },
    { imdbId: "tt1517268", title: "Barbie", year: 2023 },
    { imdbId: "tt10366206", title: "John Wick: Chapter 4", year: 2023 },
    { imdbId: "tt1630029", title: "Avatar: The Way of Water", year: 2022 },
    { imdbId: "tt1745960", title: "Top Gun: Maverick", year: 2022 },
    {
      imdbId: "tt5109784",
      title: "Doctor Strange in the Multiverse of Madness",
      year: 2022,
    },
    { imdbId: "tt3704428", title: "The Batman", year: 2022 },
    {
      imdbId: "tt9220900",
      title: "Glass Onion: A Knives Out Mystery",
      year: 2022,
    },
    {
      imdbId: "tt6710474",
      title: "Everything Everywhere All at Once",
      year: 2022,
    },
    { imdbId: "tt13966216", title: "Alien: Romulus", year: 2024 },
    { imdbId: "tt21692408", title: "Inside Out 2", year: 2024 },
    { imdbId: "tt6263850", title: "Deadpool & Wolverine", year: 2024 },
    { imdbId: "tt1160419", title: "Dune: Part Two", year: 2024 },
    {
      imdbId: "tt14948432",
      title: "Kingdom of the Planet of the Apes",
      year: 2024,
    },
    { imdbId: "tt29623480", title: "Moana 2", year: 2024 },
    { imdbId: "tt21823606", title: "Gladiator II", year: 2024 },
    {
      imdbId: "tt11304740",
      title: "Guardians of the Galaxy Vol. 3",
      year: 2023,
    },
    { imdbId: "tt11126994", title: "Andor", year: 2022 },
    { imdbId: "tt1877830", title: "The Batman", year: 2022 },
  ];

export const POPULAR_TV: { imdbId: string; title: string; year: number }[] = [
  { imdbId: "tt0944947", title: "Game of Thrones", year: 2011 },
  { imdbId: "tt5491994", title: "Planet Earth II", year: 2016 },
  { imdbId: "tt2861424", title: "Rick and Morty", year: 2013 },
  { imdbId: "tt0903747", title: "Breaking Bad", year: 2008 },
  { imdbId: "tt0496424", title: "The Wire", year: 2002 },
  { imdbId: "tt4574334", title: "Stranger Things", year: 2016 },
  { imdbId: "tt7366338", title: "Chernobyl", year: 2019 },
  { imdbId: "tt7016936", title: "Dark", year: 2017 },
  { imdbId: "tt2306299", title: "Vikings", year: 2013 },
  { imdbId: "tt1475582", title: "Sherlock", year: 2010 },
  { imdbId: "tt10919420", title: "Squid Game", year: 2021 },
  { imdbId: "tt8111088", title: "The Last of Us", year: 2023 },
  { imdbId: "tt5180504", title: "The Witcher", year: 2019 },
  { imdbId: "tt11126994", title: "Andor", year: 2022 },
  { imdbId: "tt15327088", title: "The Bear", year: 2022 },
  { imdbId: "tt14538108", title: "House of the Dragon", year: 2022 },
  { imdbId: "tt13655592", title: "The Rings of Power", year: 2022 },
  { imdbId: "tt12593682", title: "Wednesday", year: 2022 },
  { imdbId: "tt14550468", title: "Severance", year: 2022 },
  { imdbId: "tt16426418", title: "The White Lotus", year: 2021 },
];

// IMDb suggestion API response shape
interface ImdbSuggestionResult {
  id: string;
  l: string;
  y?: number;
  q?: string;
  s?: string;
  i?: { imageUrl: string; width: number; height: number };
  rank?: number;
}

interface ImdbSuggestionResponse {
  d?: ImdbSuggestionResult[];
}

const ALLOWED_TYPES = new Set([
  "feature",
  "TV series",
  "TV movie",
  "TV mini-series",
  "short",
  "video",
]);

// Simple in-memory cache keyed by imdbId
const posterCache = new Map<string, string>();

function buildSuggestionUrl(query: string): string {
  const encoded = encodeURIComponent(query.toLowerCase().trim());
  return `https://v3.sg.media-imdb.com/suggestion/x/${encoded}.json`;
}

function deriveType(q: string | undefined): "movie" | "tv" {
  if (!q) return "movie";
  const lower = q.toLowerCase();
  if (
    lower.includes("tv") ||
    lower.includes("series") ||
    lower.includes("mini")
  )
    return "tv";
  return "movie";
}

function mapResult(r: ImdbSuggestionResult): ImdbItem {
  return {
    imdbId: r.id,
    title: r.l,
    year: r.y ?? 0,
    type: deriveType(r.q),
    posterUrl: r.i?.imageUrl ?? "/assets/images/placeholder.svg",
    description: r.s,
    rank: r.rank,
  };
}

// OMDb search result shape
interface OmdbSearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface OmdbSearchResponse {
  Search?: OmdbSearchResult[];
  totalResults?: string;
  Response: string;
}

const OMDB_API_KEY = "trilogy";

function omdbTypeToMediaType(t: string): "movie" | "tv" {
  if (t === "series") return "tv";
  return "movie";
}

export async function searchImdb(query: string): Promise<ImdbItem[]> {
  // Try OMDb first — structured results with proper poster URLs
  try {
    const encoded = encodeURIComponent(query.trim());
    const omdbUrl = `https://www.omdbapi.com/?s=${encoded}&apikey=${OMDB_API_KEY}&type=&page=1`;
    const res = await fetch(omdbUrl);
    if (res.ok) {
      const data: OmdbSearchResponse = await res.json();
      if (data.Response === "True" && data.Search && data.Search.length > 0) {
        return data.Search.map((r) => ({
          imdbId: r.imdbID,
          title: r.Title,
          year: Number.parseInt(r.Year, 10) || 0,
          type: omdbTypeToMediaType(r.Type),
          posterUrl:
            r.Poster && r.Poster !== "N/A"
              ? r.Poster
              : "/assets/images/placeholder.svg",
        }));
      }
    }
  } catch {
    // fall through to IMDb suggestion API
  }

  // Fallback: IMDb suggestion API
  try {
    const res = await fetch(buildSuggestionUrl(query));
    if (!res.ok) return [];
    const data: ImdbSuggestionResponse = await res.json();
    return (data.d ?? [])
      .filter(
        (r) =>
          r.id.startsWith("tt") &&
          (r.q === undefined || ALLOWED_TYPES.has(r.q)),
      )
      .map(mapResult);
  } catch {
    return [];
  }
}

export async function fetchImdbItem(
  imdbId: string,
  title: string,
  year: number,
): Promise<ImdbItem> {
  // Check poster cache first
  const cached = posterCache.get(imdbId);
  if (cached) {
    return { imdbId, title, year, type: "movie", posterUrl: cached };
  }

  // Try OMDb by imdbId first — most reliable poster source
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?i=${imdbId}&apikey=${OMDB_API_KEY}`,
    );
    if (res.ok) {
      const data = (await res.json()) as {
        Title?: string;
        Year?: string;
        Type?: string;
        Poster?: string;
        Plot?: string;
        Response: string;
      };
      if (data.Response === "True") {
        const posterUrl =
          data.Poster && data.Poster !== "N/A"
            ? data.Poster
            : "/assets/images/placeholder.svg";
        const type = omdbTypeToMediaType(data.Type ?? "");
        posterCache.set(imdbId, posterUrl);
        return {
          imdbId,
          title: data.Title ?? title,
          year: Number.parseInt(data.Year ?? String(year), 10) || year,
          type,
          posterUrl,
          description: data.Plot && data.Plot !== "N/A" ? data.Plot : undefined,
        };
      }
    }
  } catch {
    // fall through to IMDb suggestion API
  }

  // Fallback: IMDb suggestion API
  try {
    const res = await fetch(buildSuggestionUrl(title));
    if (!res.ok) throw new Error("fetch failed");
    const data: ImdbSuggestionResponse = await res.json();
    const results = data.d ?? [];

    // Prefer exact imdbId match
    const exact = results.find((r) => r.id === imdbId);
    const fallback = results.find((r) => r.id.startsWith("tt"));
    const chosen = exact ?? fallback;

    const posterUrl = chosen?.i?.imageUrl ?? "/assets/images/placeholder.svg";
    const type = deriveType(chosen?.q);

    posterCache.set(imdbId, posterUrl);
    return {
      imdbId,
      title: exact?.l ?? title,
      year: exact?.y ?? year,
      type,
      posterUrl,
      description: exact?.s ?? chosen?.s,
    };
  } catch {
    return {
      imdbId,
      title,
      year,
      type: "movie",
      posterUrl: "/assets/images/placeholder.svg",
    };
  }
}

export async function fetchPopularMovies(): Promise<ImdbItem[]> {
  return Promise.all(
    POPULAR_MOVIES.map((m) =>
      fetchImdbItem(m.imdbId, m.title, m.year).then((item) => ({
        ...item,
        type: "movie" as const,
      })),
    ),
  );
}

export async function fetchPopularTV(): Promise<ImdbItem[]> {
  return Promise.all(
    POPULAR_TV.map((m) =>
      fetchImdbItem(m.imdbId, m.title, m.year).then((item) => ({
        ...item,
        type: "tv" as const,
      })),
    ),
  );
}

export async function fetchTrending(): Promise<ImdbItem[]> {
  const [movies, tv] = await Promise.all([
    Promise.all(
      POPULAR_MOVIES.slice(0, 10).map((m) =>
        fetchImdbItem(m.imdbId, m.title, m.year).then((item) => ({
          ...item,
          type: "movie" as const,
        })),
      ),
    ),
    Promise.all(
      POPULAR_TV.slice(0, 10).map((m) =>
        fetchImdbItem(m.imdbId, m.title, m.year).then((item) => ({
          ...item,
          type: "tv" as const,
        })),
      ),
    ),
  ]);
  // Interleave movie, tv, movie, tv...
  const result: ImdbItem[] = [];
  for (let i = 0; i < Math.max(movies.length, tv.length); i++) {
    if (i < movies.length) result.push(movies[i]);
    if (i < tv.length) result.push(tv[i]);
  }
  return result;
}
