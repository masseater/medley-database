import { useMemo } from "react";
import type { ReactNode } from "react";

import { KindBadge } from "#/entities/catalog";
import { useVideo } from "#/pages/video/api/use-video";
import { Facts } from "#/shared/ui/facts";
import { Note } from "#/shared/ui/note";

import { WatchLink } from "./watch-link";

const VideoHeader = (): ReactNode => {
  const video = useVideo();
  const facts = useMemo(() => [video.uploader, video.publishedAt], [video]);
  return (
    <header className="flex flex-col gap-2">
      <KindBadge kind={video.kind} />
      <h1 className="text-2xl font-bold">{video.title}</h1>
      <Facts values={facts} />
      <WatchLink video={video} />
      <Note text={video.note} />
      <Note text={video.comment} />
    </header>
  );
};

export { VideoHeader };
