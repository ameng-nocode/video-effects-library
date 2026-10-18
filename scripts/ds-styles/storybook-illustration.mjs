// Storybook illustration: a cozy painted picture-book scene with paper grain. A small round creature sits by a
// pond under soft painted mountains, flowers and leaves in front. The light moves from dawn to day to night:
// the sun crosses, the moon rises, stars and fireflies glow, and the creature waves and blinks.
export default () => {
  const flower = (x, y, c, s = 1) => `<g class="flw" data-o="${x} ${y}"><path d="M${x},${y} C${x - 4},${y - 40 * s} ${x + 4},${y - 70 * s} ${x},${y - 90 * s}" stroke="#4E7D4A" stroke-width="5" fill="none"/>${[0, 72, 144, 216, 288].map((a) => `<ellipse cx="${x}" cy="${y - 104 * s}" rx="${9 * s}" ry="${16 * s}" fill="${c}" transform="rotate(${a} ${x} ${y - 90 * s})"/>`).join("")}<circle cx="${x}" cy="${y - 90 * s}" r="${7 * s}" fill="#F6D776"/></g>`;
  const leaf = (x, y, r, s) => `<path class="lf" d="M${x},${y} C${x - 40 * s},${y - 80 * s} ${x - 10 * s},${y - 180 * s} ${x + 30 * s},${y - 220 * s} C${x + 40 * s},${y - 140 * s} ${x + 30 * s},${y - 60 * s} ${x},${y} Z" fill="#5E9C57" stroke="#2F5A35" stroke-width="4" transform="rotate(${r} ${x} ${y})"/>`;
  return {
    card: `<svg viewBox="0 0 864 1296" width="100%" height="100%" style="display:block">
      <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop id="s0" offset="0" stop-color="#F3B8C4"/><stop id="s1" offset="1" stop-color="#FCE3C8"/></linearGradient>
        <filter id="paint" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="6"/><feDisplacementMap in="SourceGraphic" scale="12"/></filter>
        <radialGradient id="glow"><stop offset="0" stop-color="#FFF6B0"/><stop offset=".35" stop-color="#FFE45C" stop-opacity=".8"/><stop offset="1" stop-color="#FFE45C" stop-opacity="0"/></radialGradient></defs>
      <rect width="864" height="1296" fill="url(#sky)"/>
      <g id="stars" fill="#FFFFFF" opacity="0">${Array.from({ length: 40 }, (_, i) => `<circle cx="${(i * 131) % 864}" cy="${30 + ((i * 89) % 480)}" r="${1.5 + (i % 3)}"/>`).join("")}</g>
      <circle id="sun" cx="0" cy="0" r="58" fill="#FFD56B"/><circle id="moon" cx="0" cy="0" r="50" fill="#F4F0DC"/>
      <g filter="url(#paint)">
        <g fill="#FFFFFF" opacity=".85" id="clouds"><ellipse cx="160" cy="220" rx="90" ry="26"/><ellipse cx="200" cy="205" rx="50" ry="26"/><ellipse cx="640" cy="150" rx="80" ry="22"/><ellipse cx="610" cy="138" rx="44" ry="22"/></g>
        <path id="m1" d="M-40,720 L120,560 L230,640 L380,470 L520,620 L640,520 L900,700 L900,800 L-40,800 Z" fill="#A79BC9"/>
        <path id="m2" d="M-40,780 L90,690 L260,760 L430,650 L600,750 L760,670 L900,760 L900,840 L-40,840 Z" fill="#8C86B8"/>
        <rect id="pond" x="-20" y="820" width="904" height="90" fill="#9CC9D9"/>
        <path id="grass" d="M-40,880 C200,860 400,900 620,870 C760,855 840,880 900,875 L900,1296 L-40,1296 Z" fill="#7DBB6A"/>
      </g>
      <g id="hero">
        <ellipse cx="432" cy="1000" rx="110" ry="22" fill="#000" opacity=".12"/>
        <path d="M352,990 C330,900 360,820 432,820 C504,820 534,900 512,990 Z" fill="#F4EEDF" stroke="#3B3328" stroke-width="5"/>
        <path d="M380,835 C366,800 372,782 390,790 C400,800 400,815 398,828 Z M484,835 C498,800 492,782 474,790 C464,800 464,815 466,828 Z" fill="#F4EEDF" stroke="#3B3328" stroke-width="5"/>
        <g id="eyes" fill="#3B3328"><ellipse cx="406" cy="900" rx="7" ry="10"/><ellipse cx="458" cy="900" rx="7" ry="10"/></g>
        <ellipse cx="390" cy="925" rx="14" ry="8" fill="#F2A7A0" opacity=".8"/><ellipse cx="474" cy="925" rx="14" ry="8" fill="#F2A7A0" opacity=".8"/>
        <path d="M424,928 Q432,936 440,928" stroke="#3B3328" stroke-width="4" fill="none"/>
        <path id="arm" d="M506,930 C540,915 556,890 552,870" stroke="#3B3328" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path d="M432,822 C436,790 456,778 470,782 C460,796 448,806 432,822 Z" fill="#7DBB6A" stroke="#3B3328" stroke-width="4"/>
      </g>
      <g id="flies">${Array.from({ length: 12 }, (_, i) => `<circle class="ff" cx="${80 + (i * 67) % 700}" cy="${700 + (i * 53) % 300}" r="26" fill="url(#glow)" opacity="0"/>`).join("")}</g>
      ${flower(160, 1180, "#F28CA6")}${flower(250, 1210, "#FFFFFF", 0.8)}${flower(640, 1190, "#B79CE8")}${flower(720, 1220, "#F28CA6", 0.8)}
      ${leaf(40, 1300, -20, 1.6)}${leaf(830, 1300, 25, 1.5)}${leaf(110, 1310, 10, 1.1)}
      <g id="vine"><path d="M560,0 C620,60 720,40 900,70" stroke="#4E3A2A" stroke-width="7" fill="none"/>${[620, 680, 740, 800].map((x, i) => `<path d="M${x},${50 + (i % 2) * 8} c-14,20 -6,44 12,52 c10,-20 4,-40 -12,-52 Z" fill="#5E9C57" stroke="#2F5A35" stroke-width="3"/>`).join("")}</g>
      <rect id="night" width="864" height="1296" fill="#1A1F4A" opacity="0" style="mix-blend-mode:multiply"/>
    </svg>
    <canvas id="grain" width="432" height="648"></canvas>`,
    css: `#grain { position: absolute; inset: 0; width: 864px; height: 1296px; mix-blend-mode: multiply; opacity: .35; }`,
    js: `
  let seed = 4; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const gc = document.getElementById("grain").getContext("2d"), gd = gc.createImageData(432, 648);
  for (let i = 0; i < 432 * 648; i++) { const v = 255 - rnd() * 70; gd.data[i * 4] = v; gd.data[i * 4 + 1] = v * 0.98; gd.data[i * 4 + 2] = v * 0.94; gd.data[i * 4 + 3] = 255; } gc.putImageData(gd, 0, 0);
  // Light cycle: dawn, day, night. Sky stops, sun and moon positions and the night tint follow the time.
  const keys = [[0, "#F3B8C4", "#FCE3C8", 0], [1.6, "#7FC4F2", "#D8F0FF", 0], [3.0, "#7FC4F2", "#D8F0FF", 0], [3.8, "#141A44", "#3B3270", 0.55], [5, "#0E1336", "#2A2660", 0.6]];
  const lerpC = (a, b, k) => "#" + [0, 2, 4].map((o) => Math.round(parseInt(a.substr(1 + o, 2), 16) * (1 - k) + parseInt(b.substr(1 + o, 2), 16) * k).toString(16).padStart(2, "0")).join("");
  const S = { t: 0 };
  const draw = () => { const t = S.t; let i = 0; while (i < keys.length - 2 && t > keys[i + 1][0]) i++;
    const [t0, a0, b0, n0] = keys[i], [t1, a1, b1, n1] = keys[i + 1]; const k = Math.min(1, Math.max(0, (t - t0) / (t1 - t0)));
    document.getElementById("s0").setAttribute("stop-color", lerpC(a0, a1, k)); document.getElementById("s1").setAttribute("stop-color", lerpC(b0, b1, k));
    document.getElementById("night").setAttribute("opacity", n0 + (n1 - n0) * k);
    const sp = Math.min(1, t / 3.6); document.getElementById("sun").setAttribute("transform", "translate(" + (100 + sp * 660) + "," + (780 - Math.sin(sp * Math.PI) * 620) + ")");
    const mp = Math.max(0, (t - 3.2) / 1.8); document.getElementById("moon").setAttribute("transform", "translate(" + (130 + mp * 200) + "," + (620 - Math.sin(Math.min(1, mp) * Math.PI / 2) * 440) + ")");
    const nightK = Math.min(1, Math.max(0, (t - 3.3) / 0.8)); document.getElementById("stars").setAttribute("opacity", nightK);
    document.querySelectorAll(".ff").forEach((f, j) => { f.setAttribute("opacity", nightK * (0.5 + 0.5 * Math.sin(t * 5 + j * 1.7)));
      f.setAttribute("transform", "translate(" + Math.sin(t * 1.3 + j) * 24 + "," + Math.cos(t * 1.1 + j * 2) * 18 + ")"); }); };
  tl.to(S, { t: 5, duration: 5, ease: "none", onUpdate: draw }, 0); draw();
  tl.fromTo("#hero", { y: 260 }, { y: 0, duration: 0.7, ease: "back.out(1.6)" }, 0.4);
  tl.to("#hero", { y: -40, duration: 0.25, ease: "power2.out", yoyo: true, repeat: 1 }, 1.8);
  tl.fromTo("#arm", { rotation: 0, svgOrigin: "506 930" }, { rotation: -22, svgOrigin: "506 930", duration: 0.2, ease: "sine.inOut", yoyo: true, repeat: 5 }, 2.3);
  [[1.2, 0.1], [1.3, 1], [3.6, 0.1], [3.7, 1]].forEach(([t, s]) => tl.set("#eyes", { scaleY: s, transformOrigin: "50% 50%" }, t));
  tl.to("#clouds", { x: 60, duration: 5, ease: "none" }, 0);
  tl.to(".lf", { rotation: "+=4", duration: 1.2, ease: "sine.inOut", yoyo: true, repeat: 3, stagger: 0.2 }, 0);
  document.querySelectorAll(".flw").forEach((f, i) => tl.fromTo(f, { rotation: -3, svgOrigin: f.dataset.o }, { rotation: 3, svgOrigin: f.dataset.o, duration: 1.1, ease: "sine.inOut", yoyo: true, repeat: 3 }, i * 0.15));`,
  };
};
