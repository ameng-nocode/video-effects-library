// Anime cel shading: a hero against a bright sky, drawn with flat colour and one hard shadow tone. Speed
// lines rush past, the hair and scarf whip in the wind, and a quick action zoom flash hits on the pose.
export default () => {
  const K = "#1C1C28";
  const lines = Array.from({ length: 26 }, (_, i) => `<rect class="spd" x="${(i * 131) % 900 - 60}" y="${80 + i * 46}" width="${220 + (i * 53) % 260}" height="${4 + (i % 3) * 3}" fill="#fff" opacity=".85"/>`).join("");
  return {
    card: `<svg viewBox="0 0 864 1296" width="100%" height="100%" style="display:block">
      <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2F86F6"/><stop offset="1" stop-color="#9FD7FF"/></linearGradient></defs>
      <rect width="864" height="1296" fill="url(#sky)"/>
      <g fill="#fff"><ellipse cx="160" cy="1080" rx="260" ry="90"/><ellipse cx="700" cy="1150" rx="300" ry="110"/><ellipse cx="420" cy="1230" rx="320" ry="100"/></g>
      <g id="speed">${lines}</g>
      <g id="hero">
        <path id="scarf" d="M360,640 C300,650 220,620 130,660 C200,690 260,700 330,690 Z" fill="#E63946" stroke="${K}" stroke-width="6"/>
        <path d="M330,700 L540,700 L580,1060 L290,1060 Z" fill="#1F3A68" stroke="${K}" stroke-width="7"/>
        <path d="M430,700 L540,700 L580,1060 L470,1060 Z" fill="#152A4D"/>
        <rect x="395" y="610" width="70" height="100" fill="#F7D3B6" stroke="${K}" stroke-width="6"/>
        <path d="M330,430 C330,330 530,330 530,440 L530,560 C530,640 470,660 430,660 C390,660 330,640 330,560 Z" fill="#F7D3B6" stroke="${K}" stroke-width="7"/>
        <path d="M430,520 L530,520 L530,560 C530,640 470,660 430,660 Z" fill="#E8B898"/>
        <g fill="${K}"><path d="M370,500 l46,0 l0,40 l-46,-8 Z"/><path d="M450,500 l46,0 l0,32 l-46,8 Z"/></g>
        <g fill="#3BB3FF"><rect x="384" y="508" width="18" height="22"/><rect x="464" y="508" width="18" height="22"/></g>
        <g id="hair" fill="#F2C230" stroke="${K}" stroke-width="7" stroke-linejoin="round"><path d="M310,470 L280,360 L350,400 L340,300 L410,370 L440,270 L470,370 L540,300 L520,400 L600,380 L550,470 L530,420 L330,420 Z"/></g>
      </g>
      <rect id="flash" width="864" height="1296" fill="#fff" opacity="0"/>
    </svg>
    <div id="sfx">GO!</div>`,
    css: `#sfx { position: absolute; right: 60px; top: 140px; font-family: "Geist", sans-serif; font-weight: 900; font-size: 170px; color: #FFE14D; -webkit-text-stroke: 9px #1C1C28; paint-order: stroke fill; transform: rotate(10deg); }`,
    js: `
  tl.fromTo("#hero", { x: -700 }, { x: 0, duration: 0.5, ease: "expo.out" }, 0.2);
  tl.fromTo(".spd", { x: 900 }, { x: -900, duration: 0.6, ease: "none", stagger: { each: 0.02, repeat: 7 } }, 0);
  // Wind: hair and scarf flick in hard steps, like held anime frames.
  for (let i = 0; i < 18; i++) { tl.set("#hair", { rotation: i % 2 ? 2 : -2, svgOrigin: "430 420" }, 0.6 + i * 0.24); tl.set("#scarf", { scaleY: i % 2 ? 0.8 : 1.1, svgOrigin: "360 660" }, 0.6 + i * 0.24); }
  tl.set("#flash", { opacity: 0.9 }, 1.3).set("#flash", { opacity: 0 }, 1.36);
  tl.fromTo("#sfx", { scale: 3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: "power4.out" }, 1.35);
  [[1.5, 10], [1.55, -10], [1.6, 6], [1.65, 0]].forEach(([t, x]) => tl.set("#hero", { x }, t));`,
  };
};
