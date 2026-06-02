# 平台发帖配置

## 默认平台

系列公众稿 **优先** 发布到 [腾讯云开发者社区](https://cloud.tencent.com/developer)。

发帖流程：复制 `assets/PUBLISH_*` → 编辑器粘贴 → Mermaid 块换 COS 图（见下文）。

## 配置文件

| 文件 | 用途 |
| --- | --- |
| `tencent-config.example.json` | 卷一 URL 等示例（可提交 Git） |
| `tencent-config.local.json` | 本地覆盖（**已 gitignore**） |

发帖前可选：

```bash
cp platform/tencent-config.example.json platform/tencent-config.local.json
node scripts/decorate-publish-headings.mjs --inject-vol1-link assets/PUBLISH_卷N_*.md
```

## 勿提交

- 带 `q-sign` / `x-cos-security-token` 的 COS 图片 URL
- 已替换 Mermaid 为 COS 链的 `PUBLISH_*` 副本（仅编辑器本地使用）

仓库 `assets/PUBLISH_*` 真值：**保留 Mermaid** + 无 COS 链。
