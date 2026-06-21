# 纪律包工程续篇 · 公众稿

> **系列**：《AI 编程可闭环协作》**扩展续篇**（非卷六）· 与 [`release/`](../release/README.md) 五卷 + 方法论 **分目录**。

| 项 | 内容 |
| --- | --- |
| **状态** | 篇 1 **v1.0.0** release |
| **私仓起草** | [`ai_coding_governance/narrative/discipline_package_series/`](https://github.com/Cyning12/cyning-ai-coding-governance)（维护者） |
| **许可** | 正文 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

## 与主系列关系

| 已有 | 本目录 |
| --- | --- |
| 五卷 + 方法论地图（ICV · 双轨） | **扩展**：协作本体、ICVO、过程图（篇 2 待发） |
| [`release/`](../release/) 根下卷一～五 | **本目录** `release/` + `assets/` |

**建议阅读**： [方法论地图](https://cloud.tencent.com/developer/article/2681553) → [卷三](https://cloud.tencent.com/developer/article/2678669) → **篇 1** → 篇 2（待发）

---

## 文件

| 篇 | release（GitHub 正文） | 粘贴版（平台发帖） |
| --- | --- | --- |
| **篇 1** · 从 OOP 到本体 | [`release/…篇1….md`](<./release/AI 编程可闭环协作 · 纪律包续篇 · 篇1：从 OOP 到本体——用形式语义支撑 AI 协作方法论.md>) | [`assets/PUBLISH_篇1_公众平台粘贴版_v1.0.0_zh.md`](./assets/PUBLISH_篇1_公众平台粘贴版_v1.0.0_zh.md) |
| 篇 2 · 过程协作图 | _待发_ | _待发_ |

---

## 维护

| 任务 | 说明 |
| --- | --- |
| 从私仓同步 | 更新 `PUBLISH_*` 后复制至本目录 `assets/`；`release/` 去文首粘贴元信息、与 release 卷格式对齐 |
| 腾讯云标题 | `node scripts/decorate-publish-headings.mjs discipline_package_series/assets/PUBLISH_*.md` |
| 文章封面 Prompt | [`prompts/figures/PROMPT_figure_续篇篇1_文章封面_v1_zh.md`](../../prompts/figures/PROMPT_figure_续篇篇1_文章封面_v1_zh.md) → 生成后 `images/续篇篇1封面.png` |
| Mermaid PNG | `node scripts/publish-final.mjs`（`mermaid-image-map.json` 已登记 §0、§8）→ `assets/figures/续篇篇1_0_方法论本体实现.png`、`续篇篇1_8_四支柱落点.png` |

---

## 修订记录

| 日期 | 说明 |
| --- | --- |
| 2026-06-21 | 初版目录 · 篇 1 v1.0.0 · 与仓库根分离 |
