import { watchRoute } from "@/App";
import { Skeleton } from "@/components/ui/skeleton";
import { useExternalIds } from "@/hooks/use-tmdb";
import { SERVERS, SERVER_STORAGE_KEY } from "@/lib/servers";
import { getImageUrl } from "@/lib/tmdb";
import type { ContentContext, MediaType } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  ChevronDown,
  Film as FilmIcon,
  RotateCcw,
  Search,
  ServerCrash,
  Tv,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const IMDB_URL_REGEX = /\/title\/(tt\d{7,8})/i;
const BARE_TT_REGEX = /^(tt\d{7,8})$/i;

function extractTtId(input: string): string | null {
  const urlMatch = IMDB_URL_REGEX.exec(input);
  if (urlMatch) return urlMatch[1];
  const bareMatch = BARE_TT_REGEX.exec(input.trim());
  if (bareMatch) return bareMatch[1];
  return null;
}

export default function WatchPage() {
  const search = watchRoute.useSearch();
  const { tt, type, title, poster } = search;
  const season = search.season ?? "1";
  const episode = search.episode ?? "1";
  const tmdbId = search.tmdbId;
  const navigate = useNavigate();

  const parsedTmdbId = tmdbId ? Number(tmdbId) : null;
  const { data: extIds, isLoading: extLoading } = useExternalIds(
    parsedTmdbId,
    type,
  );

  const resolvedTtFromUrl = tt || extIds?.imdb_id || "";

  // Manual IMDb input state
  const [inputValue, setInputValue] = useState("");
  const [manualTtId, setManualTtId] = useState("");
  const [inputError, setInputError] = useState("");

  // Active tt ID: manual override takes precedence over URL param
  const activeTtId = manualTtId || resolvedTtFromUrl;

  // Media type toggle
  const [activeType, setActiveType] = useState<MediaType>(type);

  // Season/episode
  const [activeSeason, setActiveSeason] = useState(season);
  const [activeEpisode, setActiveEpisode] = useState(episode);

  // Server
  const [selectedServer, setSelectedServer] = useState<string>(() => {
    try {
      return localStorage.getItem(SERVER_STORAGE_KEY) ?? SERVERS[0].id;
    } catch {
      return SERVERS[0].id;
    }
  });

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const ctx: ContentContext = {
    imdbId: activeTtId,
    mediaType: activeType,
    title,
    posterPath: poster,
    season: activeSeason,
    episode: activeEpisode,
  };

  const currentServer =
    SERVERS.find((s) => s.id === selectedServer) ?? SERVERS[0];
  const embedUrl = activeTtId ? currentServer.buildUrl(ctx) : null;

  useEffect(() => {
    try {
      localStorage.setItem(SERVER_STORAGE_KEY, selectedServer);
    } catch {
      /* noop */
    }
  }, [selectedServer]);

  const isLoadingIds = extLoading && !resolvedTtFromUrl;
  const hasNoId = !isLoadingIds && !activeTtId;

  function handleInputSubmit(e: React.FormEvent) {
    e.preventDefault();
    const extracted = extractTtId(inputValue);
    if (!extracted) {
      setInputError(
        "Paste an IMDb URL (imdb.com/title/ttXXXXXXX) or a bare tt ID",
      );
      return;
    }
    setInputError("");
    setManualTtId(extracted);
  }

  return (
    <div
      className="container mx-auto px-4 py-6 max-w-5xl"
      data-ocid="watch.page"
    >
      {/* Back button */}
      <button
        type="button"
        onClick={() => void navigate({ to: "/" })}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-5"
        data-ocid="watch.back_button"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Browse
      </button>

      {/* Title row */}
      <div className="flex items-start gap-4 mb-5">
        {poster && (
          <img
            src={getImageUrl(poster, "w200")}
            alt={title ?? "Poster"}
            className="hidden sm:block w-24 rounded-md shrink-0 border border-border shadow-subtle"
          />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            {activeType === "tv" ? (
              <span className="flex items-center gap-1 text-[10px] bg-secondary/20 text-secondary border border-secondary/30 font-mono uppercase tracking-widest px-2 py-0.5 rounded-full">
                <Tv className="w-3 h-3" /> Series
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] bg-primary/20 text-primary border border-primary/30 font-mono uppercase tracking-widest px-2 py-0.5 rounded-full">
                <FilmIcon className="w-3 h-3" /> Movie
              </span>
            )}
            {activeTtId && (
              <span className="text-[10px] text-muted-foreground font-mono">
                {activeTtId}
              </span>
            )}
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-foreground truncate">
            {title ?? activeTtId ?? "Watch"}
          </h1>
        </div>
      </div>

      {/* IMDb URL input */}
      <form
        onSubmit={handleInputSubmit}
        className="flex gap-2 mb-5"
        data-ocid="watch.imdb_input_form"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (inputError) setInputError("");
            }}
            placeholder="Paste IMDb URL or tt ID (e.g. tt0111161)"
            className="w-full pl-9 pr-4 py-2.5 bg-card border text-foreground text-sm rounded-xl placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/60 transition-smooth"
            data-ocid="watch.imdb_input"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:brightness-110 transition-smooth shrink-0"
          data-ocid="watch.imdb_submit_button"
        >
          Load
        </button>
      </form>
      {inputError && (
        <p
          className="text-xs text-destructive mb-4 -mt-3"
          data-ocid="watch.input.field_error"
        >
          {inputError}
        </p>
      )}

      {/* Movie / TV toggle tabs */}
      <div
        className="flex gap-0 border-b border-border mb-4"
        data-ocid="watch.type_tabs"
      >
        {(["movie", "tv"] as MediaType[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setActiveType(t)}
            className={`relative px-5 py-2.5 text-sm font-semibold transition-smooth ${
              activeType === t
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            data-ocid={`watch.type_tab.${t}`}
          >
            {t === "movie" ? (
              <span className="flex items-center gap-1.5">
                <FilmIcon className="w-4 h-4" /> Movie
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Tv className="w-4 h-4" /> TV Series
              </span>
            )}
            {activeType === t && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Controls row */}
      <div
        className="flex flex-wrap items-center gap-3 mb-4"
        data-ocid="watch.controls_panel"
      >
        {/* Season/Episode for TV */}
        {activeType === "tv" && (
          <>
            <div className="flex items-center gap-2">
              <label
                htmlFor="watch-season-input"
                className="text-xs text-muted-foreground font-mono uppercase tracking-wide"
              >
                Season
              </label>
              <input
                id="watch-season-input"
                type="number"
                min="1"
                max="99"
                value={activeSeason}
                onChange={(e) => setActiveSeason(e.target.value)}
                className="w-16 text-center bg-card border text-foreground rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                data-ocid="watch.season_input"
              />
            </div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="watch-episode-input"
                className="text-xs text-muted-foreground font-mono uppercase tracking-wide"
              >
                Episode
              </label>
              <input
                id="watch-episode-input"
                type="number"
                min="1"
                max="999"
                value={activeEpisode}
                onChange={(e) => setActiveEpisode(e.target.value)}
                className="w-16 text-center bg-card border text-foreground rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                data-ocid="watch.episode_input"
              />
            </div>
          </>
        )}

        {/* Server selector */}
        <div className="flex items-center gap-2 ml-auto">
          <label
            htmlFor="watch-server-select"
            className="text-xs text-muted-foreground font-mono uppercase tracking-wide"
          >
            Server
          </label>
          <div className="relative">
            <select
              id="watch-server-select"
              value={selectedServer}
              onChange={(e) => setSelectedServer(e.target.value)}
              className="appearance-none bg-card border text-foreground rounded-lg pl-3 pr-7 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 cursor-pointer"
              data-ocid="watch.server_select"
            >
              {SERVERS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            if (iframeRef.current && embedUrl) {
              iframeRef.current.src = embedUrl;
            }
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/60 border rounded-lg text-xs text-foreground hover:border-primary/40 transition-smooth"
          data-ocid="watch.reload_button"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reload
        </button>
      </div>

      {/* Player area — always 16:9 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative w-full rounded-xl overflow-hidden bg-black border border-border shadow-[0_0_40px_rgba(0,0,0,0.8)]"
        style={{ paddingBottom: "56.25%" }}
        data-ocid="watch.player_panel"
      >
        {/* Loading state — waiting for external ID lookup */}
        {isLoadingIds && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            data-ocid="watch.loading_state"
          >
            <Skeleton className="w-full h-full rounded-none absolute inset-0" />
            <div className="relative flex flex-col items-center gap-2">
              <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-muted-foreground">
                Fetching title info…
              </p>
            </div>
          </div>
        )}

        {/* No ID state */}
        {hasNoId && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground"
            data-ocid="watch.error_state"
          >
            <AlertCircle className="w-10 h-10 text-destructive/60" />
            <p className="text-sm">
              Paste an IMDb URL or tt ID in the field above to watch.
            </p>
            <button
              type="button"
              onClick={() => void navigate({ to: "/" })}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:brightness-110 transition-smooth mt-1"
              data-ocid="watch.go_home_button"
            >
              Browse Titles
            </button>
          </div>
        )}

        {/* Server returned null URL */}
        {!isLoadingIds && activeTtId && !embedUrl && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground"
            data-ocid="watch.server_unavailable_state"
          >
            <ServerCrash className="w-10 h-10 text-muted-foreground/50" />
            <p className="text-sm">Server unavailable for this title.</p>
            <p className="text-xs text-muted-foreground/60">
              Try switching to a different server above.
            </p>
          </div>
        )}

        {/* The actual iframe */}
        {embedUrl && (
          <iframe
            ref={iframeRef}
            src={embedUrl}
            title={title ?? "Stream Player"}
            allow="fullscreen; autoplay; encrypted-media"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
            data-ocid="watch.player_iframe"
          />
        )}
      </motion.div>

      {embedUrl && (
        <p className="text-[10px] text-muted-foreground/60 mt-3 text-center font-mono">
          If this server doesn&apos;t load, switch to another using the Server
          dropdown above.
        </p>
      )}
    </div>
  );
}
