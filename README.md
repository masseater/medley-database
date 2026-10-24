# medley-manager

メドDB は、ニコメド（ニコニコメドレー）や合作動画で、どの曲や動画が素材として使われたかを逆引きできるサービスである。
ある曲を使ったメドレーや合作を、別の動画を引用した間接的な使用まで含めて探せる。

## 公開先

- Web: https://medley-manager.masseater.dev
- MCP（持ち主の書き込み用）: https://medley-manager.masseater.dev/mcp

## 使い方

ログインは要らず、Web の URL を開けば誰でも見られる。

上部の検索欄に曲・動画・担当者の名前を入れて探す。
曲のページには、その曲を直接使った動画と、引用を経由して使った動画が並ぶ。
動画のページには、その動画を引用している動画が並ぶ。
担当者のページでは、その人がどの動画のどのパートを担当したかが分かる。

記録の追加や修正は、持ち主だけが MCP から行う。動画のサムネイルは、登録時に MCP の `thumbnailUrl` で URL を渡す。

## 手元で動かす

[Vite+](https://viteplus.dev/guide/) の `vp` コマンドと、Cloudflare のアカウントが要る。

```sh
vp env on
vp install
vp exec --filter web alchemy profile edit --add Cloudflare
cd apps/web && vp run dev
```

dev が表示した URL を開くと画面が出る。手元のデータベースは本番と別で、最初は空である。
