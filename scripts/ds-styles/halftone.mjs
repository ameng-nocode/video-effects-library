// Halftone: a portrait of a person made only of printed dots. The dots grow in as a wave, then a light
// slides across the face so the dot sizes ripple. Drawn on a canvas from the time.
export default () => ({
  card: `<canvas id="ht" width="864" height="1296"></canvas><div id="word">LOOK</div>`,
  css: `
  #card { background: #FFD43B; }
  #ht { position: absolute; inset: 0; }
  #word { position: absolute; left: 56px; top: 56px; font-family: "Geist", sans-serif; font-weight: 900; font-size: 150px; letter-spacing: -.04em; color: #1B2A8C; }`,
  js: `
  const cv = document.getElementById("ht"), g = cv.getContext("2d");
  const STEP = 24;
  // How dark each spot is: the person (head, neck, shoulders) is dark, lit from a moving light.
  const inEll = (x, y, cx, cy, rx, ry) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1;
  const person = (x, y) => inEll(x, y, 432, 600, 175, 220) || (x > 372 && x < 492 && y > 760 && y < 900) || inEll(x, y, 432, 1250, 380, 360);
  const S = { t: 0 };
  const draw = () => { const t = S.t; g.clearRect(0, 0, 864, 1296); g.fillStyle = "#1B2A8C";
    const lx = 140 + 600 * Math.min(1, Math.max(0, (t - 1.8) / 2.6)), ly = 420;
    for (let y = STEP / 2; y < 1296; y += STEP) for (let x = (Math.floor(y / STEP) % 2 ? STEP / 2 : 0) + STEP / 2; x < 864; x += STEP) {
      let d = person(x, y) ? 0.42 + 0.55 * Math.min(1, Math.hypot(x - lx, y - ly) / 520) : 0.06 + 0.16 * (y / 1296);
      const grow = Math.min(1, Math.max(0, (t * 900 - x * 0.6 - y * 0.35) / 260));
      const r = (STEP / 2) * 1.05 * Math.sqrt(d) * grow;
      if (r > 0.4) { g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill(); } } };
  tl.to(S, { t: 5, duration: 5, ease: "none", onUpdate: draw }, 0);
  draw();
  tl.fromTo("#word", { x: -500 }, { x: 0, duration: 0.6, ease: "power4.out" }, 1.4);`,
});
