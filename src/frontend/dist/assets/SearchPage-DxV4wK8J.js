import { s as searchRoute, u as useNavigate, j as jsxRuntimeExports, d as Search, S as Skeleton, F as Film } from "./index-BPdK22S0.js";
import { c as useSearchImdb, P as Play } from "./use-tmdb-C_hsIQsx.js";
import { A as ArrowLeft, C as CircleAlert } from "./circle-alert-BQvdITG_.js";
import { m as motion, T as Tv } from "./proxy-Db3Nka8V.js";
function PosterCard({ item, index }) {
  const navigate = useNavigate();
  function handleWatch() {
    void navigate({
      to: "/watch",
      search: {
        tt: item.imdbId,
        type: item.type,
        title: item.title,
        poster: item.posterUrl,
        tmdbId: void 0,
        season: "1",
        episode: "1"
      }
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: { delay: index * 0.03, duration: 0.35 },
      className: "group relative cursor-pointer",
      onClick: handleWatch,
      "data-ocid": `search.result.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-lg aspect-[2/3] bg-card scale-on-hover glow-red-hover", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: item.posterUrl || "/assets/images/placeholder.svg",
              alt: item.title,
              className: "w-full h-full object-cover transition-smooth",
              loading: "lazy"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex flex-col justify-end p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Play,
              {
                className: "w-4 h-4 text-primary-foreground ml-0.5",
                fill: "currentColor"
              }
            ) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground line-clamp-2 leading-tight text-center", children: item.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground text-center mt-0.5", children: item.year > 0 ? item.year : "" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-mono uppercase tracking-wider text-secondary", children: item.type === "tv" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tv, { className: "w-2.5 h-2.5" }),
            " TV"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-2.5 h-2.5" }),
            " Film"
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 px-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground truncate leading-tight", children: item.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: item.year > 0 ? item.year : "" })
        ] })
      ]
    }
  );
}
function PosterGridSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4",
      "data-ocid": "search.loading_state",
      children: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(
        (k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full aspect-[2/3] rounded-lg" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 mt-2 rounded w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-2.5 mt-1 rounded w-1/3" })
        ] }, k)
      )
    }
  );
}
function SearchPage() {
  const { q } = searchRoute.useSearch();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useSearchImdb(q);
  const results = data ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", "data-ocid": "search.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b sticky top-0 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-4 flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => void navigate({ to: "/" }),
          className: "flex items-center justify-center w-9 h-9 rounded-lg bg-muted hover:bg-muted/80 transition-smooth shrink-0",
          "aria-label": "Back to home",
          "data-ocid": "search.back_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 text-foreground" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-5 h-5 text-primary shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl sm:text-2xl text-foreground truncate", children: q ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "Results for",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
            "“",
            q,
            "”"
          ] })
        ] }) : "Search" })
      ] }),
      data && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs text-muted-foreground font-mono shrink-0", children: [
        data.length.toLocaleString(),
        " results"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8", children: [
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(PosterGridSkeleton, {}),
      isError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-3 p-6 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive",
          "data-ocid": "search.error_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Failed to load results. Please try again." })
          ]
        }
      ),
      !isLoading && !isError && results.length === 0 && q && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          className: "flex flex-col items-center justify-center py-24 gap-5 text-center",
          "data-ocid": "search.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-9 h-9 text-muted-foreground/50" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-semibold text-lg text-foreground", children: [
                "No results for “",
                q,
                "”"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Try a different title, or paste an IMDb URL in the search bar" })
            ] })
          ]
        }
      ),
      !isLoading && results.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4",
          "data-ocid": "search.results_list",
          children: results.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(PosterCard, { item, index: i }, item.imdbId))
        }
      )
    ] })
  ] });
}
export {
  SearchPage as default
};
