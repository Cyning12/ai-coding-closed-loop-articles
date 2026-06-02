#!/usr/bin/env python3
"""为 assets/PUBLISH_卷* 粘贴版在 mermaid 代码块前插入 HTML 注释（P1）。"""
from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"

_spec = importlib.util.spec_from_file_location(
    "merge_publish",
    ROOT / "scripts" / "merge-publish-series-full.py",
)
_mod = importlib.util.module_from_spec(_spec)
assert _spec.loader
_spec.loader.exec_module(_mod)
annotate_mermaid = _mod.annotate_mermaid


def main() -> None:
    for path in sorted(ASSETS.glob("PUBLISH_卷*_公众平台粘贴版_*.md")):
        raw = path.read_text(encoding="utf-8")
        if "<!-- 图 " in raw and raw.count("```mermaid") == raw.count("<!-- 图 "):
            print(f"skip (already annotated): {path.name}")
            continue
        # 去掉旧注释后重注，避免重复
        lines = raw.splitlines()
        cleaned: list[str] = []
        for line in lines:
            if line.strip().startswith("<!-- 图 ") and line.strip().endswith("-->"):
                continue
            cleaned.append(line)
        new = annotate_mermaid("\n".join(cleaned))
        path.write_text(new + ("\n" if not new.endswith("\n") else ""), encoding="utf-8")
        n = new.count("```mermaid")
        print(f"annotated {path.name}: {n} mermaid block(s)")


if __name__ == "__main__":
    main()
