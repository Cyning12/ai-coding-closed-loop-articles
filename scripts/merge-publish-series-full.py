#!/usr/bin/env python3
"""合并卷一～五 PUBLISH 粘贴版为单篇全文（assets/）。"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"

VOLUMES = [
    {
        "id": "卷一",
        "file": "PUBLISH_卷一_公众平台粘贴版_zh.md",
        "title": "怎样才算「做完」——给 Agent 结构，给团队过程",
        "release": "v1.0.1",
        "tencent": "https://cloud.tencent.com/developer/article/2675471",
    },
    {
        "id": "卷二",
        "file": "PUBLISH_卷二_公众平台粘贴版_zh.md",
        "title": "技术图谱——让 Agent 先看地图再动手",
        "release": "v1.0.0",
        "tencent": "https://cloud.tencent.com/developer/article/2676250",
    },
    {
        "id": "卷三",
        "file": "PUBLISH_卷三_公众平台粘贴版_zh.md",
        "title": "Harness 与 SDD——让改动可签收、可合并",
        "release": "v1.4.0",
        "tencent": "https://cloud.tencent.com/developer/article/2678669",
    },
    {
        "id": "卷四",
        "file": "PUBLISH_卷四_公众平台粘贴版_zh.md",
        "title": "闭环交付与经验沉淀——从 SPEC 到跨轮回顾摘要",
        "release": "v1.1.0",
        "tencent": "https://cloud.tencent.com/developer/article/2680278",
    },
    {
        "id": "卷五",
        "file": "PUBLISH_卷五_公众平台粘贴版_zh.md",
        "title": "存量项目怎么落地——案例、误区与渐进路线",
        "release": "v1.0.1",
        "tencent": "https://cloud.tencent.com/developer/article/2681115",
    },
]

OUT = ASSETS / "PUBLISH_系列全五卷合并_公众平台粘贴版_v1.0.1_zh.md"
MAP = ROOT / "mermaid-image-map.json"

LICENSE = (
    "\n---\n\n"
    "*许可：CC BY 4.0 · 署名可转载与改编 · "
    "系列文稿：[ai-coding-closed-loop-articles]"
    "(https://github.com/Cyning12/ai-coding-closed-loop-articles)*\n"
)

SECTION_START = re.compile(
    r"^> ## \*\*(?:摘要|0\.|1\.|2\.|3\.|4\.|5\.|6\.|7\.|8\.|9\.|1[0-9]\.|2[0-9]\.)"
)


def strip_license(text: str) -> str:
    idx = text.find("*许可：CC BY")
    if idx >= 0:
        text = text[:idx]
    return text.rstrip()


def build_figure_index() -> str:
    import json

    if not MAP.is_file():
        return ""
    data = json.loads(MAP.read_text(encoding="utf-8"))
    rows = ["| 图 | 节 | 说明 |", "| --- | --- | --- |"]
    for d in data.get("diagrams", []):
        secs = " · ".join(d.get("sections", []))
        rows.append(f"| `{d['id']}` | {secs} | 见 `assets/figures/` 对应 PNG |")
    return "\n".join(rows)


def annotate_mermaid(text: str) -> str:
    """在 ```mermaid 前插入 HTML 注释，便于平台检索（P1）。"""
    lines = text.splitlines()
    out: list[str] = []
    n = 0
    for i, line in enumerate(lines):
        if line.strip() == "```mermaid":
            n += 1
            # 向上找最近节标题
            hint = f"流程图 #{n}"
            for j in range(i - 1, max(i - 12, -1), -1):
                prev = lines[j].strip()
                if prev.startswith("> ## **") or prev.startswith("> ### **"):
                    hint = prev.replace("> ## **", "").replace("> ### **", "").strip("* ")
                    break
                if prev.startswith("### "):
                    hint = prev.lstrip("# ").strip()
                    break
            out.append(f"<!-- 图 {n}：{hint} -->")
        out.append(line)
    return "\n".join(out)


def extract_body(text: str) -> str:
    text = strip_license(text)
    lines = text.splitlines()
    start = 0
    for i, line in enumerate(lines):
        if SECTION_START.match(line):
            start = i
            break
    return "\n".join(lines[start:]).strip()


def extract_toc(text: str) -> list[str]:
    """提取单卷目录表行（> ## **目录** 与下一 --- 之间）。"""
    lines = text.splitlines()
    rows: list[str] = []
    in_toc = False
    for line in lines:
        if "> ## **目录**" in line:
            in_toc = True
            continue
        if in_toc:
            if line.strip() == "---":
                break
            if line.startswith("|") and "---" not in line and "节" not in line:
                rows.append(line)
    return rows


def main() -> None:
    parts: list[str] = []
    master_toc_rows = ["| 卷 | 节 | 标题 |", "| --- | --- | --- |"]

    header = """# AI 编程可闭环协作 · 全五卷合并版（公众平台粘贴版）

> **2026-06-02** · 系列合并 **v1.0.1** · 卷一～卷五定稿合并（**不替代** 单卷发表稿；含全书测评 P0/P1 修订）  
> **系列文稿**：[github.com/Cyning12/ai-coding-closed-loop-articles](https://github.com/Cyning12/ai-coding-closed-loop-articles)  
> **单卷发表**：卷一 [2675471](https://cloud.tencent.com/developer/article/2675471) · 卷二 [2676250](https://cloud.tencent.com/developer/article/2676250) · 卷三 [2678669](https://cloud.tencent.com/developer/article/2678669) · 卷四 [2680278](https://cloud.tencent.com/developer/article/2680278) · 卷五 [2681115](https://cloud.tencent.com/developer/article/2681115)

> **阅读建议**：全书约五篇连载之和；新项目从卷一 §6 起步，存量项目可直接跳卷五 §25 阶段 0（仍建议先 skim 卷一～三要点）。

---

> ## **全书目录（卷一～卷五）**

"""
    parts.append(header)

    for vol in VOLUMES:
        path = ASSETS / vol["file"]
        raw = path.read_text(encoding="utf-8")
        for row in extract_toc(raw):
            cells = [c.strip() for c in row.split("|") if c.strip()]
            if len(cells) >= 2:
                master_toc_rows.append(f"| **{vol['id']}** | {cells[0]} | {cells[-1]} |")

    parts.append("\n".join(master_toc_rows))
    fig_idx = build_figure_index()
    if fig_idx:
        parts.append("\n\n> ## **配图索引（Mermaid · 备档 PNG 见 `assets/figures/`）**\n\n")
        parts.append(fig_idx)
    parts.append("\n\n---\n")

    for vol in VOLUMES:
        path = ASSETS / vol["file"]
        raw = path.read_text(encoding="utf-8")
        body = extract_body(raw)
        divider = f"""
---

> # **{vol['id']} · {vol['title']}**

> release **{vol['release']}** · {vol['tencent']}

---
"""
        parts.append(divider)
        parts.append(annotate_mermaid(body))

    parts.append(LICENSE)
    OUT.write_text("\n".join(parts) + "\n", encoding="utf-8")
    line_count = OUT.read_text(encoding="utf-8").count("\n") + 1
    print(f"Wrote {OUT.name} ({line_count} lines)")


if __name__ == "__main__":
    main()
