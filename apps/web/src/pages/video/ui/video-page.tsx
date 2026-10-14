import type { ReactNode } from "react";

import { QuotedBy } from "./quoted-by";
import { VideoHeader } from "./video-header";
import { VideoParts } from "./video-parts";

const VideoPage = (): ReactNode => (
  <div className="flex flex-col gap-8">
    <VideoHeader />
    <VideoParts />
    <QuotedBy />
  </div>
);

export { VideoPage };
