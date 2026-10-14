import type { ReactNode } from "react";

import { RecentVideos } from "./recent-videos";
import { StatGrid } from "./stat-grid";

const TITLE = "ニコメド管理";

const HomePage = (): ReactNode => (
  <div className="flex flex-col gap-8">
    <h1 className="text-2xl font-bold">{TITLE}</h1>
    <StatGrid />
    <RecentVideos />
  </div>
);

export { HomePage };
