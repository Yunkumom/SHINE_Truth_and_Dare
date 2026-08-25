#!/usr/bin/env python3
"""Validate Australian species masters and render centered 63:88 review sheets."""

from pathlib import Path
import sys

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent
MASTERS = ROOT / "field-journal-map-v1"
REVIEW = ROOT / "review-v1"
EXPECTED = [
    "01-red-kangaroo.png",
    "02-koala.png",
    "03-platypus.png",
    "04-short-beaked-echidna.png",
    "05-bare-nosed-wombat.png",
    "06-tasmanian-devil.png",
    "07-quokka.png",
    "08-numbat.png",
    "09-southern-cassowary.png",
    "10-emu.png",
    "11-laughing-kookaburra.png",
    "12-sulphur-crested-cockatoo.png",
    "13-green-sea-turtle.png",
    "14-thorny-devil.png",
    "15-southern-corroboree-frog.png",
    "16-golden-wattle.png",
    "17-new-south-wales-waratah.png",
    "18-red-and-green-kangaroo-paw.png",
    "19-grass-tree.png",
    "20-sturts-desert-pea.png",
    "21-ulysses-butterfly.png",
    "22-giant-burrowing-cockroach.png",
    "23-peacock-spider.png",
    "24-christmas-beetle.png",
    "25-australian-emperor-dragonfly.png",
]


def centered_card_crop(image: Image.Image) -> Image.Image:
    target_ratio = 63 / 88
    width, height = image.size
    if width / height < target_ratio:
        crop_height = round(width / target_ratio)
        top = (height - crop_height) // 2
        return image.crop((0, top, width, top + crop_height))
    crop_width = round(height * target_ratio)
    left = (width - crop_width) // 2
    return image.crop((left, 0, left + crop_width, height))


def main() -> int:
    actual = sorted(path.name for path in MASTERS.glob("[0-9][0-9]-*.png"))
    if actual != EXPECTED:
        print("Master inventory mismatch", file=sys.stderr)
        print(f"expected={EXPECTED}", file=sys.stderr)
        print(f"actual={actual}", file=sys.stderr)
        return 1

    cards: list[tuple[str, Image.Image]] = []
    for name in EXPECTED:
        path = MASTERS / name
        with Image.open(path) as image:
            if image.format != "PNG" or image.size != (1024, 1536) or image.mode != "RGB":
                print(
                    f"Invalid master {name}: format={image.format} size={image.size} mode={image.mode}",
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

    print("25/25 masters are 1024 × 1536 RGB PNG")
    print("Rendered 5 centered 63:88 contact sheets")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
