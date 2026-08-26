#!/usr/bin/env python3
"""Validate Yunkumom owner source, transparent derivative, and runtime copy."""

from __future__ import annotations

import hashlib
from pathlib import Path

from PIL import Image


BRAND = Path(__file__).resolve().parent
ROOT = BRAND.parents[2]
SOURCE = BRAND / "yunkumom-owner-source-v1.png"
TRANSPARENT = BRAND / "yunkumom-logo-transparent-v1.png"
RUNTIME = ROOT / "Versions/v47/app/encounter/assets/brand/yunkumom-logo-transparent-v1.png"
REVIEW = BRAND / "review-transparent-on-cream.jpg"
MANIFEST = BRAND / "MANIFEST.sha256"


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main() -> None:
    with Image.open(SOURCE) as source:
        source.load()
        if source.mode != "RGB":
            raise SystemExit(f"Owner source must remain RGB, found {source.mode}")
    with Image.open(TRANSPARENT) as logo:
        logo.load()
        if logo.mode != "RGBA":
            raise SystemExit(f"Transparent derivative must be RGBA, found {logo.mode}")
        alpha = logo.getchannel("A")
        if alpha.getextrema() != (0, 255):
            raise SystemExit(f"Transparent derivative must include clear and opaque pixels, found {alpha.getextrema()}")
        review = Image.new("RGB", logo.size, "#f4e6c9")
        review.paste(logo, mask=alpha)
        review.save(REVIEW, quality=92, optimize=True)
    if TRANSPARENT.read_bytes() != RUNTIME.read_bytes():
        raise SystemExit("Runtime logo is not byte-identical to the Library derivative")
    files = [SOURCE, TRANSPARENT, RUNTIME]
    MANIFEST.write_text("\n".join(f"{digest(path)}  {path.relative_to(ROOT)}" for path in files) + "\n", encoding="utf-8")
    print("Validated owner source, RGBA transparency, and byte-identical runtime derivative")
    print(f"Wrote review composite: {REVIEW.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
