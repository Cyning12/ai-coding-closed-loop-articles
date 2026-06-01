#!/usr/bin/env node
/**
 * 按 mermaid-image-map.json 导出 Mermaid → PNG（默认 assets/figures/，文件名含节位）
 * 用法：node scripts/export-mermaid-images.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "fs";
import { spawnSync } from "child_process";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const mapPath = join(root, "mermaid-image-map.json");
const tmpDir = join(root, ".mermaid-export-tmp");

function extractMermaidBlocks(md) {
  const re = /```mermaid\n([\s\S]*?)```/g;
  const out = [];
  let m;
  while ((m = re.exec(md))) out.push(m[1].trim());
  return out;
}

/** 「卷四 §17.3」→「卷四_17.3」 */
function sectionSlug(section) {
  return String(section)
    .trim()
    .replace(/\s*§\s*/g, "_")
    .replace(/\s+/g, "")
    .replace(/[\\/:*?"<>|]/g, "");
}

/** 输出文件名：节位 + 简述 id */
function outputBasename(d) {
  if (d.outputFile) return d.outputFile.replace(/\.png$/i, "");
  const sec = d.sections?.[0] ?? "未标注";
  return `${sectionSlug(sec)}_${d.id}`;
}

const map = JSON.parse(readFileSync(mapPath, "utf8"));
const imagesDir = join(root, map.outputDir ?? "assets/figures");
mkdirSync(imagesDir, { recursive: true });
mkdirSync(tmpDir, { recursive: true });

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const exported = [];

for (const d of map.diagrams) {
  const srcPath = join(root, d.exportFrom.file);
  const blocks = extractMermaidBlocks(readFileSync(srcPath, "utf8"));
  const code = blocks[d.exportFrom.index];
  if (!code) {
    console.error(`No mermaid block index ${d.exportFrom.index} in ${d.exportFrom.file}`);
    process.exit(1);
  }
  const base = outputBasename(d);
  const mmd = join(tmpDir, `${base}.mmd`);
  const png = join(imagesDir, `${base}.png`);
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
  const loc = d.sections?.join(" · ") ?? "";
  console.log(`Export ${base}.png (${loc}) …`);
  const r = spawnSync("npx", args, {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, PUPPETEER_EXECUTABLE_PATH: chrome },
  });
  if (r.status !== 0) {
    console.error(`Failed: ${base}`);
    process.exit(r.status ?? 1);
  }
  exported.push(`${map.outputDir ?? "assets/figures"}/${base}.png`);
}

try {
  rmSync(tmpDir, { recursive: true, force: true });
} catch {
  /* ignore */
}

console.log("Done:", exported.join(", "));
