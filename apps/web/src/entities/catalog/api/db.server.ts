import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import { Option } from "effect";

import { catalogRelations } from "#/entities/catalog/model/relations";

const catalogDb = drizzle(env.DB, { relations: catalogRelations });

const NO_ROWS = 0;

const containing = (keyword: string): string => `%${keyword}%`;

const keywordOf = (raw: string | undefined): Option.Option<string> =>
  Option.fromUndefinedOr(raw).pipe(
    Option.map((value) => value.trim()),
    Option.filter((value) => value.length > NO_ROWS),
  );

export { NO_ROWS, catalogDb, containing, keywordOf };
