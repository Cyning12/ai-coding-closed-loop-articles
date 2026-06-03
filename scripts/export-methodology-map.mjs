#!/usr/bin/env node
/**
 * 从 ai_coding_governance 方法论总论 draft 导出公众仓 release + PUBLISH 粘贴版（未 decorate）
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");
const srcPath = join(
  repoRoot,
  "../ai_coding_governance/narrative/ARTICLE_AI_Coding_可闭环协作_方法论总论_v1_zh.md"
);

const TENCENT = {
  vol1: "https://cloud.tencent.com/developer/article/2675471",
  vol2: "https://cloud.tencent.com/developer/article/2676250",
  vol3: "https://cloud.tencent.com/developer/article/2678669",
  vol4: "https://cloud.tencent.com/developer/article/2680278",
  vol5: "https://cloud.tencent.com/developer/article/2681115",
};

const src = readFileSync(srcPath, "utf8");
let body = src;
for (const marker of ["\n---\n\n## 待确认清单", "\n---\n\n## 修订记录"]) {
  const i = body.indexOf(marker);
  if (i >= 0) body = body.slice(0, i);
}

// 去掉文首元信息表（第一个 --- 之前保留标题与系列说明）
const firstHr = body.indexOf("\n---\n");
const head = body.slice(0, firstHr);
const rest = body.slice(firstHr + 5);

body = rest.trimStart();

const linkReplacements = [
  [/\]\(\.\.\/\.\.\/ai-coding-closed-loop-articles\//g, "](./"],
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
    /本仓库 \*\*任务单 \+ 阶段流 \+ 检查\*\*（卷三）/g,
    "连载 **任务单 + 阶段流 + 检查**（卷三）",
  ],
];

for (const [re, rep] of linkReplacements) {
  body = body.replace(re, rep);
}

const releaseMeta = `# 从「更会写」到「敢合并」：AI 编程可闭环协作方法论

> **过程轨、结构轨与 Epic 验收如何叠放**  
> 系列《AI 编程可闭环协作》· **方法论地图（独立篇，无卷号）**  
> 系列总目录见 [ARTICLE_AI_Coding_可闭环协作_公众稿_OUTLINE_v1.0.0_zh.md](./ARTICLE_AI_Coding_可闭环协作_公众稿_OUTLINE_v1.0.0_zh.md)

| 项 | 内容 |
| --- | --- |
| **系列主标题** | AI 编程可闭环协作 |
| **篇别** | 方法论地图（**无卷号** · 系列导读） |
| **版本** | **v1.0.2**（2026-06-02 · 对齐私仓 v0.1.5 · §3/§4 示意图） |
| **状态** | \`release\` |
| **日期** | 2026-06-02 |
| **读者** | Tech Lead / 架构师 · AI Coding / Mentor · 已用 Agent 改代码的一线工程师 |
| **前置** | 建议先读本篇再进卷一～五；本篇 **不替代** 五卷操作细节 |
| **仓库** | [GitHub · ai-coding-closed-loop-articles](https://github.com/Cyning12/ai-coding-closed-loop-articles) |

---

## 目录

| 节 | 标题 |
| --- | --- |
| — | [摘要](#摘要) |
| 1 | [问题陈述：失败常不在模型](#1-问题陈述失败常不在模型) |
| 2 | [双主轴：过程轨与结构轨](#2-双主轴过程轨与结构轨) |
| 3 | [SDD 三支柱：Inform · Constrain · Verify](#3-sdd-三支柱inform--constrain--verify) |
| 4 | [Epic：意图 · 成果 · 验收](#4-epic意图--成果--验收) |
| 5 | [记忆轨与 Skill 的边界](#5-记忆轨与-skill-的边界) |
| 6 | [L3 → L2 → L1：什么能抄、什么不能](#6-l3--l2--l1什么能抄什么不能) |
| 7 | [与 TDD、Code Review、DevOps 的关系](#7-与-tddcode-reviewdevops-的关系) |
| 8 | [阅读地图：五卷各答什么](#8-阅读地图五卷各答什么) |
| 9 | [诚实边界：本系列不承诺什么](#9-诚实边界本系列不承诺什么) |
| 10 | [结语](#10-结语) |

---

`;

const license = `
---

*许可：CC BY 4.0 · 署名可转载与改编 · 系列文稿：[ai-coding-closed-loop-articles](https://github.com/Cyning12/ai-coding-closed-loop-articles)*
`;

const releasePath = join(
  repoRoot,
  "ARTICLE_AI_Coding_可闭环协作_方法论地图_v1.0.2_zh.md"
);
// 同步上一版文件名，避免 README 旧链断裂
const releasePathLegacy = join(
  repoRoot,
  "ARTICLE_AI_Coding_可闭环协作_方法论地图_v1.0.1_zh.md"
);
writeFileSync(releasePath, releaseMeta + body + license, "utf8");
writeFileSync(releasePathLegacy, releaseMeta + body + license, "utf8");

const publishHeader = `> **2026-06-02** · 系列《AI 编程可闭环协作》· **方法论地图**（独立篇，无卷号）· release **v1.0.2**
> **副标题**：过程轨、结构轨与 Epic 验收如何叠放
> **系列文稿（Markdown）**：[github.com/Cyning12/ai-coding-closed-loop-articles](https://github.com/Cyning12/ai-coding-closed-loop-articles)
> **阅读顺序**：**本篇（导读）** · [卷一](${TENCENT.vol1}) · [卷二](${TENCENT.vol2}) · [卷三](${TENCENT.vol3}) · [卷四](${TENCENT.vol4}) · [卷五](${TENCENT.vol5})

---

## 目录

| 节 | 标题 |
| --- | --- |
| — | 摘要 |
| 1 | 问题陈述：失败常不在模型 |
| 2 | 双主轴：过程轨与结构轨 |
| 3 | SDD 三支柱：Inform · Constrain · Verify |
| 4 | Epic：意图 · 成果 · 验收 |
| 5 | 记忆轨与 Skill 的边界 |
| 6 | L3 → L2 → L1：什么能抄、什么不能 |
| 7 | 与 TDD、Code Review、DevOps 的关系 |
| 8 | 阅读地图：五卷各答什么 |
| 9 | 诚实边界：本系列不承诺什么 |
| 10 | 结语 |

---

`;

// 粘贴版：§8 表内链改为腾讯云或纯文字
let pasteBody = body;
pasteBody = pasteBody.replace(
  /\]\(\.\/ARTICLE_AI_Coding_可闭环协作_公众稿_vol3[^)]+\)/g,
  `](${TENCENT.vol3})`
);
pasteBody = pasteBody.replace(
  /\]\(\.\/ARTICLE_AI_Coding_可闭环协作_公众稿_vol4[^)]+\)/g,
  `](${TENCENT.vol4})`
);
pasteBody = pasteBody.replace(
  /\]\(\.\/ARTICLE_AI_Coding_可闭环协作_公众稿_vol1[^)]+\)/g,
  `](${TENCENT.vol1})`
);
pasteBody = pasteBody.replace(
  /\]\(\.\/ARTICLE_AI_Coding_可闭环协作_公众稿_vol2[^)]+\)/g,
  `](${TENCENT.vol2})`
);
pasteBody = pasteBody.replace(
  /\]\(\.\/ARTICLE_AI_Coding_可闭环协作_公众稿_vol5[^)]+\)/g,
  `](${TENCENT.vol5})`
);
pasteBody = pasteBody.replace(
  /\]\(\.\/ARTICLE_AI_Coding_可闭环协作_公众稿_OUTLINE[^)]+\)/g,
  "](https://github.com/Cyning12/ai-coding-closed-loop-articles/blob/main/ARTICLE_AI_Coding_可闭环协作_公众稿_OUTLINE_v1.0.0_zh.md)"
);
// 存量行已有 vol5 腾讯云链，保留

const publishPath = join(
  repoRoot,
  "assets/PUBLISH_方法论地图_公众平台粘贴版_v1.0.2_zh.md"
);
const publishPathLegacy = join(
  repoRoot,
  "assets/PUBLISH_方法论地图_公众平台粘贴版_v1.0.1_zh.md"
);
writeFileSync(publishPath, publishHeader + pasteBody + license, "utf8");
writeFileSync(publishPathLegacy, publishHeader + pasteBody + license, "utf8");

console.log("Wrote:", releasePath);
console.log("Synced:", releasePathLegacy);
console.log("Wrote:", publishPath);
console.log("Synced:", publishPathLegacy);
