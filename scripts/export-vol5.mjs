#!/usr/bin/env node
/**
 * 从 ai_coding_governance 卷五真源导出公众仓 release（v1.0.1）
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");
const srcPath = join(
  repoRoot,
  "../ai_coding_governance/narrative/ARTICLE_AI_Coding_可闭环协作_公众稿_vol5_v1.0.0_zh.md"
);

const TENCENT = {
  vol1: "https://cloud.tencent.com/developer/article/2675471",
  vol2: "https://cloud.tencent.com/developer/article/2676250",
  vol3: "https://cloud.tencent.com/developer/article/2678669",
  vol4: "https://cloud.tencent.com/developer/article/2680278",
  vol5: "https://cloud.tencent.com/developer/article/2681115",
  map: "https://github.com/Cyning12/ai-coding-closed-loop-articles/blob/main/ARTICLE_AI_Coding_可闭环协作_方法论地图_v1.0.1_zh.md",
};

let body = readFileSync(srcPath, "utf8");
for (const marker of ["\n---\n\n## 修订记录", "\n---\n\n## 待确认"]) {
  const i = body.indexOf(marker);
  if (i >= 0) body = body.slice(0, i);
}

const linkReplacements = [
  [
    /ARTICLE_AI_Coding_可闭环协作_公众稿_OUTLINE_v1_zh\.md/g,
    "ARTICLE_AI_Coding_可闭环协作_公众稿_OUTLINE_v1.0.0_zh.md",
  ],
  [
    /ARTICLE_AI_Coding_可闭环协作_公众稿_v0\.1_zh\.md/g,
    "ARTICLE_AI_Coding_可闭环协作_公众稿_vol1_v1.0.1_zh.md",
  ],
  [
    /ARTICLE_AI_Coding_可闭环协作_公众稿_vol2_v0\.8\.2_zh\.md/g,
    "ARTICLE_AI_Coding_可闭环协作_公众稿_vol2_v1.0.0_zh.md",
  ],
  [
    /ARTICLE_AI_Coding_可闭环协作_公众稿_vol4_v1\.0\.0_zh\.md/g,
    "ARTICLE_AI_Coding_可闭环协作_公众稿_vol4_v1.1.0_zh.md",
  ],
  [
    /\]\(\.\/FAQ_方法论地图与五卷_业界观点对照与争议_v1_zh\.md\)/g,
    "](https://github.com/Cyning12/ai-coding-closed-loop-articles/blob/main/ARTICLE_AI_Coding_可闭环协作_公众稿_vol5_v1.0.1_zh.md#2313-和业界说法harness--sdd--效能指标怎么对齐)",
  ],
  [
    /更全的对照表与外链见 \*\*对内\*\* \[`FAQ_方法论地图与五卷_业界观点对照与争议_v1_zh\.md`\]\([^)]+\)（\*\*不进\*\* 公众平台粘贴版）。/,
    "更全外链对照由系列维护者在仓库 Issue / 讨论区补充（公众稿以本节表为准）。",
  ],
];

for (const [re, rep] of linkReplacements) {
  body = body.replace(re, rep);
}

// 文首元信息：版本 v1.0.1
body = body.replace(
  /> \*\*2026-06-02\*\* · 系列 \[ai-coding-closed-loop-articles\]/,
  "> **2026-06-02** · 系列 [ai-coding-closed-loop-articles]"
);
body = body.replace(
  /(# AI 编程可闭环协作 · 卷五[^\n]+\n\n)(> \*\*2026-06-02\*\*)/,
  "$1> **版本**：release **v1.0.1**（2026-06-02 · 业界说法对齐 §23.13）  \n$2"
);

const license = body.endsWith("\n")
  ? ""
  : "\n";
const outPath = join(
  repoRoot,
  "ARTICLE_AI_Coding_可闭环协作_公众稿_vol5_v1.0.1_zh.md"
);
writeFileSync(outPath, body.trimEnd() + "\n", "utf8");

// 保留 v1.0.0 文件名同步（README 若仍指向 v1.0.0）
const legacyPath = join(
  repoRoot,
  "ARTICLE_AI_Coding_可闭环协作_公众稿_vol5_v1.0.0_zh.md"
);
writeFileSync(legacyPath, body.trimEnd() + "\n", "utf8");

console.log("Wrote:", outPath);
console.log("Synced:", legacyPath);
console.log("Tencent vol5:", TENCENT.vol5);
console.log("Methodology map:", TENCENT.map);
