#!/usr/bin/env node
/**
 * 按 mermaid-image-map.json 导出 Mermaid → images/*.png（不修改正文）
 * 用法：node scripts/export-mermaid-images.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "fs";
import { spawnSync } from "child_process";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const mapPath = join(root, "mermaid-image-map.json");
const imagesDir = join(root, "images");
const tmpDir = join(root, ".mermaid-export-tmp");

function extractMermaidBlocks(md) {
  const re = /```mermaid\n([\s\S]*?)```/g;
  const out = [];
  let m;
  while ((m = re.exec(md))) out.push(m[1].trim());
  return out;
}

const map = JSON.parse(readFileSync(mapPath, "utf8"));
mkdirSync(imagesDir, { recursive: true });
mkdirSync(tmpDir, { recursive: true });

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

for (const d of map.diagrams) {
  const srcPath = join(root, d.exportFrom.file);
  const blocks = extractMermaidBlocks(readFileSync(srcPath, "utf8"));
  const code = blocks[d.exportFrom.index];
  if (!code) {
    console.error(`No mermaid block index ${d.exportFrom.index} in ${d.exportFrom.file}`);
    process.exit(1);
  }
  const mmd = join(tmpDir, `${d.id}.mmd`);
  const png = join(imagesDir, `${d.id}.png`);
  writeFileSync(mmd, code + "\n", "utf8");
  const args = [
    "-y",
    "@mermaid-js/mermaid-cli@11.4.0",
    "-i",
    mmd,
    "-o",
    png,
    "-b",
    "white",
    "-w",
    String(d.width ?? 1400),
    "-H",
    "900",
  ];
  console.log(`Export ${d.id}.png (${d.sections?.join(" · ") ?? ""}) …`);
  const r = spawnSync("npx", args, {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, PUPPETEER_EXECUTABLE_PATH: chrome },
  });
  if (r.status !== 0) {
    console.error(`Failed: ${d.id}`);
    process.exit(r.status ?? 1);
  }
}

try {
  rmSync(tmpDir, { recursive: true, force: true });
} catch {
  /* ignore */
}

console.log("Done:", map.diagrams.map((d) => `${d.id}.png`).join(", "));
