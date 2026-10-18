// Memphis: loud 80s shapes (squiggle, zigzag, half circle, striped triangle, confetti) pop in, spin and wiggle
// around a bouncing HELLO.
export default () => {
  const K = "#15171A";
  const confetti = [[90, 160, "#FF5DA2", 0], [760, 140, "#21C7B5", 30], [130, 1120, "#7A5CFF", 60], [720, 1180, "#FF5DA2", 15], [430, 120, "#21C7B5", 70], [780, 640, "#7A5CFF", 45], [80, 700, "#21C7B5", 20]]
    .map(([x, y, c, r]) => `<rect class="conf" x="${x}" y="${y}" width="44" height="16" rx="3" fill="${c}" stroke="${K}" stroke-width="3" transform="rotate(${r} ${x + 22} ${y + 8})"/>`).join("");
  return {
    card: `<svg viewBox="0 0 864 1296" width="100%" height="100%" style="display:block">
      <defs><pattern id="dots" width="36" height="36" patternUnits="userSpaceOnUse"><circle cx="6" cy="6" r="4" fill="${K}"/></pattern>
        <pattern id="stripes" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="10" height="20" fill="${K}"/></pattern></defs>
      <rect width="864" height="1296" fill="#FFF3F7"/>
      <rect id="dotpanel" x="470" y="800" width="330" height="330" fill="url(#dots)"/>
      <path id="halfc" d="M60,330 A150,150 0 0 1 360,330 Z" fill="#7A5CFF" stroke="${K}" stroke-width="6"/>
      <polygon id="tri" points="560,200 800,420 560,420" fill="url(#stripes)" stroke="${K}" stroke-width="6"/>
      <path id="squig" pathLength="1" d="M60,980 q60,-80 120,0 t120,0 t120,0 t120,0" fill="none" stroke="#FF5DA2" stroke-width="22" stroke-linecap="round"/>
      <path id="zig" pathLength="1" d="M520,1180 l50,-60 l50,60 l50,-60 l50,60 l50,-60" fill="none" stroke="#21C7B5" stroke-width="18" stroke-linejoin="round" stroke-linecap="round"/>
      <circle id="ring" cx="160" cy="470" r="62" fill="none" stroke="${K}" stroke-width="16"/>
      ${confetti}
    </svg>
    <div id="hello">${"HELLO!".split("").map((c) => `<span>${c}</span>`).join("")}</div>`,
    css: `
  #squig, #zig { stroke-dasharray: 1; stroke-dashoffset: 1; }
  #hello { position: absolute; left: 0; right: 0; top: 560px; text-align: center; font-family: "Geist", sans-serif; font-weight: 900; font-size: 190px; letter-spacing: -.03em; color: #15171A; text-shadow: 10px 10px 0 #21C7B5; }
  #hello span { display: inline-block; }`,
    js: `
  tl.fromTo("#card", { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0);
  tl.fromTo(["#halfc", "#tri", "#ring", "#dotpanel"], { scale: 0, rotation: -120, transformOrigin: "50% 50%" }, { scale: 1, rotation: 0, duration: 0.6, ease: "back.out(2)", stagger: 0.12 }, 0.15);
  tl.to(["#squig", "#zig"], { strokeDashoffset: 0, duration: 0.6, ease: "power2.out", stagger: 0.15 }, 0.6);
  tl.fromTo(".conf", { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.35, ease: "back.out(3)", stagger: 0.06 }, 0.8);
  tl.fromTo("#hello span", { y: 300, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "back.out(2.4)", stagger: 0.07 }, 1.1);
  // After the build everything keeps moving: letters bounce in a wave, shapes spin and wiggle.
  tl.to("#hello span", { y: -40, duration: 0.3, ease: "power2.out", yoyo: true, repeat: 1, stagger: 0.08 }, 2.3);
  tl.to("#hello span", { y: -40, duration: 0.3, ease: "power2.out", yoyo: true, repeat: 1, stagger: 0.08 }, 3.6);
  tl.to("#tri", { rotation: 20, transformOrigin: "50% 50%", duration: 0.5, ease: "sine.inOut", yoyo: true, repeat: 4 }, 2.1);
  tl.to("#ring", { x: -30, duration: 0.6, ease: "sine.inOut", yoyo: true, repeat: 3 }, 2.1);
  tl.to(".conf", { rotation: "+=180", transformOrigin: "50% 50%", duration: 2.6, ease: "none" }, 2.0);
  tl.to("#squig", { y: 20, duration: 0.5, ease: "sine.inOut", yoyo: true, repeat: 4 }, 2.2);`,
  };
};
