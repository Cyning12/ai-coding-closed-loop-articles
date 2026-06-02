# 系列版本约定（公众稿）

> **当前系列版本**：**`v1.5.0`** — 文件名与卷内版号统一（**semver ≥ v1.0.0** · 2026-06-02）。

---

## 文件命名（强制）

```text
ARTICLE_AI_Coding_可闭环协作_公众稿_vol{N}_v{MAJOR.MINOR.PATCH}_zh.md
ARTICLE_AI_Coding_可闭环协作_方法论地图_v{MAJOR.MINOR.PATCH}_zh.md
ARTICLE_AI_Coding_可闭环协作_公众稿_OUTLINE_v{MAJOR.MINOR.PATCH}_zh.md
assets/PUBLISH_卷{N}_公众平台粘贴版_v{MAJOR.MINOR.PATCH}_zh.md
```

- **卷号** 写入文件名（`vol1`～`vol5`），不再使用历史 `v0.1_zh` 等路径。  
- **卷内版号** = 文件名中的 semver，与文首元信息表一致。  
- **曾用文件名**（仅作迁移对照）：`v0.1_zh` → `vol1_v1.0.1`；`vol2_v0.8.2` → `vol2_v1.0.0`；`vol4_v1.0.0` → `vol4_v1.1.0`。

---

## 两层版本

| 层 | 示例 | 说明 |
| --- | --- | --- |
| **系列版** | **`v1.5.0`** | 里程碑；README / OUTLINE；Git tag `series-v1.5.0` |
| **卷内版** | 卷一 **v1.0.1** · 卷四 **v1.1.0** | 单篇修订；改文件名 semver 时同步文首表 |

## 规则摘要

- **新卷首发** → 系列 **MINOR +1**
- **已发卷勘误** → 系列 **PATCH +1** + 卷内 PATCH +1（必要时重命名 `ARTICLE` / `PUBLISH`）

---

## 当前里程碑 `v1.5.0`

| 篇别 | 文件 | 卷内版 |
| --- | --- | --- |
| 总目录 | [`ARTICLE_*_OUTLINE_v1.0.0_zh.md`](./ARTICLE_AI_Coding_可闭环协作_公众稿_OUTLINE_v1.0.0_zh.md) | v1.0.0 |
| 方法论地图 | [`ARTICLE_*_方法论地图_v1.0.0_zh.md`](./ARTICLE_AI_Coding_可闭环协作_方法论地图_v1.0.0_zh.md) | v1.0.0 |
| 卷一 | [`ARTICLE_*_vol1_v1.0.1_zh.md`](./ARTICLE_AI_Coding_可闭环协作_公众稿_vol1_v1.0.1_zh.md) | v1.0.1 |
| 卷二 | [`ARTICLE_*_vol2_v1.0.0_zh.md`](./ARTICLE_AI_Coding_可闭环协作_公众稿_vol2_v1.0.0_zh.md) | v1.0.0 |
| 卷三 | [`ARTICLE_*_vol3_v1.4.0_zh.md`](./ARTICLE_AI_Coding_可闭环协作_公众稿_vol3_v1.4.0_zh.md) | v1.4.0 |
| 卷四 | [`ARTICLE_*_vol4_v1.1.0_zh.md`](./ARTICLE_AI_Coding_可闭环协作_公众稿_vol4_v1.1.0_zh.md) | v1.1.0 |
| 卷五 | [`ARTICLE_*_vol5_v1.0.0_zh.md`](./ARTICLE_AI_Coding_可闭环协作_公众稿_vol5_v1.0.0_zh.md) | v1.0.0 |

---

## 修订记录

| 日期 | 系列版 | 说明 |
| --- | --- | --- |
| 2026-05-29 | v1.0.0 | 卷一 + 卷二发表 |
| 2026-05-30 | v1.1.0 | 卷三 |
| 2026-06-01 | v1.2.x～v1.3.0 | 卷四 |
| 2026-06-02 | v1.4.0 | 卷五 · 五卷腾讯云齐 |
| 2026-06-02 | v1.4.0 | 方法论地图 v1.0.0 |
| 2026-06-02 | **v1.5.0** | **文件名统一 volN + semver ≥ v1.0.0**；README v2 |
