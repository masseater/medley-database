import { Array, pipe } from "effect";
import type { ReactNode } from "react";

import { SongLink } from "#/entities/catalog";
import { useSearchResults } from "#/pages/search/api/use-search-results";

const FoundSongs = (): ReactNode => {
  const { songs } = useSearchResults();
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">{`曲（${songs.length.toString()}）`}</h2>
      <div className="flex flex-col gap-2">
        {pipe(
          songs,
          Array.map((song) => <SongLink key={song.id} id={song.id} title={song.title} />),
        )}
      </div>
    </section>
  );
};

export { FoundSongs };
