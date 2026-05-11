import { c as createLucideIcon, y as watchRoute, u as useNavigate, r as reactExports, j as jsxRuntimeExports, F as Film, d as Search } from "./index-BPdK22S0.js";
import { A as ArrowLeft, C as CircleAlert } from "./circle-alert-BQvdITG_.js";
import { T as Tv, m as motion } from "./proxy-Db3Nka8V.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2",
      key: "4b9dqc"
    }
  ],
  [
    "path",
    {
      d: "M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2",
      key: "22nnkd"
    }
  ],
  ["path", { d: "M6 6h.01", key: "1utrut" }],
  ["path", { d: "M6 18h.01", key: "uhywen" }],
  ["path", { d: "m13 6-4 6h6l-4 6", key: "14hqih" }]
];
const ServerCrash = createLucideIcon("server-crash", __iconNode);
function getEpisode(ctx) {
  if (ctx.season && ctx.episode) {
    return { season: ctx.season, episode: ctx.episode };
  }
  return { season: "1", episode: "1" };
}
const SERVERS = [
  {
    id: "vidsrcme",
    name: "VidSrc.me",
    buildUrl: (ctx) => {
      if (ctx.mediaType === "movie") {
        return `https://vidsrcme.ru/embed/movie?imdb=${ctx.imdbId}`;
      }
      const ep = getEpisode(ctx);
      return `https://vidsrcme.ru/embed/tv?imdb=${ctx.imdbId}&season=${ep.season}&episode=${ep.episode}`;
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
  }
];
const SERVER_STORAGE_KEY = "streamlookup-server";
const IMDB_URL_REGEX = /\/title\/(tt\d{7,8})/i;
const BARE_TT_REGEX = /^(tt\d{7,8})$/i;
function extractTtId(input) {
  const urlMatch = IMDB_URL_REGEX.exec(input);
  if (urlMatch) return urlMatch[1];
  const bareMatch = BARE_TT_REGEX.exec(input.trim());
  if (bareMatch) return bareMatch[1];
  return null;
}
function WatchPage() {
  const search = watchRoute.useSearch();
  const { tt, type, title, poster } = search;
  const season = search.season ?? "1";
  const episode = search.episode ?? "1";
  const navigate = useNavigate();
  const [inputValue, setInputValue] = reactExports.useState("");
  const [manualTtId, setManualTtId] = reactExports.useState("");
  const [inputError, setInputError] = reactExports.useState("");
  const activeTtId = manualTtId || tt || "";
  const [activeType, setActiveType] = reactExports.useState(type);
  const [activeSeason, setActiveSeason] = reactExports.useState(season);
  const [activeEpisode, setActiveEpisode] = reactExports.useState(episode);
  const [selectedServer, setSelectedServer] = reactExports.useState(() => {
    try {
      return localStorage.getItem(SERVER_STORAGE_KEY) ?? SERVERS[0].id;
    } catch {
      return SERVERS[0].id;
    }
  });
  const iframeRef = reactExports.useRef(null);
  const ctx = {
    imdbId: activeTtId,
    mediaType: activeType,
    title,
    posterPath: poster,
    season: activeSeason,
    episode: activeEpisode
  };
  const currentServer = SERVERS.find((s) => s.id === selectedServer) ?? SERVERS[0];
  const embedUrl = activeTtId ? currentServer.buildUrl(ctx) : null;
  reactExports.useEffect(() => {
    try {
      localStorage.setItem(SERVER_STORAGE_KEY, selectedServer);
    } catch {
    }
  }, [selectedServer]);
  const hasNoId = !activeTtId;
  function handleInputSubmit(e) {
    e.preventDefault();
    const extracted = extractTtId(inputValue);
    if (!extracted) {
      setInputError(
        "Paste an IMDb URL (imdb.com/title/ttXXXXXXX) or a bare tt ID"
      );
      return;
    }
    setInputError("");
    setManualTtId(extracted);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container mx-auto px-4 py-6 max-w-5xl",
      "data-ocid": "watch.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => void navigate({ to: "/" }),
            className: "flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-5",
            "data-ocid": "watch.back_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
              "Back to Browse"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 mb-5", children: [
          poster && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: poster,
              alt: title ?? "Poster",
              className: "hidden sm:block w-24 rounded-md shrink-0 border border-border shadow-subtle"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1.5", children: [
              activeType === "tv" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[10px] bg-secondary/20 text-secondary border border-secondary/30 font-mono uppercase tracking-widest px-2 py-0.5 rounded-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tv, { className: "w-3 h-3" }),
                " Series"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[10px] bg-primary/20 text-primary border border-primary/30 font-mono uppercase tracking-widest px-2 py-0.5 rounded-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-3 h-3" }),
                " Movie"
              ] }),
              activeTtId && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground font-mono", children: activeTtId })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-black text-2xl sm:text-3xl text-foreground truncate", children: title ?? activeTtId ?? "Watch" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: handleInputSubmit,
            className: "flex gap-2 mb-5",
            "data-ocid": "watch.imdb_input_form",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    value: inputValue,
                    onChange: (e) => {
                      setInputValue(e.target.value);
                      if (inputError) setInputError("");
                    },
                    placeholder: "Paste IMDb URL or tt ID (e.g. tt0111161)",
                    className: "w-full pl-9 pr-4 py-2.5 bg-card border text-black text-sm rounded-xl placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/60 transition-smooth",
                    "data-ocid": "watch.imdb_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "submit",
                  className: "px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:brightness-110 transition-smooth shrink-0",
                  "data-ocid": "watch.imdb_submit_button",
                  children: "Load"
                }
              )
            ]
          }
        ),
        inputError && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs text-destructive mb-4 -mt-3",
            "data-ocid": "watch.input.field_error",
            children: inputError
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex gap-0 border-b border-border mb-4",
            "data-ocid": "watch.type_tabs",
            children: ["movie", "tv"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setActiveType(t),
                className: `relative px-5 py-2.5 text-sm font-semibold transition-smooth ${activeType === t ? "text-primary" : "text-muted-foreground hover:text-foreground"}`,
                "data-ocid": `watch.type_tab.${t}`,
                children: [
                  t === "movie" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-4 h-4" }),
                    " Movie"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Tv, { className: "w-4 h-4" }),
                    " TV Series"
                  ] }),
                  activeType === t && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" })
                ]
              },
              t
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-wrap items-center gap-3 mb-4",
            "data-ocid": "watch.controls_panel",
            children: [
              activeType === "tv" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "watch-season-input",
                      className: "text-xs text-muted-foreground font-mono uppercase tracking-wide",
                      children: "Season"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "watch-season-input",
                      type: "number",
                      min: "1",
                      max: "99",
                      value: activeSeason,
                      onChange: (e) => setActiveSeason(e.target.value),
                      className: "w-16 text-center bg-card border text-black rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
                      "data-ocid": "watch.season_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "watch-episode-input",
                      className: "text-xs text-muted-foreground font-mono uppercase tracking-wide",
                      children: "Episode"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "watch-episode-input",
                      type: "number",
                      min: "1",
                      max: "999",
                      value: activeEpisode,
                      onChange: (e) => setActiveEpisode(e.target.value),
                      className: "w-16 text-center bg-card border text-black rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
                      "data-ocid": "watch.episode_input"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 ml-auto", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "watch-server-select",
                    className: "text-xs text-muted-foreground font-mono uppercase tracking-wide",
                    children: "Server"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "select",
                    {
                      id: "watch-server-select",
                      value: selectedServer,
                      onChange: (e) => setSelectedServer(e.target.value),
                      className: "appearance-none bg-card border text-foreground rounded-lg pl-3 pr-7 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 cursor-pointer",
                      "data-ocid": "watch.server_select",
                      children: SERVERS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s.id, children: s.name }, s.id))
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    if (iframeRef.current && embedUrl) {
                      iframeRef.current.src = embedUrl;
                    }
                  },
                  className: "flex items-center gap-1.5 px-3 py-1.5 bg-muted/60 border rounded-lg text-xs text-foreground hover:border-primary/40 transition-smooth",
                  "data-ocid": "watch.reload_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3.5 h-3.5" }),
                    " Reload"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.98 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.4 },
            className: "relative w-full rounded-xl overflow-hidden bg-black border border-border shadow-[0_0_40px_rgba(0,0,0,0.8)]",
            style: { paddingBottom: "56.25%" },
            "data-ocid": "watch.player_panel",
            children: [
              hasNoId && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground",
                  "data-ocid": "watch.error_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-10 h-10 text-destructive/60" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Paste an IMDb URL or tt ID in the field above to watch." }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => void navigate({ to: "/" }),
                        className: "px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:brightness-110 transition-smooth mt-1",
                        "data-ocid": "watch.go_home_button",
                        children: "Browse Titles"
                      }
                    )
                  ]
                }
              ),
              activeTtId && !embedUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground",
                  "data-ocid": "watch.server_unavailable_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ServerCrash, { className: "w-10 h-10 text-muted-foreground/50" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Server unavailable for this title." }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60", children: "Try switching to a different server above." })
                  ]
                }
              ),
              embedUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "iframe",
                {
                  ref: iframeRef,
                  src: embedUrl,
                  title: title ?? "Stream Player",
                  allow: "fullscreen; autoplay; encrypted-media",
                  allowFullScreen: true,
                  sandbox: "allow-scripts allow-same-origin allow-forms allow-presentation allow-fullscreen allow-popups allow-popups-to-escape-sandbox",
                  className: "absolute inset-0 w-full h-full border-0",
                  "data-ocid": "watch.player_iframe"
                }
              )
            ]
          }
        ),
        embedUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/60 mt-3 text-center font-mono", children: "If this server doesn't load, switch to another using the Server dropdown above." })
      ]
    }
  );
}
export {
  WatchPage as default
};
