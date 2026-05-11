import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePopularMovies, usePopularTV, useTrending } from "@/hooks/use-tmdb";
import type { ImdbItem } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Film as FilmIcon,
  Play,
  TrendingUp,
  Tv,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useRef } from "react";

function useWatchNavigate() {
  const navigate = useNavigate();
  return useCallback(
    (item: ImdbItem) => {
      void navigate({
        to: "/watch",
        search: {
          tt: item.imdbId,
          type: item.type,
          season: "1",
          episode: "1",
          title: item.title,
          poster: item.posterUrl,
          tmdbId: undefined,
        },
      });
    },
    [navigate],
  );
}

function PosterSkeleton() {
  return (
    <div className="shrink-0 w-[150px] sm:w-[160px]">
      <Skeleton className="w-full aspect-[2/3] rounded-lg" />
      <Skeleton className="h-3 w-3/4 mt-2 rounded" />
      <Skeleton className="h-2 w-1/2 mt-1 rounded" />
    </div>
  );
}

function PosterCard({ item, index }: { item: ImdbItem; index: number }) {
  const goToWatch = useWatchNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.4), duration: 0.35 }}
      className="relative group cursor-pointer shrink-0 w-[150px] sm:w-[160px]"
      onClick={() => goToWatch(item)}
      data-ocid={`media_card.item.${index + 1}`}
    >
      <div className="relative overflow-hidden rounded-lg aspect-[2/3] bg-card glow-red-hover scale-on-hover">
        {item.posterUrl &&
        item.posterUrl !== "/assets/images/placeholder.svg" ? (
          <img
            src={item.posterUrl}
            alt={item.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            {item.type === "tv" ? (
              <Tv className="w-10 h-10 text-muted-foreground" />
            ) : (
              <FilmIcon className="w-10 h-10 text-muted-foreground" />
            )}
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 opacity-0 group-hover:opacity-100 transition-smooth flex flex-col justify-end p-2.5">
          <Button
            size="sm"
            className="w-full mb-2 h-7 text-[11px] font-bold bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={(e) => {
              e.stopPropagation();
              goToWatch(item);
            }}
            data-ocid={`media_card.watch_button.${index + 1}`}
          >
            <Play className="w-3 h-3 mr-1 fill-current" /> Watch Now
          </Button>
          <p className="text-[11px] font-semibold text-foreground line-clamp-2 leading-tight">
            {item.title}
          </p>
          {item.year > 0 && (
            <span className="text-[10px] text-muted-foreground font-mono mt-1">
              {item.year}
            </span>
          )}
        </div>
      </div>

      {/* Below-card info */}
      <div className="mt-1.5 px-0.5">
        <p className="text-[12px] font-medium text-foreground line-clamp-1 leading-snug">
          {item.title}
        </p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <Badge
            variant="secondary"
            className="text-[9px] h-4 px-1.5 font-mono uppercase tracking-wider bg-primary/20 text-primary border-0"
          >
            {item.type === "tv" ? "TV" : "MOVIE"}
          </Badge>
          {item.year > 0 && (
            <span className="text-[10px] text-muted-foreground">
              {item.year}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ScrollArrow({
  direction,
  onClick,
  ocid,
}: {
  direction: "left" | "right";
  onClick: () => void;
  ocid: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={ocid}
      className="shrink-0 w-8 h-8 rounded-full bg-card/80 border border-border/60 flex items-center justify-center text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-smooth shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={direction === "left" ? "Scroll left" : "Scroll right"}
    >
      {direction === "left" ? (
        <ChevronLeft className="w-4 h-4" />
      ) : (
        <ChevronRight className="w-4 h-4" />
      )}
    </button>
  );
}

function PosterRow({
  title,
  icon,
  items,
  isLoading,
  isError,
  ocid,
}: {
  title: string;
  icon: React.ReactNode;
  items: ImdbItem[];
  isLoading: boolean;
  isError?: boolean;
  ocid: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right") {
    if (!trackRef.current) return;
    const amount = direction === "left" ? -480 : 480;
    trackRef.current.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <section className="py-5" data-ocid={ocid}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-secondary">{icon}</span>
            <h2 className="font-display font-bold text-lg sm:text-xl text-secondary tracking-tight">
              {title}
            </h2>
          </div>
          <div className="flex gap-1.5">
            <ScrollArrow
              direction="left"
              onClick={() => scroll("left")}
              ocid={`${ocid}.scroll_left`}
            />
            <ScrollArrow
              direction="right"
              onClick={() => scroll("right")}
              ocid={`${ocid}.scroll_right`}
            />
          </div>
        </div>

        {isError ? (
          <div
            className="flex items-center gap-2 text-muted-foreground text-sm py-6 px-3 bg-muted/20 rounded-lg"
            data-ocid={`${ocid}.error_state`}
          >
            <AlertTriangle className="w-4 h-4 text-destructive shrink-0" />
            <span>Content unavailable. Please try again later.</span>
          </div>
        ) : (
          <div
            ref={trackRef}
            className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory"
          >
            {isLoading
              ? [0, 1, 2, 3, 4, 5, 6, 7].map((k) => <PosterSkeleton key={k} />)
              : items.map((item, i) => (
                  <div key={item.imdbId} className="snap-start">
                    <PosterCard item={item} index={i} />
                  </div>
                ))}
          </div>
        )}
      </div>
    </section>
  );
}

function HeroSection({ item }: { item: ImdbItem }) {
  const goToWatch = useWatchNavigate();
  const hasPoster =
    item.posterUrl && item.posterUrl !== "/assets/images/placeholder.svg";

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ minHeight: "480px", maxHeight: "640px", height: "56vw" }}
      data-ocid="home.hero_section"
    >
      {hasPoster ? (
        <img
          src={item.posterUrl}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      ) : null}

      {/* Cinematic gradient layers */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, oklch(0.12 0 0 / 0.97) 0%, oklch(0.12 0 0 / 0.6) 45%, oklch(0.12 0 0 / 0.15) 75%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, oklch(0.12 0 0) 0%, oklch(0.12 0 0 / 0.4) 30%, transparent 70%)",
        }}
      />
      {!hasPoster && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.48 0.22 16 / 0.3) 0%, oklch(0.12 0 0) 70%)",
          }}
        />
      )}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: -32 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 flex flex-col justify-end pb-10 sm:pb-14"
      >
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge className="bg-primary text-primary-foreground font-mono text-[10px] uppercase tracking-widest border-0 px-2.5">
              {item.type === "tv" ? "Series" : "Movie"}
            </Badge>
            {item.year > 0 && (
              <span className="text-xs text-muted-foreground font-mono">
                {item.year}
              </span>
            )}
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-foreground leading-none mb-3 drop-shadow-xl">
            {item.title}
          </h1>

          {item.description && (
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl line-clamp-3 mb-5 leading-relaxed">
              {item.description}
            </p>
          )}

          <div className="flex items-center gap-3">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold tracking-wide glow-red h-11 px-6 text-sm"
              onClick={() => goToWatch(item)}
              data-ocid="home.hero_watch_button"
            >
              <Play className="w-4 h-4 mr-2 fill-current" />
              Watch Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 px-5 text-sm border-border/60 bg-card/40 backdrop-blur-sm hover:bg-card/80 text-foreground"
              onClick={() => goToWatch(item)}
              data-ocid="home.hero_more_info_button"
            >
              More Info
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function HeroSkeleton() {
  return (
    <div
      className="relative w-full bg-card"
      style={{ minHeight: "480px", maxHeight: "640px", height: "56vw" }}
    >
      <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
      <div className="absolute bottom-10 left-4 sm:left-8 space-y-3 max-w-lg">
        <Skeleton className="h-5 w-24 rounded" />
        <Skeleton className="h-12 w-80 rounded" />
        <Skeleton className="h-4 w-96 rounded" />
        <Skeleton className="h-4 w-72 rounded" />
        <div className="flex gap-3 pt-1">
          <Skeleton className="h-11 w-32 rounded-md" />
          <Skeleton className="h-11 w-28 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const {
    data: trending,
    isLoading: trendingLoading,
    isError: trendingError,
  } = useTrending();
  const {
    data: popularMovies,
    isLoading: moviesLoading,
    isError: moviesError,
  } = usePopularMovies();
  const {
    data: popularTV,
    isLoading: tvLoading,
    isError: tvError,
  } = usePopularTV();

  const trendingItems = trending ?? [];
  const heroItem = trendingItems[0];

  return (
    <div className="min-h-screen" data-ocid="home.page">
      {/* Hero */}
      {trendingLoading ? (
        <HeroSkeleton />
      ) : heroItem ? (
        <HeroSection item={heroItem} />
      ) : null}

      {/* Content rows */}
      <div className="pb-8">
        <PosterRow
          title="Trending This Week"
          icon={<TrendingUp className="w-5 h-5" />}
          items={trendingItems}
          isLoading={trendingLoading}
          isError={trendingError}
          ocid="home.trending_section"
        />
        <div style={{ background: "oklch(0.16 0 0 / 0.5)" }}>
          <PosterRow
            title="Popular Movies"
            icon={<FilmIcon className="w-5 h-5" />}
            items={popularMovies ?? []}
            isLoading={moviesLoading}
            isError={moviesError}
            ocid="home.popular_movies_section"
          />
        </div>
        <PosterRow
          title="Popular TV Shows"
          icon={<Tv className="w-5 h-5" />}
          items={popularTV ?? []}
          isLoading={tvLoading}
          isError={tvError}
          ocid="home.popular_tv_section"
        />
      </div>
    </div>
  );
}
