# AI 编程可闭环协作 · 公众稿

> **Public** 连载仓库：系列《AI 编程可闭环协作》对外发布的 Markdown 定稿。  
> **方法论、测评、续稿草稿** 不在本仓，见同级私有仓 [`ai_coding_governance`](../ai_coding_governance/README.md)（远程 `cyning-ai-coding-governance`）。

| 项 | 内容 |
| --- | --- |
| **远程** | [`git@github.com:Cyning12/ai-coding-closed-loop-articles.git`](https://github.com/Cyning12/ai-coding-closed-loop-articles) |
| **本地路径** | 聚合根 `Projects/` 内与 `ai_coding_governance/` **同级** |
| **系列版本** | **[v1.4.0](SERIES_VERSION.md)**（卷一～卷五已 release · 腾讯云连载至卷四，卷五待发） |
| **GitHub 字段** | [`GITHUB_REPO.md`](./GITHUB_REPO.md) |

---

## 阅读入口

| 卷 | 文件 | 状态 | 腾讯云 |
| --- | --- | --- | --- |
| **总目录** | [`ARTICLE_AI_Coding_可闭环协作_公众稿_OUTLINE_v1_zh.md`](./ARTICLE_AI_Coding_可闭环协作_公众稿_OUTLINE_v1_zh.md) | 活文档 | — |
| **卷一** | [`ARTICLE_AI_Coding_可闭环协作_公众稿_v0.1_zh.md`](./ARTICLE_AI_Coding_可闭环协作_公众稿_v0.1_zh.md) | **release**（**v1.0.1** · 2026-06-02 用语对齐） | [已发](https://cloud.tencent.com/developer/article/2675471) |
| **卷二** | [`ARTICLE_AI_Coding_可闭环协作_公众稿_vol2_v0.8.2_zh.md`](./ARTICLE_AI_Coding_可闭环协作_公众稿_vol2_v0.8.2_zh.md) | **release**（v0.8.2） | [已发](https://cloud.tencent.com/developer/article/2676250) |
| **卷三** | [`ARTICLE_AI_Coding_可闭环协作_公众稿_vol3_v1.4.0_zh.md`](./ARTICLE_AI_Coding_可闭环协作_公众稿_vol3_v1.4.0_zh.md) | **release**（v1.4.0） | [已发](https://cloud.tencent.com/developer/article/2678669) |
| **卷四** | [`ARTICLE_AI_Coding_可闭环协作_公众稿_vol4_v1.0.0_zh.md`](./ARTICLE_AI_Coding_可闭环协作_公众稿_vol4_v1.0.0_zh.md) | **release**（**v1.1.0** · 2026-06-02 用语对齐） | [已发](https://cloud.tencent.com/developer/article/2680278) |
| **卷五** | [`ARTICLE_AI_Coding_可闭环协作_公众稿_vol5_v1.0.0_zh.md`](./ARTICLE_AI_Coding_可闭环协作_公众稿_vol5_v1.0.0_zh.md) | **release**（**v1.0.0** · 2026-06-02） | 待发 |
| **卷一 · 粘贴版** | [`assets/PUBLISH_卷一_公众平台粘贴版_v1.0.0_zh.md`](./assets/PUBLISH_卷一_公众平台粘贴版_v1.0.0_zh.md) | 掘金 / 腾讯云 | 同上（**v1.0.1** 用语） |
| **卷二 · 粘贴版** | [`assets/PUBLISH_卷二_公众平台粘贴版_v0.8.2_zh.md`](./assets/PUBLISH_卷二_公众平台粘贴版_v0.8.2_zh.md) | 掘金 / 腾讯云 | 同上 |
| **卷三 · 粘贴版** | [`assets/PUBLISH_卷三_公众平台粘贴版_v1.4.0_zh.md`](./assets/PUBLISH_卷三_公众平台粘贴版_v1.4.0_zh.md) | 腾讯云 / 掘金 | 同上 |
| **卷四 · 粘贴版** | [`assets/PUBLISH_卷四_公众平台粘贴版_v1.0.1_zh.md`](./assets/PUBLISH_卷四_公众平台粘贴版_v1.0.1_zh.md) | 腾讯云 / 掘金 | 同上（**v1.1.0** 用语） |
| **卷五 · 粘贴版** | [`assets/PUBLISH_卷五_公众平台粘贴版_v1.0.0_zh.md`](./assets/PUBLISH_卷五_公众平台粘贴版_v1.0.0_zh.md) | 腾讯云 / 掘金 | 待发 |
| **配图提示词** | [`prompts/figures/`](./prompts/figures/) | 封面 / 可选信息图（**非正文**） | — |

**建议阅读顺序**：OUTLINE → [卷一](https://cloud.tencent.com/developer/article/2675471) → [卷二](https://cloud.tencent.com/developer/article/2676250) → [卷三](https://cloud.tencent.com/developer/article/2678669) → [卷四](https://cloud.tencent.com/developer/article/2680278) → [卷五](./ARTICLE_AI_Coding_可闭环协作_公众稿_vol5_v1.0.0_zh.md)（GitHub 已定稿，腾讯云待发）。GitHub 定稿见上表 `ARTICLE_*`。

---

## 与私有治理仓分工

| 仓库 | 可见性 | 内容 |
| --- | --- | --- |
| **本仓** `ai-coding-closed-loop-articles` | Public | 已定稿公众稿、OUTLINE、可选 `assets/` |
| **`ai_coding_governance`** | Private | 方法论、Harness/图谱条文、测评 `reviews/`、`draft`、续卷编写指引 |

从私仓 **发布同步**（在 `ai_coding_governance/narrative/` 定稿后）：

```bash
# 在 Projects/ 下执行；按实际改动的文件增减 cp 参数
cp ai_coding_governance/narrative/ARTICLE_AI_Coding_可闭环协作_公众稿_v0.1_zh.md \
   ai_coding_governance/narrative/ARTICLE_AI_Coding_可闭环协作_公众稿_OUTLINE_v1_zh.md \
   ai-coding-closed-loop-articles/
rsync -a ai_coding_governance/narrative/assets/ ai-coding-closed-loop-articles/assets/
# 随后在公众稿仓删除元信息表中的「续稿 / 测评 / 内部指引」行（见 SYNC_CHECKLIST.md）
```

详见 [`SYNC_CHECKLIST.md`](./SYNC_CHECKLIST.md)。

**Mermaid → PNG（生成最终稿必跑）**：`node scripts/publish-final.mjs`（见 [`mermaid-image-map.json`](./mermaid-image-map.json)、[`images/README.md`](./images/README.md)）；私仓 Skill `publish-workflow-zh.md`。

---

## 许可

正文采用 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)（署名即可转载与改编）。代码块与 Mermaid 图示同许可。

---

## 修订记录

| 日期 | 说明 |
| --- | --- |
| 2026-05-27 | 初版：卷一 v0.1.9 + OUTLINE；与 `ai_coding_governance` 平级落盘 |
