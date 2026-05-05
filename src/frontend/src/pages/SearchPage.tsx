import { searchRoute } from "@/App";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchTMDB } from "@/hooks/use-tmdb";
import { getImageUrl } from "@/lib/tmdb";
import type { TMDBMovie, TMDBResult, TMDBTVShow } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  Film as FilmIcon,
  Play,
  Search,
  Star,
  Tv,
} from "lucide-react";
import { motion } from "motion/react";

function isTMDBMovie(item: TMDBResult): item is TMDBMovie {
  return item.media_type === "movie";
}
function isTMDBTV(item: TMDBResult): item is TMDBTVShow {
  return item.media_type === "tv";
}
function getTitle(item: TMDBResult): string {
  if (isTMDBMovie(item)) return item.title;
  if (isTMDBTV(item)) return item.name;
  return item.name;
}
function getYear(item: TMDBResult): string {
  if (isTMDBMovie(item)) return item.release_date?.slice(0, 4) ?? "";
  if (isTMDBTV(item)) return item.first_air_date?.slice(0, 4) ?? "";
  return "";
}

function PosterCard({
  item,
  index,
}: { item: TMDBMovie | TMDBTVShow; index: number }) {
  const navigate = useNavigate();
  const title = getTitle(item);
  const year = getYear(item);
  const mediaType = item.media_type;

  function handleWatch() {
    void navigate({
      to: "/watch",
      search: {
        tt: "",
        type: mediaType,
        title,
        poster: item.poster_path ?? "",
        tmdbId: String(item.id),
        season: "1",
        episode: "1",
      },
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.03, duration: 0.35 }}
      className="group relative cursor-pointer"
      onClick={handleWatch}
      data-ocid={`search.result.item.${index + 1}`}
    >
      {/* Poster */}
      <div className="relative overflow-hidden rounded-lg aspect-[2/3] bg-card scale-on-hover glow-red-hover">
        <img
          src={getImageUrl(item.poster_path, "w300")}
          alt={title}
          className="w-full h-full object-cover transition-smooth"
          loading="lazy"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex flex-col justify-end p-3">
          <div className="flex items-center justify-center mb-3">
            <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center shadow-lg">
              <Play
                className="w-4 h-4 text-primary-foreground ml-0.5"
                fill="currentColor"
              />
            </div>
          </div>
          <p className="text-xs font-semibold text-foreground line-clamp-2 leading-tight text-center">
            {title}
          </p>
          <p className="text-[10px] text-muted-foreground text-center mt-0.5">
            {year}
          </p>
        </div>

        {/* Media type badge */}
        <div className="absolute top-2 left-2">
          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-mono uppercase tracking-wider text-secondary">
            {mediaType === "tv" ? (
              <>
                <Tv className="w-2.5 h-2.5" /> TV
              </>
            ) : (
              <>
                <FilmIcon className="w-2.5 h-2.5" /> Film
              </>
            )}
          </span>
        </div>

        {/* Rating badge */}
        {item.vote_average > 0 && (
          <div className="absolute top-2 right-2">
            <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-mono text-secondary">
              <Star className="w-2.5 h-2.5" fill="currentColor" />
              {item.vote_average.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {/* Title below poster */}
      <div className="mt-2 px-0.5">
        <p className="text-xs font-semibold text-foreground truncate leading-tight">
          {title}
        </p>
        <p className="text-[10px] text-muted-foreground mt-0.5">{year}</p>
      </div>
    </motion.div>
  );
}

function PosterGridSkeleton() {
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
      data-ocid="search.loading_state"
    >
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(
        (k) => (
          <div key={k}>
            <Skeleton className="w-full aspect-[2/3] rounded-lg" />
            <Skeleton className="h-3 mt-2 rounded w-3/4" />
            <Skeleton className="h-2.5 mt-1 rounded w-1/3" />
          </div>
        ),
      )}
    </div>
  );
}

export default function SearchPage() {
  const { q } = searchRoute.useSearch();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useSearchTMDB(q);

  const results = (data?.results ?? []).filter(
    (r): r is TMDBMovie | TMDBTVShow =>
      r.media_type === "movie" || r.media_type === "tv",
  );

  return (
    <div className="min-h-screen" data-ocid="search.page">
      {/* Page Header */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <button
            type="button"
            onClick={() => void navigate({ to: "/" })}
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-muted hover:bg-muted/80 transition-smooth shrink-0"
            aria-label="Back to home"
            data-ocid="search.back_button"
          >
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>

          <div className="flex items-center gap-3 min-w-0">
            <Search className="w-5 h-5 text-primary shrink-0" />
            <h1 className="font-display font-bold text-xl sm:text-2xl text-foreground truncate">
              {q ? (
                <>
                  Results for{" "}
                  <span className="text-primary">&ldquo;{q}&rdquo;</span>
                </>
              ) : (
                "Search"
              )}
            </h1>
          </div>

          {data && !isLoading && (
            <span className="ml-auto text-xs text-muted-foreground font-mono shrink-0">
              {data.total_results.toLocaleString()} results
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {isLoading && <PosterGridSkeleton />}

        {isError && (
          <div
            className="flex items-center gap-3 p-6 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive"
            data-ocid="search.error_state"
          >
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm">Failed to load results. Please try again.</p>
          </div>
        )}

        {!isLoading && !isError && results.length === 0 && q && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 gap-5 text-center"
            data-ocid="search.empty_state"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <Search className="w-9 h-9 text-muted-foreground/50" />
            </div>
            <div>
              <p className="font-display font-semibold text-lg text-foreground">
                No results for &ldquo;{q}&rdquo;
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Try a different title, or paste an IMDb URL in the search bar
              </p>
            </div>
          </motion.div>
        )}

        {!isLoading && results.length > 0 && (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
            data-ocid="search.results_list"
          >
            {results.map((item, i) => (
              <PosterCard key={item.id} item={item} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
