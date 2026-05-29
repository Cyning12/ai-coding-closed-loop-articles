#!/usr/bin/env node
/**
 * 公众稿「最终稿」收尾：导出 Mermaid PNG +（可选）注入配图提示
 * 在 ai-coding-closed-loop-articles 根目录执行：
 *   node scripts/publish-final.mjs
 *
 * 前置：已写好 assets/PUBLISH_* 与仓库根 release 正文（见 Skill publish-workflow-zh.md）
 */
import { spawnSync } from "child_process";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const exportScript = join(root, "scripts/export-mermaid-images.mjs");

const r = spawnSync("node", [exportScript, "--inject-hints"], {
  cwd: root,
  stdio: "inherit",
});
process.exit(r.status ?? 0);
