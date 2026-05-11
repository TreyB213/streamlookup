import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { MediaType } from "@/types";
import {
  AlertCircle,
  Clapperboard,
  ExternalLink,
  Link2,
  Play,
  PlayCircle,
  Tv2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";

const TT_REGEX = /\/title\/(tt\d{7,8})/i;
const TT_BARE_REGEX = /^tt\d{7,8}$/i;

function extractTtId(raw: string): string | null {
  const cleaned = raw.trim();
  if (!cleaned) return null;
  if (TT_BARE_REGEX.test(cleaned)) return cleaned.toLowerCase();
  const match = cleaned.match(TT_REGEX);
  return match ? match[1].toLowerCase() : null;
}

function buildEmbedUrl(ttId: string, mediaType: MediaType): string {
  if (mediaType === "movie") {
    return `https://vidsrcme.ru/embed/movie?imdb=${ttId}`;
  }
  return `https://vidsrcme.ru/embed/tv?imdb=${ttId}`;
}

const FEATURED = [
  {
    ttId: "tt0111161",
    title: "The Shawshank Redemption",
    year: "1994",
    type: "movie" as MediaType,
  },
  {
    ttId: "tt0068646",
    title: "The Godfather",
    year: "1972",
    type: "movie" as MediaType,
  },
  {
    ttId: "tt0468569",
    title: "The Dark Knight",
    year: "2008",
    type: "movie" as MediaType,
  },
  {
    ttId: "tt0903747",
    title: "Breaking Bad",
    year: "2008–2013",
    type: "tv" as MediaType,
  },
  {
    ttId: "tt0944947",
    title: "Game of Thrones",
    year: "2011–2019",
    type: "tv" as MediaType,
  },
  {
    ttId: "tt5491994",
    title: "Planet Earth II",
    year: "2016",
    type: "tv" as MediaType,
  },
];

export default function StreamPage() {
  const [inputVal, setInputVal] = useState("");
  const [activeTab, setActiveTab] = useState<MediaType>("movie");
  const [activeTtId, setActiveTtId] = useState<string | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  // Derive extracted ID and error live from input
  const extractedId = extractTtId(inputVal);
  const hasInput = inputVal.trim().length > 0;
  const inputError =
    hasInput && !extractedId
      ? "Invalid IMDb URL — couldn't find a tt ID. Try: https://www.imdb.com/title/tt0111161/"
      : null;

  const handleClear = useCallback(() => {
    setInputVal("");
    setActiveTtId(null);
  }, []);

  const handleWatch = useCallback(
    (ttId?: string, mediaType?: MediaType) => {
      const id = ttId ?? extractedId;
      if (mediaType) setActiveTab(mediaType);
      if (!id) return;
      setActiveTtId(id);
      setTimeout(() => {
        playerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    },
    [extractedId],
  );

  // Auto-load player when a valid tt ID is extracted from the input
  const handleInputChange = useCallback((value: string) => {
    setInputVal(value);
    const id = extractTtId(value);
    if (id) {
      setActiveTtId(id);
    }
  }, []);

  const embedUrl = activeTtId ? buildEmbedUrl(activeTtId, activeTab) : null;

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero banner */}
      <div
        className="relative w-full h-52 md:h-64 overflow-hidden"
        style={{
          backgroundImage:
            "url(/assets/generated/hero-cinema.dim_1600x480.jpg), linear-gradient(135deg, oklch(0.12 0 0) 0%, oklch(0.18 0.05 16) 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl md:text-5xl font-bold text-foreground mb-1"
          >
            Watch Anything, <span className="text-primary">Instantly</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-sm md:text-base font-body"
          >
            Paste an IMDb URL → we extract the ID → stream directly in your
            browser
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-10">
        {/* Input Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="bg-card border border-border rounded-xl p-6 shadow-[0_4px_32px_rgba(0,0,0,0.6)]"
          data-ocid="search.panel"
        >
          {/* Tabs — cinema-red underline style */}
          <div
            className="flex gap-6 mb-5 border-b border-border"
            role="tablist"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "movie"}
              data-ocid="search.movie_tab"
              onClick={() => setActiveTab("movie")}
              className={`flex items-center gap-2 pb-3 text-sm font-display font-medium transition-smooth relative ${
                activeTab === "movie"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Clapperboard className="w-4 h-4" />
              Movies
              {activeTab === "movie" && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                  style={{ background: "oklch(0.48 0.22 16)" }}
                />
              )}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "tv"}
              data-ocid="search.series_tab"
              onClick={() => setActiveTab("tv")}
              className={`flex items-center gap-2 pb-3 text-sm font-display font-medium transition-smooth relative ${
                activeTab === "tv"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Tv2 className="w-4 h-4" />
              TV Series
              {activeTab === "tv" && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                  style={{ background: "oklch(0.48 0.22 16)" }}
                />
              )}
            </button>
          </div>

          {/* URL input with clear button */}
          <div className="flex gap-3 flex-col sm:flex-row">
            <div className="relative flex-1">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                data-ocid="search.input"
                value={inputVal}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleWatch()}
                placeholder="Paste IMDb URL here... (e.g. https://www.imdb.com/title/tt6263850/)"
                className="pl-9 pr-9 bg-input border-border text-foreground placeholder:text-muted-foreground font-mono text-sm h-11 focus-visible:ring-ring"
              />
              {inputVal && (
                <button
                  type="button"
                  aria-label="Clear input"
                  data-ocid="search.clear_button"
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <Button
              data-ocid="search.watch_button"
              onClick={() => handleWatch()}
              disabled={!extractedId}
              className="h-11 px-6 bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold shadow-[0_0_16px_oklch(0.48_0.22_16/0.35)] transition-smooth disabled:opacity-40 disabled:shadow-none"
            >
              <Play className="w-4 h-4 mr-2" />
              Watch Now
            </Button>
          </div>

          {/* Extracted ID hint / error */}
          <AnimatePresence mode="wait">
            {inputError ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                data-ocid="search.error_state"
                className="mt-2 flex items-center gap-2 text-destructive text-xs font-mono overflow-hidden"
              >
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{inputError}</span>
              </motion.div>
            ) : extractedId ? (
              <motion.p
                key="id"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                data-ocid="search.extracted_id"
                className="mt-2 text-xs font-mono text-muted-foreground overflow-hidden"
              >
                Extracted ID:{" "}
                <span className="text-primary font-semibold">
                  {extractedId}
                </span>
              </motion.p>
            ) : null}
          </AnimatePresence>

          {/* Tip */}
          {!hasInput && (
            <p className="mt-3 text-xs text-muted-foreground font-mono">
              Tip: You can also paste just the ID (e.g.{" "}
              <span className="text-secondary font-semibold">tt0111161</span>)
            </p>
          )}
        </motion.div>

        {/* Video Player / Placeholder */}
        <AnimatePresence mode="wait">
          {embedUrl ? (
            <motion.div
              key={embedUrl}
              ref={playerRef}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35 }}
              data-ocid="player.panel"
              className="rounded-xl overflow-hidden shadow-[0_8px_48px_rgba(0,0,0,0.8)] border border-border bg-card"
            >
              {/* Player toolbar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="font-mono text-xs text-muted-foreground">
                    Now Playing
                  </span>
                  <Badge
                    variant="outline"
                    className="font-mono text-xs text-secondary border-secondary/40"
                    data-ocid="player.tt_badge"
                  >
                    {activeTtId}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="font-mono text-xs text-primary border-primary/40"
                  >
                    {activeTab === "movie" ? "Movie" : "TV Series"}
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={`https://www.imdb.com/title/${activeTtId}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-secondary flex items-center gap-1 transition-colors duration-200"
                    data-ocid="player.imdb_link"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> IMDb
                  </a>
                  <button
                    type="button"
                    aria-label="Close player"
                    data-ocid="player.close_button"
                    onClick={() => setActiveTtId(null)}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {/* 16:9 iframe */}
              <div
                className="relative w-full"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  src={embedUrl}
                  className="absolute inset-0 border-0"
                  allowFullScreen
                  allow="autoplay; fullscreen; picture-in-picture; encrypted-media; accelerometer; gyroscope; clipboard-write"
                  title={`Stream ${activeTtId}`}
                  width="100%"
                  height="100%"
                  style={{ width: "100%", height: "100%" }}
                  data-ocid="player.iframe"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              data-ocid="player.empty_state"
              className="rounded-xl border border-border flex flex-col items-center justify-center py-20 px-6 text-center bg-card"
            >
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5 bg-primary/10 border border-primary/30">
                <PlayCircle className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                Ready to Stream
              </h3>
              <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
                Paste an IMDb URL above to start watching. The player will
                appear here automatically.
              </p>
              <p className="mt-4 text-xs font-mono text-muted-foreground">
                Supports movies & TV series via{" "}
                <span className="text-secondary">vidsrcme.ru</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Featured titles */}
        <section data-ocid="featured.section">
          <div className="flex items-center gap-3 mb-5">
            <h3 className="font-display text-xl font-bold text-foreground">
              Featured Titles
            </h3>
            <span className="text-xs text-muted-foreground font-mono">
              click to watch instantly
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURED.map((item, i) => (
              <motion.button
                key={item.ttId}
                type="button"
                data-ocid={`featured.item.${i + 1}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleWatch(item.ttId, item.type)}
                className="group text-left bg-card border border-border rounded-lg p-4 hover:border-primary/60 hover:shadow-[0_0_20px_oklch(0.48_0.22_16/0.2)] transition-smooth"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-200 truncate">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5">
                      {item.year}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`flex-shrink-0 text-xs font-mono ${
                      item.type === "movie"
                        ? "text-primary border-primary/40"
                        : "text-secondary border-secondary/40"
                    }`}
                  >
                    {item.type === "movie" ? "Movie" : "TV"}
                  </Badge>
                </div>
                <p className="mt-2 text-xs text-muted-foreground font-mono">
                  {item.ttId}
                </p>
                <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors duration-200">
                  <Play className="w-3 h-3" />
                  <span>Click to stream</span>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section
          data-ocid="howto.section"
          className="bg-muted/20 border border-border rounded-xl p-6 md:p-8"
        >
          <h3 className="font-display text-xl font-bold text-foreground mb-6 text-center">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                icon: <Link2 className="w-5 h-5" />,
                title: "Grab the IMDb URL",
                desc: "Go to any movie or show on IMDb and copy the URL from your browser. It contains a tt ID like tt0111161.",
              },
              {
                step: "02",
                icon: <Clapperboard className="w-5 h-5" />,
                title: "Paste & Select Type",
                desc: "Paste the URL above, pick Movies or TV Series tab. We extract the tt ID instantly as you type.",
              },
              {
                step: "03",
                icon: <Play className="w-5 h-5" />,
                title: "Stream Instantly",
                desc: "The player loads the stream directly in your browser — no extra steps, no sign-ups.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.1 }}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="w-12 h-12 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary">
                  {item.icon}
                </div>
                <div>
                  <span className="font-mono text-xs text-muted-foreground">
                    {item.step}
                  </span>
                  <h4 className="font-display font-semibold text-foreground mt-0.5">
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
