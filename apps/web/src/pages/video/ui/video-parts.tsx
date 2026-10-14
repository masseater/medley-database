import type { ReactNode } from "react";

import { PartsTable } from "#/entities/catalog";
import { useVideo } from "#/pages/video/api/use-video";

const VideoParts = (): ReactNode => {
  const video = useVideo();
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">{`パート（${video.parts.length.toString()}）`}</h2>
      <PartsTable source={video} parts={video.parts} />
    </section>
  );
};

export { VideoParts };
