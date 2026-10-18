// Cyberpunk: a rainy neon street at night. Tall dark buildings, magenta and cyan signs flicker on, their glow
// reflects in the wet ground, rain falls, and a hooded figure walks through the light. Rain is drawn from the time.
export default () => {
  const signs = [["s1", 70, 220, "OPEN 24H", "#FF2E97"], ["s2", 520, 300, "NOODLE", "#22E4FF"], ["s3", 600, 560, "HOTEL", "#FF2E97"], ["s4", 90, 600, "CYBER", "#B26BFF"]];
  return {
    card: `<svg viewBox="0 0 864 1296" width="100%" height="100%" style="display:block;position:absolute;inset:0">
        <defs><linearGradient id="nsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0A0618"/><stop offset="1" stop-color="#2A0F3A"/></linearGradient>
          <linearGradient id="wet" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1A0F2A"/><stop offset="1" stop-color="#05030A"/></linearGradient></defs>
        <rect width="864" height="1296" fill="url(#nsky)"/>
        <g fill="#120A20">${[[0, 120, 260, 900], [230, 0, 200, 1000], [420, 80, 180, 920], [580, 160, 290, 840]].map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`).join("")}</g>
        <g fill="#2B1E44">${Array.from({ length: 40 }, (_, i) => `<rect class="bw" x="${20 + ((i * 113) % 820)}" y="${60 + ((i * 71) % 800)}" width="12" height="18"/>`).join("")}</g>
        <rect y="1000" width="864" height="296" fill="url(#wet)"/>
      </svg>
      <div id="refl"></div>
      ${signs.map(([id, x, y, txt, c]) => `<div class="sign" id="${id}" style="left:${x}px;top:${y}px;--c:${c}">${txt}</div>`).join("")}
      <svg id="fig" viewBox="0 0 120 300" width="120" height="300"><path d="M60,10 C90,10 100,40 96,70 C110,90 112,150 104,200 L96,290 L74,290 L66,210 L54,210 L46,290 L24,290 L16,200 C8,150 10,90 24,70 C20,40 30,10 60,10 Z" fill="#05030A"/><path d="M40,60 C50,52 70,52 80,60" stroke="#22E4FF" stroke-width="4" fill="none"/></svg>
      <canvas id="rain" width="864" height="1296"></canvas>`,
    css: `
  #card { background: #0A0618; }
  .sign { position: absolute; padding: 10px 22px; border: 4px solid var(--c); border-radius: 10px; font-family: "Geist", sans-serif; font-weight: 800; font-size: 48px; letter-spacing: .1em; color: #fff;
    text-shadow: 0 0 10px var(--c), 0 0 26px var(--c); box-shadow: 0 0 22px var(--c), inset 0 0 18px var(--c); }
  #refl { position: absolute; left: 0; right: 0; top: 1000px; bottom: 0; background: linear-gradient(90deg, rgba(255,46,151,.35), rgba(34,228,255,.25) 50%, rgba(255,46,151,.3)); filter: blur(20px); mix-blend-mode: screen; }
  #fig { position: absolute; left: 372px; top: 760px; }
  #rain { position: absolute; inset: 0; pointer-events: none; }`,
    js: `
  const g = document.getElementById("rain").getContext("2d");
  let seed = 21; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const drops = Array.from({ length: 220 }, () => ({ x: rnd() * 900, y: rnd() * 1300, s: 0.7 + rnd() * 0.6 }));
  const S = { t: 0 };
  const draw = () => { const t = S.t; g.clearRect(0, 0, 864, 1296); g.strokeStyle = "rgba(170,200,255,.35)"; g.lineWidth = 2;
    drops.forEach((d) => { const y = (d.y + t * 1400 * d.s) % 1340 - 40, x = d.x - (y * 0.12); g.beginPath(); g.moveTo(x, y); g.lineTo(x - 5, y + 34); g.stroke(); });
    document.querySelectorAll(".bw").forEach((w, i) => w.setAttribute("fill", (Math.floor(t * 2 + i * 0.37) % 5 === 0) ? "#FFB86B" : "#2B1E44")); };
  tl.to(S, { t: 5, duration: 5, ease: "none", onUpdate: draw }, 0); draw();
  // Signs buzz on with a few dead flickers each.
  [["#s1", 0.4], ["#s2", 0.8], ["#s3", 1.2], ["#s4", 1.6]].forEach(([id, t]) => { tl.set(id, { opacity: 0 }, 0);
    [[0, 1], [0.06, 0.1], [0.12, 1], [0.2, 0.2], [0.26, 1]].forEach(([d, o]) => tl.set(id, { opacity: o }, t + d)); });
  [[3.1, 0.15], [3.16, 1], [3.9, 0.3], [3.95, 1]].forEach(([t, o]) => tl.set("#s2", { opacity: o }, t));
  tl.fromTo("#refl", { opacity: 0 }, { opacity: 1, duration: 1.2 }, 0.6);
  tl.fromTo("#fig", { x: -440 }, { x: 140, duration: 4.4, ease: "none" }, 0.6);`,
  };
};
