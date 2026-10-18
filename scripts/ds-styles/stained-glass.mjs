// Stained glass: a rose window of bright glass pieces held by dark lead lines. The lead draws in, pieces
// light up ring by ring as if the sun comes through, then the light slowly moves so the glass shimmers.
export default () => {
  const cx = 432, cy = 600, rings = [[0, 90, 6], [90, 190, 12], [190, 290, 16], [290, 370, 24]];
  const C = ["#B3122E", "#1D4FB8", "#1E8C4E", "#E3A72F", "#6B2FA0", "#D6531E"];
  const arc = (r0, r1, a0, a1) => { const p = (r, a) => `${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`;
    return r0 === 0 ? `M${cx},${cy} L${p(r1, a0)} A${r1},${r1} 0 0 1 ${p(r1, a1)} Z` : `M${p(r0, a0)} L${p(r1, a0)} A${r1},${r1} 0 0 1 ${p(r1, a1)} L${p(r0, a1)} A${r0},${r0} 0 0 0 ${p(r0, a0)} Z`; };
  const pieces = rings.map(([r0, r1, n], ri) => Array.from({ length: n }, (_, i) => { const a0 = (i / n) * Math.PI * 2 + ri * 0.2, a1 = ((i + 1) / n) * Math.PI * 2 + ri * 0.2;
    return `<path class="pc r${ri}" d="${arc(r0, r1, a0, a1)}" fill="${C[(i * 2 + ri) % C.length]}" stroke="#1A1A1A" stroke-width="9" stroke-linejoin="round"/>`; }).join("")).join("");
  return {
    card: `<svg viewBox="0 0 864 1296" width="100%" height="100%" style="display:block">
      <defs><radialGradient id="sunl" cx="0.3" cy="0.3" r="0.6"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
      <rect width="864" height="1296" fill="#2B2622"/>
      <path d="M62,1296 L62,560 C62,220 802,220 802,560 L802,1296 Z" fill="#1A1A1A"/>
      <g id="win">${pieces}<circle cx="${cx}" cy="${cy}" r="370" fill="none" stroke="#1A1A1A" stroke-width="16"/></g>
      <g id="lancets">${[150, 330, 534, 714].map((x, i) => `<path class="lan" d="M${x - 60},1240 L${x - 60},1060 Q${x},990 ${x + 60},1060 L${x + 60},1240 Z" fill="${C[(i + 2) % 6]}" stroke="#1A1A1A" stroke-width="9"/>`).join("")}</g>
      <rect id="sun" x="62" y="200" width="740" height="1096" fill="url(#sunl)" style="mix-blend-mode:screen"/>
    </svg>`,
    js: `
  tl.fromTo(".pc, .lan", { opacity: 0.08 }, { opacity: 0.08, duration: 0.01 }, 0);
  // Light comes through ring by ring from the centre.
  [0, 1, 2, 3].forEach((r) => tl.to(".r" + r, { opacity: 1, duration: 0.35, ease: "power2.out", stagger: { each: 0.03, from: "random" } }, 0.3 + r * 0.45));
  tl.to(".lan", { opacity: 1, duration: 0.4, stagger: 0.1 }, 2.1);
  tl.fromTo("#sun", { x: -300, y: -200 }, { x: 300, y: 200, duration: 4.5, ease: "sine.inOut" }, 0.5);
  tl.to("#win", { filter: "brightness(1.25)", duration: 0.8, ease: "sine.inOut", yoyo: true, repeat: 1 }, 2.8);`,
  };
};
