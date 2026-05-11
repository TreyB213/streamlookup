import { Link, useNavigate } from "@tanstack/react-router";
import { Film, Search } from "lucide-react";
import { useRef, useState } from "react";

const TT_REGEX = /(?:imdb\.com\/title\/)?(tt\d{7,8})/i;

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState("");
  const [ttInput, setTtInput] = useState("");
  const [ttType, setTtType] = useState<"movie" | "tv">("movie");
  const ttRef = useRef<HTMLInputElement>(null);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = searchVal.trim();
    if (!q) return;
    const ttMatch = TT_REGEX.exec(q);
    if (ttMatch) {
      void navigate({
        to: "/watch",
        search: {
          tt: ttMatch[1],
          type: ttType,
          season: "1",
          episode: "1",
          title: undefined,
          poster: undefined,
          tmdbId: undefined,
        },
      });
      setSearchVal("");
    } else {
      void navigate({ to: "/search", search: { q } });
      setSearchVal("");
    }
  }

  function handleTtWatch(e: React.FormEvent) {
    e.preventDefault();
    const ttMatch = TT_REGEX.exec(ttInput.trim());
    if (!ttMatch) return;
    void navigate({
      to: "/watch",
      search: {
        tt: ttMatch[1],
        type: ttType,
        season: "1",
        episode: "1",
        title: undefined,
        poster: undefined,
        tmdbId: undefined,
      },
    });
    setTtInput("");
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-50 shadow-[0_2px_24px_rgba(0,0,0,0.8)]">
        <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row items-center gap-3">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 shrink-0 group"
            data-ocid="nav.home_link"
          >
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_16px_oklch(0.48_0.22_16/0.5)] group-hover:shadow-[0_0_24px_oklch(0.48_0.22_16/0.7)] transition-smooth">
              <Film className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display font-bold text-lg tracking-tight text-foreground leading-none">
                Stream<span className="text-primary">Lookup</span>
              </h1>
              <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest leading-none mt-0.5">
                Your Streaming Hub
              </p>
            </div>
          </Link>

          {/* Center search */}
          <form
            onSubmit={handleSearch}
            className="flex-1 max-w-lg mx-auto w-full"
            data-ocid="nav.search_form"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search movies, TV shows, or paste IMDb URL…"
                className="w-full bg-white border border-border/60 text-black placeholder:text-zinc-400 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 transition-smooth"
                data-ocid="nav.search_input"
              />
            </div>
          </form>

          {/* IMDb direct input */}
          <form
            onSubmit={handleTtWatch}
            className="flex items-center gap-2 shrink-0"
            data-ocid="nav.tt_form"
          >
            <input
              ref={ttRef}
              type="text"
              value={ttInput}
              onChange={(e) => setTtInput(e.target.value)}
              placeholder="tt1234567 or IMDb URL"
              className="hidden sm:block w-44 bg-white border border-border/60 text-black placeholder:text-zinc-400 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/60 transition-smooth"
              data-ocid="nav.tt_input"
            />
            <select
              value={ttType}
              onChange={(e) => setTtType(e.target.value as "movie" | "tv")}
              className="bg-muted/60 border text-foreground rounded-lg px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/60 transition-smooth cursor-pointer"
              data-ocid="nav.tt_type_select"
            >
              <option value="movie">Movie</option>
              <option value="tv">TV</option>
            </select>
            <button
              type="submit"
              className="px-3 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:brightness-110 transition-smooth"
              data-ocid="nav.tt_watch_button"
            >
              Watch
            </button>
          </form>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Film className="w-4 h-4 text-primary" />
              <span className="font-display font-semibold text-sm text-foreground">
                Stream<span className="text-primary">Lookup</span>
              </span>
            </div>
            <p className="text-xs text-muted-foreground text-center max-w-md">
              Search any movie or TV show and stream instantly. Powered by IMDb.
              Supports 10+ streaming servers with season &amp; episode
              selection.
            </p>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()}. Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                className="text-secondary hover:text-primary transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
