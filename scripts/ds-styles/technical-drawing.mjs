// Technical drawing: one paper plane drawn three ways with no cuts. First a wobbly graphite pencil sketch with
// blue hatching on cream graph paper, then a straight edge wipes it into a clean white-line blueprint, then into
// a cyan wireframe hologram with scan-line fills on black. The plane keeps turning; the camera never moves.
// Everything is drawn on a canvas from the time.
export default () => ({
  card: `<canvas id="td" width="864" height="1296"></canvas>`,
  css: `#card { background: #EDE6D5; } #td { position: absolute; inset: 0; }`,
  js: `
  const g = document.getElementById("td").getContext("2d");
  const W = 864, H = 1296;
  const INKS = [
    { bg: "#EDE6D5", grid: "rgba(27,62,210,.13)", grid5: "rgba(27,62,210,.26)", line: "#16161A", fill: "#1B3ED2", label: "#16161A", word: "SKETCH" },
    { bg: "#1B3ED2", grid: "rgba(255,255,255,.12)", grid5: "rgba(255,255,255,.26)", line: "#FFFFFF", fill: "#FFFFFF", label: "#FFFFFF", word: "PLAN" },
    { bg: "#07080A", grid: "rgba(69,240,221,.10)", grid5: "rgba(69,240,221,.22)", line: "#45F0DD", fill: "#45F0DD", label: "#45F0DD", word: "LIGHT" },
  ];
  // Paper plane: points and the four flat faces it is folded from.
  const PTS = [[0, 0, 3], [-2.3, 0.15, -1.6], [2.3, 0.15, -1.6], [0, 0, -1.6], [0, -0.9, -1.6]];
  const FACES = [[0, 1, 3], [0, 3, 2], [0, 3, 4]];
  const EDGES = [[0, 1], [1, 3], [0, 2], [2, 3], [0, 3], [0, 4], [3, 4]];
  const proj = (p, t) => { const ay = -0.7 + t * 0.55, ax = 0.42 + Math.sin(t * 0.8) * 0.12;
    let [x, y, z] = p; const cy = Math.cos(ay), sy = Math.sin(ay); [x, z] = [x * cy + z * sy, -x * sy + z * cy];
    const cx = Math.cos(ax), sx = Math.sin(ax); [y, z] = [y * cx - z * sx, y * sx + z * cx];
    const k = 9 / (9 - z); return [W / 2 + x * 150 * k, 600 - y * 150 * k, z]; };
  const wob = (x, y, t, i, a) => [x + Math.sin(y * 0.05 + Math.floor(t * 8) + i) * a, y + Math.cos(x * 0.05 + Math.floor(t * 8) * 1.3 + i) * a];
  const grid = (ink) => { g.fillStyle = ink.bg; g.fillRect(0, 0, W, H);
    for (let i = 0, x = 12; x < W; x += 60, i++) { g.fillStyle = i % 5 ? ink.grid : ink.grid5; g.fillRect(x, 0, 1.5, H); }
    for (let i = 0, y = 18; y < H; y += 60, i++) { g.fillStyle = i % 5 ? ink.grid : ink.grid5; g.fillRect(0, y, W, 1.5); } };
  const poly = (pts) => { g.beginPath(); pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.closePath(); };
  const draw = (s, t, reveal) => { const ink = INKS[s]; grid(ink);
    const P = PTS.map((p) => proj(p, t));
    // Fills: hatching on paper, fine hatching on blueprint, scan lines on the hologram.
    FACES.forEach((f, fi) => { const pts = f.map((i) => P[i]); g.save(); poly(pts); g.clip();
      const lit = 0.35 + 0.5 * ((fi + 1) % 3) / 2;
      if (s === 2) { g.fillStyle = ink.fill; for (let y = 0; y < H; y += 8) g.fillRect(0, y, W, 1 + lit * 3); }
      else { g.strokeStyle = ink.fill; g.globalAlpha = s ? 0.5 : 0.75; g.lineWidth = s ? 1.2 : 2;
        const n = Math.floor(70 * Math.min(1, Math.max(0, (reveal - 0.4) / 0.6))); for (let k = 0; k < n; k++) { const o = -900 + k * (s ? 22 : 26) + fi * 7; g.beginPath(); g.moveTo(o, 0); g.lineTo(o + 1296, 1296); g.stroke(); } }
      g.restore(); g.globalAlpha = 1; });
    // Edges: pencil draws in edge by edge and wobbles; blueprint and hologram are clean.
    EDGES.forEach(([a, b], i) => { const p = Math.min(1, Math.max(0, reveal * EDGES.length - i)); if (p <= 0) return;
      const [x1, y1] = P[a], [x2, y2] = [P[a][0] + (P[b][0] - P[a][0]) * p, P[a][1] + (P[b][1] - P[a][1]) * p];
      const hidden = (a === 3 && b === 4) || (a === 0 && b === 4);
      if (s === 0) { for (const [w, al, amp] of [[3, 0.9, 1.2], [1.6, 0.4, 3]]) { g.strokeStyle = ink.line; g.globalAlpha = al; g.lineWidth = w; g.beginPath();
          for (let k = 0; k <= 20; k++) { const q = k / 20; const [x, y] = wob(x1 + (x2 - x1) * q, y1 + (y2 - y1) * q, t, i, amp); k ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); } g.globalAlpha = 1; }
      else { g.setLineDash(hidden ? [10, 8] : []); g.strokeStyle = ink.line; g.lineWidth = hidden ? 2 : (s === 2 ? 5 : 3.5); g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke();
        if (s === 2 && !hidden) { g.strokeStyle = "#fff"; g.lineWidth = 1.5; g.stroke(); } g.setLineDash([]); } });
    // Dimension line on paper and blueprint.
    if (s < 2 && reveal > 0.8) { g.strokeStyle = s ? "#fff" : "#1B3ED2"; g.fillStyle = g.strokeStyle; g.lineWidth = 2; g.beginPath(); g.moveTo(150, 900); g.lineTo(714, 900); g.moveTo(150, 885); g.lineTo(150, 915); g.moveTo(714, 885); g.lineTo(714, 915); g.stroke();
      g.font = "600 24px Geist, sans-serif"; g.textAlign = "center"; g.fillText("460", 432, 890); }
    // Big word in the stage's ink: hatch-filled letters on paper, outline on blueprint, scan lines on the hologram.
    g.save(); g.font = "900 170px Geist, sans-serif"; g.textAlign = "center"; const wy = 1130;
    if (s === 0) { g.strokeStyle = ink.line; g.lineWidth = 3; g.strokeText(ink.word, 432, wy); g.lineWidth = 1.5; g.strokeText(ink.word, 434, wy + 2); }
    else if (s === 1) { g.strokeStyle = "#fff"; g.lineWidth = 4; g.strokeText(ink.word, 432, wy); }
    else { g.fillStyle = ink.fill; g.beginPath(); for (let y = wy - 150; y < wy + 10; y += 8) g.rect(0, y, W, 4); g.clip(); g.fillText(ink.word, 432, wy); }
    g.restore();
    g.font = "700 24px Geist, sans-serif"; g.textAlign = "left"; g.fillStyle = ink.label; g.fillText("FIG. 0" + (s + 1) + "  ·  PLANE", 60, 80);
    g.textAlign = "right"; g.fillText("STEP " + String(Math.min(12, 1 + Math.floor(t * 2.4))).padStart(2, "0") + " / 12", 804, 80); };
  const S = { t: 0 };
  const frame = () => { const t = S.t; const reveal = Math.min(1, t / 1.2);
    // Ink changes travel as a straight edge across the sheet: new ink to its left, old ink to its right.
    const wipes = [[1.7, 0.4], [3.3, 0.4]]; let stage = 0, edge = -1;
    wipes.forEach(([w0, d], i) => { if (t >= w0 + d) stage = i + 1; else if (t >= w0) { stage = i; edge = ((t - w0) / d) * W; } });
    draw(stage, t, reveal);
    if (edge >= 0) { g.save(); g.beginPath(); g.rect(0, 0, edge, H); g.clip(); draw(stage + 1, t, 1); g.restore();
      g.fillStyle = INKS[stage + 1].line; g.fillRect(edge - 2, 0, 4, H); } };
  tl.to(S, { t: 5, duration: 5, ease: "none", onUpdate: frame }, 0); frame();`,
});
