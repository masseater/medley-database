# DESIGN.md

UIはshadcn/uiのコンポーネントで組む。
色・余白・角丸・フォント・アニメーションはstyles.cssのテーマトークンだけを使い、任意値を書かない。
画面は動画プレイヤーを思わせる暗い配色を基本にし、差し色にはニコニコ動画のコメント色（`comment-*`）を使う。
見出しとロゴはDela Gothic One（`font-display`）、本文はM PLUS Rounded 1c（`font-sans`）で組む。
トップの弾幕には登録済みの曲名だけを流し、作った煽り文句やコメントは載せない。
動きは`motion-reduce`で止められるようにする。
ブラウザの機能はBaseline Widely availableの範囲で使い、実装はmodern-web-guidanceスキルの指針に従う。
