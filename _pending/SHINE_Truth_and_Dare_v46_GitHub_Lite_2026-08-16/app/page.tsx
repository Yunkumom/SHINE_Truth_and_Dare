export default function Home() {
  return (
    <main className="entry-page">
      <section className="entry-card" aria-labelledby="entry-title">
        <div className="entry-mark" aria-hidden="true">✦</div>
        <p className="entry-kicker">ENCOUNTER CARDS · V40</p>
        <h1 id="entry-title">選擇使用方式</h1>
        <p className="entry-lead">手機直接使用，電腦則以工作室模式編輯並模擬手機畫面。</p>
        <div className="entry-actions">
          <a className="entry-button entry-button-primary" href="/mobile">
            <span>手機版</span>
            <small>Mobile Experience</small>
          </a>
          <a className="entry-button" href="/studio">
            <span>電腦工作室</span>
            <small>Desktop Studio</small>
          </a>
        </div>
      </section>
    </main>
  );
}
