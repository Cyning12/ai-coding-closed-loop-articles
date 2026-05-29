#!/usr/bin/env node
/**
 * 按 mermaid-image-map.json 从公众稿提取 Mermaid 并导出 PNG 到 images/
 * 用法：
 *   node scripts/export-mermaid-images.mjs
 *   node scripts/export-mermaid-images.mjs --inject-hints
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from "fs";
import { spawnSync } from "child_process";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const mapPath = join(root, "mermaid-image-map.json");
const imagesDir = join(root, "images");
const tmpDir = join(root, ".mermaid-export-tmp");

const injectHints = process.argv.includes("--inject-hints");

function extractMermaidBlocks(md) {
  const re = /```mermaid\n([\s\S]*?)```/g;
  const out = [];
  let m;
  while ((m = re.exec(md))) out.push(m[1].trim());
  return out;
}

function imagePrefix(filePath) {
  return filePath.startsWith("assets/") ? "../images/" : "images/";
}

function hintLine(id, filePath) {
  return `\n\n> 掘金等若 Mermaid 异常，可用配图：\`${imagePrefix(filePath)}${id}.png\`。\n`;
}

function hasHintAfter(md, endIndex) {
  const tail = md.slice(endIndex, endIndex + 200);
  return /掘金等若 Mermaid 异常/.test(tail);
}

/** @param {string} filePath @param {number} blockIndex @param {string} id */
function injectHintInFile(filePath, blockIndex, id) {
  const full = join(root, filePath);
  if (!existsSync(full)) {
    console.warn(`Skip inject (missing): ${filePath}`);
    return;
  }
  let md = readFileSync(full, "utf8");
  const re = /```mermaid\n[\s\S]*?```/g;
  let i = 0;
  let match;
  let changed = false;
  while ((match = re.exec(md))) {
    if (i === blockIndex) {
      const end = match.index + match[0].length;
      if (!hasHintAfter(md, end)) {
        md = md.slice(0, end) + hintLine(id, filePath) + md.slice(end);
        changed = true;
      }
      break;
    }
    i += 1;
  }
  if (changed) {
    writeFileSync(full, md, "utf8");
    console.log(`Inject hint: ${filePath} ← ${id}.png`);
  }
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

if (injectHints) {
  for (const d of map.diagrams) {
    for (const target of d.inject ?? []) {
      const file = typeof target === "string" ? target : target.file;
      const index = typeof target === "string" ? 0 : target.index;
      injectHintInFile(file, index, d.id);
    }
  }
}

try {
  rmSync(tmpDir, { recursive: true, force: true });
} catch {
  /* ignore */
}

console.log(
  "Done:",
  map.diagrams.map((d) => `${d.id}.png`).join(", "),
);
