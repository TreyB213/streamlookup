import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const SKELETON_3 = [0, 1, 2];
const HomePage = lazy(() => import("@/pages/HomePage"));
const SearchPage = lazy(() => import("@/pages/SearchPage"));
const WatchPage = lazy(() => import("@/pages/WatchPage"));

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense
        fallback={
          <div className="container mx-auto px-4 py-12 space-y-6">
            {SKELETON_3.map((k) => (
              <Skeleton key={k} className="h-48 w-full rounded-xl" />
            ))}
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

export const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  component: SearchPage,
});

export const watchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/watch",
  validateSearch: (search: Record<string, unknown>) => ({
    tt: typeof search.tt === "string" ? search.tt : "",
    type: (search.type === "tv" ? "tv" : "movie") as "movie" | "tv",
    season: typeof search.season === "string" ? search.season : "1",
    episode: typeof search.episode === "string" ? search.episode : "1",
    title: typeof search.title === "string" ? search.title : undefined,
    poster: typeof search.poster === "string" ? search.poster : undefined,
    tmdbId: typeof search.tmdbId === "string" ? search.tmdbId : undefined,
  }),
  component: WatchPage,
});

const routeTree = rootRoute.addChildren([indexRoute, searchRoute, watchRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
