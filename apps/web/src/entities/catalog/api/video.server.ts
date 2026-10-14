import { Array as Arr, Effect, Option, Struct } from "effect";

import { catalogDb } from "./db.server";

const VIDEO_COLUMNS = {
  id: true,
  title: true,
  kind: true,
  videoId: true,
  url: true,
  uploader: true,
  publishedAt: true,
  note: true,
  comment: true,
} as const;

const getVideo = Effect.fn("catalog.video")(function* getVideo(id: number) {
  const found = Option.fromUndefinedOr(
    yield* Effect.promise(() =>
      catalogDb.query.video.findFirst({
        columns: VIDEO_COLUMNS,
        with: {
          parts: {
            columns: {
              id: true,
              position: true,
              label: true,
              bpm: true,
              bars: true,
              startSec: true,
              note: true,
              comment: true,
            },
            with: {
              song: { columns: { id: true, title: true } },
              refVideo: { columns: { id: true, title: true } },
              staff: {
                columns: { role: true },
                with: { person: { columns: { id: true, name: true } } },
              },
            },
            orderBy: { position: "asc" },
          },
          quotedBy: {
            columns: { id: true },
            with: { video: { columns: { id: true, title: true, kind: true } } },
          },
        },
        where: { id },
      }),
    ),
  );
  return found.pipe(
    Option.map(
      Struct.evolve({
        quotedBy: (quotes) =>
          Arr.dedupeWith(
            quotes.map((quote) => quote.video),
            (left, right) => left.id === right.id,
          ).toSorted((left, right) => left.title.localeCompare(right.title)),
      }),
    ),
  );
});

export { getVideo };
