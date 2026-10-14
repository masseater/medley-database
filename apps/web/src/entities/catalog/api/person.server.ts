import { Effect, Option } from "effect";

import { catalogDb } from "./db.server";

const getPerson = Effect.fn("catalog.person")(function* getPerson(id: number) {
  const found = Option.fromUndefinedOr(
    yield* Effect.promise(() =>
      catalogDb.query.person.findFirst({
        columns: { id: true, name: true },
        with: {
          aliases: { columns: { alias: true } },
          credits: {
            columns: { role: true },
            with: {
              part: {
                columns: { id: true, position: true, label: true },
                with: {
                  song: { columns: { id: true, title: true } },
                  video: { columns: { id: true, title: true, kind: true } },
                },
              },
            },
          },
        },
        where: { id },
      }),
    ),
  );
  return found.pipe(
    Option.map((person) => ({
      id: person.id,
      name: person.name,
      aliases: person.aliases.map(({ alias }) => alias),
      credits: person.credits.toSorted(
        (left, right) =>
          left.part.video.title.localeCompare(right.part.video.title) ||
          left.part.position - right.part.position,
      ),
    })),
  );
});

export { getPerson };
