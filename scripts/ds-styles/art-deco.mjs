// Art Deco: a grand hotel at night. Gold frame lines draw, a sunburst fans open, a stepped tower rises,
// and the hotel name spreads out with a gold shine.
export default () => {
  const G = "#D8B45A";
  const rays = Array.from({ length: 19 }, (_, i) => -90 + (i - 9) * 9).map((a) => `<line class="ray" x1="432" y1="900" x2="${432 + Math.cos((a * Math.PI) / 180) * 760}" y2="${900 + Math.sin((a * Math.PI) / 180) * 760}" stroke="${G}" stroke-width="3"/>`).join("");
  const arcs = [140, 200, 260].map((r) => `<path class="arc" pathLength="1" d="M${432 - r},900 A${r},${r} 0 0 1 ${432 + r},900" fill="none" stroke="${G}" stroke-width="4"/>`).join("");
  const tower = "M312,1296 L312,980 L342,980 L342,880 L372,880 L372,760 L402,760 L402,640 L422,640 L432,520 L442,640 L462,640 L462,760 L492,760 L492,880 L522,880 L522,980 L552,980 L552,1296 Z";
  const windows = Array.from({ length: 6 }, (_, r) => [-1, 0, 1].map((c) => `<rect class="win" x="${424 + c * 40}" y="${1010 + r * 44}" width="16" height="26" fill="${G}"/>`).join("")).join("");
  return {
    card: `<svg viewBox="0 0 864 1296" width="100%" height="100%" style="display:block">
      <rect width="864" height="1296" fill="#0E1A2B"/>
      <g id="rays" opacity=".55">${rays}</g>
      ${arcs}
      <path id="tower" d="${tower}" fill="#14263D" stroke="${G}" stroke-width="5"/>
      ${windows}
      <rect class="frame" pathLength="1" x="30" y="30" width="804" height="1236" fill="none" stroke="${G}" stroke-width="4"/>
      <rect class="frame" pathLength="1" x="48" y="48" width="768" height="1200" fill="none" stroke="${G}" stroke-width="2"/>
      <path class="frame" pathLength="1" d="M300,380 L432,345 L564,380" fill="none" stroke="${G}" stroke-width="3"/>
    </svg>
    <div id="name">GRAND HOTEL</div><div id="est">EST 1925</div>`,
    css: `
  .arc, .frame { stroke-dasharray: 1; stroke-dashoffset: 1; }
  #name { position: absolute; left: 0; right: 0; top: 150px; text-align: center; font-family: "Geist", sans-serif; font-weight: 300; font-size: 92px; letter-spacing: .02em;
    background: linear-gradient(100deg, #A9873A 0%, #F6E2A2 45%, #FFF6D8 50%, #F6E2A2 55%, #A9873A 100%); background-size: 300% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; white-space: nowrap; }
  #est { position: absolute; left: 0; right: 0; top: 275px; text-align: center; font-family: "Geist Mono", monospace; font-size: 26px; letter-spacing: .5em; color: #D8B45A; }`,
    js: `
  tl.to(".frame", { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut", stagger: 0.12 }, 0.1);
  tl.fromTo(".ray", { scaleY: 0, scaleX: 0, svgOrigin: "432 900" }, { scaleY: 1, scaleX: 1, svgOrigin: "432 900", duration: 0.7, ease: "power3.out", stagger: { each: 0.03, from: "center" } }, 0.5);
  tl.to(".arc", { strokeDashoffset: 0, duration: 0.6, ease: "power2.out", stagger: 0.12 }, 0.8);
  tl.fromTo("#tower", { y: 800 }, { y: 0, duration: 0.9, ease: "power3.out" }, 1.0);
  tl.fromTo(".win", { opacity: 0 }, { opacity: 1, duration: 0.05, stagger: { each: 0.03, from: "random" } }, 1.8);
  tl.fromTo("#name", { letterSpacing: "-0.12em", opacity: 0 }, { letterSpacing: "0.14em", opacity: 1, duration: 1.2, ease: "power3.out" }, 1.4);
  tl.fromTo("#est", { opacity: 0 }, { opacity: 1, duration: 0.5 }, 2.2);
  tl.fromTo("#name", { backgroundPosition: "100% 0" }, { backgroundPosition: "0% 0", duration: 1.6, ease: "power1.inOut" }, 2.8);
  tl.to("#rays", { rotation: 4, svgOrigin: "432 900", duration: 2.5, ease: "sine.inOut" }, 2.4);`,
  };
};
