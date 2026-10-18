// Builds one HyperFrames scene per text animation: plain HTML text on the same light stage colour
// and the same labels as the motion graphic clips. GSAP drives everything from one paused timeline
// (seek-safe); effects that need per-frame logic use a 0 to 5 s driver tween with onUpdate.
// Reads data/text.json (written by scripts/text-data.mjs); writes previews/text/<id>/index.html
// and the review page previews/text.html.
// Usage: node scripts/build-text.mjs [id ...]   then   bash scripts/build-text-render.sh <id> [id ...]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const items = JSON.parse(fs.readFileSync(path.join(root, "data/text.json"), "utf8"));
const want = process.argv.slice(2);
const W = 1080, H = 1920, DURATION = 5;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");

// Per effect: `css`, `html` (inside the centred #fx block), `js` (adds tweens to `tl`).
// Inside `js`: tl, gsap, chars(sel), words(sel), rand(seed), drive(fn).
const SCENES = {
  "letter-fade": {
    html: `<div class="t xl split">Hello</div><div class="t xl split">there</div>`,
    js: `
  tl.fromTo(chars(".split"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.06 }, 0.5);`,
  },

  "blur-in": {
    html: `<div class="t xl split">Into</div><div class="t xl split">focus</div>`,
    js: `
  tl.fromTo(chars(".split"), { opacity: 0, y: 30, filter: "blur(24px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "expo.out", stagger: 0.04 }, 0.5);`,
  },

  "word-pop": {
    html: `<div class="t xl words">Big news</div><div class="t xl words red">today</div>`,
    js: `
  tl.fromTo(words(".words"), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2.2)", stagger: 0.25 }, 0.5);`,
  },

  "line-by-line": {
    css: `.lbl .t { font-size: 150px; text-align: left; }`,
    html: `<div class="lbl"><div class="t ln">Start small.</div><div class="t ln">Stay with it.</div><div class="t ln red">Get better.</div></div>`,
    js: `
  tl.fromTo(".ln", { opacity: 0, x: -80 }, { opacity: 1, x: 0, duration: 0.9, ease: "expo.out", stagger: 0.35 }, 0.5);`,
  },

  "tracking-in": {
    css: `#tr { font-size: 190px; white-space: nowrap; letter-spacing: .02em; }`,
    html: `<div class="t" id="tr">BREATHE</div>`,
    js: `
  tl.fromTo("#tr", { letterSpacing: "0.9em" }, { letterSpacing: "0.02em", duration: 1.6, ease: "power3.out" }, 0.5);
  tl.fromTo("#tr", { opacity: 0, filter: "blur(12px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.9, ease: "power2.out" }, 0.5);`,
  },

  "flip-in": {
    html: `<div class="t xl split">Turn it</div><div class="t xl split red">up</div>`,
    js: `
  const cs = chars(".split");
  gsap.set(cs, { transformPerspective: 800, transformOrigin: "50% 100%" });
  tl.fromTo(cs, { rotationX: -100 }, { rotationX: 0, duration: 0.8, ease: "back.out(1.7)", stagger: 0.07 }, 0.5);
  tl.fromTo(cs, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "none", stagger: 0.07 }, 0.5);`,
  },

  typewriter: {
    css: `#tw { width: 900px; font-size: 168px; text-align: left; white-space: pre-line; min-height: 2.1em; }
  #tw i { display: inline-block; width: .09em; height: .82em; margin-left: .05em; background: #C93A30; vertical-align: -.06em; }`,
    html: `<div class="t" id="tw"></div>`,
    js: `
  const TEXT = "Just start\\ntyping.";
  const el = document.getElementById("tw");
  const START = 0.6, STEP = 0.09, END = START + TEXT.length * STEP;
  drive((t) => {
    const n = t < START ? 0 : Math.min(TEXT.length, Math.floor((t - START) / STEP) + 1);
    const typing = t >= START && t < END;
    const on = typing || Math.floor(t / 0.5) % 2 === 0;
    el.innerHTML = TEXT.slice(0, n).replace(/&/g, "&amp;") + '<i style="opacity:' + (on ? 1 : 0) + '"></i>';
  });`,
  },

  scramble: {
    css: `#sc { font-family: "Geist Mono", monospace; font-weight: 600; font-size: 118px; letter-spacing: -.02em; white-space: pre; }
  #sc span.g { color: #9AA0A8; }`,
    html: `<div class="t" id="sc"></div>`,
    js: `
  const TEXT = "Signal found";
  const POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const el = document.getElementById("sc");
  drive((t) => {
    let html = "";
    for (let i = 0; i < TEXT.length; i++) {
      const c = TEXT[i];
      if (c === " ") { html += " "; continue; }
      if (t < 0.5) { html += '<span style="opacity:0">' + c + "</span>"; continue; }
      if (t >= 0.8 + i * 0.1) { html += "<span>" + c + "</span>"; continue; }
      const r = rand(i * 977 + Math.floor(t / 0.05) * 131)();
      html += '<span class="g">' + POOL[Math.floor(r * POOL.length)] + "</span>";
    }
    el.innerHTML = html;
  });`,
  },

  "rotating-words": {
    css: `.rw .t { text-align: left; font-size: 190px; }
  .rw .slot { position: relative; height: 1.08em; overflow: hidden; }
  .rw .slot span { position: absolute; left: 0; top: 0; }`,
    html: `<div class="rw"><div class="t">Make it</div><div class="t slot"><span id="r1">simple</span><span id="r2">faster</span><span id="r3" class="red">better</span></div></div>`,
    js: `
  gsap.set(["#r2", "#r3"], { yPercent: 110 });
  tl.fromTo("#r1", { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: "power3.out" }, 0.5);
  const swap = (a, b, at) => {
    tl.to(a, { yPercent: -110, opacity: 0, duration: 0.55, ease: "power3.inOut" }, at);
    tl.fromTo(b, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: "power3.inOut" }, at);
  };
  swap("#r1", "#r2", 1.6);
  swap("#r2", "#r3", 2.8);`,
  },

  wave: {
    html: `<div class="t xl split">Ride the</div><div class="t xl split red">wave</div>`,
    js: `
  chars(".split").forEach((c, i) => {
    tl.fromTo(c, { y: 0 }, { y: -40, duration: 0.6, ease: "sine.inOut", yoyo: true, repeat: 7 }, 0.5 + i * 0.07);
  });`,
  },

  highlighter: {
    css: `.hl { position: relative; display: inline-block; isolation: isolate; }
  .hl b { position: absolute; left: -.06em; right: -.06em; top: .2em; bottom: .02em; background: #F2C6C0; border-radius: .08em .14em .1em .16em; transform: rotate(-1.2deg) scaleX(0); transform-origin: 0 50%; z-index: -1; }`,
    html: `<div class="t lg">Read the</div><div class="t lg"><span class="hl">important<b id="h1"></b></span></div><div class="t lg">part <span class="hl">first.<b id="h2"></b></span></div>`,
    js: `
  tl.fromTo("#h1", { scaleX: 0 }, { scaleX: 1, rotation: -1.2, duration: 0.6, ease: "power2.inOut" }, 0.8);
  tl.fromTo("#h2", { scaleX: 0 }, { scaleX: 1, rotation: -1.2, duration: 0.4, ease: "power2.inOut" }, 1.6);`,
  },

  "underline-draw": {
    css: `.ul { position: relative; display: inline-block; }
  .ul svg { position: absolute; left: -2%; top: 88%; overflow: visible; }
  .ul path { fill: none; stroke: #C93A30; stroke-linecap: round; stroke-linejoin: round; }`,
    html: `<div class="t lg">Remember</div><div class="t lg"><span class="ul" id="ul">this one.<svg>
      <path id="u1" pathLength="1" stroke-width="16" />
      <path id="u2" pathLength="1" stroke-width="9" />
    </svg></span></div>`,
    js: `
  // The path is drawn in real pixels (no stretching), so the dash trick draws one clean line.
  // Laid out on every frame so it always matches the loaded font width.
  const span = document.getElementById("ul"), svg = span.querySelector("svg");
  drive(() => {
  const w = span.offsetWidth * 1.04, h = 56, X = (v) => (v / 100 * w).toFixed(1), Y = (v) => (v / 20 * h).toFixed(1);
  svg.setAttribute("width", w); svg.setAttribute("height", h); svg.setAttribute("viewBox", "0 0 " + w + " " + h);
  document.getElementById("u1").setAttribute("d", "M" + X(1) + " " + Y(9) + " C " + X(20) + " " + Y(6) + ", " + X(45) + " " + Y(5) + ", " + X(70) + " " + Y(7) + " S " + X(95) + " " + Y(9) + ", " + X(99) + " " + Y(6));
  document.getElementById("u2").setAttribute("d", "M" + X(97) + " " + Y(12) + " C " + X(75) + " " + Y(14) + ", " + X(50) + " " + Y(12) + ", " + X(28) + " " + Y(13) + " S " + X(6) + " " + Y(15) + ", " + X(3) + " " + Y(13));
  });
  gsap.set(["#u1", "#u2"], { strokeDasharray: 1, strokeDashoffset: 1 });
  tl.to("#u1", { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut" }, 0.8);
  tl.to("#u2", { strokeDashoffset: 0, duration: 0.5, ease: "power2.inOut" }, 1.45);`,
  },

  "text-shimmer": {
    css: `.sh { background: linear-gradient(90deg, #A1A6AE 0%, #A1A6AE 40%, #15171A 50%, #A1A6AE 60%, #A1A6AE 100%); background-size: 300% 100%; background-position: 100% 0; -webkit-background-clip: text; background-clip: text; color: transparent; }`,
    html: `<div class="t lg sh">Thinking</div><div class="t lg sh">it over</div>`,
    js: `
  for (const at of [0.5, 2.0, 3.5]) {
    tl.fromTo(".sh", { backgroundPosition: "100% 0%" }, { backgroundPosition: "0% 0%", duration: 1.5, ease: "none", immediateRender: false }, at);
  }`,
  },

  "rubber-band": {
    css: `#rb { font-size: 260px; display: inline-block; }`,
    html: `<div class="t red" id="rb">Boing!</div>`,
    js: `
  tl.fromTo("#rb", { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "none" }, 0.3);
  const band = { "0%": { scaleX: 1, scaleY: 1 }, "30%": { scaleX: 1.25, scaleY: 0.75 }, "40%": { scaleX: 0.75, scaleY: 1.25 }, "50%": { scaleX: 1.15, scaleY: 0.85 }, "65%": { scaleX: 0.95, scaleY: 1.05 }, "75%": { scaleX: 1.05, scaleY: 0.95 }, "100%": { scaleX: 1, scaleY: 1 }, easeEach: "sine.inOut" };
  tl.to("#rb", { keyframes: band, duration: 1, ease: "none" }, 0.8);
  tl.to("#rb", { keyframes: band, duration: 1, ease: "none" }, 2.8);`,
  },

  "blur-out": {
    html: `<div class="t xl words">See you</div><div class="t xl words">soon.</div>`,
    js: `
  const ws = words(".words");
  tl.fromTo(ws, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" }, 0.3);
  tl.to(ws, { y: -40, opacity: 0, filter: "blur(16px)", duration: 0.8, ease: "power3.in", stagger: 0.15 }, 2.0);`,
  },

  "text-explode": {
    css: `#ex { font-size: 280px; white-space: nowrap; }`,
    html: `<div class="t split" id="ex">BOOM</div>`,
    js: `
  const cs = chars("#ex");
  const r = rand(7);
  const n = cs.length;
  const P = cs.map((c, i) => {
    const side = (i + 0.5) / n - 0.5;                    // -0.5 left ... 0.5 right
    const a = (90 - side * 120 + (r() - 0.5) * 30) * Math.PI / 180;
    const v = 1400 + r() * 800;
    return { c, vx: Math.cos(a) * v, vy: -Math.sin(a) * v, spin: (360 + r() * 360) * (r() < 0.5 ? -1 : 1) };
  });
  drive((t) => {
    for (const p of P) {
      let x = 0, y = 0, rot = 0, o = 1, s = 1;
      if (t >= 1.2 && t < 1.5) { const k = Math.min(1, (t - 1.2) / 0.25); x = Math.sin(t * 95) * 6 * (k < 1 ? 1 : 0.5); y = Math.cos(t * 83) * 4; }
      if (t >= 1.5 && t < 3.4) { const d = t - 1.5; x = p.vx * d; y = p.vy * d + 1300 * d * d; rot = p.spin * d; o = Math.max(0, 1 - d / 1.2); }
      if (t >= 3.4) { const k = Math.min(1, (t - 3.4) / 0.5); const e = 1 - Math.pow(1 - k, 3); o = e; s = 0.9 + 0.1 * e; }
      p.c.style.transform = "translate(" + x + "px," + y + "px) rotate(" + rot + "deg) scale(" + s + ")";
      p.c.style.opacity = o;
    }
  });`,
  },

  "karaoke-captions": {
    css: `#kc { font-size: 126px; }`,
    html: `<div class="t" id="kc"><div class="kw">You only need</div><div class="kw">one small start.</div></div>`,
    js: `
  const ws = words(".kw");
  tl.fromTo("#kc", { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "none" }, 0.4);
  ws.forEach((w, i) => tl.to(w, { color: "#C93A30", duration: 0.08, ease: "none" }, 0.8 + i * 0.38));`,
  },

  "word-by-word": {
    css: `.wbw { position: relative; width: 1000px; height: 300px; }
  .wbw span { position: absolute; left: 0; right: 0; top: 0; font-size: 250px; visibility: hidden; }`,
    html: `<div class="wbw t"><span>This</span><span>is</span><span>how</span><span>you</span><span>say</span><span class="red">it.</span></div>`,
    js: `
  const ws = [...document.querySelectorAll(".wbw span")];
  ws.forEach((w, i) => {
    const at = 0.4 + i * 0.45;
    tl.set(w, { visibility: "visible" }, at);
    if (i > 0) tl.set(ws[i - 1], { visibility: "hidden" }, at);
    tl.fromTo(w, { scale: 0.85 }, { scale: 1, duration: 0.12, ease: "power2.out", immediateRender: false }, at);
  });`,
  },

  "highlight-box": {
    css: `.hb { position: relative; font-size: 160px; }
  .hb .ink, .hb .white { position: relative; z-index: 1; }
  .hb .white { position: absolute; left: 0; top: 0; width: 100%; z-index: 2; color: #FFFFFF; clip-path: inset(0 100% 100% 0); }
  #box { position: absolute; left: 0; top: 0; background: #C93A30; border-radius: 22px; z-index: 0; visibility: hidden; }`,
    html: `<div class="t hb" id="hb"><i id="box"></i><div class="ink"><div class="hw">Small steps</div><div class="hw">every day.</div></div><div class="white" id="hbw"><div>Small steps</div><div>every day.</div></div></div>`,
    js: `
  // The white copy of the caption only shows inside the box, so the spoken word reads white on red.
  const ws = words(".hw");
  const box = document.getElementById("box"), white = document.getElementById("hbw"), hb = document.getElementById("hb");
  tl.fromTo("#hb", { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "none" }, 0.4);
  const PADX = 22, PADY = 4;
  drive((t) => {
    // Measured every frame so it matches the loaded font.
    const R = ws.map((w) => ({ x: w.offsetLeft - PADX, y: w.offsetTop - PADY, w: w.offsetWidth + PADX * 2, h: w.offsetHeight + PADY * 2 }));
    if (t < 0.6) { box.style.visibility = "hidden"; white.style.clipPath = "inset(0 100% 100% 0)"; return; }
    const k = Math.min(ws.length - 1, Math.floor((t - 0.6) / 0.5));
    const p = Math.min(1, (t - 0.6 - k * 0.5) / 0.15), e = 1 - (1 - p) * (1 - p);
    const a = R[Math.max(0, k - 1)], b = R[k], m = (u, v) => u + (v - u) * e;
    const sc = k === 0 ? 0.7 + 0.3 * e : 1;
    let x = m(a.x, b.x), y = m(a.y, b.y), w = m(a.w, b.w), h = m(a.h, b.h);
    x += (w - w * sc) / 2; y += (h - h * sc) / 2; w *= sc; h *= sc;
    box.style.visibility = "visible";
    Object.assign(box.style, { left: x + "px", top: y + "px", width: w + "px", height: h + "px" });
    const W = hb.offsetWidth, H = hb.offsetHeight;
    white.style.clipPath = "inset(" + y + "px " + (W - x - w) + "px " + (H - y - h) + "px " + x + "px round 22px)";
  });`,
  },

  "keyword-captions": {
    css: `.kwc { position: relative; width: 1000px; height: 360px; }
  .kwc div { position: absolute; left: 0; right: 0; top: 50%; transform: translateY(-50%); font-size: 132px; font-weight: 800; letter-spacing: -.02em; visibility: hidden; }
  .kwc .key { font-size: 172px; color: #C93A30; }`,
    html: `<div class="kwc t"><div>STOP WAITING</div><div>FOR THE</div><div class="key">PERFECT</div><div>MOMENT</div></div>`,
    js: `
  const cs = [...document.querySelectorAll(".kwc div")];
  gsap.set(cs, { yPercent: -50 });
  [0.4, 1.3, 2.2, 3.1].forEach((at, i) => {
    tl.set(cs[i], { visibility: "visible" }, at);
    if (i > 0) tl.set(cs[i - 1], { visibility: "hidden" }, at);
    tl.fromTo(cs[i], { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2, ease: "back.out(2)", immediateRender: false }, at);
  });
  tl.fromTo(cs[2], { scale: 0.5 }, { scale: 1.15, duration: 0.2, ease: "power2.out", immediateRender: false }, 2.2);
  tl.to(cs[2], { scale: 1, duration: 0.15, ease: "power2.inOut" }, 2.4);`,
  },

  "weight-morph": {
    css: `#wm { font-size: 230px; font-weight: 200; letter-spacing: -.03em; }`,
    html: `<div class="t" id="wm">Weight</div>`,
    js: `
  chars("#wm").forEach((c, i) => {
    tl.fromTo(c, { fontWeight: 200 }, { fontWeight: 900, duration: 0.6, ease: "sine.inOut", yoyo: true, repeat: 7 }, 0.5 + i * 0.08);
  });`,
  },

  "circular-text": {
    css: `#ct { width: 760px; height: 760px; overflow: visible; }
  #ct text { font-family: "Geist", sans-serif; font-weight: 700; font-size: 66px; fill: #15171A; letter-spacing: .06em; }`,
    html: `<svg id="ct" viewBox="-380 -380 760 760"><defs><path id="ring" d="M -280 0 a 280 280 0 1 1 560 0 a 280 280 0 1 1 -560 0" /></defs>
    <g id="ctg"><text><textPath href="#ring" textLength="1740" lengthAdjust="spacing">ROUND AND ROUND AND ROUND AND&#160;</textPath></text></g>
    <circle r="34" fill="#C93A30" /></svg>`,
    js: `
  tl.fromTo("#ctg", { scale: 0.8, rotation: -60, opacity: 0, svgOrigin: "0 0" }, { scale: 1, rotation: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0.4);
  tl.fromTo("#ct circle", { scale: 0, svgOrigin: "0 0" }, { scale: 1, duration: 0.5, ease: "back.out(2)" }, 0.6);
  tl.to("#ctg", { rotation: 36 * 3.8, duration: 3.8, ease: "none", svgOrigin: "0 0" }, 1.2);`,
  },

  "stagger-center": {
    css: `#sc2 { font-size: 200px; }`,
    html: `<div class="t" id="sc2">Centered</div>`,
    js: `
  tl.fromTo(chars("#sc2"), { opacity: 0, y: 40, filter: "blur(6px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "expo.out", stagger: { each: 0.06, from: "center" } }, 0.5);`,
  },

  "neon-flicker": {
    css: `.panel { background: #15171A; border-radius: 48px; padding: 90px 110px 100px; box-shadow: 0 30px 70px rgba(21,23,26,.25); }
  .nf { font-family: "Geist", sans-serif; font-weight: 500; font-size: 190px; letter-spacing: .06em; line-height: 1.05; text-align: center; color: #3A3E46; }
  .nf .on { color: #FFE9E6; text-shadow: 0 0 6px #FF6B5E, 0 0 18px #FF3B30, 0 0 42px rgba(255,59,48,.75), 0 0 90px rgba(255,59,48,.5); }`,
    html: `<div class="panel"><div class="nf"><span class="w">OPEN</span><br><span class="w">LA</span><span class="w" id="nT">T</span><span class="w">E</span></div></div>`,
    js: `
  const all = [...document.querySelectorAll(".nf .w")];
  const T = document.getElementById("nT");
  const set = (els, on, at) => tl.set(els, { attr: { class: on ? "w on" : "w" } }, at);
  [[0.6, 1], [0.68, 0], [0.75, 1], [0.9, 0], [1.0, 1], [1.1, 0], [1.3, 1]].forEach(([at, on]) => set(all, on, at));
  [[3.0, 0], [3.08, 1], [3.18, 0], [3.3, 1]].forEach(([at, on]) => set(T, on, at));`,
  },
};

// 3D text: Three.js scenes on the same studio sweep as the motion graphics, text from TextGeometry.
// Inside `js`: THREE, scene, camera, tl, makeText(word, opts), clay(hex), env (studio reflections), and an
// optional `function frame(t)` that runs after every seek.
const THREE_SCENES = {
  "extruded-3d": {
    js: `
  const t3 = makeText("BOLD", { width: 2.8, depth: 0.9, mat: clay(0xc93a30, 0.62) });
  t3.position.y = 1.9;
  tl.fromTo(t3.position, { y: 0.9 }, { y: 1.9, duration: 0.9, ease: "power3.out" }, 0.5);
  tl.fromTo(t3.rotation, { y: 50 * D }, { y: 20 * D, duration: 0.9, ease: "power3.out" }, 0.5);
  tl.fromTo(t3.scale, { x: 0.001, y: 0.001, z: 0.001 }, { x: 1, y: 1, z: 1, duration: 0.5, ease: "power3.out" }, 0.5);
  tl.to(t3.rotation, { y: -20 * D, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: 1 }, 1.4);`,
  },

  "chrome-text": {
    env: "chrome",
    js: `
  const chrome = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 1, roughness: 0.08, envMapIntensity: 1.1, transparent: true });
  const t3 = makeText("SHINE", { width: 2.9, depth: 0.55, mat: chrome });
  t3.position.y = 1.9;
  tl.fromTo(chrome, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "none" }, 0.3);
  tl.fromTo(t3.rotation, { y: -30 * D }, { y: 30 * D, duration: 4, ease: "sine.inOut" }, 0.5);`,
  },

  "glass-text": {
    env: true,
    js: `
  // Striped back wall that slides left, so the bending through the glass is easy to see.
  const cv = document.createElement("canvas"); cv.width = 512; cv.height = 64;
  const g = cv.getContext("2d");
  const cols = ["#C93A30", "#E9ECF0", "#15171A", "#E9ECF0"];
  for (let i = 0; i < 8; i++) { g.fillStyle = cols[i % 4]; g.fillRect(i * 64, 0, 64, 64); }
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace; tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(2.5, 1);
  const wall = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 1.9), new THREE.MeshBasicMaterial({ map: tex }));
  wall.position.set(0, 1.9, -1.4);
  scene.add(wall);
  const glass = new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0, roughness: 0.05, transmission: 1, thickness: 0.6, ior: 1.5, envMapIntensity: 1, transparent: true });
  const t3 = makeText("GLASS", { width: 2.9, depth: 0.7, mat: glass });
  t3.position.y = 1.9;
  tl.fromTo(glass, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "none" }, 0.3);
  tl.fromTo(t3.rotation, { y: -15 * D }, { y: 15 * D, duration: 4, ease: "sine.inOut" }, 0.5);
  function frame(t) { tex.offset.x = t * 0.18; }`,
  },

  "text-spin": {
    js: `
  const t3 = makeText("SPIN", { width: 2.8, depth: 0.7, mat: [clay(0xf1f0ec), clay(0xc93a30, 0.7)] });
  t3.position.y = 1.9;
  tl.fromTo(t3.rotation, { y: -540 * D }, { y: 0, duration: 1.6, ease: "expo.out" }, 0.5);
  tl.fromTo(t3.scale, { x: 0.6, y: 0.6, z: 0.6 }, { x: 1, y: 1, z: 1, duration: 1.6, ease: "expo.out" }, 0.5);
  tl.set(t3, { visible: true }, 0.5);
  tl.set(t3, { visible: false }, 0);`,
  },
};

const FONT_JSON = fs.readFileSync(path.join(root, "scripts/fonts/helvetiker_bold.typeface.json"), "utf8");

function page3d(it) {
  const s = THREE_SCENES[it.id];
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=${W}, height=${H}" />
<title>${esc(it.name)}</title>
<style>
  @font-face { font-family: "Geist"; src: url("Geist.woff2") format("woff2"); font-weight: 100 900; }
  @font-face { font-family: "Geist Mono"; src: url("Geist-Mono.woff2") format("woff2"); font-weight: 100 900; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${W}px; height: ${H}px; overflow: hidden; background: #E9ECF0; }
  #root { position: relative; width: ${W}px; height: ${H}px; overflow: hidden; }
  #set { position: absolute; inset: 0; width: ${W}px; height: ${H}px; display: block; }
  .label { position: absolute; left: 72px; font-family: "Geist", sans-serif; color: #15171A; }
</style>
</head>
<body>
<div id="root" data-composition-id="${it.id}" data-start="0" data-width="${W}" data-height="${H}" data-duration="${DURATION}">
  <canvas id="set" width="${W * 1.5}" height="${H * 1.5}"></canvas>
  <div style="position:absolute;left:0;right:0;bottom:0;height:520px;background:linear-gradient(to top, rgba(233,236,240,.96), rgba(233,236,240,0));"></div>
  <div class="label" style="top:88px;font-family:'Geist Mono',monospace;font-size:28px;font-weight:500;letter-spacing:.14em;color:#5B616B;">TEXT ANIMATION ${it.no}</div>
  <div class="label" style="bottom:196px;font-size:118px;font-weight:700;letter-spacing:-.03em;line-height:1;">${esc(it.name)}</div>
  <div class="label" style="bottom:128px;font-size:36px;font-weight:500;color:#5B616B;">${esc(it.line)}</div>
</div>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<script type="importmap">
  { "imports": { "three": "https://cdn.jsdelivr.net/npm/three@0.181.2/build/three.module.js", "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.181.2/examples/jsm/" } }
</script>
<script type="module">
  import * as THREE from "three";
  import { FontLoader } from "three/addons/loaders/FontLoader.js";
  import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
  import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

  const gl = document.createElement("canvas");
  const renderer = new THREE.WebGLRenderer({ canvas: gl, antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(1.5);
  renderer.setSize(${W}, ${H}, false);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const out = document.getElementById("set").getContext("2d");

  const scene = new THREE.Scene();
  const SKY = 0xe9ecf0;
  scene.background = new THREE.Color(SKY);
  scene.fog = new THREE.Fog(SKY, 22, 60);
  const D = Math.PI / 180;

  // Same light as the motion graphics stage: a low warm sun for soft shadows, a cool sky fill.
  scene.add(new THREE.HemisphereLight(0xf4f7fb, 0xb9b4ad, 1.35));
  const sun = new THREE.DirectionalLight(0xfff1e2, 2.5);
  sun.position.set(-3.5, 14, 6);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.radius = 7;
  sun.shadow.bias = -0.0004;
  Object.assign(sun.shadow.camera, { left: -9, right: 9, top: 9, bottom: -9, near: 1, far: 40 });
  scene.add(sun);
  // Chrome needs strong contrast to read as mirror metal: bright sky, dark floor, white softbox strips.
  const chromeEnv = () => {
    const c = document.createElement("canvas"); c.width = 1024; c.height = 512;
    const g = c.getContext("2d");
    const sky = g.createLinearGradient(0, 0, 0, 300); sky.addColorStop(0, "#ffffff"); sky.addColorStop(0.55, "#d3d7dd"); sky.addColorStop(1, "#30343b");
    g.fillStyle = sky; g.fillRect(0, 0, 1024, 300);
    g.fillStyle = "#15171a"; g.fillRect(0, 300, 1024, 34);
    const floor = g.createLinearGradient(0, 334, 0, 512); floor.addColorStop(0, "#4a4f57"); floor.addColorStop(1, "#c9ced6");
    g.fillStyle = floor; g.fillRect(0, 334, 1024, 178);
    for (let i = 0; i < 16; i++) { g.fillStyle = i % 2 ? "#1b1d22" : "#ffffff"; g.fillRect(i * 64 + 8, 150, 34, 160); }
    g.fillStyle = "#c93a30"; g.fillRect(600, 296, 110, 12);
    const tex = new THREE.CanvasTexture(c);
    tex.mapping = THREE.EquirectangularReflectionMapping; tex.colorSpace = THREE.SRGBColorSpace;
    return new THREE.PMREMGenerator(renderer).fromEquirectangular(tex).texture;
  };
  const env = ${s.env === "chrome" ? "chromeEnv()" : s.env ? "new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture" : "null"};
  if (env) scene.environment = env;

  const clay = (hex, rough = 0.9) => new THREE.MeshStandardMaterial({ color: hex, roughness: rough, metalness: 0 });

  // Seamless sweep: the floor curves up into the back wall, like a photo studio.
  {
    const prof = [];
    for (let z = 30; z > -6; z -= 1) prof.push([z, 0]);
    for (let i = 0; i <= 24; i++) { const a = (i / 24) * Math.PI / 2; prof.push([-6 - Math.sin(a) * 6, 6 - Math.cos(a) * 6]); }
    for (let y = 7; y <= 40; y += 1) prof.push([-12, y]);
    const pos = [], idx = [];
    for (const [z, y] of prof) { pos.push(-40, y, z, 40, y, z); }
    for (let i = 0; i < prof.length - 1; i++) { const a = i * 2; idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    const sweep = new THREE.Mesh(g, clay(0xe6e6e3, 0.97));
    sweep.receiveShadow = true;
    scene.add(sweep);
  }

  const camera = new THREE.PerspectiveCamera(30, ${W} / ${H}, 0.1, 200);
  camera.position.set(0, 2.4, 12.5);
  camera.lookAt(0, 1.25, 0);

  // Extruded text, centred on its own middle, scaled to a set width in scene units.
  const font = new FontLoader().parse(${FONT_JSON});
  const makeText = (word, { width = 3.3, depth = 0.6, mat }) => {
    const geo = new TextGeometry(word, { font, size: 1, depth: depth, curveSegments: 14, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.035, bevelSegments: 6 });
    geo.center();
    geo.computeBoundingBox();
    const k = width / (geo.boundingBox.max.x - geo.boundingBox.min.x);
    geo.scale(k, k, k);
    const m = new THREE.Mesh(geo, mat);
    m.castShadow = true;
    m.receiveShadow = true;
    const grp = new THREE.Group();
    grp.add(m);
    scene.add(grp);
    return grp;
  };

  const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
${s.js}
  const onFrame = typeof frame === "function" ? frame : null;

  function renderAt(time) {
    tl.seek(Math.max(0, time), false);
    if (onFrame) onFrame(time);
    renderer.render(scene, camera);
    out.drawImage(gl, 0, 0);
  }

  window.__timelines = window.__timelines || {};
  window.__timelines["${it.id}"] = tl;
  window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
  renderAt(window.__hfThreeTime || 0);
</script>
</body>
</html>
`;
}

const HELPERS = `
  // Splits each element's text into inline-block spans (one per letter or per word).
  const splitInto = (sel, mode) => {
    const out = [];
    document.querySelectorAll(sel).forEach((el) => {
      const text = el.textContent;
      el.textContent = "";
      const parts = mode === "char" ? [...text] : text.split(/( )/);
      for (const p of parts) {
        if (p === " ") { el.appendChild(document.createTextNode(" ")); continue; }
        const s = document.createElement("span");
        s.textContent = p;
        s.style.display = "inline-block";
        el.appendChild(s);
        out.push(s);
      }
    });
    return out;
  };
  const chars = (sel) => splitInto(sel, "char");
  const words = (sel) => splitInto(sel, "word");
  // Seeded random, so every render is the same.
  const rand = (seed) => () => { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let x = Math.imul(seed ^ (seed >>> 15), 1 | seed); x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x; return ((x ^ (x >>> 14)) >>> 0) / 4294967296; };
  // Per-frame logic: a linear 0 to 5 s driver; fn gets the clip time.
  const drive = (fn) => { const S = { t: 0 }; tl.fromTo(S, { t: 0 }, { t: ${DURATION}, duration: ${DURATION}, ease: "none", onUpdate: () => fn(S.t) }, 0); window.addEventListener("hf-seek", (e) => fn(e.detail.time)); fn(0); };
`;

function page(it) {
  const s = SCENES[it.id];
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=${W}, height=${H}" />
<title>${esc(it.name)}</title>
<style>
  @font-face { font-family: "Geist"; src: url("Geist.woff2") format("woff2"); font-weight: 100 900; }
  @font-face { font-family: "Geist Mono"; src: url("Geist-Mono.woff2") format("woff2"); font-weight: 100 900; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${W}px; height: ${H}px; overflow: hidden; background: #E9ECF0; }
  #root { position: relative; width: ${W}px; height: ${H}px; overflow: hidden; background: linear-gradient(to bottom, #E9ECF0 0%, #E9ECF0 58%, #E5E6E4 100%); }
  #fx { position: absolute; left: 0; right: 0; top: 0; height: 1500px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
  .t { font-family: "Geist", sans-serif; font-weight: 700; color: #15171A; letter-spacing: -.045em; word-spacing: .1em; line-height: 1.04; text-align: center; }
  .xl { font-size: 190px; }
  .lg { font-size: 176px; }
  .red { color: #C93A30; }
  .label { position: absolute; left: 72px; font-family: "Geist", sans-serif; color: #15171A; }
${s.css || ""}
</style>
</head>
<body>
<div id="root" data-composition-id="${it.id}" data-start="0" data-width="${W}" data-height="${H}" data-duration="${DURATION}">
  <div id="fx">${s.html}</div>
  <div class="label" style="top:88px;font-family:'Geist Mono',monospace;font-size:28px;font-weight:500;letter-spacing:.14em;color:#5B616B;">TEXT ANIMATION ${it.no}</div>
  <div class="label" style="bottom:196px;font-size:118px;font-weight:700;letter-spacing:-.03em;line-height:1;">${esc(it.name)}</div>
  <div class="label" style="bottom:128px;font-size:36px;font-weight:500;color:#5B616B;">${esc(it.line)}</div>
</div>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<script>
  const tl = gsap.timeline({ paused: true });
${HELPERS}
${s.js}
  window.__timelines = window.__timelines || {};
  window.__timelines["${it.id}"] = tl;
</script>
</body>
</html>
`;
}

for (const it of items.filter((x) => !want.length || want.includes(x.id))) {
  if (!SCENES[it.id] && !THREE_SCENES[it.id]) { console.log(`skip ${it.id}: no scene`); continue; }
  const dir = path.join(root, "previews/text", it.id);
  fs.mkdirSync(dir, { recursive: true });
  for (const f of ["Geist.woff2", "Geist-Mono.woff2"]) fs.copyFileSync(path.join(root, "previews/set3d/fonts", f), path.join(dir, f));
  fs.writeFileSync(path.join(dir, "index.html"), THREE_SCENES[it.id] ? page3d(it) : page(it));
  console.log(`built previews/text/${it.id}`);
}

// Review page: every clip that exists so far, in list order.
const made = items.filter((it) => fs.existsSync(path.join(root, "previews/clips/text", `${it.id}.mp4`)));
fs.writeFileSync(path.join(root, "previews/text.html"), `<!doctype html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Text animation: ${made.length} of ${items.length}</title>
<style>body{margin:0;background:#F4F5F7;font-family:system-ui,sans-serif;color:#15171A}main{max-width:1400px;margin:0 auto;padding:32px 16px}h1{font-size:24px;margin:0 0 6px}p{margin:0 0 24px;color:#5B616B}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px}video{width:100%;border-radius:12px;display:block;background:#E9ECF0}</style></head><body><main>
<h1>Text animation: ${made.length} of ${items.length}</h1>
<p>Each one is built in code. Same stage and labels as the motion graphics.</p>
<div class="grid">
${made.map((it) => `<video src="clips/text/${it.id}.mp4" autoplay muted loop playsinline></video>`).join("\n")}
</div></main></body></html>
`);
console.log(`wrote previews/text.html (${made.length} clips)`);
