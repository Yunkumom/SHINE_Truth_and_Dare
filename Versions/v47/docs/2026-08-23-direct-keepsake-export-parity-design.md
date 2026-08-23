# Direct Keepsake Export Parity Design

## Approved outcome

Make the downloaded direct-keepsake PNG visually match the card shown during creation, enlarge the blessing area slightly, and preserve the chosen image crop and zoom so the artwork remains in its best user-adjusted position.

## Composition

- Keep the card and PNG at `aspect-ratio: 63 / 88`; retain the existing 1260 × 1760 PNG resolution.
- Use the creation-stage order and styling in both surfaces: artwork title with sparkle, rounded artwork viewport, then rounded blessing panel.
- Use a 76 px blessing row in the 418 px mobile preview and its proportional 230 px counterpart in the PNG.
- Remove the unrelated `TRUTH OR DARE` poster header, subtitle, and duplicated footer title from the direct PNG.
- Use the same focus, offset, zoom, and cover-placement calculation for preview and PNG; crop without stretching.
- Let long custom blessings use up to four smaller lines inside the enlarged panel.

## Privacy and release boundaries

Keep image, blessing, crop, PNG generation, and sharing local to the device; add no storage, analytics, backend, telemetry, or network behavior, and do not promote or deploy v47 for this change.

## 核准結果

讓下載的直接紀念卡 PNG 在視覺上與製作階段顯示的卡片一致，稍微加大祝福區，並保留使用者選定的圖片裁切與縮放，使圖片維持在最合適的位置。

## 構圖

- 卡片與 PNG 保持 `aspect-ratio: 63 / 88`，並保留既有 1260 × 1760 PNG 解析度。
- 兩個介面都採用製作階段的順序與樣式：含星號的圖片標題、圓角圖片視窗、圓角祝福面板。
- 418 px 手機預覽使用 76 px 祝福列，PNG 使用同比例的 230 px 祝福面板。
- 從直接 PNG 移除不相干的 `TRUTH OR DARE` 海報標頭、副標與重複的頁尾圖片名稱。
- 預覽與 PNG 使用相同的焦點、位移、縮放與 cover-placement 計算，只裁切而不拉伸。
- 較長的自訂祝福可在加大的面板中使用最多四行較小文字。

## 隱私與版本邊界

圖片、祝福、裁切、PNG 產生與分享都只留在裝置本機；不得新增 storage、analytics、backend、telemetry 或 network 行為，也不得因本次變更 promotion 或 deploy v47。
