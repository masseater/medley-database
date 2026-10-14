import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { VideoList, catalogQueries } from "#/entities/catalog";

const route = getRouteApi("/videos/");

const describe = ({
  uploader,
  partCount,
}: Readonly<{ uploader: string | null; partCount: number }>): string =>
  [uploader ?? "", `${partCount.toString()} パート`].filter(Boolean).join("・");

const VideoResults = (): ReactNode => {
  const filter = route.useSearch();
  const { data: videos } = useSuspenseQuery(catalogQueries.videos.get.queryOptions(filter));
  return <VideoList videos={videos} describe={describe} />;
};

export { VideoResults };
