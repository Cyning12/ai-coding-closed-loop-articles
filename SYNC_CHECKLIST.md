# 公众稿发前勾选

> 本仓 **唯一真源**：定稿在 `ARTICLE_*` 与 `assets/PUBLISH_*`。

- [ ] 文首元信息：`状态` = `release`；无 draft / 测评 / 续稿内部链
- [ ] 文件名符合 [`SERIES_VERSION.md`](./SERIES_VERSION.md)（`volN` + semver ≥ v1.0.0）
- [ ] 文内相对链指向当前 `ARTICLE_*` 路径
- [ ] `assets/PUBLISH_*` 无修订记录、无私仓路径
- [ ] `node scripts/publish-final.mjs`（有 Mermaid 时）
- [ ] `node scripts/decorate-publish-headings.mjs assets/PUBLISH_*.md`
- [ ] 合并版：`python3 scripts/merge-publish-series-full.py`
- [ ] 文末 **CC BY 4.0** 许可行
- [ ] `README.md` / `OUTLINE` / `SERIES_VERSION` 表与文件名一致
- [ ] `git commit` + `git push`

腾讯云发帖：用 decorate 后的 `PUBLISH_*`；Mermaid 换 COS 图后 **勿** 把带签名 URL commit 回仓（见 [`platform/README.md`](./platform/README.md)）。
