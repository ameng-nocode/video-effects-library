// Liquid metal in real 3D: a smooth mirror chrome ball on a dark card, reflecting a soft studio with curved warm
// and cool light arcs that slide around its surface. Brushed metal bars rise like a chart with a lime glow on the
// winner, and everything shows a soft reflection in the dark floor below.
export default () => ({
  three: true,
  card: `<canvas id="gl3" width="1296" height="1944"></canvas>
    <div id="kick">FORECAST</div><div id="head">Grow</div><div id="sub">Three bars, one winner.</div>
    <div class="lab"><b>62%</b></div><div class="lab">21%</div><div class="lab">9%</div>`,
  css: `
  #card { background: radial-gradient(120% 80% at 50% 30%, #44464D 0%, #1B1C20 60%, #0E0F11 100%); }
  #gl3 { position: absolute; inset: 0; width: 864px; height: 1296px; }
  #kick { position: absolute; left: 60px; top: 70px; font-family: "Geist Mono", monospace; font-size: 22px; letter-spacing: .2em; color: #C6FF3D; }
  #head { position: absolute; left: 56px; top: 110px; font-family: "Geist", sans-serif; font-weight: 800; font-size: 150px; letter-spacing: -.04em; color: #F2F2F2; }
  #sub { position: absolute; left: 60px; top: 290px; font-family: "Geist", sans-serif; font-size: 34px; color: #A3A5AB; }
  .lab { position: absolute; transform: translate(-50%, -100%); font-family: "Geist Mono", monospace; font-size: 28px; color: #E6E6E6; }
  .lab b { color: #C6FF3D; font-weight: 700; }`,
  js: `
  const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("gl3"), antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setSize(1296, 1944, false); renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.15;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();

  // Studio to reflect: a soft grey dome with a bright top softbox, plus thin glowing rings around the ball.
  // The rings reflect as the curved light streaks seen on chrome product shots.
  const env = new THREE.Scene();
  env.add(new THREE.Mesh(new THREE.SphereGeometry(30, 48, 24), new THREE.ShaderMaterial({ side: THREE.BackSide,
    vertexShader: "varying vec3 p; void main(){ p = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
    fragmentShader: "varying vec3 p; void main(){ float t = clamp(p.y*0.5+0.5,0.0,1.0); gl_FragColor = vec4(mix(vec3(0.01,0.01,0.012), vec3(0.16,0.165,0.18), pow(t,2.2)), 1.0); }" })));
  const soft = (w, h, x, y, z, c) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide })); m.position.set(x, y, z); m.lookAt(0, 0, 0); env.add(m); };
  soft(5, 2.4, -5, 6, 9, 0xffffff); soft(10, 1.2, 0, -9, 4, 0x55565c);
  // Short glowing arcs at the sides and behind: they show up as curved streaks near the rim of the ball.
  const arc = (r, len, c, rx, ry, rz, tube) => { const m = new THREE.Mesh(new THREE.TorusGeometry(r, tube, 8, 64, len), new THREE.MeshBasicMaterial({ color: c })); m.rotation.set(rx, ry, rz); env.add(m); };
  arc(9, 1.3, 0xffffff, 0, Math.PI / 2, 0.4, 0.4); arc(9, 1.1, 0xffffff, 0, -Math.PI / 2, 2.4, 0.4); arc(9, 1.0, 0xff9a4a, 0.3, Math.PI / 2 + 0.6, 3.4, 0.5);
  arc(9, 1.0, 0x6ea8ff, -0.3, -Math.PI / 2 - 0.6, 5.6, 0.5); arc(9, 1.6, 0xffffff, Math.PI, 0, 1.0, 0.26); arc(9, 0.8, 0xffffff, 0.2, Math.PI / 2, 4.6, 0.22);
  const pm = new THREE.PMREMGenerator(renderer); scene.environment = pm.fromScene(env, 0).texture;

  const chrome = new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 1, roughness: 0.03, clearcoat: 1, clearcoatRoughness: 0.02});
  const geo = new THREE.SphereGeometry(1.25, 192, 144); const P = geo.attributes.position; const orig = P.array.slice();
  const sphere = new THREE.Mesh(geo, chrome); scene.add(sphere);
  const brushed = new THREE.MeshPhysicalMaterial({ color: 0xbfc2c9, metalness: 0.95, roughness: 0.3});
  const lime = new THREE.MeshStandardMaterial({ color: 0xc6ff3d, emissive: 0xc6ff3d, emissiveIntensity: 1.3});
  const H = [3.4, 1.5, 0.75], X = [0.55, 1.55, 2.5], FLOOR = -4.2;
  const bars = H.map((h, i) => { const g = new THREE.Group(); g.position.set(X[i], FLOOR, 0);
    const b = new THREE.Mesh(new RoundedBoxGeometry(0.78, h, 0.78, 4, 0.05), brushed); b.position.y = h / 2; g.add(b);
    const cap = new THREE.Mesh(new RoundedBoxGeometry(0.8, 0.1, 0.8, 2, 0.03), i === 0 ? lime : brushed); cap.position.y = h + 0.03; g.add(cap);
    scene.add(g); return g; });
  // Floor reflection: mirrored copies (flipped around the floor) under a see-through dark floor.
  const mirror = new THREE.Group(); mirror.scale.y = -1; mirror.position.y = 2 * FLOOR; scene.add(mirror);
  // The flip turns faces inside out, so the copies draw their back faces.
  const back = (m) => { const c = m.clone(); c.side = THREE.BackSide; return c; };
  const sphereR = new THREE.Mesh(geo, back(chrome)); mirror.add(sphereR);
  const barsR = bars.map((g) => { const c = g.clone(); c.traverse((o) => { if (o.isMesh) o.material = back(o.material); }); mirror.add(c); return c; });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), new THREE.MeshBasicMaterial({ color: 0x0e0f11, transparent: true, opacity: 0.8 }));
  floor.rotation.x = -Math.PI / 2; floor.position.y = FLOOR + 0.001; scene.add(floor);
  const camera = new THREE.PerspectiveCamera(30, 864 / 1296, 0.1, 100); camera.position.set(0, 0.2, 18); camera.lookAt(0, -1.6, 0);

  const grow = { s: 0.001 }; tl.fromTo(grow, { s: 0.001 }, { s: 1, duration: 0.9, ease: "elastic.out(1, 0.55)" }, 0.2);
  bars.forEach((g, i) => tl.fromTo(g.scale, { y: 0.001 }, { y: 1, duration: 0.8, ease: "expo.out" }, 0.9 + i * 0.15));
  tl.fromTo(["#kick", "#head", "#sub"], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.1 }, 0.4);
  tl.fromTo(".lab", { opacity: 0 }, { opacity: 1, duration: 0.3, stagger: 0.1 }, 1.6);

  function render(t) {
    // The studio turns slowly, so the light arcs slide around the ball.
    scene.environmentRotation.set(0.15 * Math.sin(t * 0.6), t * 0.7, 0);
    // A very small slow wobble keeps it feeling liquid without breaking the mirror.
    for (let i = 0; i < P.count; i++) { const x = orig[i * 3], y = orig[i * 3 + 1], z = orig[i * 3 + 2];
      const k = 1 + 0.006 * Math.sin(y * 4 + t * 3) * Math.cos(x * 3 - t * 2.4); P.setXYZ(i, x * k, y * k, z * k); }
    P.needsUpdate = true; geo.computeVertexNormals();
    const y = FLOOR + 1.6 + Math.sin(t * 1.6) * 0.18;
    sphere.position.set(-1.6, y, 0.3); sphere.scale.setScalar(grow.s);
    sphereR.position.set(-1.6, y, 0.3); sphereR.scale.setScalar(grow.s);
    barsR.forEach((c, i) => { c.scale.y = bars[i].scale.y; });
    const labs = document.querySelectorAll(".lab"); const v = new THREE.Vector3();
    bars.forEach((g, i) => { v.set(g.position.x, FLOOR + H[i] * g.scale.y + 0.3, 0).project(camera); labs[i].style.left = ((v.x + 1) / 2 * 864) + "px"; labs[i].style.top = ((1 - v.y) / 2 * 1296 - 6) + "px"; });
    renderer.render(scene, camera);
  }`,
});
