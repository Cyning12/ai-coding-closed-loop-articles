#!/usr/bin/env node
/**
 * 公众稿「最终稿」收尾：导出 Mermaid PNG（不向正文插入配图提醒）
 *   node scripts/publish-final.mjs
 */
import { spawnSync } from "child_process";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

let code = 0;
const ex = spawnSync("node", [join(root, "scripts/export-mermaid-images.mjs")], {
  cwd: root,
  stdio: "inherit",
});
code = ex.status ?? code;

const strip = spawnSync("node", [join(root, "scripts/strip-mermaid-hints.mjs")], {
  cwd: root,
  stdio: "inherit",
});
code = strip.status ?? code;

process.exit(code);
