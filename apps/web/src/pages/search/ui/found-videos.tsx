import type { ReactNode } from "react";

import { VideoList } from "#/entities/catalog";
import { useSearchResults } from "#/pages/search/api/use-search-results";

const uploaderOf = ({ uploader }: Readonly<{ uploader: string | null }>): string => uploader ?? "";

const FoundVideos = (): ReactNode => {
  const { videos } = useSearchResults();
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">{`動画（${videos.length.toString()}）`}</h2>
      <VideoList videos={videos} describe={uploaderOf} />
    </section>
  );
};

export { FoundVideos };
