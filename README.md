# AI 编程可闭环协作 · 公众稿

> **Public** 连载仓库：系列《AI 编程可闭环协作》对外发布的 Markdown 定稿。  
> **方法论、测评、续稿草稿** 不在本仓，见同级私有仓 [`ai_coding_governance`](../ai_coding_governance/README.md)（远程 `cyning-ai-coding-governance`）。

| 项 | 内容 |
| --- | --- |
| **远程** | [`git@github.com:Cyning12/ai-coding-closed-loop-articles.git`](https://github.com/Cyning12/ai-coding-closed-loop-articles) |
| **本地路径** | 聚合根 `Projects/` 内与 `ai_coding_governance/` **同级** |
| **GitHub 字段** | [`GITHUB_REPO.md`](./GITHUB_REPO.md) |

---

## 阅读入口

| 卷 | 文件 | 状态 |
| --- | --- | --- |
| **总目录** | [`ARTICLE_AI_Coding_可闭环协作_公众稿_OUTLINE_v1_zh.md`](./ARTICLE_AI_Coding_可闭环协作_公众稿_OUTLINE_v1_zh.md) | 活文档 |
| **卷一** | [`ARTICLE_AI_Coding_可闭环协作_公众稿_v0.1_zh.md`](./ARTICLE_AI_Coding_可闭环协作_公众稿_v0.1_zh.md) | **release**（v0.1.11） |
| **卷二** | [`ARTICLE_AI_Coding_可闭环协作_公众稿_vol2_v0.8.2_zh.md`](./ARTICLE_AI_Coding_可闭环协作_公众稿_vol2_v0.8.2_zh.md) | **release**（v0.8.2） |
| **卷一 · 粘贴版** | [`assets/PUBLISH_卷一_公众平台粘贴版_v0.1.10_zh.md`](./assets/PUBLISH_卷一_公众平台粘贴版_v0.1.10_zh.md) | 掘金 / 公众号一键复制 |
| **卷二 · 粘贴版** | [`assets/PUBLISH_卷二_公众平台粘贴版_v0.8.2_zh.md`](./assets/PUBLISH_卷二_公众平台粘贴版_v0.8.2_zh.md) | 掘金 / 公众号一键复制 |

**建议阅读顺序**：OUTLINE → 卷一 → 卷二。文内 Mermaid 在 GitHub / 掘金 Markdown 下可直接渲染。

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

---

## 许可

正文采用 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)（署名即可转载与改编）。代码块与 Mermaid 图示同许可。

---

## 修订记录

| 日期 | 说明 |
| --- | --- |
| 2026-05-27 | 初版：卷一 v0.1.9 + OUTLINE；与 `ai_coding_governance` 平级落盘 |
