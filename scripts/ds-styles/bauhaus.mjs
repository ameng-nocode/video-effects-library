// Bauhaus: a person built from basic shapes (circle head, quarter circle hair, half circle shoulders)
// assembles on a ruled grid in red, yellow, blue and black, then the eye looks around and blinks.
export default () => {
  const K = "#15171A";
  return {
    card: `<svg viewBox="0 0 864 1296" width="100%" height="100%" style="display:block">
      <rect width="864" height="1296" fill="#EFE7D6"/>
      <line class="rule" pathLength="1" x1="96" y1="0" x2="96" y2="1296" stroke="${K}" stroke-width="5"/>
      <line class="rule" pathLength="1" x1="0" y1="330" x2="864" y2="330" stroke="${K}" stroke-width="5"/>
      <line class="rule" pathLength="1" x1="560" y1="1296" x2="864" y2="900" stroke="${K}" stroke-width="5"/>
      <rect id="blue" x="676" y="110" width="140" height="140" fill="#1160B8"/>
      <path id="shoulders" d="M92,1296 A340,340 0 0 1 772,1296 Z" fill="#F2C21B"/>
      <rect id="neck" x="392" y="820" width="80" height="150" fill="${K}"/>
      <circle id="head" cx="432" cy="640" r="210" fill="#D92B21"/>
      <path id="hair" d="M432,430 A210,210 0 0 0 222,640 L432,640 Z" fill="${K}"/>
      <g id="eye"><circle cx="520" cy="610" r="34" fill="#EFE7D6"/><circle id="pupil" cx="520" cy="610" r="15" fill="${K}"/></g>
      <rect id="mouth" x="470" y="720" width="86" height="16" fill="${K}"/>
      <g font-family="Geist, sans-serif" font-weight="800" fill="${K}">
        <text class="ltr" x="130" y="250" font-size="190" letter-spacing="-6">F</text><text class="ltr" x="232" y="250" font-size="190" letter-spacing="-6">O</text>
        <text class="ltr" x="362" y="250" font-size="190" letter-spacing="-6">R</text><text class="ltr" x="478" y="250" font-size="190" letter-spacing="-6">M</text>
      </g>
      <text id="year" x="130" y="300" font-family="Geist Mono, monospace" font-size="30" fill="${K}" letter-spacing="6">WEIMAR 1919</text>
    </svg>`,
    css: `.rule { stroke-dasharray: 1; stroke-dashoffset: 1; }`,
    js: `
  tl.fromTo("#card", { opacity: 0 }, { opacity: 1, duration: 0.25 }, 0);
  tl.to(".rule", { strokeDashoffset: 0, duration: 0.5, ease: "power2.inOut", stagger: 0.12 }, 0.15);
  tl.fromTo("#shoulders", { y: 420 }, { y: 0, duration: 0.6, ease: "power4.out" }, 0.45);
  tl.fromTo("#neck", { scaleY: 0, transformOrigin: "50% 100%" }, { scaleY: 1, duration: 0.3, ease: "power3.out" }, 0.8);
  tl.fromTo("#head", { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.6, ease: "back.out(1.7)" }, 0.95);
  tl.fromTo("#hair", { rotation: -180, svgOrigin: "432 640", opacity: 0 }, { rotation: 0, svgOrigin: "432 640", opacity: 1, duration: 0.6, ease: "power3.out" }, 1.25);
  tl.fromTo("#eye", { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.35, ease: "back.out(2.5)" }, 1.6);
  tl.fromTo("#mouth", { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.3, ease: "power3.out" }, 1.7);
  tl.fromTo("#blue", { x: 300 }, { x: 0, duration: 0.5, ease: "power4.out" }, 1.0);
  tl.fromTo(".ltr", { y: -280, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "power4.out", stagger: 0.1 }, 1.9);
  tl.fromTo("#year", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 2.4);
  tl.to("#pupil", { x: -14, duration: 0.25, ease: "power2.inOut" }, 2.7).to("#pupil", { x: 12, duration: 0.3, ease: "power2.inOut" }, 3.3).to("#pupil", { x: 0, duration: 0.25 }, 4.1);
  tl.to("#eye", { scaleY: 0.1, duration: 0.07, transformOrigin: "50% 50%" }, 3.8).to("#eye", { scaleY: 1, duration: 0.1 }, 3.87);
  tl.to("#blue", { rotation: 90, transformOrigin: "50% 50%", duration: 0.6, ease: "power3.inOut" }, 3.0);`,
  };
};
