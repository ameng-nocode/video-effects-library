// Paper cut: an underwater scene of stacked paper layers with soft shadows between them. Layers slide up into
// place one by one, then sway at different speeds while paper fish swim through and bubbles rise.
export default () => {
  const wave = (y, amp, seed) => { let d = `M-80,${y}`; for (let x = -80; x <= 944; x += 64) d += ` Q${x + 32},${y - amp * (1 + Math.sin(x * 0.02 + seed) * 0.4)} ${x + 64},${y}`; return d + " L944,1296 L-80,1296 Z"; };
  const layers = [["#BFE6F0", 260, 30, 0], ["#8ACFE3", 420, 36, 1], ["#55B4D4", 600, 40, 2], ["#2E8FB8", 780, 44, 3], ["#1C6F99", 960, 40, 4], ["#145276", 1110, 36, 5]];
  const weed = (x, h, c) => `<path class="weed" d="M${x},1296 C${x - 40},${1296 - h * 0.3} ${x + 40},${1296 - h * 0.6} ${x},${1296 - h} C${x + 30},${1296 - h * 0.6} ${x - 10},${1296 - h * 0.3} ${x + 30},1296 Z" fill="${c}"/>`;
  const fish = (id, c) => `<g id="${id}"><path d="M0,0 C30,-40 90,-40 120,0 C90,40 30,40 0,0 Z" fill="${c}"/><path d="M0,0 L-40,-30 L-40,30 Z" fill="${c}"/><circle cx="92" cy="-6" r="7" fill="#fff"/><circle cx="94" cy="-6" r="3" fill="#123"/></g>`;
  return {
    card: `<svg viewBox="0 0 864 1296" width="100%" height="100%" style="display:block">
      <defs><filter id="sh" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="-10" stdDeviation="9" flood-color="#0A2A40" flood-opacity=".35"/></filter></defs>
      <rect width="864" height="1296" fill="#E4F5FA"/>
      <circle id="sun" cx="640" cy="170" r="90" fill="#FFF4C2" filter="url(#sh)"/>
      ${layers.map(([c, y, a, s], i) => `<path class="ly" d="${wave(y, a, s)}" fill="${c}" filter="url(#sh)"/>`).join("")}
      ${fish("f1", "#FF8A5B")}${fish("f2", "#FFD166")}
      <g filter="url(#sh)">${weed(120, 380, "#2BB673")}${weed(200, 280, "#1F9A5E")}${weed(700, 340, "#2BB673")}${weed(770, 230, "#1F9A5E")}</g>
      ${Array.from({ length: 8 }, (_, i) => `<circle class="bub" cx="${300 + (i * 67) % 300}" cy="1250" r="${8 + (i % 3) * 6}" fill="none" stroke="#fff" stroke-width="4" opacity=".8"/>`).join("")}
    </svg>`,
    js: `
  gsap.utils.toArray(".ly").forEach((l, i) => { tl.fromTo(l, { y: 700 }, { y: 0, duration: 0.6, ease: "back.out(1.3)" }, 0.1 + i * 0.14);
    tl.to(l, { x: i % 2 ? 26 : -26, duration: 1.4 + i * 0.15, ease: "sine.inOut", yoyo: true, repeat: 2 }, 1.1); });
  tl.fromTo("#sun", { y: -200 }, { y: 0, duration: 0.8, ease: "back.out(1.5)" }, 0.6);
  gsap.utils.toArray(".weed").forEach((w, i) => { tl.fromTo(w, { scaleY: 0, transformOrigin: "50% 100%" }, { scaleY: 1, duration: 0.5, ease: "back.out(2)" }, 1.0 + i * 0.1);
    tl.to(w, { skewX: i % 2 ? 6 : -6, transformOrigin: "50% 100%", duration: 1.0, ease: "sine.inOut", yoyo: true, repeat: 3 }, 1.6); });
  tl.fromTo("#f1", { x: -200, y: 700 }, { x: 1000, y: 640, duration: 3.6, ease: "none" }, 1.2);
  tl.fromTo("#f2", { x: 1000, y: 880, scaleX: -1 }, { x: -200, y: 920, scaleX: -1, duration: 3.2, ease: "none" }, 1.6);
  gsap.utils.toArray(".bub").forEach((b, i) => tl.fromTo(b, { y: 0, opacity: 0.8 }, { y: -900, opacity: 0, duration: 2.6, ease: "none" }, 1.5 + i * 0.3));`,
  };
};
