import type { ReactNode } from "react";

import { KindFilter } from "./kind-filter";
import { VideoResults } from "./video-results";

const TITLE = "動画";

const VideosPage = (): ReactNode => (
  <div className="flex flex-col gap-6">
    <h1 className="text-2xl font-bold">{TITLE}</h1>
    <KindFilter />
    <VideoResults />
  </div>
);

export { VideosPage };
