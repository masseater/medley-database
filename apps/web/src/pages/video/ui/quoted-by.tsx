import type { ReactNode } from "react";

import { VideoList } from "#/entities/catalog";
import { useVideo } from "#/pages/video/api/use-video";

const nothing = (): string => "";

const QuotedBy = (): ReactNode => {
  const video = useVideo();
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">{`この動画を引用している動画（${video.quotedBy.length.toString()}）`}</h2>
      <VideoList videos={video.quotedBy} describe={nothing} />
    </section>
  );
};

export { QuotedBy };
