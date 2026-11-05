import { D1, Website, providers, state } from "@alchemy.run/cloudflare";
import type { InferEnv } from "@alchemy.run/cloudflare";
import { Stack, makeRandom } from "alchemy";
import { Effect } from "effect";

import { APP_NAME, requireAppPrefix } from "./app-name.ts";
import { SITE_HOST } from "./src/shared/config/index.ts";

const COMPATIBILITY = { date: "2026-08-25" } as const;
const CF_BEACON_TOKEN = "ad561fe157a84abb89c547d547524e9f";

const web = Effect.gen(function* web() {
  const DB = yield* D1.Database("DB", { migrations: "./drizzle" });
  const BETTER_AUTH_SECRET = yield* makeRandom("BetterAuthSecret");
  return yield* Website.Vite("Web", {
    compatibility: { ...COMPATIBILITY, flags: ["global_fetch_strictly_public"] },
    logpush: true,
    domain: SITE_HOST,
    env: { BETTER_AUTH_SECRET, CF_BEACON_TOKEN, DB },
    observability: {
      enabled: true,
      logs: {
        enabled: true,
        invocationLogs: true,
        persist: true,
      },
      traces: { enabled: true, persist: true, destinations: ["masseater-dev-traces"] },
    },
    viteEnvironments: { entry: "ssr", children: ["rsc"] },
  });
});

type WebEnv = InferEnv<typeof web>;

export type { WebEnv };
export default Stack(
  APP_NAME,
  { providers: providers(), state: state() },
  Effect.gen(function* stack() {
    const { url } = yield* web;
    yield* requireAppPrefix;
    return { url };
  }),
);
