import { elysiaTracing, tracedHandle } from "@r_masseater/workers-tracing/elysia";

import { createRouter } from "#/shared/api/index.server";

import { catalogRoutes } from "./routes.server";

const handleCatalog = tracedHandle(createRouter("").use(elysiaTracing).use(catalogRoutes).handle);

export { handleCatalog };
