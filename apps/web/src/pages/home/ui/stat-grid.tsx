import { useSuspenseQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";

import { statsQuery } from "#/pages/home/api/loader";

import { StatLink } from "./stat-link";

const StatGrid = (): ReactNode => {
  const { data: stats } = useSuspenseQuery(statsQuery);
  return (
    <div className="grid grid-cols-3 gap-4">
      <StatLink to="/videos" label="動画" value={stats.videos} />
      <StatLink to="/songs" label="曲" value={stats.songs} />
      <StatLink to="/people" label="担当者" value={stats.people} />
    </div>
  );
};

export { StatGrid };
