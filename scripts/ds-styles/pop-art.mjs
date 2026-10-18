// Pop art: a comic panel. A lightning bolt strikes with a white flash, a jagged burst pops with ZAP!,
// speed lines shoot out and the Ben Day dots pulse.
export default () => {
  const K = "#15171A";
  const burst = Array.from({ length: 28 }, (_, i) => { const a = (i / 28) * Math.PI * 2, r = i % 2 ? 250 : 380 + ((i * 37) % 60); return `${432 + Math.cos(a) * r},${700 + Math.sin(a) * r * 0.9}`; }).join(" ");
  const lines = Array.from({ length: 16 }, (_, i) => { const a = (i / 16) * Math.PI * 2; return `<line class="spd" x1="${432 + Math.cos(a) * 420}" y1="${700 + Math.sin(a) * 400}" x2="${432 + Math.cos(a) * 900}" y2="${700 + Math.sin(a) * 860}" stroke="${K}" stroke-width="10" stroke-linecap="round"/>`; }).join("");
  return {
    card: `<div id="dots"></div>
    <svg viewBox="0 0 864 1296" width="100%" height="100%" style="position:absolute;inset:0">
      ${lines}
      <polygon id="burst" points="${burst}" fill="#FF2E3B" stroke="${K}" stroke-width="12" stroke-linejoin="round"/>
      <polygon id="bolt" points="520,120 330,620 450,620 360,1000 620,470 490,470 600,120" fill="#FFE600" stroke="${K}" stroke-width="12" stroke-linejoin="round"/>
    </svg>
    <div id="zap">ZAP!</div>
    <div id="flash"></div>`,
    css: `
  #card { background: #FFE600; }
  #dots { position: absolute; inset: -40px; background-image: radial-gradient(circle, #FF5FA8 9px, transparent 10px); background-size: 34px 34px; }
  #zap { position: absolute; left: 0; right: 0; top: 590px; text-align: center; font-family: "Geist", sans-serif; font-weight: 900; font-size: 250px; letter-spacing: -.02em; color: #FFFFFF;
    -webkit-text-stroke: 12px #15171A; paint-order: stroke fill; text-shadow: 14px 14px 0 #15171A; transform: rotate(-8deg); }
  #flash { position: absolute; inset: 0; background: #fff; opacity: 0; }`,
    js: `
  tl.fromTo("#card", { opacity: 0 }, { opacity: 1, duration: 0.15 }, 0);
  tl.fromTo("#bolt", { y: -1100 }, { y: 0, duration: 0.22, ease: "power4.in" }, 0.25);
  tl.set("#flash", { opacity: 0.95 }, 0.47).set("#flash", { opacity: 0 }, 0.53).set("#flash", { opacity: 0.7 }, 0.6).set("#flash", { opacity: 0 }, 0.66);
  tl.fromTo("#burst", { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.45, ease: "back.out(2.5)" }, 0.55);
  tl.fromTo(".spd", { scale: 0.2, opacity: 0, svgOrigin: "432 700" }, { scale: 1, opacity: 1, svgOrigin: "432 700", duration: 0.35, ease: "power3.out", stagger: 0.015 }, 0.6);
  tl.fromTo("#zap", { scale: 3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "power4.out" }, 0.75);
  // Impact shake, then the dots pulse and the bolt flickers like it is still charged.
  [[1.05, 14], [1.1, -12], [1.15, 8], [1.2, -4], [1.25, 0]].forEach(([t, x]) => tl.set("#card", { x }, t));
  tl.fromTo("#dots", { backgroundSize: "34px 34px" }, { backgroundSize: "44px 44px", duration: 0.8, ease: "sine.inOut", yoyo: true, repeat: 3 }, 1.3);
  tl.to("#zap", { scale: 1.08, duration: 0.25, ease: "power2.out", yoyo: true, repeat: 5 }, 1.5);
  [2.4, 3.5, 4.3].forEach((t) => { tl.set("#bolt", { opacity: 0.2 }, t).set("#bolt", { opacity: 1 }, t + 0.06).set("#flash", { opacity: 0.5 }, t).set("#flash", { opacity: 0 }, t + 0.05); });`,
  };
};
