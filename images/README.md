# 插图 · Mermaid 导出

由 [`mermaid-image-map.json`](../mermaid-image-map.json) + [`scripts/publish-final.mjs`](../scripts/publish-final.mjs) 维护。

| 文件 | 来源 |
| --- | --- |
| `多模块API.png` | 卷一 §2.1 / 卷二 §8.0 主链路 |
| `阶段骨架.png` | 卷一 §2.2 协作流程阶段骨架 |
| `总结.png` | 卷一 §7 图谱 + 协作流程叠放 |
| `读图决策.png` | 卷二 §9.4 读图决策树（横向） |
| `卷一封面.png` | 卷一文章头图（提示词见 `prompts/figures/PROMPT_figure_卷一_文章封面_v1_zh.md`） |
| `卷二封面.png` | 卷二文章头图（`prompts/figures/PROMPT_figure_卷二_文章封面_v1_zh.md`） |

**重导出**（在仓库根目录；需本机 Chrome）：

```bash
node scripts/publish-final.mjs
```

**新增图**：编辑 `mermaid-image-map.json` 后执行上式。Skill 说明见私仓 `ai_coding_governance/.cursor/skills/public-narrative-zh/publish-workflow-zh.md`。

正文 **不写**「Mermaid 异常请换图」提醒；PNG 供维护者或平台手插图。粘贴版章节层次见 `decorate-publish-headings.mjs`。
