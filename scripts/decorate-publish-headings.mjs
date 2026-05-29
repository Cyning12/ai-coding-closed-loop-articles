#!/usr/bin/env node
/**
 * PUBLISH_* 粘贴版：删除 Mermaid 配图提醒 + 引用块标题分层
 *
 * 默认 --platform=tencent（腾讯云开发者社区优先）
 *
 * 用法：
 *   node scripts/decorate-publish-headings.mjs assets/PUBLISH_卷二_*.md
 *   node scripts/decorate-publish-headings.mjs --platform=juejin assets/PUBLISH_*.md
 *   node scripts/decorate-publish-headings.mjs --inject-vol1-link assets/PUBLISH_*.md
 *   node scripts/decorate-publish-headings.mjs --revert assets/PUBLISH_*.md
 */
import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const revert = process.argv.includes("--revert");
const injectVol1 = process.argv.includes("--inject-vol1-link");
const platformArg = process.argv.find((a) => a.startsWith("--platform="));
const platform = platformArg ? platformArg.split("=")[1] : "tencent";
const files = process.argv.slice(2).filter((a) => !a.startsWith("--"));

const MERMAID_HINT_RE = /\n> 掘金等若 Mermaid 异常[^\n]*\n/g;

const VOL1_CONFIG_PATHS = [
  "platform/tencent-config.local.json",
  "platform/tencent-config.example.json",
];

function stripMermaidHints(md) {
  return md.replace(MERMAID_HINT_RE, "\n");
}

function stripHtmlHeadings(md) {
  return md.replace(
    /<div style="([^"]*)"><strong style="[^"]*">(.+?)<\/strong><\/div>/g,
    (_, style, text) => {
      let level = 2;
      if (style.includes("1.35em")) level = 1;
      else if (style.includes("1.2em")) level = 2;
      else if (style.includes("1.05em")) level = 3;
      else level = 4;
      return `${"#".repeat(level)} ${text}\n\n`;
    },
  );
}

function plainTitle(text) {
  return text.replace(/^\*\*(.+)\*\*$/, "$1").trim();
}

function endsWithHr(out) {
  for (let i = out.length - 1; i >= 0; i--) {
    const t = out[i].trim();
    if (!t) continue;
    return t === "---";
  }
  return false;
}

/** 章、节标题文案（引用块内加粗，章前加分隔线） */
function pushHeading(out, level, text, isDocTitle) {
  const t = plainTitle(text);
  if (level === 1 && isDocTitle) {
    if (platform !== "tencent") out.push(`# ${t}`);
    return;
  }
  const hashes = "#".repeat(level);
  if (level === 2) {
    if (!endsWithHr(out)) out.push("---");
    out.push(`> ${hashes} **${t}**`);
    return;
  }
  if (level === 3) {
    out.push(`> ${hashes} **${t}**`);
    return;
  }
  if (platform === "tencent") {
    out.push(` #### ${t}`);
    return;
  }
  out.push(`> > ${hashes} ${t}`);
}

function parseHeadingLine(line) {
  const tencentH4 = line.match(/^ ####\s+(.+)$/);
  if (tencentH4) return { level: 4, text: plainTitle(tencentH4[1]) };

  const bq = line.match(/^>\s*(>+\s*)?(#{1,4})\s+(.+)$/);
  if (bq) {
    const level = bq[2].length;
    const nest = (bq[1] ?? "").replace(/\s/g, "").length;
    if (nest >= 1 && level <= 4) return { level: 4, text: plainTitle(bq[3]) };
    return { level, text: plainTitle(bq[3]) };
  }
  const plain = line.match(/^(#{1,4})\s+(.+)$/);
  if (plain) return { level: plain[1].length, text: plainTitle(plain[2]) };
  return null;
}

function loadVol1Config() {
  for (const p of VOL1_CONFIG_PATHS) {
    if (existsSync(p)) {
      try {
        return JSON.parse(readFileSync(p, "utf8"));
      } catch {
        /* skip */
      }
    }
  }
  return null;
}

function injectVol1Link(md) {
  const cfg = loadVol1Config();
  if (!cfg?.vol1_article_url) return md;
  const label = cfg.vol1_link_text || "卷一";
  const link = `[${label}](${cfg.vol1_article_url})`;
  const lines = md.split("\n");
  for (let i = 0; i < Math.min(lines.length, 8); i++) {
    const line = lines[i];
    if (!line.startsWith(">")) continue;
    if (line.includes(`${label}](http`)) return md;
    if (line.includes(label)) {
      lines[i] = line.replace(
        new RegExp(`(?<!\\])${label}(?!\\])`),
        link,
      );
      return lines.join("\n");
    }
  }
  return md;
}

function decorate(md) {
  let body = stripMermaidHints(md);
  body = body.includes("<div style=") ? stripHtmlHeadings(body) : body;
  const lines = body.split("\n");
  const out = [];
  let inFence = false;
  let docTitleDone = false;

  for (const line of lines) {
    if (line.startsWith("```")) {
      inFence = !inFence;
      out.push(line);
      continue;
    }
    if (inFence) {
      out.push(line);
      continue;
    }

    const h = parseHeadingLine(line);
    if (h) {
      const isDocTitle = h.level === 1 && !docTitleDone;
      if (isDocTitle) docTitleDone = true;
      pushHeading(out, h.level, h.text, isDocTitle);
      continue;
    }

    if (line.trim() === "---") {
      if (!endsWithHr(out)) out.push("---");
      continue;
    }
    out.push(line);
  }
  let result = out.join("\n").replace(/\n{4,}/g, "\n\n\n");
  if (injectVol1) result = injectVol1Link(result);
  return result;
}

function revertDecorate(md) {
  const lines = md.split("\n");
  const out = [];
  let inFence = false;

  for (const line of lines) {
    if (line.startsWith("```")) {
      inFence = !inFence;
      out.push(line);
      continue;
    }
    if (inFence) {
      out.push(line);
      continue;
    }
    const h = parseHeadingLine(line);
    if (h) {
      out.push(`${"#".repeat(h.level)} ${h.text}`);
      continue;
    }
    if (line.includes("<div style=")) {
      const t = line.match(/<strong[^>]*>(.+)<\/strong>/);
      if (t) out.push(`## ${t[1]}`);
      continue;
    }
    out.push(line);
  }
  return stripMermaidHints(out.join("\n"));
}

for (const file of files) {
  if (!file.endsWith(".md")) continue;
  const raw = readFileSync(file, "utf8");
  const next = revert ? revertDecorate(raw) : decorate(raw);
  writeFileSync(file, next, "utf8");
  console.log(
    `${revert ? "Reverted" : "Decorated"} (${platform}): ${file}`,
  );
}
