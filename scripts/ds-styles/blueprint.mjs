// Blueprint: a rocket drawn in thin white lines on blue technical paper. The grid appears, the outline traces
// itself line by line, dimension lines and arrows extend with their numbers, and a title block fills in.
export default () => {
  const W = "#EAF4FF";
  const L = (d, w = 3) => `<path class="ln" pathLength="1" d="${d}" fill="none" stroke="${W}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  return {
    card: `<svg viewBox="0 0 864 1296" width="100%" height="100%" style="display:block">
      <defs><pattern id="g1" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24,0 L0,0 0,24" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="1"/></pattern>
        <pattern id="g2" width="120" height="120" patternUnits="userSpaceOnUse"><rect width="120" height="120" fill="url(#g1)"/><path d="M120,0 L0,0 0,120" fill="none" stroke="rgba(255,255,255,.24)" stroke-width="1.5"/></pattern></defs>
      <rect width="864" height="1296" fill="#14468C"/>
      <rect id="grid" width="864" height="1296" fill="url(#g2)"/>
      ${L("M432,160 C500,240 520,330 520,430 L520,860 L344,860 L344,430 C344,330 364,240 432,160 Z", 4)}
      ${L("M344,760 L250,900 L250,960 L344,900")}${L("M520,760 L614,900 L614,960 L520,900")}
      ${L("M380,860 L360,940 L504,940 L484,860")}
      ${L("M432,330 m-46,0 a46,46 0 1,0 92,0 a46,46 0 1,0 -92,0")}${L("M432,330 m-26,0 a26,26 0 1,0 52,0 a26,26 0 1,0 -52,0", 2)}
      ${L("M344,560 L520,560", 2)}${L("M344,600 L520,600", 2)}${L("M432,860 L432,940", 2)}
      ${L("M600,160 L700,160 M600,860 L700,860 M670,160 L670,860", 2)}${L("M670,160 l-10,20 l20,0 Z M670,860 l-10,-20 l20,0 Z", 2)}
      ${L("M344,1010 L344,1060 M520,1010 L520,1060 M344,1040 L520,1040", 2)}${L("M344,1040 l20,-10 l0,20 Z M520,1040 l-20,-10 l0,20 Z", 2)}
      <g font-family="Geist Mono, monospace" fill="${W}">
        <text class="num" x="690" y="520" font-size="26" transform="rotate(-90 690 520)">7.20 m</text>
        <text class="num" x="432" y="1090" font-size="26" text-anchor="middle">1.80 m</text>
        <text class="num" x="140" y="300" font-size="22">A. NOSE CONE</text><text class="num" x="140" y="560" font-size="22">B. TANK</text><text class="num" x="140" y="940" font-size="22">C. ENGINE</text>
      </g>
      <g id="tblock"><rect x="460" y="1140" width="370" height="120" fill="none" stroke="${W}" stroke-width="3"/><line x1="460" y1="1180" x2="830" y2="1180" stroke="${W}" stroke-width="2"/>
        <text x="476" y="1170" font-family="Geist Mono, monospace" font-size="22" fill="${W}">PROJECT  ROCKET R-1</text><text x="476" y="1222" font-family="Geist Mono, monospace" font-size="20" fill="${W}">SCALE 1:40   SHEET 01</text></g>
    </svg>`,
    css: `.ln { stroke-dasharray: 1; stroke-dashoffset: 1; }`,
    js: `
  tl.fromTo("#grid", { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.1);
  gsap.utils.toArray(".ln").forEach((l, i) => tl.to(l, { strokeDashoffset: 0, duration: i === 0 ? 0.9 : 0.35, ease: "power1.inOut" }, 0.4 + (i === 0 ? 0 : 0.6 + i * 0.16)));
  tl.fromTo(".num", { opacity: 0 }, { opacity: 1, duration: 0.2, stagger: 0.18 }, 2.6);
  tl.fromTo("#tblock", { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" }, 3.6);`,
  };
};
