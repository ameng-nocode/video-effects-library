// Watercolor: a city skyline painted on wet paper. Colour washes bloom outward and bleed into each other,
// edges stay soft with darker rims, then thin ink lines draw the buildings on top.
export default () => {
  const blooms = [["#F4A7B9", 260, 300, 360], ["#A8D0E6", 600, 360, 380], ["#F9D78A", 420, 520, 300], ["#9BC59D", 200, 980, 320], ["#7FA7D9", 640, 1000, 340]];
  const blds = [[90, 620, 120, 380], [220, 520, 110, 480], [340, 660, 130, 340], [480, 470, 120, 530], [610, 600, 150, 400]];
  return {
    card: `<svg viewBox="0 0 864 1296" width="100%" height="100%" style="display:block">
      <defs><filter id="wet" x="-30%" y="-30%" width="160%" height="160%"><feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" seed="8"/><feDisplacementMap in="SourceGraphic" scale="40"/><feGaussianBlur stdDeviation="6"/></filter>
        <filter id="paperf"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="2"/><feColorMatrix values="0 0 0 0 0.93  0 0 0 0 0.91  0 0 0 0 0.87  0 0 0 0.25 0"/></filter></defs>
      <rect width="864" height="1296" fill="#FBF8F2"/>
      <g style="mix-blend-mode:multiply" filter="url(#wet)">${blooms.map(([c, x, y, r], i) => `<circle class="bloom" cx="${x}" cy="${y}" r="${r}" fill="${c}" fill-opacity=".55" stroke="${c}" stroke-width="10" stroke-opacity=".9"/>`).join("")}</g>
      <g style="mix-blend-mode:multiply" filter="url(#wet)">${blds.map(([x, y, w, h]) => `<rect class="bwash" x="${x}" y="${y}" width="${w}" height="${h}" fill="#6C7FB0" fill-opacity=".45"/>`).join("")}</g>
      <g fill="none" stroke="#2D2A32" stroke-width="3" stroke-linecap="round">${blds.map(([x, y, w, h]) => `<path class="ink" pathLength="1" d="M${x},${y + h} L${x},${y} L${x + w},${y} L${x + w},${y + h}"/>` + Array.from({ length: Math.floor(h / 70) }, (_, k) => `<path class="ink" pathLength="1" d="M${x + 20},${y + 40 + k * 70} l20,0 M${x + w - 40},${y + 40 + k * 70} l20,0"/>`).join("")).join("")}
        <path class="ink" pathLength="1" d="M40,1000 L824,1000"/></g>
      <rect width="864" height="1296" filter="url(#paperf)"/>
      <text id="ttl" x="432" y="1150" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="70" fill="#2D2A32">after the rain</text>
    </svg>`,
    css: `.ink { stroke-dasharray: 1; stroke-dashoffset: 1; }`,
    js: `
  // Washes bloom out from their centres, slightly staggered, like drops on wet paper.
  gsap.utils.toArray(".bloom").forEach((b, i) => tl.fromTo(b, { attr: { r: 0 } }, { attr: { r: [360, 380, 300, 320, 340][i] }, duration: 1.6, ease: "power2.out" }, 0.1 + i * 0.22));
  gsap.utils.toArray(".bwash").forEach((b, i) => tl.fromTo(b, { opacity: 0, scaleY: 0.2, transformOrigin: "50% 100%" }, { opacity: 1, scaleY: 1, duration: 0.9, ease: "power2.out" }, 1.0 + i * 0.12));
  tl.to(".ink", { strokeDashoffset: 0, duration: 0.5, ease: "power1.inOut", stagger: 0.03 }, 2.0);
  tl.fromTo("#ttl", { opacity: 0 }, { opacity: 1, duration: 0.8 }, 3.4);`,
  };
};
