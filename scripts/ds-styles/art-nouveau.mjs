// Art Nouveau: a woman in profile with long flowing hair inside an arched floral frame. Whiplash curves draw
// themselves, vines grow and curl, flowers bloom and the hair keeps flowing.
export default () => {
  const G = "#B08D57", K = "#3B3226";
  const hair = Array.from({ length: 7 }, (_, i) => `<path class="hair" pathLength="1" d="M470,${430 + i * 14} C${560 + i * 18},${520 + i * 30} ${380 - i * 10},${700 + i * 20} ${520 + i * 22},${860 + i * 26} S${360 + i * 30},${960 + i * 8} ${470 + i * 34},${1040}" fill="none" stroke="#9C5B3B" stroke-width="${16 - i}" stroke-linecap="round"/>`).join("");
  const vine = (d) => `<path class="vine" pathLength="1" d="${d}" fill="none" stroke="#6E8B5B" stroke-width="7" stroke-linecap="round"/>`;
  const flower = (x, y, c) => `<g class="fl" data-o="${x} ${y}">${Array.from({ length: 6 }, (_, i) => `<ellipse cx="${x}" cy="${y - 24}" rx="14" ry="26" fill="${c}" transform="rotate(${i * 60} ${x} ${y})"/>`).join("")}<circle cx="${x}" cy="${y}" r="12" fill="${G}"/></g>`;
  return {
    card: `<svg viewBox="0 0 864 1296" width="100%" height="100%" style="display:block">
      <rect width="864" height="1296" fill="#F1E6CF"/>
      <path class="frame" pathLength="1" d="M90,1230 L90,420 C90,180 774,180 774,420 L774,1230 Z" fill="#E6D7B6" stroke="${G}" stroke-width="10"/>
      <path class="frame" pathLength="1" d="M120,1200 L120,430 C120,230 744,230 744,430 L744,1200 Z" fill="none" stroke="${G}" stroke-width="3"/>
      <circle id="halo" cx="430" cy="560" r="230" fill="#D9C08F" opacity=".8"/>
      ${vine("M120,1200 C220,1100 120,980 220,880 C300,800 220,720 170,640")}${vine("M744,1200 C650,1110 760,1000 660,900 C590,830 660,760 700,680")}
      ${flower(170, 640, "#D98F8F")}${flower(700, 680, "#D98F8F")}${flower(220, 880, "#E5B8A4")}${flower(660, 900, "#E5B8A4")}
      <g id="face"><path d="M470,430 C410,430 380,480 382,540 C384,570 370,590 358,606 C370,612 380,612 384,622 C376,632 382,640 392,644 C386,660 396,676 420,676 C440,676 450,700 452,740 L560,740 C540,690 560,630 560,560 C560,480 530,430 470,430 Z" fill="#F4DCC4" stroke="${K}" stroke-width="5"/>
        <path d="M398,560 C410,552 424,552 432,560" fill="none" stroke="${K}" stroke-width="4"/></g>
      ${hair}
      <text id="title" x="432" y="1190" text-anchor="middle" font-family="Georgia, serif" font-size="78" letter-spacing="10" fill="${K}">SPRING</text>
    </svg>`,
    css: `.frame, .vine, .hair { stroke-dasharray: 1; stroke-dashoffset: 1; }`,
    js: `
  tl.fromTo("#card", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0);
  tl.to(".frame", { strokeDashoffset: 0, duration: 1.0, ease: "power2.inOut", stagger: 0.15 }, 0.1);
  tl.fromTo("#halo", { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.8, ease: "power3.out" }, 0.6);
  tl.fromTo("#face", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.9);
  tl.to(".hair", { strokeDashoffset: 0, duration: 1.2, ease: "power2.out", stagger: 0.08 }, 1.2);
  tl.to(".vine", { strokeDashoffset: 0, duration: 1.2, ease: "power2.out", stagger: 0.2 }, 1.0);
  document.querySelectorAll(".fl").forEach((f, i) => tl.fromTo(f, { scale: 0, rotation: -90, svgOrigin: f.dataset.o }, { scale: 1, rotation: 0, svgOrigin: f.dataset.o, duration: 0.6, ease: "back.out(2)" }, 1.9 + i * 0.15));
  tl.fromTo("#title", { opacity: 0, letterSpacing: 30 }, { opacity: 1, letterSpacing: 10, duration: 1, ease: "power2.out" }, 2.4);
  // Hair keeps flowing: each strand sways a little from the head.
  gsap.utils.toArray(".hair").forEach((h, i) => tl.to(h, { x: 10 + i * 2, duration: 1.2, ease: "sine.inOut", yoyo: true, repeat: 1 }, 2.6 + i * 0.05));`,
  };
};
