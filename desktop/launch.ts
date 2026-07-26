/**
 * デスクトップアプリ版のランチャー。
 *
 * 追加のランタイム（Electron 等）は使わず、
 *   1. Hono サーバーを同一プロセスで起動し
 *   2. OS 標準の Chromium 系ブラウザを「アプリモード」（--app）で開く
 * ことでデスクトップアプリとして振る舞う。アドレスバー・タブは出ず、
 * 専用プロファイルを使うので通常のブラウザ窓とは独立したウィンドウ／
 * タスクバーアイコンになる。ウィンドウを閉じるとサーバーも一緒に終了する。
 *
 *   pnpm desktop
 */
import { spawn } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { connect } from "node:net";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { DEFAULT_PORT, startServer } from "../src/server/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "..");

/** ブラウザのプロファイル置き場。通常のブラウザ利用と混ざらないよう専用にする */
const PROFILE_DIR = join(
  process.env.LOCALAPPDATA ?? join(homedir(), ".local", "share"),
  "medley-manager",
  "app-profile"
);

const BROWSER_CANDIDATES = [
  join(process.env["ProgramFiles(x86)"] ?? "C:\\Program Files (x86)", "Microsoft/Edge/Application/msedge.exe"),
  join(process.env["ProgramFiles"] ?? "C:\\Program Files", "Microsoft/Edge/Application/msedge.exe"),
  join(process.env["ProgramFiles"] ?? "C:\\Program Files", "Google/Chrome/Application/chrome.exe"),
  join(process.env["ProgramFiles(x86)"] ?? "C:\\Program Files (x86)", "Google/Chrome/Application/chrome.exe"),
  join(process.env.LOCALAPPDATA ?? "", "Google/Chrome/Application/chrome.exe"),
];

function findBrowser(): string | null {
  return BROWSER_CANDIDATES.find((p) => p && existsSync(p)) ?? null;
}

/** 指定ポートで既にサーバーが動いているか */
function isPortInUse(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = connect({ port, host: "127.0.0.1" })
      .on("connect", () => {
        socket.destroy();
        resolve(true);
      })
      .on("error", () => resolve(false));
    socket.setTimeout(700, () => {
      socket.destroy();
      resolve(false);
    });
  });
}

const port = DEFAULT_PORT;
const url = `http://localhost:${port}`;

if (!existsSync(join(repoRoot, "web", "dist", "index.html"))) {
  console.error("フロントエンドが未ビルドです。先に `pnpm build` を実行してください。");
  process.exit(1);
}

if (await isPortInUse(port)) {
  console.log(`既存のサーバーを利用します: ${url}`);
} else {
  await startServer(port);
}

const browser = findBrowser();
if (!browser) {
  console.error(
    "Edge / Chrome が見つかりませんでした。ブラウザで次を開いてください: " + url
  );
} else {
  mkdirSync(PROFILE_DIR, { recursive: true });
  const child = spawn(
    browser,
    [
      `--app=${url}`,
      `--user-data-dir=${PROFILE_DIR}`,
      "--window-size=1280,860",
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-features=Translate,BackForwardCache",
    ],
    { stdio: "ignore", windowsHide: false }
  );
  console.log(`アプリウィンドウを開きました（${browser.split(/[\\/]/).pop()}）`);
  // ウィンドウを閉じたらサーバーごと終了
  child.on("exit", () => process.exit(0));
}
