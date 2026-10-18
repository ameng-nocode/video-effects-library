// Writes one HyperFrames composition per motion graphic move into previews/mg/<id>/.
// Every move plays on the same small studio stage (a seamless light sweep with a low
// round platform, the same light and clay look as the camera set) with a fixed camera,
// so the only thing that changes between clips is the move itself.
// Objects are Three.js meshes, text is HTML on top; GSAP drives every tween from one
// paused timeline that is seeked to the exact HyperFrames time (seek-safe, no clock).
// Names, lines and prompts come from data/motion-graphics.json (the file the site reads).
// Usage: node scripts/build-mg.mjs [id ...]   (default: every move)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "previews/mg");
const fontDir = path.join(root, "previews/set3d/fonts");
const MOVES = JSON.parse(fs.readFileSync(path.join(root, "data/motion-graphics.json"), "utf8"));

const W = 1080;
const H = 1920;
const PIXEL_RATIO = 1.5;
const DURATION = 5;

// Per move: `blur` = motion blur sub-frames (1 = off), `css` = extra styles,
// `html` = text layer markup, `js` = builds objects and adds tweens to `tl`.
// Available inside `js`: THREE, RoundedBoxGeometry, scene, camera, tl, add, clay, MAT, stage, fx.
// A `function frame(t)` in `js` runs after every seek (for things GSAP cannot tween directly).
const SCENES = {
  "squash-and-stretch": {
    blur: 12,
    js: `
  // The ball hangs from a pivot at its bottom, so squash happens against the floor.
  const R = 0.62;
  const ball = new THREE.Group();
  const body = add(new THREE.SphereGeometry(R, 64, 48), MAT.red, 0, R, 0, ball);
  ball.position.set(0, 9, 0.2);
  scene.add(ball);
  const floor = stage.top;
  // Volume stays the same: width = 1 / sqrt(height).
  const shape = (h) => ({ x: 1 / Math.sqrt(h), y: h, z: 1 / Math.sqrt(h) });
  const bounce = (t, fallFrom, apex, squash, fallTime) => {
    tl.to(ball.position, { y: floor, duration: fallTime, ease: "power2.in" }, t - fallTime);
    tl.to(ball.scale, { ...shape(1 + (1 - squash) * 0.45), duration: fallTime * 0.5, ease: "power2.in" }, t - fallTime * 0.5);
    tl.to(ball.scale, { ...shape(squash), duration: 0.06, ease: "power2.out" }, t);
    tl.to(ball.scale, { ...shape(1 + (1 - squash) * 0.5), duration: 0.09, ease: "power2.out" }, t + 0.06);
    if (apex > 0) {
      const up = Math.sqrt(apex / 9) * 0.6;
      tl.to(ball.position, { y: floor + apex, duration: up, ease: "power2.out" }, t + 0.06);
      tl.to(ball.scale, { ...shape(1), duration: up * 0.7, ease: "sine.out" }, t + 0.15);
    } else {
      tl.to(ball.scale, { ...shape(1), duration: 0.35, ease: "elastic.out(1, 0.45)" }, t + 0.15);
    }
  };
  tl.set(ball.position, { y: 9 }, 0);
  bounce(1.0, 9, 2.7, 0.6, 0.6);
  bounce(1.75, 2.7, 1.0, 0.74, 0.32);
  bounce(2.3, 1.0, 0.28, 0.86, 0.2);
  bounce(2.62, 0.28, 0, 0.94, 0.1);
`,
  },

  stagger: {
    blur: 8,
    js: `
  // 4 x 4 rounded tiles; the wave starts at the front left corner and runs diagonally.
  const N = 4, GAP = 1.06, S = 0.88;
  const geo = new RoundedBoxGeometry(S, 0.42, S, 6, 0.11);
  const tiles = [];
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
    const red = r === 1 && c === 2;
    const m = add(geo, red ? MAT.red : MAT.white, (c - 1.5) * GAP, 0, (r - 1.5) * GAP);
    m.userData.order = c + (N - 1 - r) + (c + r) * 0.001;
    tiles.push(m);
  }
  tiles.sort((a, b) => a.userData.order - b.userData.order);
  const base = stage.top + 0.21;
  tiles.forEach((m, i) => {
    const t = 0.5 + i * 0.07;
    tl.fromTo(m.scale, { x: 0.001, y: 0.001, z: 0.001 }, { x: 1, y: 1, z: 1, duration: 0.7, ease: "back.out(1.6)" }, t);
    tl.fromTo(m.position, { y: base - 0.4 }, { y: base, duration: 0.7, ease: "back.out(1.6)" }, t);
    tl.fromTo(m.rotation, { y: -0.7 }, { y: 0, duration: 0.8, ease: "power3.out" }, t);
    // Second wave: each tile lifts and sets back down in the same order.
    const t2 = 3.1 + i * 0.07;
    tl.to(m.position, { y: base + 0.35, duration: 0.28, ease: "power2.out" }, t2);
    tl.to(m.position, { y: base, duration: 0.42, ease: "bounce.out" }, t2 + 0.28);
  });
`,
  },

  "pop-in": {
    blur: 6,
    js: `
  // Each shape grows from its base, so it pops up out of the platform.
  const base = (geo, h) => { geo.translate(0, h / 2, 0); return geo; };
  const tile = add(base(new RoundedBoxGeometry(1.5, 1.5, 0.36, 8, 0.2), 1.5), MAT.red, 0, stage.top, -0.2);
  tile.rotation.y = 0.22;
  const ball = add(base(new THREE.SphereGeometry(0.42, 64, 48), 0.84), MAT.white, -1.6, stage.top, 0.7);
  const can = add(base(new THREE.CylinderGeometry(0.38, 0.38, 0.9, 64), 0.9), MAT.white, 1.6, stage.top, 0.6);
  for (const [m, t, d] of [[tile, 0.5, 0.6], [ball, 1.25, 0.5], [can, 1.6, 0.5]]) {
    tl.fromTo(m.scale, { x: 0.001, y: 0.001, z: 0.001 }, { x: 1, y: 1, z: 1, duration: d, ease: "back.out(2.2)" }, t);
  }
  tl.fromTo(tile.rotation, { y: -0.5 }, { y: 0.22, duration: 0.8, ease: "power3.out" }, 0.5);
`,
  },

  overshoot: {
    blur: 8,
    js: `
  // Two thin marks on the platform show where each block should stop.
  const markGeo = new THREE.BoxGeometry(0.05, 0.012, 1.5);
  add(markGeo, MAT.dark, -0.85, stage.top + 0.006, 0.2).castShadow = false;
  add(markGeo, MAT.dark, 1.05, stage.top + 0.006, 0.2).castShadow = false;
  const box = (mat, s) => { const g = new RoundedBoxGeometry(s, s, s, 6, 0.1); g.translate(0, s / 2, 0); return add(g, mat, 0, stage.top, 0.2); };
  const a = box(MAT.white, 1.0);
  const b = box(MAT.red, 1.0);
  tl.fromTo(a.position, { x: -4.6 }, { x: -0.85, duration: 0.9, ease: "back.out(3)" }, 0.5);
  tl.fromTo(b.position, { x: 4.8 }, { x: 1.05, duration: 0.9, ease: "back.out(3)" }, 1.9);
`,
  },

  anticipation: {
    blur: 10,
    js: `
  // Pivot at the bottom so the crouch and lean happen against the floor.
  const g = new RoundedBoxGeometry(0.9, 0.9, 0.9, 6, 0.1);
  g.translate(0, 0.45, 0);
  const cube = add(g, MAT.red, -1.5, stage.top, 0.3);
  // 1. Wind-up: crouch and lean back, away from where it will go.
  tl.to(cube.scale, { x: 1.18, y: 0.7, z: 1.18, duration: 0.6, ease: "power2.inOut" }, 0.5);
  tl.to(cube.position, { x: -1.78, duration: 0.6, ease: "power2.inOut" }, 0.5);
  tl.to(cube.rotation, { z: 0.2, duration: 0.6, ease: "power2.inOut" }, 0.5);
  // 2. Release: stretch and jump to the right in an arc.
  tl.to(cube.scale, { x: 0.88, y: 1.28, z: 0.88, duration: 0.1, ease: "power2.out" }, 1.25);
  tl.to(cube.position, { x: 1.5, duration: 0.55, ease: "power1.inOut" }, 1.25);
  tl.to(cube.position, { y: stage.top + 1.7, duration: 0.27, ease: "power2.out" }, 1.25);
  tl.to(cube.position, { y: stage.top, duration: 0.28, ease: "power2.in" }, 1.52);
  tl.to(cube.rotation, { z: -0.25, duration: 0.3, ease: "power2.out" }, 1.25);
  tl.to(cube.scale, { x: 1, y: 1, z: 1, duration: 0.25, ease: "sine.out" }, 1.35);
  // 3. Landing: a small squash, then settle.
  tl.to(cube.rotation, { z: 0, duration: 0.25, ease: "power2.out" }, 1.6);
  tl.to(cube.scale, { x: 1.14, y: 0.78, z: 1.14, duration: 0.07, ease: "power2.out" }, 1.8);
  tl.to(cube.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: "elastic.out(1, 0.45)" }, 1.87);
`,
  },

  "mask-reveal": {
    blur: 1,
    css: `
  #fx { display: flex; align-items: center; justify-content: center; }
  .mr { position: relative; top: -330px; font-family: "Geist", sans-serif; color: #15171A; font-weight: 700; letter-spacing: -.05em; line-height: .92; }
  .mr .line { position: relative; overflow: hidden; padding: 0 12px 18px; }
  .mr .line span { display: inline-block; }
  .mr .l1 { font-size: 250px; }
  .mr .l2 { font-size: 250px; margin-left: 120px; }
  .mr .bar { position: absolute; left: 0; right: 0; top: 18px; bottom: 26px; background: #C93A30; transform: scaleX(0); transform-origin: 0 50%; }
`,
    html: `<div class="mr">
    <div class="line l1"><span id="t1">Mask</span><i class="bar" id="bar"></i></div>
    <div class="line l2"><span id="t2">reveal</span></div>
  </div>`,
    js: `
  // Beat 1: a red bar wipes across, the word appears under it, the bar wipes away.
  tl.set("#t1", { opacity: 0 }, 0);
  tl.fromTo("#bar", { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.45, ease: "expo.inOut" }, 0.5);
  tl.set("#t1", { opacity: 1 }, 0.95);
  tl.set("#bar", { transformOrigin: "100% 50%" }, 0.95);
  tl.to("#bar", { scaleX: 0, duration: 0.5, ease: "expo.inOut" }, 0.95);
  // Beat 2: the second word rises out from behind the edge of its line.
  tl.fromTo("#t2", { yPercent: 108 }, { yPercent: 0, duration: 0.8, ease: "power4.out" }, 1.55);
`,
  },

  "line-draw": {
    blur: 4,
    js: `
  // A red line draws itself over the platform, then rises into a loop.
  const pts = [[-2.25, 0.3, 1.5], [-1.6, 0.3, -0.6], [-0.4, 0.3, -1.1], [0.7, 0.3, -0.2], [0.5, 0.3, 1.1], [-0.3, 0.55, 0.9],
    [-0.65, 1.35, 0.4], [-0.1, 2.15, 0.1], [0.75, 1.9, 0.1], [0.75, 1.05, 0.2], [0.05, 1.05, 0.3], [0.3, 2.0, 0.2], [1.45, 2.85, 0.0]];
  const curve = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p)), false, "centripetal");
  const SEG = 600, RAD = 16;
  const tube = add(new THREE.TubeGeometry(curve, SEG, 0.075, RAD, false), MAT.red, 0, 0, 0);
  const cap = add(new THREE.SphereGeometry(0.075, 24, 16), MAT.red, 0, 0, 0);
  const tip = add(new THREE.SphereGeometry(0.15, 32, 24), MAT.white, 0, 0, 0);
  const st = { p: 0, tip: 0 };
  tl.to(st, { p: 1, duration: 2.4, ease: "power2.inOut" }, 0.5);
  tl.fromTo(st, { tip: 0 }, { tip: 1, duration: 0.3, ease: "back.out(2)" }, 0.45);
  function frame() {
    const n = Math.round(st.p * SEG);
    tube.geometry.setDrawRange(0, n * RAD * 6);
    const at = curve.getPointAt(Math.max(0, Math.min(1, n / SEG)));
    tip.position.copy(at);
    tip.scale.setScalar(Math.max(0.001, st.tip));
    cap.position.copy(curve.getPointAt(0));
    cap.visible = n > 0;
  }
`,
  },

  "shape-morph": {
    blur: 1,
    js: `
  // One mesh, three shapes: every point keeps its direction and only its distance changes
  // (a superellipsoid), so the shape flows from sphere to cube to cylinder.
  const geo = new THREE.SphereGeometry(1, 128, 96);
  const dir = geo.attributes.position.array.slice();
  const mesh = add(geo, MAT.red, 0, stage.top + 1.25, 0.2);
  mesh.scale.setScalar(0.82);
  const st = { e: 2, f: 2 };
  tl.to(st, { e: 9, f: 9, duration: 0.85, ease: "power3.inOut" }, 0.6);
  tl.to(st, { e: 2, f: 12, duration: 0.85, ease: "power3.inOut" }, 2.3);
  tl.fromTo(mesh.rotation, { x: 0.32, y: -0.4 }, { x: 0.32, y: 1.5, duration: 5, ease: "none" }, 0);
  tl.to(mesh.rotation, { x: 0, duration: 0.85, ease: "power3.inOut" }, 2.3);
  function frame() {
    const a = geo.attributes.position.array;
    const { e, f } = st;
    for (let i = 0; i < a.length; i += 3) {
      const x = Math.abs(dir[i]), y = Math.abs(dir[i + 1]), z = Math.abs(dir[i + 2]);
      const r = Math.pow(Math.pow(Math.pow(x, e) + Math.pow(z, e), f / e) + Math.pow(y, f), -1 / f);
      a[i] = dir[i] * r; a[i + 1] = dir[i + 1] * r; a[i + 2] = dir[i + 2] * r;
    }
    geo.attributes.position.needsUpdate = true;
    geo.computeVertexNormals();
  }
`,
  },

  "count-up": {
    blur: 1,
    css: `
  #fx { display: flex; align-items: center; justify-content: center; }
  .cu { position: relative; top: -330px; width: 860px; font-family: "Geist", sans-serif; color: #15171A; }
  .cu .num { font-size: 236px; font-weight: 700; letter-spacing: -.05em; line-height: 1; font-variant-numeric: tabular-nums; transform-origin: 0 100%; }
  .cu .lab { font-family: "Geist Mono", monospace; font-size: 30px; letter-spacing: .14em; color: #5B616B; margin: 18px 0 0 10px; }
  .cu .track { position: relative; height: 14px; margin: 46px 0 0 10px; background: #D5D8DD; border-radius: 7px; overflow: hidden; }
  .cu .track i { position: absolute; inset: 0; background: #C93A30; border-radius: 7px; transform: scaleX(0); transform-origin: 0 50%; }
`,
    html: `<div class="cu">
    <div class="num" id="num">0</div>
    <div class="lab">VIEWS THIS WEEK</div>
    <div class="track"><i id="fill"></i></div>
  </div>`,
    js: `
  const num = fx.querySelector("#num");
  const st = { v: 0 };
  tl.to(st, { v: 12480, duration: 2.2, ease: "power3.out" }, 0.5);
  tl.fromTo("#fill", { scaleX: 0 }, { scaleX: 0.78, duration: 2.2, ease: "power3.out" }, 0.5);
  tl.fromTo("#num", { scale: 1 }, { scale: 1.05, duration: 0.14, ease: "power2.out", immediateRender: false }, 2.62);
  tl.to("#num", { scale: 1, duration: 0.4, ease: "power3.out" }, 2.76);
  function frame() { num.textContent = Math.round(st.v).toLocaleString("en-US"); }
`,
  },

  "motion-path": {
    blur: 8,
    js: `
  // A faint guide shows the path; a red pill travels along it and turns with it.
  const pts = [[-2.4, 0.55, 1.3], [-1.9, 1.5, -1.0], [-0.2, 2.3, -1.5], [1.7, 1.9, -0.7], [1.9, 1.0, 0.9], [0.4, 0.7, 1.6],
    [-1.0, 1.25, 0.7], [-0.6, 2.2, -0.1], [0.6, 2.6, 0.2]];
  const curve = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p)), false, "centripetal");
  const guide = add(new THREE.TubeGeometry(curve, 400, 0.016, 8, false), MAT.stone, 0, 0, 0);
  guide.castShadow = false;
  for (const p of [0, 1]) add(new THREE.SphereGeometry(0.05, 16, 12), MAT.dark, ...curve.getPointAt(p).toArray()).castShadow = false;
  const pill = new THREE.Group();
  const body = add(new THREE.CapsuleGeometry(0.16, 0.5, 12, 32), MAT.red, 0, 0, 0, pill);
  body.rotation.x = Math.PI / 2;
  scene.add(pill);
  const st = { p: 0 };
  tl.to(st, { p: 1, duration: 3.2, ease: "sine.inOut" }, 0.5);
  function frame() {
    const u = Math.min(0.999, st.p);
    pill.position.copy(curve.getPointAt(u));
    pill.lookAt(curve.getPointAt(Math.min(1, u + 0.002)));
  }
`,
  },

  "motion-trail": {
    blur: 1,
    js: `
  // A ball swings over the platform and back; fading copies of where it was a moment ago
  // follow it (like After Effects Echo).
  const R = 0.36, N = 9, GAP = 0.035;
  const ball = add(new THREE.SphereGeometry(R, 64, 48), MAT.red, 0, 0, 0);
  const ghosts = [];
  for (let k = 1; k <= N; k++) {
    const m = new THREE.MeshStandardMaterial({ color: 0xc93a30, roughness: 0.72, transparent: true, opacity: 0.5 * (1 - k / (N + 1)), depthWrite: false });
    const g = add(new THREE.SphereGeometry(R, 48, 32), m, 0, 0, 0);
    g.castShadow = false;
    g.scale.setScalar(1 - k * 0.04);
    ghosts.push(g);
  }
  const st = { a: Math.PI };
  tl.to(st, { a: 0, duration: 1.0, ease: "power2.inOut" }, 0.5);
  tl.to(st, { a: Math.PI, duration: 1.0, ease: "power2.inOut" }, 2.2);
  const at = (a) => [Math.cos(a) * 2.0, stage.top + R + Math.sin(a) * 2.2, 0.3];
  function frame(t) {
    ball.position.set(...at(st.a));
    ghosts.forEach((g, i) => { tl.seek(Math.max(0, t - (i + 1) * GAP), false); g.position.set(...at(st.a)); });
    tl.seek(Math.max(0, t), false);
  }
`,
  },

  parallax: {
    blur: 1,
    js: `
  // Paper layers at different depths slide sideways; near layers move faster than far ones.
  const hills = (w, h, seed) => {
    const s = new THREE.Shape();
    s.moveTo(-w / 2, 0);
    for (let i = 0; i <= 120; i++) {
      const x = -w / 2 + (w * i) / 120;
      s.lineTo(x, h * (0.62 + 0.24 * Math.sin(x * 0.9 + seed) + 0.14 * Math.sin(x * 2.1 + seed * 2.3)));
    }
    s.lineTo(w / 2, 0);
    return new THREE.ExtrudeGeometry(s, { depth: 0.1, bevelEnabled: false, curveSegments: 4 });
  };
  // Paper faces the camera, so a little self-light keeps the layers light, not grey.
  const paper = (hex) => new THREE.MeshStandardMaterial({ color: hex, roughness: 0.95, emissive: hex, emissiveIntensity: 0.32 });
  const sunDisc = add(new THREE.CylinderGeometry(0.7, 0.7, 0.08, 96), MAT.red, -0.6, 3.3, -3.4);
  sunDisc.rotation.x = Math.PI / 2;
  const back = add(hills(20, 2.9, 1.3), paper(0xd3d7dd), 0, 0, -2.4);
  const mid = add(hills(20, 1.7, 4.1), paper(0xe3e1dc), 0, 0, -0.6);
  // Front layer: a row of clipped trees, like the camera set, so fast motion is easy to read.
  const front = new THREE.Group();
  for (const [x, r] of [[-7.6, 0.42], [-5.9, 0.3], [-4.3, 0.46], [-1.9, 0.34], [-0.6, 0.44], [1.9, 0.3], [3.1, 0.46], [5.6, 0.36], [7.4, 0.44]]) {
    add(new THREE.CylinderGeometry(0.05, 0.065, 0.95, 16), MAT.stone, x, 0.47, 0, front);
    add(new THREE.SphereGeometry(r, 48, 32), MAT.white, x, 0.8 + r, 0, front);
  }
  front.position.z = 1.9;
  scene.add(front);
  const D = 3.0;
  for (const [m, k] of [[sunDisc, 0.1], [back, 0.3], [mid, 0.7], [front, 1.5]]) {
    tl.fromTo(m.position, { x: m.position.x + D * k }, { x: m.position.x - D * k, duration: 4.2, ease: "sine.inOut" }, 0.4);
  }
`,
  },

  "light-sweep": {
    blur: 1,
    js: `
  // A dark card with a bright band of light sliding across its face.
  const card = new THREE.Group();
  const CW = 2.1, CH = 2.8;
  add(new RoundedBoxGeometry(CW, CH, 0.14, 8, 0.07), new THREE.MeshPhysicalMaterial({ color: 0x2a2d33, roughness: 0.38, clearcoat: 1, clearcoatRoughness: 0.2 }), 0, 0, 0, card);
  const disc = add(new THREE.CylinderGeometry(0.42, 0.42, 0.03, 96), MAT.red, -0.38, 0.62, 0.085, card);
  disc.rotation.x = Math.PI / 2;
  for (const [y, w] of [[-0.25, 1.4], [-0.55, 1.0], [-0.85, 1.2]]) add(new THREE.BoxGeometry(w, 0.1, 0.02), MAT.white, -CW / 2 + 0.25 + w / 2, y, 0.08, card);
  const sheen = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false,
    uniforms: { u: { value: -1 } },
    vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
    fragmentShader: "uniform float u; varying vec2 vUv; float box(vec2 p, vec2 b, float r){ vec2 q = abs(p) - b + r; return length(max(q, 0.0)) - r; } void main(){ vec2 p = (vUv - 0.5) * vec2(${2.1}, ${2.8}); float inside = 1.0 - smoothstep(-0.01, 0.01, box(p, vec2(1.05, 1.4), 0.07)); float d = vUv.x + vUv.y * 0.45 - u; float band = exp(-d * d / 0.006) * 0.75 + exp(-d * d / 0.05) * 0.12; gl_FragColor = vec4(vec3(1.0), band * inside); }",
  });
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(CW, CH), sheen);
  plane.position.z = 0.1;
  card.add(plane);
  card.position.set(0, stage.top + CH / 2 + 0.02, 0);
  scene.add(card);
  const st = { u: -0.4 };
  tl.to(st, { u: 1.9, duration: 0.95, ease: "power2.inOut" }, 0.7);
  tl.set(st, { u: -0.4 }, 2.4);
  tl.to(st, { u: 1.9, duration: 0.95, ease: "power2.inOut" }, 2.6);
  tl.fromTo(card.rotation, { y: -0.34 }, { y: -0.12, duration: 5, ease: "sine.inOut" }, 0);
  function frame() { sheen.uniforms.u.value = st.u; }
`,
  },

  glitch: {
    blur: 1,
    css: `
  #fx { display: flex; align-items: center; justify-content: center; }
  .gl { position: relative; top: -330px; font-family: "Geist", sans-serif; font-weight: 800; font-size: 236px; letter-spacing: -.05em; line-height: 1; }
  .gl .g { white-space: nowrap; }
  .gl .base { color: #15171A; position: relative; }
  .gl .c { position: absolute; left: 0; top: 0; opacity: 0; }
  .gl .red { color: #C93A30; }
  .gl .grey { color: #8A9099; }
  .gl .sub { font-family: "Geist Mono", monospace; font-weight: 500; font-size: 30px; letter-spacing: .16em; color: #5B616B; margin: 22px 0 0 12px; }
`,
    html: `<div class="gl" id="gl">
    <div class="g base" id="base">SIGNAL</div>
    <div class="g c red" id="cr">SIGNAL</div>
    <div class="g c grey" id="cg">SIGNAL</div>
    <div class="g c base" id="cs">SIGNAL</div>
    <div class="sub">LOST AND FOUND</div>
  </div>`,
    js: `
  // Short bursts: colour copies split sideways and slices of the word jump, on a fixed
  // per-frame pattern (the same on every render).
  const base = fx.querySelector("#base"), cr = fx.querySelector("#cr"), cg = fx.querySelector("#cg"), cs = fx.querySelector("#cs");
  const BURSTS = [[0.5, 0.85], [1.9, 2.15], [3.3, 3.65]];
  const rnd = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  tl.fromTo("#gl", { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "steps(5)" }, 0.5);
  function frame(t) {
    const on = BURSTS.some(([a, b]) => t >= a && t < b);
    const f = Math.floor(t * 30);
    if (!on) { for (const el of [cr, cg, cs]) el.style.opacity = 0; base.style.transform = ""; base.style.clipPath = ""; return; }
    const sh = (k) => (rnd(f * 3 + k) - 0.5) * 2;
    cr.style.opacity = 0.9; cg.style.opacity = 0.8; cs.style.opacity = 1;
    cr.style.transform = "translateX(" + (14 + sh(1) * 26).toFixed(1) + "px)";
    cg.style.transform = "translateX(" + (-14 + sh(2) * 26).toFixed(1) + "px)";
    const top = rnd(f * 7) * 70, h = 8 + rnd(f * 11) * 22;
    cs.style.clipPath = "inset(" + top.toFixed(1) + "% 0 " + Math.max(0, 100 - top - h).toFixed(1) + "% 0)";
    cs.style.transform = "translateX(" + (sh(4) * 60).toFixed(1) + "px)";
    cr.style.clipPath = "inset(" + (rnd(f * 5) * 50).toFixed(1) + "% 0 " + (rnd(f * 13) * 40).toFixed(1) + "% 0)";
    base.style.transform = "translateX(" + (sh(6) * 8).toFixed(1) + "px)";
  }
`,
  },

  "impact-shake": {
    blur: 8,
    js: `
  // Heavy blocks land; the whole frame shakes on each hit and the small pieces jump.
  const pieces = [];
  for (const [x, z, s] of [[-1.9, 0.9, 0.34], [-1.5, -0.9, 0.28], [1.8, 1.0, 0.3], [1.6, -0.7, 0.36], [-0.3, 1.8, 0.26], [0.9, 1.75, 0.28]]) {
    const g = new RoundedBoxGeometry(s, s, s, 4, 0.05);
    g.translate(0, s / 2, 0);
    const m = add(g, MAT.white, x, stage.top, z);
    m.rotation.y = x * 0.7;
    pieces.push(m);
  }
  const block = (s, mat) => { const g = new RoundedBoxGeometry(s, s * 0.72, s, 6, 0.1); g.translate(0, s * 0.36, 0); return add(g, mat, 0, 9, 0); };
  const big = block(1.4, MAT.red);
  const small = block(0.9, MAT.white);
  const HITS = [[1.0, 1.0], [2.4, 0.55]];
  tl.to(big.position, { y: stage.top, duration: 0.42, ease: "power3.in" }, 1.0 - 0.42);
  tl.set(small.position, { y: 9 }, 0);
  tl.to(small.position, { y: stage.top + 1.4 * 0.72, duration: 0.4, ease: "power3.in" }, 2.4 - 0.4);
  for (const [t, k] of HITS) {
    pieces.forEach((p, i) => {
      tl.to(p.position, { y: stage.top + 0.28 * k + i * 0.02, duration: 0.14, ease: "power2.out" }, t);
      tl.to(p.position, { y: stage.top, duration: 0.3, ease: "bounce.out" }, t + 0.14);
    });
  }
  const BASE = camera.position.clone();
  const AIM = new THREE.Vector3(0, 0.95, 0);
  function frame(t) {
    let x = 0, y = 0, r = 0;
    for (const [h, k] of HITS) {
      const d = t - h;
      if (d < 0) continue;
      const fall = k * Math.exp(-d * 7);
      y += Math.sin(d * 58) * 0.22 * fall;
      x += Math.sin(d * 41 + 1.3) * 0.12 * fall;
      r += Math.sin(d * 47 + 0.7) * 0.012 * fall;
    }
    camera.position.set(BASE.x + x, BASE.y + y, BASE.z);
    camera.lookAt(AIM.x + x * 0.6, AIM.y + y * 0.6, AIM.z);
    camera.rotateZ(r);
  }
`,
  },

  "kinetic-typography": {
    blur: 1,
    css: `
  #fx { display: flex; align-items: center; justify-content: center; }
  .kt { position: relative; top: -340px; width: 880px; font-family: "Geist", sans-serif; color: #15171A; transform-origin: 50% 50%; }
  .kt .row { display: block; line-height: .9; letter-spacing: -.045em; font-weight: 700; }
  .kt .mask { overflow: hidden; padding-bottom: 14px; }
  .kt .mask span, .kt .w { display: inline-block; }
  .kt .r1 { font-size: 184px; }
  .kt .r2 { font-size: 184px; margin-left: 200px; }
  .kt .r3 { font-size: 272px; color: #C93A30; letter-spacing: -.05em; margin-top: 6px; }
  .kt .r4 { font-size: 100px; font-weight: 600; color: #4C525C; letter-spacing: -.035em; margin-top: 22px; margin-left: 8px; }
  .kt .r4 span { display: inline-block; white-space: pre; }
`,
    html: `<div class="kt" id="kt">
    <div class="row r1 mask"><span id="w1">Words</span></div>
    <div class="row r2"><span class="w" id="w2">that</span></div>
    <div class="row r3"><span class="w" id="w3">MOVE</span></div>
    <div class="row r4" id="w4">with you.</div>
  </div>`,
    js: `
  const block = fx.querySelector("#kt");
  const w4 = fx.querySelector("#w4");
  w4.innerHTML = [...w4.textContent].map((ch) => "<span>" + ch + "</span>").join("");
  gsap.set(block, { transformPerspective: 1600 });
  tl.fromTo("#w1", { yPercent: 110 }, { yPercent: 0, duration: 0.7, ease: "power4.out" }, 0.4);
  tl.fromTo("#w2", { x: 520, rotation: 22, opacity: 0 }, { x: 0, rotation: 0, opacity: 1, duration: 0.65, ease: "power3.out" }, 0.85);
  tl.fromTo("#w3", { scale: 2.4, opacity: 0, filter: "blur(28px)" }, { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.42, ease: "power4.out" }, 1.3);
  tl.fromTo(block, { y: 0 }, { y: 30, duration: 0.09, ease: "power2.out", immediateRender: false }, 1.62);
  tl.to(block, { y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" }, 1.71);
  tl.fromTo("#w4 span", { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out", stagger: 0.055 }, 1.9);
  tl.to(block, { rotation: -6, scale: 1.05, duration: 0.95, ease: "expo.inOut" }, 3.0);
`,
  },
};

function composition(move) {
  const s = SCENES[move.id];
  if (!s) throw new Error(`no scene for ${move.id}`);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=${W}, height=${H}" />
<title>${move.name}</title>
<style>
  @font-face { font-family: "Geist"; src: url("Geist.woff2") format("woff2"); font-weight: 100 900; }
  @font-face { font-family: "Geist Mono"; src: url("Geist-Mono.woff2") format("woff2"); font-weight: 100 900; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${W}px; height: ${H}px; overflow: hidden; background: #E9ECF0; }
  #root { position: relative; width: ${W}px; height: ${H}px; overflow: hidden; }
  #set { position: absolute; inset: 0; width: ${W}px; height: ${H}px; display: block; }
  #fx { position: absolute; inset: 0; }
  .label { position: absolute; left: 72px; font-family: "Geist", sans-serif; color: #15171A; }
${s.css || ""}
</style>
</head>
<body>
<div id="root" data-composition-id="${move.id}" data-start="0" data-width="${W}" data-height="${H}" data-duration="${DURATION}">
  <canvas id="set" width="${W * PIXEL_RATIO}" height="${H * PIXEL_RATIO}"></canvas>
  <div id="fx">${s.html || ""}</div>
  <div style="position:absolute;left:0;right:0;bottom:0;height:520px;background:linear-gradient(to top, rgba(233,236,240,.96), rgba(233,236,240,0));"></div>
  <div class="label" style="top:88px;font-family:'Geist Mono',monospace;font-size:28px;font-weight:500;letter-spacing:.14em;color:#5B616B;">MOTION GRAPHIC ${move.no}</div>
  <div class="label" style="bottom:196px;font-size:118px;font-weight:700;letter-spacing:-.03em;line-height:1;">${move.name}</div>
  <div class="label" style="bottom:128px;font-size:36px;font-weight:500;color:#5B616B;">${move.line}</div>
</div>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<script type="importmap">
  { "imports": { "three": "https://cdn.jsdelivr.net/npm/three@0.181.2/build/three.module.js", "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.181.2/examples/jsm/" } }
</script>
<script type="module">
  import * as THREE from "three";
  import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

  // The stage is drawn on an off-screen WebGL canvas, then copied to the visible canvas.
  // Averaging several sub-frames gives real motion blur on fast moves.
  const gl = document.createElement("canvas");
  const renderer = new THREE.WebGLRenderer({ canvas: gl, antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(${PIXEL_RATIO});
  renderer.setSize(${W}, ${H}, false);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const out = document.getElementById("set").getContext("2d");
  const fx = document.getElementById("fx");

  const scene = new THREE.Scene();
  const SKY = 0xe9ecf0;
  scene.background = new THREE.Color(SKY);
  scene.fog = new THREE.Fog(SKY, 22, 60);

  // Same light as the camera set: a low warm sun for long soft shadows, a cool sky fill.
  scene.add(new THREE.HemisphereLight(0xf4f7fb, 0xb9b4ad, 1.35));
  const sun = new THREE.DirectionalLight(0xfff1e2, 2.5);
  sun.position.set(-3.5, 14, 6);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.radius = 7;
  sun.shadow.bias = -0.0004;
  Object.assign(sun.shadow.camera, { left: -9, right: 9, top: 9, bottom: -9, near: 1, far: 40 });
  scene.add(sun);

  const clay = (hex, rough = 0.9) => new THREE.MeshStandardMaterial({ color: hex, roughness: rough, metalness: 0 });
  const MAT = { white: clay(0xf1f0ec), stone: clay(0xdedbd5), red: clay(0xc93a30, 0.72), dark: clay(0x2a2d33, 0.8) };
  const add = (geo, mat, x, y, z, parent = scene) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    m.castShadow = true;
    m.receiveShadow = true;
    parent.add(m);
    return m;
  };

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

  // A low round platform in the middle: the one place every move happens.
  const stage = { top: 0.14 };
  add(new THREE.CylinderGeometry(2.7, 2.76, 0.14, 96), MAT.stone, 0, 0.07, 0).castShadow = false;

  const camera = new THREE.PerspectiveCamera(30, ${W} / ${H}, 0.1, 200);
  camera.position.set(0, 5.4, 19.5);
  camera.lookAt(0, 0.95, 0);

  const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
${s.js}
  const onFrame = typeof frame === "function" ? frame : null;

  // Motion blur: average sub-frames across half a frame of shutter time.
  const BLUR = ${s.blur || 1};
  const SHUTTER = 1 / 60;
  function renderAt(time) {
    for (let k = 0; k < BLUR; k++) {
      const t = BLUR === 1 ? time : time + SHUTTER * (k / (BLUR - 1) - 0.5);
      tl.seek(Math.max(0, t), false);
      if (onFrame) onFrame(t);
      renderer.render(scene, camera);
      out.globalAlpha = 1 / (k + 1);
      out.drawImage(gl, 0, 0);
    }
    out.globalAlpha = 1;
    tl.seek(time, false);
  }

  // Registered so HyperFrames knows the timeline; the canvas still redraws on every seek.
  window.__timelines = window.__timelines || {};
  window.__timelines["${move.id}"] = tl;
  window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
  renderAt(window.__hfThreeTime || 0);
</script>
</body>
</html>
`;
}

const ids = process.argv.slice(2);
const list = ids.length ? MOVES.filter((m) => ids.includes(m.id)) : MOVES;
for (const move of list) {
  const dir = path.join(outDir, move.id);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), composition(move));
  // Fonts live once in previews/set3d/fonts; hard links put them next to each scene.
  for (const f of ["Geist.woff2", "Geist-Mono.woff2"]) {
    const target = path.join(dir, f);
    if (!fs.existsSync(target)) fs.linkSync(path.join(fontDir, f), target);
  }
  console.log(`wrote previews/mg/${move.id}`);
}
