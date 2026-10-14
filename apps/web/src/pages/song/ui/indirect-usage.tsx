import type { ReactNode } from "react";

import { VideoList } from "#/entities/catalog";
import { useSong } from "#/pages/song/api/use-song";
import { describeIndirect } from "#/pages/song/lib/describe";

const IndirectUsage = (): ReactNode => {
  const { indirect } = useSong();
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">{`引用経由の使用動画（${indirect.length.toString()}）`}</h2>
      <VideoList videos={indirect} describe={describeIndirect} />
    </section>
  );
};

export { IndirectUsage };
