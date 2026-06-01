# 从私仓同步到本仓 · 发前勾选

> 源：`../ai_coding_governance/narrative/` · 目标：本仓库根目录。

- [ ] 复制 `ARTICLE_…_v0.1_zh.md`、`ARTICLE_…_vol2_v0.8.2_zh.md`、`ARTICLE_…_OUTLINE_v1_zh.md`、`assets/PUBLISH_*`（若有更新）
- [ ] **删除或勿复制** `draft_*`、`reviews/`、`GUIDE_*`、`prompts/`、`技术叙事素材_*`
- [ ] 卷一元信息表：去掉 **续稿**、**续卷指引**、**发前测评** 行
- [ ] OUTLINE 表：去掉 **续稿** 链到私仓 draft 的行（可改为一行「续稿在私有治理仓」）
- [ ] 文内链：确认无 `reviews/`、`GUIDE_`、私仓绝对路径
- [ ] 生成/更新 `assets/PUBLISH_*`（无内部链、无修订记录）
- [ ] **`node scripts/publish-final.mjs`**（导出 `assets/figures/{卷}_{节}_{简述}.png`；新图先改 `mermaid-image-map.json`）
- [ ] **`node scripts/decorate-publish-headings.mjs assets/PUBLISH_*`**（章节引用块加粗；顺带删配图提醒）
- [ ] 掘金等平台：用 `assets/PUBLISH_*` 粘贴，或再删 HTML 注释（粘贴版已不含）
- [ ] `git commit` + `git push` 本仓
