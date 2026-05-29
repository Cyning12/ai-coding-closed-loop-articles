#!/usr/bin/env node
/** 删除正文中的「掘金等若 Mermaid 异常…」配图提醒（妨碍平台粘贴） */
import { readFileSync, writeFileSync } from "fs";
import { globSync } from "fs";

const root = new URL("..", import.meta.url).pathname;
const pattern =
  process.argv[2] ?? "{assets/PUBLISH_*.md,ARTICLE_*_zh.md}";

const re = /\n> 掘金等若 Mermaid 异常[^\n]*\n/g;

for (const file of globSync(pattern, { cwd: root })) {
  const path = `${root}/${file}`;
  const raw = readFileSync(path, "utf8");
  const next = raw.replace(re, "\n");
  if (next !== raw) {
    writeFileSync(path, next, "utf8");
    console.log(`Stripped hints: ${file}`);
  }
}
