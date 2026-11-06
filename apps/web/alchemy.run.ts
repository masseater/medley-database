import { D1, Website, providers, state } from "@alchemy.run/cloudflare";
import type { InferEnv } from "@alchemy.run/cloudflare";
import { withWorkersTracing } from "@r_masseater/workers-tracing/alchemy";
import { Stack, makeRandom } from "alchemy";
import { Effect } from "effect";

import { APP_NAME, requireAppPrefix } from "./app-name.ts";
import { SITE_HOST } from "./src/shared/config/index.ts";

const CF_BEACON_TOKEN = "ad561fe157a84abb89c547d547524e9f";

const web = Effect.gen(function* web() {
  const DB = yield* D1.Database("DB", { migrations: "./drizzle" });
  const BETTER_AUTH_SECRET = yield* makeRandom("BetterAuthSecret");
  return yield* Website.Vite("Web", {
    compatibility: { flags: ["global_fetch_strictly_public"] },
    logpush: true,
    domain: SITE_HOST,
    env: { BETTER_AUTH_SECRET, CF_BEACON_TOKEN, DB },
    viteEnvironments: { entry: "ssr", children: ["rsc"] },
  });
});

type WebEnv = InferEnv<typeof web>;

export type { WebEnv };
export default Stack(
  APP_NAME,
  {
    providers: withWorkersTracing({ destinations: ["masseater-dev-traces"] })(providers()),
    state: state(),
  },
  Effect.gen(function* stack() {
    const { url } = yield* web;
    yield* requireAppPrefix;
    return { url };
  }),
);
