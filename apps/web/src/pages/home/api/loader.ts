import type { QueryClient } from "@tanstack/react-query";

import { catalogQueries } from "#/entities/catalog";

const statsQuery = catalogQueries.stats.get.queryOptions();

const videosQuery = catalogQueries.videos.get.queryOptions({});

const loadHomePage = (queryClient: QueryClient): Promise<unknown> =>
  Promise.all([
    queryClient.query({ ...statsQuery, staleTime: "static" }),
    queryClient.query({ ...videosQuery, staleTime: "static" }),
  ]);

export { loadHomePage, statsQuery, videosQuery };
