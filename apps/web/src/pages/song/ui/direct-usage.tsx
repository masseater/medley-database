import type { ReactNode } from "react";

import { VideoList } from "#/entities/catalog";
import { useSong } from "#/pages/song/api/use-song";
import { describeDirect } from "#/pages/song/lib/describe";

const DirectUsage = (): ReactNode => {
  const { direct } = useSong();
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">{`使用動画（${direct.length.toString()}）`}</h2>
      <VideoList videos={direct} describe={describeDirect} />
    </section>
  );
};

export { DirectUsage };
