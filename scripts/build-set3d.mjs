// Writes one HyperFrames composition per camera move into previews/set3d/<id>/.
// Every move films the same small 3D set (a quiet plaza: arched wall, columns, trees,
// a figure on a plinth) with a real perspective camera, so parallax, orbit and
// dolly zoom are physically right.
// Moves come from data/camera-moves.json (the same file the gallery reads).
// Usage: node scripts/build-set3d.mjs [id ...]   (default: every move)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "previews/set3d");
const MOVES = JSON.parse(fs.readFileSync(path.join(root, "data/camera-moves.json"), "utf8"));

const W = 1080;
const H = 1920;
const PIXEL_RATIO = 1.5;
const DURATION = 5;
const DEFAULT_START = 0.5;
const DEFAULT_LENGTH = 3.4;

function composition(move) {
  const shot = { start: DEFAULT_START, length: DEFAULT_LENGTH, ease: "inOut", blur: 1, ...move.shot };
  const needsFocus = Boolean(shot.focus);
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
  .label { position: absolute; left: 72px; font-family: "Geist", sans-serif; color: #15171A; }
</style>
</head>
<body>
<div id="root" data-composition-id="${move.id}" data-start="0" data-width="${W}" data-height="${H}" data-duration="${DURATION}" data-no-timeline>
  <canvas id="set" width="${W * PIXEL_RATIO}" height="${H * PIXEL_RATIO}"></canvas>
  <div style="position:absolute;left:0;right:0;bottom:0;height:520px;background:linear-gradient(to top, rgba(233,236,240,.96), rgba(233,236,240,0));"></div>
  <div class="label" style="top:88px;font-family:'Geist Mono',monospace;font-size:28px;font-weight:500;letter-spacing:.14em;color:#5B616B;">CAMERA MOVE ${move.no}</div>
  <div class="label" style="bottom:196px;font-size:118px;font-weight:700;letter-spacing:-.03em;line-height:1;">${move.name}</div>
  <div class="label" style="bottom:128px;font-size:36px;font-weight:500;color:#5B616B;">${move.line}</div>
</div>
<script type="importmap">
  { "imports": { "three": "https://cdn.jsdelivr.net/npm/three@0.181.2/build/three.module.js", "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.181.2/examples/jsm/" } }
</script>
<script type="module">
  import * as THREE from "three";
${needsFocus ? `  import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
  import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
  import { BokehPass } from "three/addons/postprocessing/BokehPass.js";
  import { OutputPass } from "three/addons/postprocessing/OutputPass.js";` : ""}

  const SHOT = ${JSON.stringify(shot)};

  // The scene is drawn on an off-screen WebGL canvas, then copied to the visible canvas.
  // Copying several sub-frames and averaging them gives real motion blur on fast moves.
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

  const scene = new THREE.Scene();
  const SKY = 0xe9ecf0;
  scene.background = new THREE.Color(SKY);
  scene.fog = new THREE.Fog(SKY, 14, 46);

  // Light: a low warm sun for long soft shadows, a cool sky fill.
  scene.add(new THREE.HemisphereLight(0xf4f7fb, 0xb9b4ad, 1.35));
  const sun = new THREE.DirectionalLight(0xfff1e2, 2.6);
  sun.position.set(-7, 9, 6);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.radius = 6;
  sun.shadow.bias = -0.0004;
  Object.assign(sun.shadow.camera, { left: -16, right: 16, top: 16, bottom: -16, near: 1, far: 40 });
  scene.add(sun);

  const clay = (hex, rough = 0.92) => new THREE.MeshStandardMaterial({ color: hex, roughness: rough, metalness: 0 });
  const WHITE = clay(0xf1f0ec);
  const STONE = clay(0xdedbd5);
  const LEAF = clay(0xc9cdbf);
  const FIGURE = clay(0xc93a30, 0.75);

  const add = (geo, mat, x, y, z, cast = true) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    m.castShadow = cast;
    m.receiveShadow = true;
    scene.add(m);
    return m;
  };

  // Floor with paving lines (drawn once, no randomness) so motion over the ground reads.
  const tex = (() => {
    const c = document.createElement("canvas");
    c.width = c.height = 512;
    const g = c.getContext("2d");
    g.fillStyle = "#ecebe7"; g.fillRect(0, 0, 512, 512);
    g.strokeStyle = "rgba(120,116,108,0.22)"; g.lineWidth = 3;
    for (let i = 0; i <= 4; i++) { g.beginPath(); g.moveTo(i * 128, 0); g.lineTo(i * 128, 512); g.stroke(); g.beginPath(); g.moveTo(0, i * 128); g.lineTo(512, i * 128); g.stroke(); }
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(30, 30);
    t.anisotropy = 8;
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  })();
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(120, 120), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.95 }));
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  // Arcade wall behind the subject: a long wall with arched openings.
  const wall = new THREE.Shape();
  wall.moveTo(-14, -0.4); wall.lineTo(14, -0.4); wall.lineTo(14, 5.2); wall.lineTo(-14, 5.2); wall.lineTo(-14, -0.4); // starts below the floor so the arch holes sit inside the shape
  for (let i = -6; i <= 6; i++) {
    const x = i * 2.1, w = 0.75, h = 2.6;
    const hole = new THREE.Path();
    hole.moveTo(x - w, 0.001); hole.lineTo(x + w, 0.001); hole.lineTo(x + w, h);
    hole.absarc(x, h, w, 0, Math.PI, false);
    hole.lineTo(x - w, 0.001);
    wall.holes.push(hole);
  }
  add(new THREE.ExtrudeGeometry(wall, { depth: 0.6, bevelEnabled: false, curveSegments: 24 }), WHITE, 0, 0, -7.5);
  add(new THREE.BoxGeometry(28, 0.35, 1.0), STONE, 0, 5.35, -7.2);
  add(new THREE.BoxGeometry(28, 6, 0.4), STONE, 0, 3, -10.5); // back wall seen through the arches

  // Columns: a pair near the lens (they slide past on a push) and a pair further back.
  // A tall frame is narrow, so everything that should show sits close to the centre line.
  const column = (x, z, h = 4.2) => {
    add(new THREE.CylinderGeometry(0.32, 0.36, h, 40), WHITE, x, h / 2, z);
    add(new THREE.BoxGeometry(0.95, 0.22, 0.95), STONE, x, 0.11, z);
    add(new THREE.BoxGeometry(0.9, 0.2, 0.9), STONE, x, h + 0.1, z);
  };
  column(-1.35, 5.2); column(1.35, 5.2);
  column(-2.4, -2.8); column(2.4, -2.8);

  // Trees: clipped round crowns on thin trunks.
  const tree = (x, z, r) => {
    add(new THREE.CylinderGeometry(0.07, 0.09, 1.6, 16), STONE, x, 0.8, z);
    add(new THREE.SphereGeometry(r, 48, 32), LEAF, x, 1.6 + r * 0.85, z);
  };
  tree(-1.9, -5.2, 0.75); tree(2.1, -5.6, 0.85); tree(-3.6, -1.0, 0.7); tree(3.8, 0.4, 0.75);

  // Benches give scale on the ground plane.
  add(new THREE.BoxGeometry(1.4, 0.42, 0.45), STONE, -1.9, 0.21, 1.4);
  add(new THREE.BoxGeometry(1.4, 0.42, 0.45), STONE, 2.0, 0.21, 0.9);

  // Extra props some shots need (e.g. a near object for a focus pull).
  if ((SHOT.props || []).includes("urn")) {
    // A ringed stone urn: fine edges make it easy to see when it is sharp or soft.
    const DARK = clay(0x9c968c);
    add(new THREE.CylinderGeometry(0.15, 0.18, 0.95, 40), STONE, 0.6, 0.475, 7.0); // tall enough to sit above the title
    add(new THREE.CylinderGeometry(0.21, 0.13, 0.34, 40), DARK, 0.6, 1.12, 7.0);
    for (const y of [0.97, 1.07, 1.17, 1.29]) { const r = add(new THREE.TorusGeometry(y > 1.25 ? 0.215 : 0.17 + (y - 0.97) * 0.18, 0.018, 12, 48), WHITE, 0.6, y, 7.0); r.rotation.x = Math.PI / 2; }
    add(new THREE.SphereGeometry(0.075, 24, 16), DARK, 0.6, 1.38, 7.0);
  }

  // The subject: a figure on a round plinth, the only colour in the set.
  // Legs and arms hang from pivots so the figure can walk.
  add(new THREE.CylinderGeometry(0.85, 0.9, 0.24, 64), STONE, 0, 0.12, 0);
  const fig = new THREE.Group();
  const mesh = (geo, parent, x, y, z) => { const m = new THREE.Mesh(geo, FIGURE); m.position.set(x, y, z); m.castShadow = true; parent.add(m); return m; };
  const limb = (x, y, rz, geo, drop) => { const g = new THREE.Group(); g.position.set(x, y, 0); g.rotation.z = rz; mesh(geo, g, 0, -drop, 0); fig.add(g); return g; };
  const legL = limb(-0.1, 0.83, 0, new THREE.CapsuleGeometry(0.085, 0.66, 8, 24), 0.415);
  const legR = limb(0.1, 0.83, 0, new THREE.CapsuleGeometry(0.085, 0.66, 8, 24), 0.415);
  mesh(new THREE.CapsuleGeometry(0.19, 0.5, 8, 32), fig, 0, 1.12, 0);
  mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.12, 20), fig, 0, 1.55, 0);
  const armL = limb(-0.27, 1.4, -0.08, new THREE.CapsuleGeometry(0.062, 0.58, 8, 24), 0.32);
  const armR = limb(0.27, 1.4, 0.08, new THREE.CapsuleGeometry(0.062, 0.58, 8, 24), 0.32);
  mesh(new THREE.SphereGeometry(0.145, 32, 24), fig, 0, 1.72, 0);
  fig.position.set(0, 0.24, 0);
  scene.add(fig);

  // Low hills far away, faded by the fog.
  for (const [x, z, r] of [[-14, -30, 9], [6, -36, 12], [22, -28, 8]]) add(new THREE.SphereGeometry(r, 48, 24), LEAF, x, -r * 0.55, z, false);

  const camera = new THREE.PerspectiveCamera(SHOT.from.fov, ${W} / ${H}, 0.05, 200);

  let composer = null, bokeh = null;
${needsFocus ? `  composer = new EffectComposer(renderer);
  composer.setPixelRatio(${PIXEL_RATIO});
  composer.setSize(${W}, ${H});
  composer.addPass(new RenderPass(scene, camera));
  bokeh = new BokehPass(scene, camera, { focus: SHOT.focus.from, aperture: SHOT.focus.aperture, maxblur: SHOT.focus.maxblur });
  composer.addPass(bokeh);
  composer.addPass(new OutputPass());` : ""}

  const lerp = (a, b, t) => a + (b - a) * t;
  const lerp3 = (a, b, t) => a.map((v, i) => lerp(v, b[i], t));
  const clamp01 = (t) => Math.min(1, Math.max(0, t));
  const smooth = (a, b, t) => { const x = clamp01((t - a) / (b - a)); return x * x * (3 - 2 * x); };
  const EASE = {
    inOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2), // slow start, slow end
    inOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
    outExpo: (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)), // fast hit, hard settle
    linear: (t) => t,
  };
  const ease = EASE[SHOT.ease];
  // Fixed sine mix used as camera shake: smooth, natural, the same on every render.
  const wobble = (t, seed) => Math.sin(t * 5.3 + seed) * 0.5 + Math.sin(t * 11.1 + seed * 2.1) * 0.3 + Math.sin(t * 18.7 + seed * 3.7) * 0.2;

  const path = SHOT.path ? new THREE.CatmullRomCurve3(SHOT.path.points.map((p) => new THREE.Vector3(...p)), false, "centripetal") : null;
  const startDist = SHOT.from.pos ? new THREE.Vector3(...SHOT.from.pos).distanceTo(new THREE.Vector3(...SHOT.from.target)) : 1;
  const startHalf = Math.tan(THREE.MathUtils.degToRad(SHOT.from.fov / 2));

  function place(time) {
    const raw = clamp01((time - SHOT.start) / SHOT.length);
    const p = ease(raw);
    let roll = 0;

    // Walking subject: legs and arms swing, the body bobs, the camera follows.
    if (SHOT.walk) {
      const x = lerp(SHOT.walk.from[0], SHOT.walk.to[0], p);
      const z = lerp(SHOT.walk.from[1], SHOT.walk.to[1], p);
      const phase = time * 1.8 * Math.PI * 2;
      fig.position.set(x, Math.abs(Math.sin(phase)) * 0.025, z);
      fig.rotation.y = Math.PI / 2;
      legL.rotation.x = Math.sin(phase) * 0.42; legR.rotation.x = -Math.sin(phase) * 0.42;
      armL.rotation.x = -Math.sin(phase) * 0.3; armR.rotation.x = Math.sin(phase) * 0.3;
      const o = SHOT.follow.offset, l = SHOT.follow.look;
      camera.position.set(x + o[0], o[1], z + o[2]);
      camera.lookAt(x + l[0], l[1], z + l[2]);
    } else if (SHOT.orbit) {
      const a = THREE.MathUtils.degToRad(lerp(SHOT.orbit.from, SHOT.orbit.to, p));
      const c = SHOT.orbit.center;
      camera.position.set(c[0] + SHOT.orbit.radius * Math.sin(a), SHOT.orbit.height, c[2] + SHOT.orbit.radius * Math.cos(a));
      camera.lookAt(...c);
    } else if (path) {
      const u = p;
      const pos = path.getPointAt(u);
      const ahead = path.getPointAt(Math.min(1, u + SHOT.path.lookAhead));
      if (u + SHOT.path.lookAhead > 1) ahead.add(path.getTangentAt(1).multiplyScalar(u + SHOT.path.lookAhead - 1));
      const look = ahead.lerp(new THREE.Vector3(...SHOT.path.endLook), smooth(SHOT.path.endBlend[0], SHOT.path.endBlend[1], u));
      camera.position.copy(pos);
      camera.lookAt(look);
      // Bank into turns like a drone: roll follows how fast the heading turns.
      const t0 = path.getTangentAt(Math.max(0, u - 0.02)), t1 = path.getTangentAt(Math.min(1, u + 0.02));
      roll = Math.max(-0.45, Math.min(0.45, (t0.x * t1.z - t0.z * t1.x) * -6));
    } else {
      camera.position.set(...lerp3(SHOT.from.pos, SHOT.to.pos, p));
      camera.lookAt(...lerp3(SHOT.from.target, SHOT.to.target, p));
    }

    if (SHOT.keepSubject) {
      const d = camera.position.distanceTo(new THREE.Vector3(...SHOT.to.target));
      camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan((startHalf * startDist) / d));
    } else {
      camera.fov = lerp(SHOT.from.fov, SHOT.to.fov, p);
    }
    if (SHOT.shake) {
      camera.position.x += wobble(time, 1) * SHOT.shake.pos;
      camera.position.y += wobble(time, 2) * SHOT.shake.pos;
      const r = THREE.MathUtils.degToRad(SHOT.shake.rot);
      camera.rotateX(wobble(time, 3) * r); camera.rotateY(wobble(time, 4) * r); roll += wobble(time, 5) * r;
    }
    if (SHOT.roll) roll += THREE.MathUtils.degToRad(lerp(SHOT.roll[0], SHOT.roll[1], p));
    camera.rotateZ(roll);
    camera.updateProjectionMatrix();
    if (bokeh) bokeh.uniforms.focus.value = lerp(SHOT.focus.from, SHOT.focus.to, p);
  }

  function draw() { if (composer) composer.render(); else renderer.render(scene, camera); }

  // Motion blur: average sub-frames across half a frame of shutter time.
  const SHUTTER = 1 / 60;
  function renderAt(time) {
    const n = SHOT.blur;
    for (let k = 0; k < n; k++) {
      place(n === 1 ? time : time + SHUTTER * (k / (n - 1) - 0.5));
      draw();
      out.globalAlpha = 1 / (k + 1);
      out.drawImage(gl, 0, 0);
    }
    out.globalAlpha = 1;
  }

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
    if (!fs.existsSync(target)) fs.linkSync(path.join(outDir, "fonts", f), target);
  }
  console.log(`wrote previews/set3d/${move.id}`);
}
