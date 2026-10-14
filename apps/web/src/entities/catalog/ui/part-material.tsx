import type { ReactNode } from "react";

import type { PartRow } from "#/entities/catalog/lib/part-columns";

import { SongLink } from "./song-link";
import { VideoLink } from "./video-link";

const PartMaterial = ({ part }: Readonly<{ part: PartRow }>): ReactNode => (
  <span className="flex flex-col gap-1">
    {part.song !== null && <SongLink id={part.song.id} title={part.song.title} />}
    {part.song === null && part.label}
    {part.refVideo !== null && <VideoLink id={part.refVideo.id} title={part.refVideo.title} />}
  </span>
);

export { PartMaterial };
