// Op art: black and white stripes that seem to bulge. A hidden sphere pushes through the stripes and travels
// across the page, and a checker ring spins so the eye sees motion that is not there. Drawn from the time.
export default () => ({
  card: `<canvas id="op" width="864" height="1296"></canvas>`,
  css: `#card { background: #fff; } #op { position: absolute; inset: 0; }`,
  js: `
  const g = document.getElementById("op").getContext("2d");
  const S = { t: 0 };
  const draw = () => { const t = S.t; g.fillStyle = "#fff"; g.fillRect(0, 0, 864, 1296); g.fillStyle = "#111";
    const appear = Math.min(1, t / 0.8);
    // Bulge centre moves on a slow loop; stripes bend around it like a lens.
    const cx = 432 + Math.sin(t * 0.9) * 200, cy = 640 + Math.cos(t * 0.7) * 260, R = 300;
    const ROWS = 60, h = 1296 / ROWS;
    for (let r = 0; r < ROWS; r++) { if (r % 2) continue; g.beginPath();
      for (let x = 0; x <= 864; x += 8) { const y0 = r * h; const dx = x - cx, dy = y0 - cy, d = Math.hypot(dx, dy);
        const k = d < R ? Math.sin((1 - d / R) * Math.PI / 2) * 0.55 * appear : 0; const y = y0 + dy * k; x === 0 ? g.moveTo(x, y) : g.lineTo(x, y); }
      for (let x = 864; x >= 0; x -= 8) { const y0 = r * h + h; const dx = x - cx, dy = y0 - cy, d = Math.hypot(dx, dy);
        const k = d < R ? Math.sin((1 - d / R) * Math.PI / 2) * 0.55 * appear : 0; g.lineTo(x, y0 + dy * k); }
      g.closePath(); g.fill(); }
    // Spinning checker ring in the lower corner.
    const rx = 690, ry = 1110, seg = 24; for (let i = 0; i < seg; i++) { const a0 = (i / seg) * Math.PI * 2 + t * 1.2, a1 = a0 + Math.PI * 2 / seg;
      for (let j = 0; j < 3; j++) { g.fillStyle = (i + j) % 2 ? "#111" : "#fff"; g.beginPath(); g.arc(rx, ry, 140 - j * 34, a0, a1); g.arc(rx, ry, 106 - j * 34, a1, a0, true); g.closePath(); g.fill(); } }
    g.globalAlpha = Math.min(1, Math.max(0, (t - 0.4) * 2)); g.fillStyle = "#fff"; g.fillRect(36, 40, 330, 120); g.fillStyle = "#111"; g.font = "900 96px Geist, sans-serif"; g.fillText("LOOK", 56, 136); g.globalAlpha = 1; };
  tl.to(S, { t: 5, duration: 5, ease: "none", onUpdate: draw }, 0); draw();`,
});
