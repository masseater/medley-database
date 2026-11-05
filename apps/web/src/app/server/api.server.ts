import { elysiaTracing } from "@r_masseater/workers-tracing/elysia";

import { catalogRoutes } from "#/entities/catalog/index.server";
import { createRouter } from "#/shared/api/index.server";
import { createAuth } from "#/shared/auth/index.server";

export const api = createRouter("")
  .use(elysiaTracing)
  .mount((request: Request) => createAuth().handler(request))
  .use(catalogRoutes);
