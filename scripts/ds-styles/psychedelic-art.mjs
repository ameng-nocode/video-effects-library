// Psychedelic art: a 60s concert poster. Concentric colour rings swirl and cycle, the bubble lettering warps
// like liquid, and an eye at the centre opens. Rings are drawn from the time.
export default () => ({
  card: `<canvas id="ps" width="864" height="1296"></canvas>
    <svg width="0" height="0" style="position:absolute"><filter id="warp"><feTurbulence id="turb" type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="28"/></filter></svg>
    <div id="word">GROOVE</div><div id="sub">LIVE · FRIDAY · 8 PM</div>`,
  css: `
  #card { background: #1B0B33; }
  #ps { position: absolute; inset: 0; }
  #word { position: absolute; left: 0; right: 0; top: 120px; text-align: center; font-family: "Geist", sans-serif; font-weight: 900; font-size: 190px; letter-spacing: -.02em; color: #FFE14D;
    -webkit-text-stroke: 8px #E0218A; paint-order: stroke fill; filter: url(#warp); transform: scaleY(1.35); }
  #sub { position: absolute; left: 0; right: 0; bottom: 70px; text-align: center; font-family: "Geist", sans-serif; font-weight: 800; font-size: 44px; letter-spacing: .14em; color: #FFE14D; -webkit-text-stroke: 10px #1B0B33; paint-order: stroke fill; }`,
  js: `
  const g = document.getElementById("ps").getContext("2d");
  const COLS = ["#E0218A", "#FF7A1A", "#FFE14D", "#2BD47D", "#20A4F3", "#7B2CF5"];
  const S = { t: 0 };
  const draw = () => { const t = S.t; const cx = 432, cy = 760;
    for (let r = 26; r >= 0; r--) { const rad = r * 44 + ((t * 60) % 44); g.beginPath();
      for (let a = 0; a <= Math.PI * 2 + 0.05; a += 0.05) { const w = 1 + 0.12 * Math.sin(a * 5 + t * 2 + r * 0.4); const x = cx + Math.cos(a) * rad * w, y = cy + Math.sin(a) * rad * w * 1.15; a === 0 ? g.moveTo(x, y) : g.lineTo(x, y); }
      g.fillStyle = COLS[(r + Math.floor(t * 6)) % COLS.length]; g.fill(); }
    // The eye: opens from a line to a full almond, the iris rings keep cycling.
    const open = Math.min(1, Math.max(0, (t - 1.0) / 0.8)); g.fillStyle = "#fff"; g.beginPath(); g.ellipse(cx, cy, 170, 90 * open + 2, 0, 0, Math.PI * 2); g.fill();
    if (open > 0.2) { g.save(); g.beginPath(); g.ellipse(cx, cy, 170, 90 * open, 0, 0, Math.PI * 2); g.clip(); for (let k = 0; k < 5; k++) { g.fillStyle = COLS[(k + Math.floor(t * 8)) % 6]; g.beginPath(); g.arc(cx + Math.sin(t) * 30, cy, 80 - k * 15, 0, Math.PI * 2); g.fill(); } g.restore(); } };
  tl.to(S, { t: 5, duration: 5, ease: "none", onUpdate: draw }, 0); draw();
  tl.fromTo("#word", { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" }, 0.3);
  tl.fromTo("#turb", { attr: { baseFrequency: "0.012 0.02" } }, { attr: { baseFrequency: "0.02 0.035" }, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: 1 }, 0.2);
  tl.fromTo("#sub", { opacity: 0 }, { opacity: 1, duration: 0.5 }, 1.6);`,
});
