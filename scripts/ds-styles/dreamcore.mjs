// Dreamcore: an empty pastel room that feels like a dream. Clouds drift through the room, a door stands
// open onto a bright sky, light softly breathes, and a quiet line of words fades in and out.
export default () => ({
  card: `<svg viewBox="0 0 864 1296" width="100%" height="100%" style="display:block">
      <defs><linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F7E8F0"/><stop offset="1" stop-color="#EAD9F2"/></linearGradient>
        <linearGradient id="flr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D9EAF7"/><stop offset="1" stop-color="#BFD9F0"/></linearGradient>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9FD3FF"/><stop offset="1" stop-color="#F3FBFF"/></linearGradient>
        <radialGradient id="glow"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
      <rect width="864" height="1296" fill="url(#wall)"/>
      <polygon points="0,880 864,880 864,1296 0,1296" fill="url(#flr)"/>
      <g stroke="#C9DBEE" stroke-width="2">${Array.from({ length: 9 }, (_, i) => `<line x1="${432 + (i - 4) * 60}" y1="880" x2="${432 + (i - 4) * 260}" y2="1296"/>`).join("")}</g>
      <rect x="312" y="470" width="240" height="410" fill="url(#sky)"/>
      <rect id="doorleaf" x="312" y="470" width="240" height="410" fill="#FFFFFF" stroke="#E6D6EA" stroke-width="6"/>
      <rect x="306" y="464" width="252" height="416" fill="none" stroke="#F2E4EF" stroke-width="12"/>
      <ellipse id="beam" cx="432" cy="980" rx="220" ry="70" fill="url(#glow)"/>
      <g id="clouds" fill="#FFFFFF">
        <g class="cl"><ellipse cx="160" cy="330" rx="110" ry="46"/><ellipse cx="210" cy="300" rx="70" ry="50"/></g>
        <g class="cl"><ellipse cx="680" cy="250" rx="90" ry="38"/><ellipse cx="640" cy="228" rx="60" ry="42"/></g>
        <g class="cl"><ellipse cx="560" cy="760" rx="80" ry="34"/><ellipse cx="600" cy="740" rx="50" ry="36"/></g>
      </g>
    </svg>
    <div id="haze"></div>
    <div id="words">have you been here before?</div>`,
  css: `
  #haze { position: absolute; inset: 0; background: radial-gradient(70% 50% at 50% 50%, rgba(255,255,255,0), rgba(255,240,250,.6)); }
  #words { position: absolute; left: 0; right: 0; top: 1060px; text-align: center; font-family: Georgia, serif; font-style: italic; font-size: 46px; color: #8C7FA8; letter-spacing: .02em; }
  svg { filter: blur(.6px); }`,
  js: `
  tl.fromTo("#card", { opacity: 0, filter: "blur(16px)" }, { opacity: 1, filter: "blur(0px)", duration: 1.4, ease: "sine.out" }, 0);
  // The door swings open onto the sky.
  tl.fromTo("#doorleaf", { scaleX: 1, transformOrigin: "0% 50%" }, { scaleX: 0.18, duration: 1.6, ease: "power2.inOut" }, 1.0);
  gsap.utils.toArray(".cl").forEach((c, i) => tl.fromTo(c, { x: i % 2 ? 80 : -80 }, { x: i % 2 ? -80 : 80, duration: 5, ease: "none" }, 0));
  tl.fromTo("#beam", { opacity: 0 }, { opacity: 1, duration: 1.2, ease: "sine.inOut", yoyo: true, repeat: 2 }, 1.6);
  tl.fromTo("#words", { opacity: 0 }, { opacity: 1, duration: 1.0, ease: "sine.inOut" }, 2.6);`,
});
