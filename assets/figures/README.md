# figures · Mermaid 配图（按节位命名）

由 [`mermaid-image-map.json`](../../mermaid-image-map.json) + [`scripts/publish-final.mjs`](../../scripts/publish-final.mjs) 导出。

**命名**：`{卷}_{节号}_{简述}.png`，例如 `卷四_17.3_专题交付流水线.png`（对应 `sections` 首项 + `id`）。

| 文件 | 位置 |
| --- | --- |
| `卷一_2.1_多模块API.png` | 卷一 §2.1 / 卷二 §8.0 |
| `卷一_2.2_阶段骨架.png` | 卷一 §2.2 |
| `卷一_7_总结.png` | 卷一 §7 |
| `卷二_9.4_读图决策.png` | 卷二 §9.4 |
| `卷三_12.8_可追责三问.png` | 卷三 §12.8 |
| `卷三_12.9_可追责包.png` | 卷三 §12.9 |
| `卷三_13.2_SDD阶段流.png` | 卷三 §13.2 |
| `卷三_13.7_关账温层.png` | 卷三 §13.7 |
| `卷三_14.7_一任务一PR.png` | 卷三 §14.7 |
| `卷三_14.8_冷温热层.png` | 卷三 §14.8 |
| `卷三_16_卷三结语.png` | 卷三 §16 |
| `卷四_17.3_专题交付流水线.png` | 卷四 §17.3 |

**重导出**（仓库根目录；需本机 Chrome）：

```bash
node scripts/publish-final.mjs
```

封面图仍在 [`../../images/`](../images/)（`prompts/figures/` 提示词生成）。
