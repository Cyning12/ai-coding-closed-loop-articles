# AI 编程可闭环协作 · 公众稿

> 系列《AI 编程可闭环协作》的 **Markdown 定稿** 与公众平台粘贴版。  
> **README 版本**：**v2.0.0**（2026-06-02）

| 项 | 内容 |
| --- | --- |
| **仓库** | [github.com/Cyning12/ai-coding-closed-loop-articles](https://github.com/Cyning12/ai-coding-closed-loop-articles) |
| **系列版本** | **[v1.5.0](SERIES_VERSION.md)**（文件名统一为 **volN + semver ≥ v1.0.0**） |
| **许可** | 正文 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

## 文件命名约定

| 类型 | 模式 | 示例 |
| --- | --- | --- |
| **正文（卷 N）** | `ARTICLE_AI_Coding_可闭环协作_公众稿_vol{N}_v{X.Y.Z}_zh.md` | `…_vol1_v1.0.1_zh.md` |
| **方法论地图**（无卷号） | `ARTICLE_AI_Coding_可闭环协作_方法论地图_v{X.Y.Z}_zh.md` | `…_v1.0.0_zh.md` |
| **系列目录** | `ARTICLE_AI_Coding_可闭环协作_公众稿_OUTLINE_v{X.Y.Z}_zh.md` | `…_v1.0.0_zh.md` |
| **粘贴版** | `assets/PUBLISH_卷{N}_公众平台粘贴版_v{X.Y.Z}_zh.md` | 与对应 `ARTICLE` **卷内版号一致** |

卷内版号（semver）写在 **文件名** 与文首元信息表中，二者保持一致。

---

## 阅读入口

| 篇别 | 文件 | 卷内版 | 腾讯云 |
| --- | --- | --- | --- |
| **总目录** | [`ARTICLE_*_OUTLINE_v1.0.0_zh.md`](./ARTICLE_AI_Coding_可闭环协作_公众稿_OUTLINE_v1.0.0_zh.md) | v1.0.0 | — |
| **方法论地图**（导读 · 无卷号） | [`ARTICLE_*_方法论地图_v1.0.0_zh.md`](./ARTICLE_AI_Coding_可闭环协作_方法论地图_v1.0.0_zh.md) | v1.0.0 | 待发 |
| **卷一** | [`ARTICLE_*_vol1_v1.0.1_zh.md`](./ARTICLE_AI_Coding_可闭环协作_公众稿_vol1_v1.0.1_zh.md) | v1.0.1 | [2675471](https://cloud.tencent.com/developer/article/2675471) |
| **卷二** | [`ARTICLE_*_vol2_v1.0.0_zh.md`](./ARTICLE_AI_Coding_可闭环协作_公众稿_vol2_v1.0.0_zh.md) | v1.0.0 | [2676250](https://cloud.tencent.com/developer/article/2676250) |
| **卷三** | [`ARTICLE_*_vol3_v1.4.0_zh.md`](./ARTICLE_AI_Coding_可闭环协作_公众稿_vol3_v1.4.0_zh.md) | v1.4.0 | [2678669](https://cloud.tencent.com/developer/article/2678669) |
| **卷四** | [`ARTICLE_*_vol4_v1.1.0_zh.md`](./ARTICLE_AI_Coding_可闭环协作_公众稿_vol4_v1.1.0_zh.md) | v1.1.0 | [2680278](https://cloud.tencent.com/developer/article/2680278) |
| **卷五** | [`ARTICLE_*_vol5_v1.0.0_zh.md`](./ARTICLE_AI_Coding_可闭环协作_公众稿_vol5_v1.0.0_zh.md) | v1.0.0 | [2681115](https://cloud.tencent.com/developer/article/2681115) |

### 粘贴版（`assets/`）

| 篇别 | 文件 |
| --- | --- |
| 方法论地图 | [`PUBLISH_方法论地图_公众平台粘贴版_v1.0.0_zh.md`](./assets/PUBLISH_方法论地图_公众平台粘贴版_v1.0.0_zh.md) |
| 卷一～五 | [`PUBLISH_卷一_…_v1.0.1_zh.md`](./assets/PUBLISH_卷一_公众平台粘贴版_v1.0.1_zh.md) 等 |
| 全五卷合并 | [`PUBLISH_系列全五卷合并_公众平台粘贴版_v1.0.1_zh.md`](./assets/PUBLISH_系列全五卷合并_公众平台粘贴版_v1.0.1_zh.md) |

配图索引与 PNG：`assets/figures/` · [`mermaid-image-map.json`](./mermaid-image-map.json)

---

## 建议阅读顺序

1. [**方法论地图**](./ARTICLE_AI_Coding_可闭环协作_方法论地图_v1.0.0_zh.md)（约 15 分钟 · 双轨 / SDD / Epic 全局心智）  
2. [系列总目录](./ARTICLE_AI_Coding_可闭环协作_公众稿_OUTLINE_v1.0.0_zh.md)  
3. [卷一](https://cloud.tencent.com/developer/article/2675471) → [卷二](https://cloud.tencent.com/developer/article/2676250) → … → [卷五](https://cloud.tencent.com/developer/article/2681115)

---

## 维护者速查

| 任务 | 命令 / 文档 |
| --- | --- |
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
| **v2.0** | **2026-06-02** | **README 去私仓描述**；`ARTICLE`/`PUBLISH` 文件名统一 **volN + semver ≥ v1.0.0**；系列 **v1.5.0** |
