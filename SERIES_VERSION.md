# 系列版本约定（公众稿）

> **当前系列版本**：**`v1.3.0`** — 卷一～卷四 **release + 腾讯云已发**（卷四 [2680278](https://cloud.tencent.com/developer/article/2680278) · 2026-06-01）。  
> **详规**：本文件；维护者私仓有同步副本。

---

## 两层版本

| 层 | 示例 | 说明 |
| --- | --- | --- |
| **系列版** | **`v1.3.0`** | 里程碑；README / OUTLINE 表头；Git tag `series-v1.3.0` |
| **卷内版** | 卷一 **`v1.0.0`** · 卷四 **`v1.0.1`** | 单篇文件修订；**不改** 系列版 patch 除非勘误已 release 卷 |

## 规则摘要

- **新卷首发** → 系列 **MINOR +1**（例：卷三 → `v1.1.0`）
- **已发卷勘误 / 粘贴格式** → 系列 **PATCH +1**（例：`v1.0.1`）
- **附册 A–C 首发** → 系列 `v1.4.0`（规划）或 tag `appendix-v1.0.0`

## 当前里程碑 `v1.3.0`

| 卷 | 文件 | 卷内版 |
| --- | --- | --- |
| 卷一 | [`ARTICLE_*_v0.1_zh.md`](./ARTICLE_AI_Coding_可闭环协作_公众稿_v0.1_zh.md) | **v1.0.0** |
| 卷二 | [`ARTICLE_*_vol2_v0.8.2_zh.md`](./ARTICLE_AI_Coding_可闭环协作_公众稿_vol2_v0.8.2_zh.md) | v0.8.2 |
| 卷三 | [`ARTICLE_*_vol3_v1.4.0_zh.md`](./ARTICLE_AI_Coding_可闭环协作_公众稿_vol3_v1.4.0_zh.md) | v1.4.0 |
| 卷四 | [`ARTICLE_*_vol4_v1.0.0_zh.md`](./ARTICLE_AI_Coding_可闭环协作_公众稿_vol4_v1.0.0_zh.md) | **v1.0.1** |

## 附册版本

| 类型 | 建议 |
| --- | --- |
| **附册文件** | `ARTICLE_*_附录_v1.0_zh.md` 或 `appendix/` 目录 |
| **系列 semver** | 附册首次 release → 系列 `v1.4.0` 或独立 tag `appendix-v1.0.0` |

---

## Git tag（维护者）

```bash
git tag -a series-v1.3.0 -m "Series v1.3.0: 卷一 v1.0.0 读者评修订 + 卷四 v1.0.1"
git push origin series-v1.3.0
```

---

## 修订记录

| 日期 | 说明 |
| --- | --- |
| 2026-05-29 | 首版：卷一+卷二发表 → 系列 v1.0.0 |
| 2026-05-30 | 卷三发表 → 系列 v1.1.0 |
| 2026-06-01 | 卷四首发 → 系列 v1.2.0 |
| 2026-06-01 | 卷四 v1.0.1 读者评小改 → 系列 v1.2.1 |
| 2026-06-01 | 卷四腾讯云发表 [2680278](https://cloud.tencent.com/developer/article/2680278) · 系列 v1.3.0 定稿 |
