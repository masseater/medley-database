import { useMemo } from "react";
import type { ReactNode } from "react";

import { useSong } from "#/pages/song/api/use-song";
import { Facts } from "#/shared/ui/facts";
import { Note } from "#/shared/ui/note";

import { OriginalLink } from "./original-link";
import { SongAliases } from "./song-aliases";

const SongHeader = (): ReactNode => {
  const song = useSong();
  const facts = useMemo(() => [song.artist, song.genre], [song]);
  return (
    <header className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">{song.title}</h1>
      <Facts values={facts} />
      <SongAliases aliases={song.aliases} />
      <OriginalLink url={song.url} />
      <Note text={song.note} />
    </header>
  );
};

export { SongHeader };
