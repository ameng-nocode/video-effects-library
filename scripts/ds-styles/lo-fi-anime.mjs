// Lo-fi anime: a cozy desk by a rainy window at night, drawn like a 90s anime background. Rain streaks down
// the glass, steam curls from a cup, the lamp glows softly and city lights blink outside. A calm loop.
export default () => {
  const lights = Array.from({ length: 26 }, (_, i) => [130 + ((i * 97) % 600), 300 + ((i * 53) % 330), i]);
  return {
    card: `<canvas id="rain" width="864" height="1296"></canvas>
      <svg viewBox="0 0 864 1296" width="864" height="1296" style="position:absolute;inset:0">
        <defs><linearGradient id="night" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1F1B4D"/><stop offset="1" stop-color="#5A3E8C"/></linearGradient>
          <radialGradient id="lamp" cx="0.5" cy="0.4"><stop offset="0" stop-color="#FFD58A" stop-opacity=".95"/><stop offset="1" stop-color="#FFD58A" stop-opacity="0"/></radialGradient></defs>
        <rect width="864" height="1296" fill="#3B2F5E"/>
        <rect x="110" y="170" width="644" height="560" rx="10" fill="url(#night)"/>
        <g fill="#2A2350">${[[130, 470, 90, 260], [240, 400, 70, 330], [330, 520, 110, 210], [470, 430, 80, 300], [570, 500, 120, 230], [690, 450, 60, 280]].map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`).join("")}</g>
        <g id="lights">${lights.map(([x, y, i]) => `<rect class="win" x="${x}" y="${y}" width="10" height="14" fill="#FFD58A" opacity=".85"/>`).join("")}</g>
        <rect x="110" y="170" width="644" height="560" rx="10" fill="none" stroke="#2A2148" stroke-width="22"/>
        <line x1="432" y1="170" x2="432" y2="730" stroke="#2A2148" stroke-width="14"/>
        <rect x="0" y="860" width="864" height="436" fill="#6B4A7E"/><rect x="0" y="850" width="864" height="24" fill="#8A6497"/>
        <ellipse id="glow" cx="640" cy="800" rx="300" ry="260" fill="url(#lamp)"/>
        <path d="M600,850 L620,700 L560,640 L700,640 L660,700 L680,850 Z" fill="#E9A36B"/><rect x="630" y="560" width="20" height="90" fill="#3A2C4A"/>
        <rect x="160" y="790" width="260" height="70" rx="6" fill="#C96E6E"/><rect x="180" y="760" width="230" height="34" rx="6" fill="#6E9BC9"/>
        <g id="plant"><rect x="60" y="770" width="80" height="90" rx="8" fill="#D98C5F"/><path d="M100,775 C60,700 70,650 100,620 C130,650 140,700 100,775 Z" fill="#5FA36B"/><path d="M100,775 C40,740 30,700 50,680 C80,690 100,730 100,775 Z" fill="#4E8F5B"/></g>
        <rect x="460" y="790" width="80" height="70" rx="12" fill="#F2EDE4"/><path d="M540,805 C575,805 575,845 540,845" fill="none" stroke="#F2EDE4" stroke-width="10"/>
        <g id="steam" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="6" stroke-linecap="round"><path d="M485,775 C470,740 500,720 485,690"/><path d="M515,775 C500,735 530,715 515,680"/></g>
      </svg>
      <div id="tag">rain · study · 2am</div>`,
    css: `
  #card { background: #3B2F5E; }
  #rain { position: absolute; left: 0; top: 0; z-index: 2; pointer-events: none; }
  #tag { position: absolute; left: 0; right: 0; top: 1000px; text-align: center; font-family: "Geist Mono", monospace; font-size: 34px; letter-spacing: .2em; color: #F2E6FF; opacity: .85; z-index: 3; }`,
    js: `
  const cv = document.getElementById("rain"), g = cv.getContext("2d");
  let seed = 3; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const drops = Array.from({ length: 140 }, () => ({ x: 110 + rnd() * 644, y: rnd() * 560, s: 0.6 + rnd() * 0.8, l: 18 + rnd() * 26 }));
  const S = { t: 0 };
  const draw = () => { const t = S.t; g.clearRect(0, 0, 864, 1296); g.save(); g.beginPath(); g.rect(110, 170, 644, 560); g.clip();
    g.strokeStyle = "rgba(200,210,255,.45)"; g.lineWidth = 2;
    drops.forEach((d) => { const y = 170 + ((d.y + t * 520 * d.s) % 600) - 20; g.beginPath(); g.moveTo(d.x, y); g.lineTo(d.x - 3, y + d.l); g.stroke(); }); g.restore();
    document.querySelectorAll(".win").forEach((w, i) => w.setAttribute("opacity", Math.floor(t * 1.5 + i * 0.7) % 7 === 0 ? 0.2 : 0.85)); };
  tl.to(S, { t: 5, duration: 5, ease: "none", onUpdate: draw }, 0); draw();
  tl.fromTo("#card", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0);
  tl.fromTo("#glow", { opacity: 0.7 }, { opacity: 1, duration: 1.2, ease: "sine.inOut", yoyo: true, repeat: 3 }, 0.2);
  gsap.utils.toArray("#steam path").forEach((p, i) => tl.fromTo(p, { y: 0, opacity: 0.8 }, { y: -50, opacity: 0, duration: 1.6, ease: "sine.out", repeat: 2 }, 0.2 + i * 0.6));
  tl.fromTo("#plant", { rotation: -2, svgOrigin: "100 860" }, { rotation: 2, svgOrigin: "100 860", duration: 1.2, ease: "sine.inOut", yoyo: true, repeat: 3 }, 0);
  tl.fromTo("#tag", { opacity: 0 }, { opacity: 0.85, duration: 1 }, 1.2);`,
  };
};
