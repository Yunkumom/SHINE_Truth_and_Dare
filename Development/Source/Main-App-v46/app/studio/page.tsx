import Link from "next/link";

export default function DesktopStudio() {
  return (
    <main className="studio-page">
      <input className="device-radio" type="radio" name="device" id="device-standard" />
      <input className="device-radio" type="radio" name="device" id="device-max" defaultChecked />

      <aside className="studio-sidebar">
        <div>
          <Link className="studio-brand" href="/">
            <span aria-hidden="true">✦</span>
            <span>相遇卡<small>DESKTOP STUDIO · V46</small></span>
          </Link>
          <h1>電腦工作室</h1>
          <p>直接在右側手機畫面操作。進入設定後，可選卡片、問題、調整照片位置與大小。</p>
        </div>

        <section className="studio-panel" aria-labelledby="device-title">
          <h2 id="device-title">模擬手機尺寸</h2>
          <div className="studio-segmented">
            <label htmlFor="device-standard">標準手機</label>
            <label htmlFor="device-max">大尺寸手機</label>
          </div>
          <p className="studio-dimensions studio-dimensions-standard">390 × 844px</p>
          <p className="studio-dimensions studio-dimensions-max">440 × 956px</p>
        </section>

        <section className="studio-panel studio-help" aria-labelledby="edit-title">
          <h2 id="edit-title">如何修改</h2>
          <ol>
            <li>在手機預覽右上角開啟選單。</li>
            <li>設定指定圖片、問題或卡片內容。</li>
            <li>抽卡後可調整照片，儲存後立即回到卡片確認。</li>
          </ol>
        </section>

        <div className="studio-actions">
          <Link className="studio-reload" href="/studio">重新整理預覽</Link>
          <Link href="/mobile">開啟手機版</Link>
        </div>
      </aside>

      <section className="studio-canvas" aria-label="手機即時預覽">
        <div className="studio-toolbar">
          <div>
            <strong>手機即時預覽</strong>
            <span>所有操作都在這個真實比例畫面中完成</span>
          </div>
          <span className="studio-live"><i /> LIVE</span>
        </div>
        <div className="phone-device">
          <div className="phone-speaker" aria-hidden="true" />
          <iframe
            title="相遇卡手機模擬畫面 · Encounter Cards Phone Preview"
            src="/v46/index.html?surface=studio"
            allow="clipboard-write"
          />
        </div>
        <p className="studio-note">預覽保持手機比例，不會因電腦螢幕寬度而拉伸。</p>
      </section>
    </main>
  );
}
