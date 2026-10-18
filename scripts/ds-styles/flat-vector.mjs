// Flat vector: a person at a desk with a laptop and a plant, all flat shapes with no shadows. Things pop in,
// the person waves, a chat bubble says Hi, lines type on the screen and the plant sways.
export default () => ({
  card: `<svg viewBox="0 0 864 1296" width="100%" height="100%" style="display:block">
    <rect width="864" height="1296" fill="#E8F1FF"/>
    <circle id="bgc" cx="432" cy="640" r="330" fill="#CFE0FF"/>
    <g id="plant"><rect x="640" y="760" width="110" height="110" rx="12" fill="#FF7A9A"/>
      <g id="leaves"><path d="M695,760 C640,690 650,620 695,580 C740,620 750,690 695,760 Z" fill="#2BB673"/><path d="M695,760 C620,730 600,680 620,640 C670,650 700,700 695,760 Z" fill="#23A065"/><path d="M695,760 C770,730 790,680 770,640 C720,650 690,700 695,760 Z" fill="#23A065"/></g></g>
    <g id="person">
      <rect x="250" y="660" width="220" height="260" rx="90" fill="#4F6BFF"/>
      <rect x="335" y="610" width="50" height="70" rx="20" fill="#F2B48C"/>
      <circle cx="360" cy="540" r="95" fill="#F2B48C"/>
      <path d="M265,540 C265,440 350,420 400,430 C460,440 470,500 455,520 C420,490 330,500 300,560 Z" fill="#2B2D42"/>
      <circle cx="390" cy="545" r="9" fill="#2B2D42"/><path d="M370,585 Q392,600 412,585" stroke="#2B2D42" stroke-width="7" fill="none" stroke-linecap="round"/>
      <g id="arm"><rect x="430" y="680" width="44" height="180" rx="22" fill="#4F6BFF" transform="rotate(-150 452 700)"/><circle cx="545" cy="545" r="30" fill="#F2B48C"/></g>
    </g>
    <rect x="140" y="870" width="640" height="34" rx="10" fill="#2B2D42"/>
    <rect x="200" y="904" width="26" height="300" fill="#2B2D42"/><rect x="690" y="904" width="26" height="300" fill="#2B2D42"/>
    <g id="laptop"><path d="M240,870 L290,740 L520,740 L470,870 Z" fill="#9AA6B8"/><rect class="ln" x="320" y="770" width="120" height="12" rx="6" fill="#fff"/><rect class="ln" x="310" y="800" width="90" height="12" rx="6" fill="#fff"/><rect class="ln" x="300" y="830" width="140" height="12" rx="6" fill="#fff"/></g>
    <g id="bubble"><rect x="520" y="300" width="230" height="150" rx="40" fill="#fff"/><path d="M560,440 L540,500 L610,445 Z" fill="#fff"/>
      <text x="635" y="400" text-anchor="middle" font-family="Geist, sans-serif" font-weight="800" font-size="78" fill="#2B2D42">Hi!</text></g>
  </svg>`,
  js: `
  tl.fromTo("#card", { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0);
  tl.fromTo("#bgc", { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.6, ease: "back.out(1.6)" }, 0.1);
  tl.fromTo("#person", { y: 500 }, { y: 0, duration: 0.6, ease: "back.out(1.4)" }, 0.4);
  tl.fromTo("#laptop", { scale: 0, transformOrigin: "50% 100%" }, { scale: 1, duration: 0.4, ease: "back.out(2)" }, 0.8);
  tl.fromTo("#plant", { scale: 0, transformOrigin: "50% 100%" }, { scale: 1, duration: 0.45, ease: "back.out(2)" }, 0.95);
  // Wave: the arm swings back and forth from the shoulder.
  tl.fromTo("#arm", { rotation: 0, svgOrigin: "452 700" }, { rotation: -16, svgOrigin: "452 700", duration: 0.22, ease: "sine.inOut", yoyo: true, repeat: 7 }, 1.3);
  tl.fromTo("#bubble", { scale: 0, transformOrigin: "20% 100%" }, { scale: 1, duration: 0.45, ease: "back.out(2.6)" }, 1.5);
  tl.fromTo(".ln", { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.35, ease: "power2.out", stagger: 0.35 }, 2.2);
  tl.to("#leaves", { rotation: 6, svgOrigin: "695 760", duration: 0.7, ease: "sine.inOut", yoyo: true, repeat: 4 }, 1.5);`,
});
