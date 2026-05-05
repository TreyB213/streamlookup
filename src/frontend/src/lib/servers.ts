import type { ContentContext } from "../types";

export interface Server {
  id: string;
  name: string;
  buildUrl: (ctx: ContentContext) => string | null;
}

function getEpisode(ctx: ContentContext): { season: string; episode: string } {
  if (ctx.season && ctx.episode) {
    return { season: ctx.season, episode: ctx.episode };
  }
  return { season: "1", episode: "1" };
}

export const SERVERS: Server[] = [
  {
    id: "vidsrcme",
    name: "VidSrc.me",
    buildUrl: (ctx) => {
      if (ctx.mediaType === "movie") {
        return `https://vidsrcme.ru/embed/movie?imdb=${ctx.imdbId}`;
      }
      const ep = getEpisode(ctx);
      return `https://vidsrcme.ru/embed/tv?imdb=${ctx.imdbId}&season=${ep.season}&episode=${ep.episode}`;
    },
  },
  {
    id: "vidsrc-embed-ru",
    name: "VidSrc (ru)",
    buildUrl: (ctx) => {
      if (ctx.mediaType === "movie") {
        return `https://vidsrc-embed.ru/embed/${ctx.imdbId}/`;
      }
      const ep = getEpisode(ctx);
      return `https://vidsrc-embed.ru/embed/${ctx.imdbId}/${ep.season}-${ep.episode}/`;
    },
  },
  {
    id: "vidsrc-embed-su",
    name: "VidSrc (su)",
    buildUrl: (ctx) => {
      if (ctx.mediaType === "movie") {
        return `https://vidsrc-embed.su/embed/${ctx.imdbId}/`;
      }
      const ep = getEpisode(ctx);
      return `https://vidsrc-embed.su/embed/${ctx.imdbId}/${ep.season}-${ep.episode}/`;
    },
  },
  {
    id: "111movies",
    name: "111Movies",
    buildUrl: (ctx) => {
      if (ctx.mediaType === "movie") {
        return `https://111movies.com/movie/${ctx.imdbId}`;
      }
      const ep = getEpisode(ctx);
      return `https://111movies.com/tv/${ctx.imdbId}/${ep.season}/${ep.episode}`;
    },
  },
  {
    id: "2embed",
    name: "2Embed",
    buildUrl: (ctx) => {
      if (ctx.mediaType === "movie") {
        return `https://www.2embed.cc/embed/${ctx.imdbId}`;
      }
      const ep = getEpisode(ctx);
      return `https://www.2embed.cc/embedtv/${ctx.imdbId}?s=${ep.season}&e=${ep.episode}`;
    },
  },
  {
    id: "vidfast",
    name: "VidFast",
    buildUrl: (ctx) => {
      if (ctx.mediaType === "movie") {
        return `https://vidfast.pro/movie/${ctx.imdbId}`;
      }
      const ep = getEpisode(ctx);
      return `https://vidfast.pro/tv/${ctx.imdbId}/${ep.season}/${ep.episode}`;
    },
  },
  {
    id: "vidsrc-mov",
    name: "VidSrc (mov)",
    buildUrl: (ctx) => {
      if (ctx.mediaType === "movie") {
        return `https://vidsrc.mov/embed/movie/${ctx.imdbId}`;
      }
      const ep = getEpisode(ctx);
      return `https://vidsrc.mov/embed/tv/${ctx.imdbId}/${ep.season}/${ep.episode}`;
    },
  },
  {
    id: "autoembed",
    name: "AutoEmbed",
    buildUrl: (ctx) => {
      if (ctx.mediaType === "movie") {
        return `https://autoembed.co/movie/imdb/${ctx.imdbId}`;
      }
      const ep = getEpisode(ctx);
      return `https://autoembed.co/tv/imdb/${ctx.imdbId}-${ep.season}-${ep.episode}`;
    },
  },
  {
    id: "embedmaster",
    name: "EmbedMaster",
    buildUrl: (ctx) => {
      if (ctx.mediaType === "movie") {
        return `https://embedmaster.link/movie/${ctx.imdbId}`;
      }
      const ep = getEpisode(ctx);
      return `https://embedmaster.link/tv/${ctx.imdbId}/${ep.season}/${ep.episode}`;
    },
  },
  {
    id: "multiembed",
    name: "MultiEmbed",
    buildUrl: (ctx) => {
      const params = new URLSearchParams({ video_id: ctx.imdbId, tmdb: "0" });
      if (ctx.mediaType !== "movie") {
        const ep = getEpisode(ctx);
        params.set("s", ep.season);
        params.set("e", ep.episode);
      }
      return `https://multiembed.mov/?${params.toString()}`;
    },
  },
];

export const SERVER_STORAGE_KEY = "streamlookup-server";
