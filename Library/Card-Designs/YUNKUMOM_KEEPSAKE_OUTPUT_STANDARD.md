# Yunkumom Keepsake Output Standard / Yunkumom 紀念禮物輸出規範

> Every game image starts with a keepsake purpose. Every completed game should be able to become a gift.
>
> 每張遊戲圖片從設計起就具有紀念用途；每一局遊戲完成後都應能成為一份禮物。

## One image, many uses / 一張圖片，多種用途

Every governed game master must be suitable for the live game, a keepsake front, an electronic postcard front, a shareable image, and a future print-safe derivative without redrawing the authored scene in HTML, CSS, canvas, or SVG. Runtime files may optimize the master but must preserve Library provenance.

每張受治理遊戲 master 都必須能用於遊戲畫面、紀念卡正面、電子明信片正面、可分享圖片與未來可列印衍生檔；HTML、CSS、canvas 或 SVG 不得重畫原始場景。Runtime 檔可以最佳化 master，但必須保留 Library 來源追溯。

## Electronic postcard / 電子明信片

- Front: the complete authored artwork, its bilingual memory title, and a restrained Yunkumom signature.
- Back: postcard division, recipient line, personal message area, sender line, and Yunkumom provenance.
- Export: separate 1800 × 1200 PNG front and back files so both sides can be shared or downloaded together.
- The logo must use `Library/Brand/Yunkumom/yunkumom-logo-transparent-v1.png` or a byte-identical runtime derivative.
- Text entered for a recipient, sender, or message is memory-only: no persistence, analytics, account, telemetry, or backend transmission.

- 正面：完整的原始圖片、雙語回憶標題與克制的 Yunkumom 簽名。
- 背面：明信片分隔線、收件人欄、留言區、寄件人欄與 Yunkumom 來源標記。
- 輸出：正面與背面各一張 1800 × 1200 PNG，可一起分享或下載。
- 商標只能使用 `Library/Brand/Yunkumom/yunkumom-logo-transparent-v1.png` 或逐位元相同的 runtime 副本。
- 收件人、寄件人與留言文字只存在記憶體，不持久保存、不分析、不建立帳號、不加入 telemetry，也不傳送到 backend。

## Composition-safe image rules / 可組合圖片規則

1. Protect the principal subject and puzzle information from edge crops.
2. Retain enough environmental bleed for 63:88 cards, 3:2 postcards, and square social crops.
3. Keep at least one quiet area where a title or blessing can sit outside the artwork.
4. Do not bake the Yunkumom logo into governed artwork masters; add it only while composing an output so one master remains reusable.
5. Keep a canonical bilingual title and a short gift-safe memory line beside every collection.

1. 主體與遊戲資訊不得落在容易被裁掉的邊緣。
2. 保留足夠環境出血，以支援 63:88 卡片、3:2 明信片與正方形社群裁切。
3. 至少保留一處能在圖片外安排標題或祝福的安靜區域。
4. 不把 Yunkumom 商標烙進受治理 master；只在輸出組合時加入，讓同一張 master 可持續重用。
5. 每個圖庫都要有標準雙語標題與適合送人的簡短回憶句。
