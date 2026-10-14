import { countDistinct, isNotNull } from "drizzle-orm";
import { Effect, Option } from "effect";

import { part } from "#/entities/catalog/model/part.table";

import { NO_ROWS, catalogDb, containing } from "./db.server";

const listSongs = Effect.fn("catalog.songs")(function* listSongs(keyword: Option.Option<string>) {
  const where = keyword.pipe(
    Option.match({
      onNone: () => ({}),
      onSome: (value) => ({
        OR: [
          { title: { like: containing(value) } },
          { artist: { like: containing(value) } },
          { aliases: { alias: { like: containing(value) } } },
        ],
      }),
    }),
  );
  const [songs, counts] = yield* Effect.all(
    [
      Effect.promise(() =>
        catalogDb.query.song.findMany({
          columns: { id: true, title: true, artist: true },
          where,
          orderBy: { title: "asc" },
        }),
      ),
      Effect.promise(() =>
        catalogDb
          .select({ songId: part.songId, uses: countDistinct(part.videoId) })
          .from(part)
          .where(isNotNull(part.songId))
          .groupBy(part.songId),
      ),
    ],
    { concurrency: "unbounded" },
  );
  const uses = new Map(counts.map((row) => [row.songId, row.uses]));
  return songs
    .map((song) => Object.assign(song, { useCount: uses.get(song.id) ?? NO_ROWS }))
    .toSorted((left, right) => right.useCount - left.useCount);
});

export { listSongs };
