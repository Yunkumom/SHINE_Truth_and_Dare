#!/usr/bin/env python3
"""Validate embedded-map V2 masters and render centered 63:88 review sheets."""

from pathlib import Path
import sys

from PIL import Image, ImageDraw, ImageFont

from validate_masters import EXPECTED, centered_card_crop


ROOT = Path(__file__).resolve().parent
MASTERS = ROOT / "field-journal-embedded-map-v2"
REVIEW = ROOT / "review-embedded-map-v2"


def main() -> int:
    actual = sorted(path.name for path in MASTERS.glob("[0-9][0-9]-*.png"))
    if actual != EXPECTED:
        print("V2 master inventory mismatch", file=sys.stderr)
        print(f"expected={EXPECTED}", file=sys.stderr)
        print(f"actual={actual}", file=sys.stderr)
        return 1

    cards: list[tuple[str, Image.Image]] = []
    for name in EXPECTED:
        path = MASTERS / name
        with Image.open(path) as image:
            if image.format != "PNG" or image.size != (1024, 1536) or image.mode != "RGB":
                print(
                    f"Invalid V2 master {name}: format={image.format} size={image.size} mode={image.mode}",
                    file=sys.stderr,
                )
                return 1
            cards.append((name, centered_card_crop(image).copy()))

    REVIEW.mkdir(parents=True, exist_ok=True)
    font = ImageFont.load_default(size=18)
    thumb_size = (252, 352)
    margin = 22
    label_height = 52
    for sheet_index in range(5):
        subset = cards[sheet_index * 5 : sheet_index * 5 + 5]
        sheet = Image.new(
            "RGB",
            (margin + 5 * (thumb_size[0] + margin), 2 * margin + thumb_size[1] + label_height),
            "#ede4d1",
        )
        draw = ImageDraw.Draw(sheet)
        for column, (name, crop) in enumerate(subset):
            thumb = crop.resize(thumb_size, Image.Resampling.LANCZOS)
            x = margin + column * (thumb_size[0] + margin)
            y = margin
            sheet.paste(thumb, (x, y))
            draw.rectangle((x, y, x + thumb_size[0] - 1, y + thumb_size[1] - 1), outline="#3f4a45", width=2)
            draw.text((x, y + thumb_size[1] + 10), name.removesuffix(".png"), fill="#202522", font=font)
        sheet.save(REVIEW / f"contact-sheet-{sheet_index + 1:02}.png")

    print("25/25 embedded-map V2 masters are 1024 × 1536 RGB PNG")
    print("Rendered 5 centered 63:88 V2 contact sheets")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
