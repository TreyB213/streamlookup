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
    id: "vidsrc-to",
    name: "VidSrc.to ★",
    buildUrl: (ctx) => {
      if (ctx.mediaType === "movie") {
        return `https://vidsrc.to/embed/movie/${ctx.imdbId}`;
      }
      const ep = getEpisode(ctx);
      return `https://vidsrc.to/embed/tv/${ctx.imdbId}/${ep.season}/${ep.episode}`;
    },
  },
  {
    id: "vidsrcme",
    name: "VidSrc.me",
    buildUrl: (ctx) => {
      if (ctx.mediaType === "movie") {
        return `https://vidsrc.me/embed/movie?imdb=${ctx.imdbId}`;
      }
      const ep = getEpisode(ctx);
      return `https://vidsrc.me/embed/tv?imdb=${ctx.imdbId}&season=${ep.season}&episode=${ep.episode}`;
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
    id: "embed-su",
    name: "EmbedSU",
    buildUrl: (ctx) => {
      if (ctx.mediaType === "movie") {
        return `https://embed.su/embed/movie/${ctx.imdbId}`;
      }
      const ep = getEpisode(ctx);
      return `https://embed.su/embed/tv/${ctx.imdbId}/${ep.season}/${ep.episode}`;
    },
  },
  {
    id: "superembed",
    name: "SuperEmbed",
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
  {
    id: "vidlink",
    name: "VidLink",
    buildUrl: (ctx) => {
      if (ctx.mediaType === "movie") {
        return `https://vidlink.pro/movie/${ctx.imdbId}`;
      }
      const ep = getEpisode(ctx);
      return `https://vidlink.pro/tv/${ctx.imdbId}/${ep.season}/${ep.episode}`;
    },
  },
  {
    id: "nontongo",
    name: "NontonGo",
    buildUrl: (ctx) => {
      if (ctx.mediaType === "movie") {
        return `https://www.NontonGo.net/embed/movie/${ctx.imdbId}`;
      }
      const ep = getEpisode(ctx);
      return `https://www.NontonGo.net/embed/tv/${ctx.imdbId}/${ep.season}/${ep.episode}`;
    },
  },
  {
    id: "vidsrc-xyz",
    name: "VidSrc.xyz",
    buildUrl: (ctx) => {
      if (ctx.mediaType === "movie") {
        return `https://vidsrc.xyz/embed/movie?imdb=${ctx.imdbId}`;
      }
      const ep = getEpisode(ctx);
      return `https://vidsrc.xyz/embed/tv?imdb=${ctx.imdbId}&season=${ep.season}&episode=${ep.episode}`;
    },
  },
];

export const SERVER_STORAGE_KEY = "streamlookup-server";
