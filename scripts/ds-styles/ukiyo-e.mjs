// Ukiyo-e: a woodblock print of a great wave and a far mountain. The flat colour blocks print in one by one,
// the wave rises and curls, its claw-like foam reaches forward, and a red seal stamps the corner.
export default () => {
  const K = "#1B1B24", B = "#1F3F73", L = "#7FA3C6", C = "#F1E7D2";
  const claws = Array.from({ length: 9 }, (_, i) => { const x = 210 + i * 34, y = 470 + Math.sin(i * 0.7) * 30; return `<path class="claw" d="M${x},${y} q14,-30 30,-6 q-10,-6 -16,10 q14,-14 22,4" fill="${C}" stroke="${K}" stroke-width="3"/>`; }).join("");
  return {
    card: `<svg viewBox="0 0 864 1296" width="100%" height="100%" style="display:block">
      <defs><pattern id="paper" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#EFE3C8"/><circle cx="2" cy="3" r=".7" fill="#E2D3B2"/></pattern></defs>
      <rect width="864" height="1296" fill="url(#paper)"/>
      <rect id="sky" x="0" y="0" width="864" height="760" fill="#E8D8B6"/>
      <g id="fuji"><polygon points="520,760 640,600 760,760" fill="${B}" stroke="${K}" stroke-width="4"/><polygon points="610,640 640,600 670,640 655,632 640,646 625,632" fill="${C}" stroke="${K}" stroke-width="3"/></g>
      <g id="sea"><path d="M0,800 Q120,770 240,800 T480,800 T720,800 T960,800 L960,1296 L0,1296 Z" fill="${L}" stroke="${K}" stroke-width="4"/>
        <path d="M0,900 Q120,870 240,900 T480,900 T720,900 T960,900 L960,1296 L0,1296 Z" fill="${B}" stroke="${K}" stroke-width="4"/></g>
      <g id="wave">
        <path d="M-40,1296 L-40,900 C40,700 120,560 260,480 C380,420 520,440 560,520 C500,500 450,520 430,560 C470,560 500,590 490,630 C430,600 360,640 330,720 C300,800 300,900 360,1000 L360,1296 Z" fill="${B}" stroke="${K}" stroke-width="6"/>
        <path d="M60,1296 C40,1000 120,820 250,700 C300,660 340,640 380,640" fill="none" stroke="${L}" stroke-width="22"/>
        <path d="M120,1296 C110,1050 170,880 270,780" fill="none" stroke="${C}" stroke-width="10"/>
        ${claws}
      </g>
      <g id="boat"><path d="M560,1010 Q680,990 800,1010 L780,1040 Q680,1028 580,1040 Z" fill="#D8C08E" stroke="${K}" stroke-width="4"/></g>
      <g id="seal"><rect x="70" y="90" width="90" height="140" fill="#C0392B"/><text x="115" y="140" text-anchor="middle" font-family="Georgia, serif" font-size="34" fill="#F5E6CF" font-weight="700">GREAT</text><text x="115" y="190" text-anchor="middle" font-family="Georgia, serif" font-size="34" fill="#F5E6CF" font-weight="700">WAVE</text></g>
    </svg>`,
    js: `
  // Printing order: each colour block appears like a separate woodblock pass.
  [["#sky", 0.1], ["#sea", 0.35], ["#fuji", 0.6]].forEach(([id, t]) => tl.fromTo(id, { opacity: 0 }, { opacity: 1, duration: 0.18, ease: "steps(2)" }, t));
  tl.fromTo("#wave", { y: 520, rotation: 6, svgOrigin: "200 1296" }, { y: 0, rotation: 0, svgOrigin: "200 1296", duration: 1.3, ease: "power3.out" }, 0.8);
  tl.fromTo(".claw", { scale: 0, transformOrigin: "0% 100%" }, { scale: 1, duration: 0.35, ease: "back.out(3)", stagger: 0.06 }, 1.8);
  tl.to("#wave", { rotation: -2.5, svgOrigin: "200 1296", duration: 1.2, ease: "sine.inOut", yoyo: true, repeat: 1 }, 2.4);
  tl.fromTo("#boat", { y: 0 }, { y: -26, rotation: -5, svgOrigin: "680 1020", duration: 0.8, ease: "sine.inOut", yoyo: true, repeat: 4 }, 0.9);
  tl.fromTo("#seal", { scale: 1.6, opacity: 0, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: 0.18, ease: "power4.in" }, 3.3);`,
  };
};
