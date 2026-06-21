# AI 编程可闭环协作 · 公众稿

> 系列《AI 编程可闭环协作》的 **Markdown 定稿** 与公众平台粘贴版。  
> **README 版本**：**v2.2.0**（2026-06-03）

| 项 | 内容 |
| --- | --- |
| **仓库** | [github.com/Cyning12/ai-coding-closed-loop-articles](https://github.com/Cyning12/ai-coding-closed-loop-articles) |
| **系列版本** | **[v1.6.0](SERIES_VERSION.md)**（卷一～五单稿 · 文件名=对外标题） |
| **许可** | 正文 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

## 文件命名约定

| 类型 | 模式 | 示例 |
| --- | --- | --- |
| **正文（卷 N）** | `release/AI 编程可闭环协作 · 卷{N}：{副标题}.md` | 发版目录 |
| **方法论**（无卷号） | `release/从「更会写」到「敢合并」：….md` | 单稿 |
| **系列目录** | `ARTICLE_AI_Coding_可闭环协作_公众稿_OUTLINE_v{X.Y.Z}_zh.md` | `…_v1.0.0_zh.md` |
| **粘贴版** | `assets/PUBLISH_卷{N}_公众平台粘贴版_zh.md` | 与对应卷正文同步 |
| **续篇** | `discipline_package_series/release/` + `discipline_package_series/assets/` | 纪律包工程续篇 |

卷一～五 **语义版本** 记在 [OUTLINE 修订记录](./ARTICLE_AI_Coding_可闭环协作_公众稿_OUTLINE_v1.0.0_zh.md#修订记录)，不写入文件名。

---

## 阅读入口

> **对外发版正文** 在 [`release/`](./release/README.md)；下表链至该目录。

| 篇别 | 文件 | 内容基线 | 腾讯云 |
| --- | --- | --- | --- |
| **总目录** | [`ARTICLE_*_OUTLINE_v1.0.0_zh.md`](./ARTICLE_AI_Coding_可闭环协作_公众稿_OUTLINE_v1.0.0_zh.md) | v1.0.0 | — |
| **方法论**（导读 · 无卷号） | [`release/…方法论.md`](<./release/从「更会写」到「敢合并」：AI 编程可闭环协作方法论.md>) | 定稿 | [2681553](https://cloud.tencent.com/developer/article/2681553) |
| **卷一** | [`release/卷一…`](<./release/AI 编程可闭环协作 · 卷一：怎样才算「做完」——给 Agent 结构，给团队过程.md>) | v1.0.1 | [2675471](https://cloud.tencent.com/developer/article/2675471) |
| **卷二** | [`release/卷二…`](<./release/AI 编程可闭环协作 · 卷二：技术图谱——让 Agent 先看地图再动手.md>) | v1.0.0 | [2676250](https://cloud.tencent.com/developer/article/2676250) |
| **卷三** | [`release/卷三…`](<./release/AI 编程可闭环协作 · 卷三：Harness 与 SDD——让改动可签收、可合并.md>) | v1.4.0 | [2678669](https://cloud.tencent.com/developer/article/2678669) |
| **卷四** | [`release/卷四…`](<./release/AI 编程可闭环协作 · 卷四：闭环交付与经验沉淀——从 SPEC 到跨轮回顾摘要.md>) | v1.1.0 | [2680278](https://cloud.tencent.com/developer/article/2680278) |
| **卷五** | [`release/卷五…`](<./release/AI 编程可闭环协作 · 卷五：存量项目怎么落地——案例、误区与渐进路线.md>) | v1.0.1 | [2681115](https://cloud.tencent.com/developer/article/2681115) |
| **续篇 · 篇 1** | [`discipline_package_series/release/…篇1….md`](<./discipline_package_series/release/AI 编程可闭环协作 · 纪律包续篇 · 篇1：从 OOP 到本体——用形式语义支撑 AI 协作方法论.md>) | v1.0.0 | _待发_ |

### 粘贴版（`assets/`）

| 篇别 | 文件 |
| --- | --- |
| 方法论地图 | [`PUBLISH_方法论地图_公众平台粘贴版_v1.0.2_zh.md`](./assets/PUBLISH_方法论地图_公众平台粘贴版_v1.0.2_zh.md) |
| 卷一～五 | [`PUBLISH_卷一_公众平台粘贴版_zh.md`](./assets/PUBLISH_卷一_公众平台粘贴版_zh.md) 等 |
| 全五卷合并 | [`PUBLISH_系列全五卷合并_公众平台粘贴版_v1.0.1_zh.md`](./assets/PUBLISH_系列全五卷合并_公众平台粘贴版_v1.0.1_zh.md) |
| 续篇篇 1 | [`discipline_package_series/assets/PUBLISH_篇1_…`](./discipline_package_series/assets/PUBLISH_篇1_公众平台粘贴版_v1.0.0_zh.md) |

配图索引与 PNG：`assets/figures/` · [`mermaid-image-map.json`](./mermaid-image-map.json)

---

## 建议阅读顺序

1. [**从「更会写」到「敢合并」：方法论**](https://cloud.tencent.com/developer/article/2681553)（约 15 分钟 · 双轨 / SDD / Epic 全局心智）  
2. [系列总目录](./ARTICLE_AI_Coding_可闭环协作_公众稿_OUTLINE_v1.0.0_zh.md)  
3. [卷一](https://cloud.tencent.com/developer/article/2675471) → [卷二](https://cloud.tencent.com/developer/article/2676250) → … → [卷五](https://cloud.tencent.com/developer/article/2681115)
4. **可选续篇**：[纪律包工程 · 篇 1](./discipline_package_series/README.md)（本体论 × 方法论）

---

## 维护者速查

| 任务 | 命令 / 文档 |
| --- | --- |
| 卷一～五从私仓再导出 | `node scripts/migrate-volumes-to-final.mjs`（需先恢复 `ARTICLE_*_vol*` 源稿时勿用） |
| 合并五卷粘贴版 | `python3 scripts/merge-publish-series-full.py` |
| 导出方法论地图 | `node scripts/export-methodology-map.mjs` |
| Mermaid → PNG | `node scripts/publish-final.mjs` |
| 腾讯云标题格式 | `node scripts/decorate-publish-headings.mjs assets/PUBLISH_*.md` |
| 发前勾选 | [`SYNC_CHECKLIST.md`](./SYNC_CHECKLIST.md) |
| 腾讯云链接表 | [`platform/TENCENT_PUBLISH_LINKS_v1_zh.md`](./platform/TENCENT_PUBLISH_LINKS_v1_zh.md) |

---

## 修订记录

| 版本 | 日期 | 说明 |
| --- | --- | --- |
| v1.0 | 2026-05-27 | 初版：卷一 + OUTLINE |
| v1.1 | 2026-06-02 | 全五卷合并 v1.0.1；方法论地图 release |
| v2.0 | 2026-06-02 | `ARTICLE`/`PUBLISH` 文件名统一 **volN + semver**；系列 **v1.5.0** |
| **v2.1** | **2026-05-29** | 卷一～五 **单稿**（`AI 编程可闭环协作 · 卷X：….md`）；系列 **v1.6.0** |
| **v2.2** | **2026-06-03** | 发版正文迁入 **`release/`** 目录 |
