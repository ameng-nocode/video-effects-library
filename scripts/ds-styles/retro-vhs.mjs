// Retro VHS: a synthwave scene built in code (striped sun, palm trees, neon grid rushing toward you), played as a tape:
// it locks on from static, then runs with colour fringes, scan lines, a tracking band and short tears.
export default () => {
  const scene = `<div class="scene">
    <svg viewBox="0 0 864 1296" width="864" height="1296" style="display:block">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1B0B3A"/><stop offset=".55" stop-color="#6A1F8A"/><stop offset="1" stop-color="#F0508C"/></linearGradient>
        <linearGradient id="sunG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE27A"/><stop offset="1" stop-color="#FF3F8E"/></linearGradient>
      </defs>
      <rect width="864" height="760" fill="url(#sky)"/>
      <circle cx="432" cy="610" r="215" fill="url(#sunG)"/>
      <g class="gaps"></g>
      <polygon points="0,760 90,690 170,730 260,650 360,740 430,700 520,745 620,660 720,720 800,680 864,720 864,760" fill="#2A0F4A"/>
      <rect y="760" width="864" height="536" fill="#150828"/>
      <g class="grid" stroke="#FF3EA5" stroke-width="3" fill="none"></g>
      <g class="palms"><g transform="translate(40,0) scale(1,1)" fill="#12051F"><path d="M0,1296 C10,1100 30,900 70,700 L84,704 C48,900 32,1100 30,1296 Z"/><path d="M77,702 Q-3,580 -83,640 Q-3,620 77,712 Z"/><path d="M77,702 Q17,500 -43,560 Q17,540 77,712 Z"/><path d="M77,702 Q97,460 117,520 Q97,500 77,712 Z"/><path d="M77,702 Q167,500 257,560 Q167,540 77,712 Z"/><path d="M77,702 Q177,600 277,660 Q177,640 77,712 Z"/><path d="M77,702 Q47,440 17,500 Q47,480 77,712 Z"/></g><g transform="translate(830,0) scale(-1,1)" fill="#12051F"><path d="M0,1296 C10,1100 30,900 70,700 L84,704 C48,900 32,1100 30,1296 Z"/><path d="M77,702 Q-3,580 -83,640 Q-3,620 77,712 Z"/><path d="M77,702 Q17,500 -43,560 Q17,540 77,712 Z"/><path d="M77,702 Q97,460 117,520 Q97,500 77,712 Z"/><path d="M77,702 Q167,500 257,560 Q167,540 77,712 Z"/><path d="M77,702 Q177,600 277,660 Q177,640 77,712 Z"/><path d="M77,702 Q47,440 17,500 Q47,480 77,712 Z"/></g></g>
    </svg>
    <div class="chrome">MIDNIGHT</div>
    <div class="osd tl"><span class="tri"></span>PLAY</div><div class="osd tr tc">0:42:54</div><div class="osd bl">JUN 12 1989</div>
  </div>`;
  return {
    card: `<div id="vhs">
      <div class="chan" style="filter:url(#onlyR)">${scene}</div>
      <div class="chan" style="filter:url(#onlyGB)">${scene}</div>
      <div id="tear">${scene}</div>
    </div>
    <div id="scan"></div><div id="track"></div>
    <div id="static"><div class="nz"></div><div class="nz"></div><div class="nz"></div><div class="nz"></div></div>
    <svg width="0" height="0" style="position:absolute"><filter id="onlyR"><feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"/></filter><filter id="onlyGB"><feColorMatrix type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"/></filter></svg>`,
    css: `
  #card { background: #000; }
  #vhs, .chan, #tear, #static, .nz, .scene { position: absolute; inset: 0; }
  .chan { mix-blend-mode: screen; }
  #tear { clip-path: inset(44% 0 49% 0); opacity: 0; }
  .chrome { position: absolute; left: 0; right: 0; top: 190px; text-align: center; font-family: "Geist", sans-serif; font-weight: 900; font-size: 150px; letter-spacing: -.02em; transform: skewX(-12deg);
    background: linear-gradient(180deg, #F4FBFF 0%, #8FD8FF 44%, #2A1E66 50%, #FF8BD0 74%, #FFFFFF 100%); -webkit-background-clip: text; background-clip: text; color: transparent;
    -webkit-text-stroke: 3px rgba(255,255,255,.85); filter: drop-shadow(0 6px 0 #3A0E5C) drop-shadow(0 0 22px rgba(255,62,165,.7)); }
  .osd { position: absolute; font-family: "Geist Mono", monospace; font-weight: 600; font-size: 46px; color: #fff; letter-spacing: .04em; text-shadow: 0 0 6px rgba(255,255,255,.6); }
  .tl { left: 54px; top: 50px; } .tr { right: 54px; top: 50px; } .bl { left: 54px; bottom: 54px; }
  .tri { display: inline-block; width: 0; height: 0; border-left: 30px solid #fff; border-top: 18px solid transparent; border-bottom: 18px solid transparent; margin-right: 16px; vertical-align: -2px; }
  #scan { position: absolute; inset: 0; background: repeating-linear-gradient(to bottom, rgba(0,0,0,.30) 0 2px, rgba(0,0,0,0) 2px 5px); pointer-events: none; }
  #track { position: absolute; left: 0; right: 0; height: 74px; top: 0; opacity: .6; mix-blend-mode: screen; background-size: 100% 100%; }
  .nz { background-size: cover; opacity: 0; image-rendering: pixelated; }`,
    js: `
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const noise = (w, h, band) => { const c = document.createElement("canvas"); c.width = w; c.height = h; const g = c.getContext("2d"); const d = g.createImageData(w, h);
    for (let i = 0; i < w * h; i++) { const v = rnd() * 255; const k = band ? (rnd() < 0.5 ? 0 : 1) : 1; d.data[i * 4] = d.data[i * 4 + 1] = d.data[i * 4 + 2] = v * k; d.data[i * 4 + 3] = 255; } g.putImageData(d, 0, 0); return c.toDataURL(); };
  document.querySelectorAll(".nz").forEach((n) => (n.style.backgroundImage = "url(" + noise(216, 324) + ")"));
  document.getElementById("track").style.backgroundImage = "url(" + noise(432, 18, true) + ")";

  // The scene is drawn from the time, so any frame can be rendered on its own.
  const NS = "http://www.w3.org/2000/svg";
  const mk = (tag, a) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); return e; };
  const grids = [...document.querySelectorAll(".grid")], gaps = [...document.querySelectorAll(".gaps")];
  grids.forEach((g) => { for (let i = -9; i <= 9; i++) g.appendChild(mk("line", { x1: 432, y1: 760, x2: 432 + i * 150, y2: 1296 }));
    for (let i = 0; i < 10; i++) g.appendChild(mk("line", { class: "h", x1: 0, x2: 864 })); });
  gaps.forEach((g) => { for (let i = 0; i < 6; i++) g.appendChild(mk("rect", { x: 200, width: 464, fill: "#6A1F8A" })); });
  const S = { t: 0 };
  const draw = () => { const t = S.t;
    grids.forEach((g) => g.querySelectorAll(".h").forEach((l, i) => { const p = ((i + t * 1.6) % 10) / 10; const y = 760 + 536 * Math.pow(p, 2.2); l.setAttribute("y1", y); l.setAttribute("y2", y); l.setAttribute("opacity", 0.35 + p * 0.65); }));
    gaps.forEach((g) => g.querySelectorAll("rect").forEach((r, i) => { const p = ((i + t * 0.8) % 6) / 6; r.setAttribute("y", 790 - p * 210); r.setAttribute("height", 4 + (1 - p) * 16); }));
    const sec = 42 * 60 + 54 + Math.floor(t); document.querySelectorAll(".tc").forEach((e) => (e.textContent = "0:" + String(Math.floor(sec / 60)).padStart(2, "0") + ":" + String(sec % 60).padStart(2, "0")));
    document.querySelectorAll(".tri").forEach((e) => (e.style.opacity = Math.floor(t * 2) % 2 ? 0.25 : 1)); };
  tl.to(S, { t: 5, duration: 5, ease: "none", onUpdate: draw }, 0);
  draw();

  const nz = gsap.utils.toArray(".nz");
  tl.set("#static", { opacity: 1 }, 0).set("#vhs", { opacity: 0 }, 0);
  for (let i = 0; i < 12; i++) nz.forEach((n, j) => tl.set(n, { opacity: j === i % 4 ? 1 : 0 }, i * 0.05));
  tl.set("#vhs", { opacity: 1 }, 0.5);
  tl.fromTo("#vhs", { yPercent: 100 }, { yPercent: 0, duration: 0.35, ease: "steps(7)" }, 0.5);
  tl.to("#static", { opacity: 0, duration: 0.25 }, 0.55);
  const chans = gsap.utils.toArray(".chan");
  [[0.5, 14], [0.9, 4], [1.5, 6], [2.2, 16], [2.35, 3], [3.0, 5], [3.6, 12], [3.72, 3], [4.4, 6]].forEach(([t, px]) => { tl.set(chans[0], { x: px }, t); tl.set(chans[1], { x: -px * 0.6 }, t); });
  tl.fromTo("#scan", { backgroundPositionY: 0 }, { backgroundPositionY: 120, duration: 5, ease: "none" }, 0);
  tl.fromTo("#track", { y: 1300 }, { y: -90, duration: 1.7, ease: "none" }, 1.0);
  tl.fromTo("#track", { y: 1300 }, { y: -90, duration: 1.7, ease: "none" }, 3.1);
  [[2.2, 0.16, 34], [3.6, 0.12, -26]].forEach(([t, d, px]) => {
    tl.set("#tear", { opacity: 1, x: px }, t).set("#tear", { opacity: 0, x: 0 }, t + d);
    tl.set("#vhs", { y: 4 }, t).set("#vhs", { y: 0 }, t + d);
  });`,
  };
};
