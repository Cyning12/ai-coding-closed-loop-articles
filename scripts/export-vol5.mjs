#!/usr/bin/env node
/**
 * 从 ai_coding_governance 卷五真源导出公众仓最终稿
 * 输出：AI 编程可闭环协作 · 卷五：….md（无文内 H1）
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
};

const OUTLINE = "./ARTICLE_AI_Coding_可闭环协作_公众稿_OUTLINE_v1.0.0_zh.md";
const MAP = "https://cloud.tencent.com/developer/article/2681553";
const OUT =
  "AI 编程可闭环协作 · 卷五：存量项目怎么落地——案例、误区与渐进路线.md";

function seriesTable() {
  const rows = [
    ["一", "怎样才算「做完」", "动机、双轨总览、最小起步"],
    ["二", "技术图谱", "子图、读法对照、图谱 CI"],
    ["三", "Harness 与 SDD", "实践 SDD 的 Harness 协作流程（任务单、签收、阶段流）"],
    ["四", "闭环交付与经验沉淀", "专题流水线、跨轮回顾摘要"],
    ["五", "存量怎么落地", "案例机制、FAQ、阶段 0～3、诚实边界"],
  ];
  return `| 卷 | 副标题（连载） | 你得到什么 |
| --- | --- | --- |
| — | [从「更会写」到「敢合并」](${MAP}) | 15 分钟导读 · 双轨与 Epic |
${rows
  .map(
    ([cn, sub, blur], i) =>
      `| [卷${cn}](${Object.values(TENCENT)[i]}) | ${sub} | ${blur} |`
  )
  .join("\n")}

`;
}

let body = readFileSync(srcPath, "utf8");
for (const marker of ["\n---\n\n## 修订记录", "\n---\n\n## 待确认"]) {
  const i = body.indexOf(marker);
  if (i >= 0) body = body.slice(0, i);
}

const linkReplacements = [
  [
    /ARTICLE_AI_Coding_可闭环协作_公众稿_OUTLINE_v1_zh\.md/g,
    OUTLINE,
  ],
  [
    /\]\(\.\/ARTICLE_AI_Coding_可闭环协作_公众稿_vol1[^)]+\)/g,
    `](${TENCENT.vol1})`,
  ],
  [
    /\]\(\.\/ARTICLE_AI_Coding_可闭环协作_公众稿_vol2[^)]+\)/g,
    `](${TENCENT.vol2})`,
  ],
  [
    /\]\(\.\/ARTICLE_AI_Coding_可闭环协作_公众稿_vol3[^)]+\)/g,
    `](${TENCENT.vol3})`,
  ],
  [
    /\]\(\.\/ARTICLE_AI_Coding_可闭环协作_公众稿_vol4[^)]+\)/g,
    `](${TENCENT.vol4})`,
  ],
  [
    /\]\(\.\/FAQ_方法论地图与五卷_业界观点对照与争议_v1_zh\.md\)/g,
    `](${TENCENT.vol5}#2313-和业界说法harness--sdd--效能指标怎么对齐)`,
  ],
  [
    /更全的对照表与外链见 \*\*对内\*\* \[`FAQ_方法论地图与五卷_业界观点对照与争议_v1_zh\.md`\]\([^)]+\)（\*\*不进\*\* 公众平台粘贴版）。/,
    "更全外链对照由系列维护者在仓库 Issue / 讨论区补充（公众稿以本节表为准）。",
  ],
];

for (const [re, rep] of linkReplacements) {
  body = body.replace(re, rep);
}

body = body.replace(/^# [^\n]+\n+/, "");
body = body.replace(/^>[\s\S]*?\n\n---\s*\n\n/m, "");

const dirIdx = body.search(/^## 目录\s*$/m);
let toc = "";
let rest = body;
if (dirIdx >= 0) {
  const afterDir = body.slice(dirIdx);
  const m = afterDir.match(/^## 目录[\s\S]*?\n---\s*\n/);
  if (m) {
    toc = m[0]
      .replace(/^## 目录\s*\n/, "")
      .replace(/\n---\s*\n$/, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .trim();
    rest = body.slice(dirIdx + m[0].length);
  }
}
const firstSec = rest.search(/^## /m);
const main = firstSec >= 0 ? rest.slice(firstSec) : rest;

const outText =
  seriesTable() +
  (toc ? `## 目录\n\n${toc}\n\n---\n\n` : "") +
  main.trimEnd() +
  "\n";

const outPath = join(repoRoot, OUT);
writeFileSync(outPath, outText, "utf8");
console.log("Wrote:", outPath);
console.log("Tencent vol5:", TENCENT.vol5);
