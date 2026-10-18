// Steampunk in real 3D: a brass clock machine. Polished gears mesh and turn, a pressure gauge needle climbs,
// copper pipes run behind, and puffs of steam rise from the valve. Warm metal light on dark wood.
export default () => ({
  three: true,
  card: `<canvas id="gl3" width="1296" height="1944"></canvas><div id="plate">ENGINE No. 9</div>`,
  css: `
  #card { background: repeating-linear-gradient(92deg, #3A2414 0 10px, #45301C 10px 22px, #331F11 22px 26px); }
  #gl3 { position: absolute; inset: 0; width: 864px; height: 1296px; }
  #plate { position: absolute; left: 50%; top: 80px; transform: translateX(-50%); padding: 14px 36px; border-radius: 10px; background: linear-gradient(180deg, #E8C27A, #A8742E); color: #3A2410;
    font-family: Georgia, serif; font-weight: 700; font-size: 48px; letter-spacing: .12em; box-shadow: inset 0 2px 0 rgba(255,255,255,.5), 0 8px 18px rgba(0,0,0,.5); white-space: nowrap; }`,
  js: `
  const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("gl3"), antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setSize(1296, 1944, false); renderer.setClearColor(0, 0); renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.2;
  const scene = new THREE.Scene(); const pm = new THREE.PMREMGenerator(renderer); scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
  const key = new THREE.PointLight(0xffc27a, 60, 40); key.position.set(-3, 4, 6); scene.add(key);
  const brass = new THREE.MeshStandardMaterial({ color: 0xC9A04A, metalness: 1, roughness: 0.3 });
  const copper = new THREE.MeshStandardMaterial({ color: 0xB86B3D, metalness: 1, roughness: 0.35 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x2A1C12, metalness: 0.4, roughness: 0.6 });
  const gear = (r, teeth, depth) => { const s = new THREE.Shape(); const tooth = (Math.PI * 2) / teeth;
    for (let i = 0; i < teeth; i++) { const a = i * tooth; [[r, 0], [r + 0.28, 0.15], [r + 0.28, 0.45], [r, 0.6]].forEach(([rr, f], k) => { const x = Math.cos(a + f * tooth) * rr, y = Math.sin(a + f * tooth) * rr; i === 0 && k === 0 ? s.moveTo(x, y) : s.lineTo(x, y); }); }
    const h = new THREE.Path(); h.absarc(0, 0, r * 0.25, 0, Math.PI * 2, true); s.holes.push(h);
    for (let k = 0; k < 4; k++) { const c = new THREE.Path(); const a = k * Math.PI / 2 + 0.4; c.absarc(Math.cos(a) * r * 0.6, Math.sin(a) * r * 0.6, r * 0.2, 0, Math.PI * 2, true); s.holes.push(c); }
    return new THREE.Mesh(new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: true, bevelSize: 0.04, bevelThickness: 0.04, bevelSegments: 2, curveSegments: 24 }), brass); };
  const g1 = gear(2.0, 20, 0.35), g2 = gear(1.2, 12, 0.35), g3 = gear(0.9, 9, 0.35);
  g1.position.set(-0.9, -1.0, 0); g2.position.set(2.12, 0.6, 0.1); g3.position.set(-0.4, 2.55, 0.1); [g1, g2, g3].forEach((g) => scene.add(g));
  [[-0.9, -1.0], [2.12, 0.6], [-0.4, 2.55]].forEach(([x, y]) => { const a = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.9, 24), dark); a.rotation.x = Math.PI / 2; a.position.set(x, y, 0.2); scene.add(a); });
  const pipe = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(-4, -4.5, -1), new THREE.Vector3(-3, -1, -1), new THREE.Vector3(1, 1.5, -1.2), new THREE.Vector3(3.2, 3.6, -1)]), 64, 0.3, 16), copper); scene.add(pipe);
  // Gauge: a brass ring with a cream face and a red needle.
  const gauge = new THREE.Group(); gauge.position.set(2.0, -3.0, 0.4); scene.add(gauge);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.14, 16, 48), brass); gauge.add(ring);
  const face = new THREE.Mesh(new THREE.CircleGeometry(0.95, 48), new THREE.MeshStandardMaterial({ color: 0xF0E2C0, roughness: 0.8 })); face.position.z = -0.02; gauge.add(face);
  const needle = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.8, 0.03), new THREE.MeshStandardMaterial({ color: 0xB0281E })); needle.geometry.translate(0, 0.38, 0); needle.position.z = 0.05; gauge.add(needle);
  const valve = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.6, 20), copper); valve.position.set(3.2, 3.9, -1); scene.add(valve);
  // Steam: soft sprites rising from the valve.
  const sc = document.createElement("canvas"); sc.width = sc.height = 128; const sg = sc.getContext("2d"); const gr = sg.createRadialGradient(64, 64, 0, 64, 64, 64); gr.addColorStop(0, "rgba(255,255,255,.8)"); gr.addColorStop(1, "rgba(255,255,255,0)"); sg.fillStyle = gr; sg.fillRect(0, 0, 128, 128);
  const puffs = Array.from({ length: 10 }, (_, i) => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(sc), transparent: true, depthWrite: false })); scene.add(s); return s; });
  const camera = new THREE.PerspectiveCamera(38, 864 / 1296, 0.1, 100); camera.position.set(0.8, 0, 14); camera.lookAt(0.6, 0, 0);
  const machine = [g1, g2, g3, pipe, gauge, valve];
  machine.forEach((m, i) => tl.fromTo(m.position, { z: -20 }, { z: m.position.z, duration: 0.7, ease: "expo.out" }, 0.1 + i * 0.1));
  tl.fromTo("#plate", { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.6);
  function render(t) { const run = Math.max(0, t - 1.0); g1.rotation.z = run * 0.8; g2.rotation.z = -run * 0.8 * 20 / 12 + 0.12; g3.rotation.z = -run * 0.8 * 20 / 9 + 0.2;
    needle.rotation.z = 2.2 - Math.min(1, run / 2.5) * 3.2 + Math.sin(t * 9) * 0.03;
    puffs.forEach((p, i) => { const k = ((t - 1.2) * 0.6 + i / puffs.length) % 1; const on = t > 1.2 ? 1 : 0; p.position.set(3.2 + Math.sin(i * 2 + t) * 0.3 * k, 4.3 + k * 3.5, -1); p.scale.setScalar(0.4 + k * 2.2); p.material.opacity = on * (1 - k) * 0.8; });
    camera.position.x = 0.8 + Math.sin(t * 0.5) * 0.6; camera.lookAt(0.6, 0, 0); renderer.render(scene, camera); }`,
});
