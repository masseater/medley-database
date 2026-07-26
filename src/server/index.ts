import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { buildApi } from "./app.js";
import { getDbPath } from "../db/db.js";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "..", "..");
const webDist = join(repoRoot, "web", "dist");

export const DEFAULT_PORT = Number(process.env.PORT ?? 8765);

export function buildServerApp(): Hono {
  const app = new Hono();
  app.route("/api", buildApi());

  // 静的ファイル（ビルド済みフロントエンド）
  app.use("/assets/*", serveStatic({ root: "./web/dist" }));
  app.get("*", (c) => {
    const index = join(webDist, "index.html");
    if (!existsSync(index)) {
      return c.text("フロントエンドが未ビルドです。`pnpm build` を実行してください。", 503);
    }
    return c.html(readFileSync(index, "utf8"));
  });
  return app;
}

/** サーバーを起動する。デスクトップ版ランチャーからも呼ばれる */
export function startServer(port: number = DEFAULT_PORT): Promise<void> {
  const app = buildServerApp();
  return new Promise((resolve) => {
    serve({ fetch: app.fetch, port }, () => {
      console.log(`medley-manager: http://localhost:${port}`);
      console.log(`DB: ${getDbPath()}`);
      resolve();
    });
  });
}

// 直接実行されたときだけ起動する（import 時は副作用なし）
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await startServer();
}
