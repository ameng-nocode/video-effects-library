// Duotone: a mountain scene in only two colours (deep navy and mint, plus their mixes). The ridges slide
// past each other at different speeds, the sun rises, a hiker walks up to the peak, and the word reveals.
export default () => {
  const D = "#1C1A5E", L = "#3EE6C1";
  const mix = (k) => { const a = [0x1c, 0x1a, 0x5e], b = [0x3e, 0xe6, 0xc1]; return "#" + a.map((v, i) => Math.round(v + (b[i] - v) * k).toString(16).padStart(2, "0")).join(""); };
  const ridge = (id, y, amp, k, seed) => { let d = `M-200,1296 L-200,${y}`; for (let x = -200; x <= 1100; x += 100) d += ` L${x},${y - amp * Math.abs(Math.sin(x * 0.006 + seed))}`; return `<path id="${id}" d="${d} L1100,1296 Z" fill="${mix(k)}"/>`; };
  return {
    card: `<svg viewBox="0 0 864 1296" width="100%" height="100%" style="display:block">
      <rect width="864" height="1296" fill="${mix(0.92)}"/>
      <circle id="sun" cx="560" cy="560" r="120" fill="${L}"/>
      ${ridge("r1", 760, 220, 0.62, 1.2)}
      ${ridge("r2", 900, 180, 0.4, 2.6)}
      <g id="peak"><path d="M120,1296 L520,820 L940,1296 Z" fill="${mix(0.18)}"/></g>
      <g id="hiker" fill="${L}"><circle cx="0" cy="-92" r="16"/><rect x="-11" y="-76" width="22" height="50" rx="8"/><rect x="-26" y="-74" width="18" height="38" rx="6"/>
        <rect class="leg1" x="-10" y="-30" width="9" height="34" rx="4"/><rect class="leg2" x="1" y="-30" width="9" height="34" rx="4"/><line x1="14" y1="-70" x2="30" y2="4" stroke="${L}" stroke-width="5"/></g>
      <rect x="0" y="1180" width="864" height="116" fill="${D}"/>
    </svg>
    <div id="word">EXPLORE</div>`,
    css: `
  #card { background: ${D}; }
  #word { position: absolute; left: 0; right: 0; top: 150px; text-align: center; font-family: "Geist", sans-serif; font-weight: 800; font-size: 150px; letter-spacing: .02em; color: ${D}; }`,
    js: `
  tl.fromTo("#card", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0);
  tl.fromTo("#sun", { y: 360 }, { y: 0, duration: 2.2, ease: "power2.out" }, 0.1);
  tl.fromTo("#r1", { x: -140 }, { x: 60, duration: 5, ease: "none" }, 0);
  tl.fromTo("#r2", { x: 160 }, { x: -120, duration: 5, ease: "none" }, 0);
  tl.fromTo("#peak", { y: 500 }, { y: 0, duration: 0.9, ease: "power3.out" }, 0.3);
  // The hiker walks up the slope to the top, legs stepping.
  tl.fromTo("#hiker", { x: 300, y: 1082 }, { x: 512, y: 830, duration: 2.6, ease: "power1.inOut" }, 1.0);
  for (let i = 0; i < 10; i++) { const t = 1.0 + i * 0.26; tl.set("#hiker .leg1", { rotation: i % 2 ? 18 : -18, svgOrigin: "-5 -30" }, t).set("#hiker .leg2", { rotation: i % 2 ? -18 : 18, svgOrigin: "5 -30" }, t); }
  tl.set("#hiker .leg1, #hiker .leg2", { rotation: 0 }, 3.6);
  tl.fromTo("#word", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "power3.inOut" }, 1.6);`,
  };
};
