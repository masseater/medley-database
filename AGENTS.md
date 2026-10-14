# AGENTS.md

ニコメドと合作動画の素材管理アプリである。使い方、MCP のツール、データモデルは README.md にある。持ち主は Windows で動かしている。

## コマンド

```sh
pnpm test                               # vitest。MEDLEY_DB=:memory: で動く
pnpm vitest run tests/queries.test.ts   # 1 ファイルだけ動かす
pnpm typecheck                          # ルートと web/ の両方
pnpm knip
```

変更したら上の 3 つを通す。

## つくり

- DB への読み書きはすべて `src/db/queries.ts` にあり、Web の API（`src/server/app.ts`）と MCP サーバー（`src/mcp/index.ts`）がこれを共有する。同じ SQLite のファイルを両方が直接開く。
- `src/db/schema.sql` は起動のたびに流れる。既存のテーブルに列を足すときは、schema.sql に加えて `db.ts` の `migrate()` にも `ensureColumn` を足す。
- データを入れるのは MCP だけで、Web UI からの書き込みはコメントの 2 つの PATCH だけにする。
- 動画の `url` は必須である。`ref_video_title` から自動で作るスタブには `urn:medley-manager:unknown` が入り、後で `update_video` で実際の URL に置き換える。
- `desktop/medley-manager.vbs` と `desktop/create-shortcut.ps1` は ASCII だけで書く。Windows の wscript と PowerShell 5.1 が CP932 で読むからである。
