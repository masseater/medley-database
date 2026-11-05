作業を始める前に `repo-conventions` と `vite-plus` の skill を読み、従う。どちらも masseater/skills にあり、`vp install` が `.agents/skills/` に入れる。

## コマンド

- `vp run verify` は、ルートの `vp check` にテスト・steiger・`db:check`・fallow・gitleaks・audit などの検査を束ねたタスクである。pre-push フックと Stop フックも同じ verify を走らせる。
- テストを 1 つだけ走らせるときは、`apps/web` で `vp test run <ファイル>` を実行する。
- D1 のスキーマは `*.table.ts` に書き、`apps/web` で `vp run db:generate` を実行してマイグレーションを `drizzle/` に作る。better-auth のテーブルは `vp run auth:generate` で生成する。

## 構成

- `apps/web` は TanStack Start のアプリである。`alchemy.run.ts` が D1 と Worker を定義し、Cloudflare にデプロイする。`apps/web/app-name.ts` の `APP_NAME` を変えるとリソースは作り直される。
- API は Elysia で書く。`src/app/routes/api.$.ts` が `/api/*` を `src/app/server/api.server.ts` のルーターに渡す。各スライスは `index.server.ts` から出したルートを、そのルーターに足す。
- クライアントは `shared/api` で Eden の型から TanStack Query のクエリを作る。SSR 中は HTTP を通らず、`createIsomorphicFn` でルートの `handle` を直接呼ぶ。

## データ

- Web は閲覧だけを提供する。書き込みは `/mcp` のリモート MCP で行い、OAuth でログインできるのはサインアップを閉じた better-auth に登録した持ち主だけである。
