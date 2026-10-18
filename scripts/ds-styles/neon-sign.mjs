// Neon sign: a diner sign on a dark brick wall. The glass tubes draw on part by part with a buzz and a few dead
// flickers, the glow spills onto the bricks, and an arrow chases on and off.
export default () => {
  const tube = (d, c, cls) => `<path class="tb ${cls}" pathLength="1" d="${d}" fill="none" stroke="${c}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" style="--c:${c}"/>`;
  return {
    card: `<div id="wall"></div><div id="spill"></div>
      <svg viewBox="0 0 864 1296" width="864" height="1296" style="position:absolute;inset:0;overflow:visible">
        ${tube("M150,330 C150,250 250,250 250,330 L250,420 C250,500 150,500 150,420 Z", "#FF3E9A", "cup")}${tube("M250,350 C300,350 300,410 250,410", "#FF3E9A", "cup")}
        ${tube("M175,230 C165,200 195,190 185,160 M215,230 C205,200 235,190 225,160", "#FFFFFF", "steam")}
        <text class="word" x="432" y="660" text-anchor="middle" font-family="Geist, sans-serif" font-weight="700" font-size="190" fill="none" stroke="#33E6FF" stroke-width="7" style="--c:#33E6FF">DINER</text>
        <text class="word2" x="432" y="800" text-anchor="middle" font-family="Segoe Script, Brush Script MT, cursive" font-size="120" fill="none" stroke="#FFD65A" stroke-width="5" style="--c:#FFD65A">open late</text>
        ${[0, 1, 2, 3, 4].map((i) => tube(`M${200 + i * 100},960 l60,40 l-60,40`, "#FF3E9A", "arw a" + i)).join("")}
      </svg>`,
    css: `
  #card { background: #160F14; }
  #wall { position: absolute; inset: 0; background-color: #2A1B1F; background-image: linear-gradient(#160F14 4px, transparent 4px), linear-gradient(90deg, #160F14 4px, transparent 4px), linear-gradient(90deg, #160F14 4px, transparent 4px);
    background-size: 100% 60px, 120px 60px, 120px 60px; background-position: 0 0, 0 0, 60px 30px; }
  #spill { position: absolute; inset: 0; background: radial-gradient(50% 40% at 50% 48%, rgba(51,230,255,.28), rgba(255,62,154,.12) 60%, rgba(0,0,0,0)); opacity: 0; mix-blend-mode: screen; }
  .tb, .word, .word2 { filter: drop-shadow(0 0 6px var(--c)) drop-shadow(0 0 18px var(--c)); stroke-dasharray: 1; stroke-dashoffset: 1; }
  .word, .word2 { stroke-dasharray: 2200; stroke-dashoffset: 2200; }`,
    js: `
  tl.to(".cup", { strokeDashoffset: 0, duration: 0.5, ease: "none", stagger: 0.15 }, 0.2);
  tl.to(".steam", { strokeDashoffset: 0, duration: 0.4, ease: "none" }, 0.7);
  tl.to(".word", { strokeDashoffset: 0, duration: 1.1, ease: "none" }, 0.9);
  tl.to(".word2", { strokeDashoffset: 0, duration: 1.0, ease: "none" }, 1.6);
  tl.to("#spill", { opacity: 1, duration: 0.6 }, 1.6);
  // Buzz: a couple of dead flickers on the main word.
  [[2.8, 0.15], [2.86, 1], [2.95, 0.3], [3.0, 1], [4.2, 0.2], [4.26, 1]].forEach(([t, o]) => tl.set(".word", { opacity: o }, t));
  // Arrow chase: chevrons light up one after another, then all blink.
  for (let k = 0; k < 2; k++) [0, 1, 2, 3, 4].forEach((i) => { tl.set(".a" + i, { strokeDashoffset: 0, opacity: 1 }, 2.2 + k * 0.9 + i * 0.12); tl.set(".a" + i, { opacity: 0.15 }, 2.2 + k * 0.9 + i * 0.12 + 0.4); });
  tl.set(".arw", { opacity: 1 }, 4.1);`,
  };
};
