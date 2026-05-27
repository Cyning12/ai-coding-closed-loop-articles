# 从私仓同步到本仓 · 发前勾选

> 源：`../ai_coding_governance/narrative/` · 目标：本仓库根目录。

- [ ] 复制 `ARTICLE_…_v0.1_zh.md`、`ARTICLE_…_OUTLINE_v1_zh.md`、`assets/`（若有更新）
- [ ] **删除或勿复制** `draft_*`、`reviews/`、`GUIDE_*`、`技术叙事素材_*`
- [ ] 卷一元信息表：去掉 **续稿**、**续卷指引**、**发前测评** 行
- [ ] OUTLINE 表：去掉 **续稿** 链到私仓 draft 的行（可改为一行「续稿在私有治理仓」）
- [ ] 文内链：确认无 `reviews/`、`GUIDE_`、私仓绝对路径
- [ ] 生成/更新 `assets/PUBLISH_卷一_公众平台粘贴版_v0.1.10_zh.md`（无内部链、无修订记录）
- [ ] 掘金等平台：用 `assets/PUBLISH_*` 粘贴，或再删 HTML 注释（粘贴版已不含）
- [ ] `git commit` + `git push` 本仓
