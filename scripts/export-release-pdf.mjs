#!/usr/bin/env node
/**
 * 将 release/*.md 正文导出为 PDF（Chrome headless + marked）。
 * 用法：node scripts/export-release-pdf.mjs [可选：单个 .md 路径]
 */
import { writeFileSync, mkdirSync, readdirSync, unlinkSync } from "fs";
import { join, basename, resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const releaseDir = join(root, "release");
const outDir = join(releaseDir, "pdf");
const tmpDir = join(root, ".pdf-export-tmp");

const CHROME =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

function mdToHtml(mdPath) {
  const r = spawnSync("npx", ["--yes", "marked", "--gfm", mdPath], {
    encoding: "utf8",
    cwd: root,
  });
  if (r.status !== 0) {
    console.error(r.stderr || r.stdout);
    throw new Error(`marked failed: ${mdPath}`);
  }
  return r.stdout;
}

const CSS = `
@page { margin: 18mm 16mm; size: A4; }
* { box-sizing: border-box; }
body {
  font-family: "PingFang SC", "Hiragino Sans GB", "Noto Sans CJK SC",
    "Microsoft YaHei", sans-serif;
  line-height: 1.65;
  font-size: 11pt;
  color: #1a1a1a;
  max-width: 100%;
}
blockquote {
  border-left: 4px solid #c8c8c8;
  margin: 1em 0;
  padding: 0.4em 1em;
  color: #444;
  background: #f7f7f7;
}
h2 { margin-top: 1.6em; font-size: 1.25em; page-break-after: avoid; }
h3 { margin-top: 1.2em; font-size: 1.1em; page-break-after: avoid; }
table {
  border-collapse: collapse;
  width: 100%;
  margin: 0.8em 0 1.2em;
  font-size: 9.5pt;
  page-break-inside: avoid;
}
th, td {
  border: 1px solid #bbb;
  padding: 5px 7px;
  text-align: left;
  vertical-align: top;
}
th { background: #efefef; }
code {
  font-family: ui-monospace, "SF Mono", Menlo, monospace;
  font-size: 0.88em;
  background: #f3f3f3;
  padding: 0.1em 0.35em;
  border-radius: 3px;
}
pre {
  background: #f5f5f5;
  padding: 0.8em 1em;
  overflow-x: auto;
  font-size: 9pt;
  page-break-inside: avoid;
}
pre code { background: none; padding: 0; }
a { color: #0055aa; word-break: break-all; }
hr { border: none; border-top: 1px solid #ccc; margin: 1.8em 0; }
p { margin: 0.6em 0; }
ul, ol { padding-left: 1.4em; }
`;

function wrapHtml(title, bodyHtml) {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<title>${title.replace(/</g, "&lt;")}</title>
<style>${CSS}</style>
</head>
<body>
${bodyHtml}
</body>
</html>`;
}

function mdToPdf(mdPath, pdfPath) {
  const title = basename(mdPath, ".md");
  const bodyHtml = mdToHtml(mdPath);
  const html = wrapHtml(title, bodyHtml);

  mkdirSync(tmpDir, { recursive: true });
  const htmlPath = join(tmpDir, `${basename(mdPath, ".md")}.html`);
  writeFileSync(htmlPath, html, "utf8");

  mkdirSync(dirname(pdfPath), { recursive: true });

  const args = [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    `--print-to-pdf=${pdfPath}`,
    `file://${htmlPath}`,
  ];

  const r = spawnSync(CHROME, args, { encoding: "utf8" });
  if (r.status !== 0) {
    console.error(r.stderr || r.stdout);
    throw new Error(`Chrome PDF failed: ${mdPath}`);
  }

  try {
    unlinkSync(htmlPath);
  } catch {
    /* ignore */
  }

  console.log(`✓ ${basename(pdfPath)}`);
}

function listReleaseArticles() {
  return readdirSync(releaseDir)
    .filter((f) => f.endsWith(".md") && f !== "README.md")
    .map((f) => join(releaseDir, f));
}

function main() {
  const targets = process.argv.slice(2).length
    ? process.argv.slice(2).map((p) => resolve(p))
    : listReleaseArticles();

  if (!targets.length) {
    console.error("No markdown files to export.");
    process.exit(1);
  }

  mkdirSync(outDir, { recursive: true });

  for (const mdPath of targets) {
    const pdfPath = join(outDir, `${basename(mdPath, ".md")}.pdf`);
    mdToPdf(mdPath, pdfPath);
  }

  console.log(`Done: ${targets.length} PDF(s) → ${outDir}`);
}

main();
