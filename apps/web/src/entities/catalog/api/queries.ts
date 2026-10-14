import { createIsomorphicFn } from "@tanstack/react-start";
import { Effect } from "effect";

import { browserClient, createQueries, serverClient } from "#/shared/api";

import type { CatalogRoutes } from "./routes.server";

const loadCatalogRoutes = (): Promise<CatalogRoutes> =>
  Effect.runPromise(
    Effect.promise(() => import("./routes.server")).pipe(
      Effect.map((module) => module.catalogRoutes),
    ),
  );

const client = createIsomorphicFn()
  .server(() => serverClient<CatalogRoutes>(loadCatalogRoutes))
  .client(() => browserClient<CatalogRoutes>());

const catalogQueries = createQueries<CatalogRoutes>(client()).api.catalog;

export { catalogQueries };
