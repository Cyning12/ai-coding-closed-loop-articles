#!/usr/bin/env node
/**
 * 卷一～五：单文件最终稿迁移（不改方法论地图）
 * - 文首：系列五卷+方法论表（无元信息表、无 H1）
 * - 卷间链：腾讯云
 * - 输出：AI 编程可闭环协作 · 卷X：….md
 */
import { readFileSync, writeFileSync, unlinkSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const OUTLINE = "./ARTICLE_AI_Coding_可闭环协作_公众稿_OUTLINE_v1.0.0_zh.md";

const TENCENT = {
  map: "https://cloud.tencent.com/developer/article/2681553",
  1: "https://cloud.tencent.com/developer/article/2675471",
  2: "https://cloud.tencent.com/developer/article/2676250",
  3: "https://cloud.tencent.com/developer/article/2678669",
  4: "https://cloud.tencent.com/developer/article/2680278",
  5: "https://cloud.tencent.com/developer/article/2681115",
};
const MAP = TENCENT.map;

const VOLUMES = [
  {
    src: "ARTICLE_AI_Coding_可闭环协作_公众稿_vol1_v1.0.1_zh.md",
    out: "AI 编程可闭环协作 · 卷一：怎样才算「做完」——给 Agent 结构，给团队过程.md",
    label: "卷一",
    subtitle: "怎样才算「做完」",
    blurb: "动机、双轨总览、最小起步",
  },
  {
    src: "ARTICLE_AI_Coding_可闭环协作_公众稿_vol2_v1.0.0_zh.md",
    out: "AI 编程可闭环协作 · 卷二：技术图谱——让 Agent 先看地图再动手.md",
    label: "卷二",
    subtitle: "技术图谱",
    blurb: "子图、读法对照、图谱 CI",
    toc: [
      ["—", "摘要"],
      ["8", "技术图谱是什么：流程图、依赖与契约"],
      ["9", "Agent 默认怎么读图：对照与验收"],
      ["10", "结语"],
    ],
  },
  {
    src: "ARTICLE_AI_Coding_可闭环协作_公众稿_vol3_v1.4.0_zh.md",
    out: "AI 编程可闭环协作 · 卷三：Harness 与 SDD——让改动可签收、可合并.md",
    label: "卷三",
    subtitle: "Harness 与 SDD",
    blurb: "实践 SDD 的 Harness 协作流程（任务单、签收、阶段流）",
  },
  {
    src: "ARTICLE_AI_Coding_可闭环协作_公众稿_vol4_v1.1.0_zh.md",
    out: "AI 编程可闭环协作 · 卷四：闭环交付与经验沉淀——从 SPEC 到跨轮回顾摘要.md",
    label: "卷四",
    subtitle: "闭环交付与经验沉淀",
    blurb: "专题流水线、跨轮回顾摘要",
  },
  {
    src: "ARTICLE_AI_Coding_可闭环协作_公众稿_vol5_v1.0.1_zh.md",
    out: "AI 编程可闭环协作 · 卷五：存量项目怎么落地——案例、误区与渐进路线.md",
    label: "卷五",
    subtitle: "存量怎么落地",
    blurb: "案例机制、FAQ、阶段 0～3、诚实边界",
  },
];

const OLD_VOL_FILES = [
  "ARTICLE_AI_Coding_可闭环协作_公众稿_vol1_v1.0.1_zh.md",
  "ARTICLE_AI_Coding_可闭环协作_公众稿_vol2_v1.0.0_zh.md",
  "ARTICLE_AI_Coding_可闭环协作_公众稿_vol3_v1.4.0_zh.md",
  "ARTICLE_AI_Coding_可闭环协作_公众稿_vol4_v1.1.0_zh.md",
  "ARTICLE_AI_Coding_可闭环协作_公众稿_vol4_v1.0.0_zh.md",
  "ARTICLE_AI_Coding_可闭环协作_公众稿_vol5_v1.0.0_zh.md",
  "ARTICLE_AI_Coding_可闭环协作_公众稿_vol5_v1.0.1_zh.md",
];

function seriesTable() {
  const rows = [
    `| — | [从「更会写」到「敢合并」](${MAP}) | 15 分钟导读 · 双轨与 Epic |`,
    ...VOLUMES.map((v, i) => {
      const n = i + 1;
      return `| [${v.label}](${TENCENT[n]}) | ${v.subtitle} | ${v.blurb} |`;
    }),
  ];
  return `| 卷 | 副标题（连载） | 你得到什么 |
| --- | --- | --- |
${rows.join("\n")}

`;
}

function stripTocLinks(tocBlock) {
  return tocBlock.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

function extractParts(raw) {
  const dirIdx = raw.search(/^## 目录\s*$/m);
  let toc = "";
  let bodyStart = 0;

  if (dirIdx >= 0) {
    const afterDir = raw.slice(dirIdx);
    const m = afterDir.match(/^## 目录[\s\S]*?\n---\s*\n/);
    if (m) {
      toc = stripTocLinks(m[0].replace(/^## 目录\s*\n/, "").replace(/\n---\s*\n$/, "").trim());
      toc = toc.replace(/^### 系列后续[\s\S]*/m, "").trim();
      bodyStart = dirIdx + m[0].length;
    }
  }

  let rest = raw.slice(bodyStart);
  rest = rest.replace(/^### 系列后续[\s\S]*?(?=^## )/m, "");
  const firstSec = rest.search(/^## /m);
  if (firstSec < 0) throw new Error("no body section");
  let body = rest.slice(firstSec);
  if (dirIdx < 0) {
    body = body.replace(/^# [^\n]+\n+/, "");
    body = body.replace(/^>[\s\S]*?\n\n---\s*\n\n/m, "");
    body = body.replace(/^\| 项 \| 内容 \|[\s\S]*?\n\n---\s*\n\n/m, "");
  }
  return { toc, body };
}

function applyTencentLinks(text) {
  let t = text;
  for (let n = 1; n <= 5; n++) {
    const url = TENCENT[n];
    const cn = ["一", "二", "三", "四", "五"][n - 1];
    t = t.replace(
      new RegExp(`\\]\\([^)]*公众稿_vol${n}[^)]*\\)`, "g"),
      `](${url})`
    );
    t = t.replace(
      new RegExp(`\\]\\([^)]*vol${n}_v[^)]*\\)`, "g"),
      `](${url})`
    );
    t = t.replace(
      new RegExp(`\\]\\([^)]*卷${cn}[^)]*\\.md[^)]*\\)`, "g"),
      `](${url})`
    );
  }
  t = t.replace(
    /]\(https:\/\/github\.com\/Cyning12\/ai-coding-closed-loop-articles\/blob\/main\/ARTICLE_AI_Coding_可闭环协作_公众稿_vol(\d)[^)]+\)/g,
    (_, d) => `](${TENCENT[Number(d)]})`
  );
  t = t.replace(
    /\]\(ARTICLE_AI_Coding_可闭环协作_公众稿_OUTLINE[^)]*\)/g,
    `](${OUTLINE})`
  );
  t = t.replace(
    /\]\(\.\/ARTICLE_AI_Coding_可闭环协作_公众稿_OUTLINE[^)]*\)/g,
    `](${OUTLINE})`
  );
  return t;
}

for (const vol of VOLUMES) {
  const raw = readFileSync(join(root, vol.src), "utf8");
  let { toc, body } = extractParts(raw);
  body = applyTencentLinks(body);

  if (!toc && vol.toc) {
    const lines = vol.toc.map(([a, b]) => `| ${a} | ${b} |`);
    toc = `| 节 | 标题 |\n| --- | --- |\n${lines.join("\n")}`;
  }

  const tocSection = toc
    ? `## 目录\n\n${toc}\n\n---\n\n`
    : "";

  const out = seriesTable() + tocSection + body;
  const outPath = join(root, vol.out);
  writeFileSync(outPath, out, "utf8");
  console.log("Wrote", vol.out);
}

for (const f of OLD_VOL_FILES) {
  const p = join(root, f);
  if (existsSync(p)) {
    unlinkSync(p);
    console.log("Removed", f);
  }
}

console.log("Done.");
