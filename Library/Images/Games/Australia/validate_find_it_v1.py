#!/usr/bin/env python3
"""Validate Australia Find It masters and rebuild review/contact evidence."""

from __future__ import annotations

import hashlib
from pathlib import Path

from PIL import Image, ImageDraw


LIBRARY = Path(__file__).resolve().parents[3]
HIDDEN = LIBRARY / "Images/Species/Australia/field-journal-embedded-map-v2"
DIFFERENCE = LIBRARY / "Images/Games/Australia/find-it-v1/difference"
REVIEW = LIBRARY / "Images/Games/Australia/find-it-v1/review"
MANIFEST = LIBRARY / "Images/Games/Australia/find-it-v1/MANIFEST.sha256"
EXPECTED_SIZE = (1024, 1536)


def numbered_pngs(folder: Path, first: int, last: int) -> list[Path]:
    files = sorted(folder.glob("*.png"))
    expected = list(range(first, last + 1))
    actual = [int(path.name.split("-", 1)[0]) for path in files]
    if actual != expected:
        raise SystemExit(f"Unexpected card sequence in {folder}: {actual}")
    return files


def validate_image(path: Path) -> None:
    with Image.open(path) as image:
        image.load()
        if image.size != EXPECTED_SIZE:
            raise SystemExit(f"Wrong size for {path}: {image.size}")
        if image.mode != "RGB":
            raise SystemExit(f"Wrong mode for {path}: {image.mode}")


def build_contact_sheets(files: list[Path]) -> None:
    REVIEW.mkdir(parents=True, exist_ok=True)
    thumb_size = (256, 384)
    label_height = 28
    gap = 12
    margin = 18
    for page_index in range(5):
        page_files = files[page_index * 5:(page_index + 1) * 5]
        width = margin * 2 + len(page_files) * thumb_size[0] + (len(page_files) - 1) * gap
        height = margin * 2 + label_height + thumb_size[1]
        sheet = Image.new("RGB", (width, height), "#efe3ca")
        draw = ImageDraw.Draw(sheet)
        for column, path in enumerate(page_files):
            x = margin + column * (thumb_size[0] + gap)
            draw.text((x, margin + 7), path.stem, fill="#173f3b")
            with Image.open(path) as source:
                thumbnail = source.convert("RGB")
                thumbnail.thumbnail(thumb_size, Image.Resampling.LANCZOS)
                sheet.paste(thumbnail, (x, margin + label_height))
        sheet.save(REVIEW / f"contact-sheet-{page_index + 1:02d}.jpg", quality=90, optimize=True)


def write_manifest(files: list[Path]) -> None:
    lines = []
    for path in files:
        digest = hashlib.sha256(path.read_bytes()).hexdigest()
        lines.append(f"{digest}  {path.relative_to(LIBRARY)}")
    MANIFEST.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> None:
    hidden = numbered_pngs(HIDDEN, 1, 25)
    difference = numbered_pngs(DIFFERENCE, 26, 50)
    masters = hidden + difference
    for path in masters:
        validate_image(path)
    build_contact_sheets(difference)
    write_manifest(masters)
    print(f"Validated {len(masters)} RGB masters at 1024×1536")
    print(f"Rebuilt 5 review contact sheets in {REVIEW.relative_to(LIBRARY)}")
    print(f"Wrote {len(masters)} SHA-256 entries to {MANIFEST.relative_to(LIBRARY)}")


if __name__ == "__main__":
    main()
