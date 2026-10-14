import { useSuspenseQuery } from "@tanstack/react-query";
import { Array as Arr } from "effect";
import { useMemo } from "react";
import type { ReactNode } from "react";

import { VideoList } from "#/entities/catalog";
import { videosQuery } from "#/pages/home/api/loader";

const HOME_VIDEO_LIMIT = 10;

const partCount = ({ partCount: count }: Readonly<{ partCount: number }>): string =>
  `${count.toString()} パート`;

const RecentVideos = (): ReactNode => {
  const { data } = useSuspenseQuery(videosQuery);
  const videos = useMemo(() => Arr.take(data, HOME_VIDEO_LIMIT), [data]);
  return <VideoList videos={videos} describe={partCount} />;
};

export { RecentVideos };
