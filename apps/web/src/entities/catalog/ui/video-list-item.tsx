import type { ReactNode } from "react";

import type { VideoKind } from "#/entities/catalog/lib/video-kind";

import { KindBadge } from "./kind-badge";
import { VideoLink } from "./video-link";

type VideoSummary = Readonly<{ id: number; title: string; kind: VideoKind }>;

const VideoListItem = ({
  video,
  detail,
}: Readonly<{ video: VideoSummary; detail: string }>): ReactNode => (
  <li className="flex flex-wrap items-center gap-2 py-3">
    <KindBadge kind={video.kind} />
    <VideoLink id={video.id} title={video.title} />
    <span className="text-muted-foreground text-sm">{detail}</span>
  </li>
);

export type { VideoSummary };
export { VideoListItem };
