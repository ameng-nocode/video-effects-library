// Ink wash: bamboo and misty mountains painted in black ink on rice paper. Grey washes for the far hills
// spread first, then bold tapering brush strokes paint the bamboo, leaves flick on, and a red seal is pressed.
export default () => {
  const leaf = (x, y, a, s) => `<path class="leaf" d="M${x},${y} q${30 * s},${-8 * s} ${80 * s},${6 * s} q${-50 * s},${16 * s} ${-80 * s},${-6 * s} Z" fill="#141414" transform="rotate(${a} ${x} ${y})"/>`;
  const stalk = (x, y0, y1) => { let s = ""; for (let y = y0; y > y1; y -= 170) s += `<path class="stk" pathLength="1" d="M${x},${y} L${x + 4},${y - 160}" stroke="#141414" stroke-width="22" stroke-linecap="butt"/><rect x="${x - 15}" y="${y - 168}" width="38" height="8" fill="#141414" class="node"/>`; return s; };
  return {
    card: `<svg viewBox="0 0 864 1296" width="100%" height="100%" style="display:block">
      <defs><filter id="bleed"><feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" seed="3"/><feDisplacementMap in="SourceGraphic" scale="10"/></filter>
        <filter id="mist"><feGaussianBlur stdDeviation="14"/></filter></defs>
      <rect width="864" height="1296" fill="#F4EFE4"/>
      <path class="hill" d="M0,760 C120,600 220,640 300,560 C380,480 460,620 560,540 C660,460 760,600 864,520 L864,900 L0,900 Z" fill="#9A9A96" filter="url(#mist)" opacity=".55"/>
      <path class="hill" d="M0,880 C160,760 260,820 380,720 C480,640 600,800 720,700 C780,650 830,680 864,660 L864,1000 L0,1000 Z" fill="#5E5E5B" filter="url(#mist)" opacity=".6"/>
      <g filter="url(#bleed)">${stalk(560, 1296, 300)}${stalk(680, 1296, 520)}
        ${leaf(564, 470, -30, 1.4)}${leaf(564, 470, 20, 1.2)}${leaf(564, 640, -160, 1.3)}${leaf(684, 700, -20, 1.2)}${leaf(684, 860, 200, 1.1)}${leaf(564, 810, 10, 1.0)}</g>
      <text id="poem" x="150" y="260" font-family="Georgia, serif" font-size="44" fill="#141414" writing-mode="vertical-rl" letter-spacing="10">quiet wind</text>
      <rect id="seal" x="128" y="640" width="56" height="56" fill="#B3261E"/>
    </svg>`,
    css: `.stk { stroke-dasharray: 1; stroke-dashoffset: 1; }`,
    js: `
  tl.fromTo(".hill", { opacity: 0, y: 40 }, { opacity: (i) => [0.55, 0.6][i], y: 0, duration: 1.2, ease: "sine.out", stagger: 0.3 }, 0.1);
  tl.to(".stk", { strokeDashoffset: 0, duration: 0.22, ease: "power2.in", stagger: 0.12 }, 1.0);
  tl.fromTo(".node", { opacity: 0 }, { opacity: 1, duration: 0.05, stagger: 0.12 }, 1.2);
  gsap.utils.toArray(".leaf").forEach((l, i) => tl.fromTo(l, { scale: 0, transformOrigin: "0% 50%" }, { scale: 1, duration: 0.18, ease: "power3.out" }, 2.3 + i * 0.16));
  tl.fromTo("#poem", { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.0, ease: "none" }, 3.0);
  tl.fromTo("#seal", { opacity: 0, scale: 1.4, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.15, ease: "power4.in" }, 4.1);
  tl.to(".leaf", { rotation: "+=4", transformOrigin: "0% 50%", duration: 0.6, ease: "sine.inOut", yoyo: true, repeat: 1 }, 3.6);`,
  };
};
