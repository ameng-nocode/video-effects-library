// Isometric in real 3D with a fixed-angle camera (no perspective): a tiny city block on a floating tile.
// Buildings rise one by one, trees pop up, and a car drives around the road loop.
export default () => ({
  three: true,
  card: `<canvas id="gl3" width="1296" height="1944"></canvas><div id="ttl">Tiny Town</div>`,
  css: `
  #card { background: linear-gradient(180deg, #D7ECFF, #F3F8FF); }
  #gl3 { position: absolute; inset: 0; width: 864px; height: 1296px; }
  #ttl { position: absolute; left: 0; right: 0; top: 90px; text-align: center; font-family: "Geist", sans-serif; font-weight: 800; font-size: 96px; letter-spacing: -.03em; color: #23395B; }`,
  js: `
  const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("gl3"), antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setSize(1296, 1944, false); renderer.setClearColor(0, 0); renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xffffff, 0x9fb3c8, 1.6));
  const sun = new THREE.DirectionalLight(0xffffff, 2.2); sun.position.set(6, 12, 4); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8 }); scene.add(sun);
  const mat = (c) => new THREE.MeshLambertMaterial({ color: c });
  const box = (w, h, d, c, x, y, z) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(c)); m.position.set(x, y, z); m.castShadow = m.receiveShadow = true; scene.add(m); return m; };
  const base = box(8, 0.8, 8, 0x8FD18B, 0, -0.4, 0); box(8, 1.2, 8, 0xC49A6C, 0, -1.4, 0);
  const road = [box(8, 0.05, 1.2, 0x56606E, 0, 0.03, 2.4), box(1.2, 0.05, 8, 0x56606E, -2.4, 0.03, 0)];
  // Buildings grow from the ground: each one is moved so it scales from its base.
  const blds = [[1.2, 3.4, 1.6, 0xF2F2F2, 0.2, -1.4], [1.4, 2.2, 1.4, 0xFF8A80, 2.4, -1.2], [1.2, 4.6, 1.2, 0x7EB6FF, 1.4, 0.6], [1.6, 1.6, 1.4, 0xFFD166, 3.0, 0.6], [1.4, 2.8, 1.4, 0xB39DDB, -0.6, 0.4]].map(([w, h, d, c, x, z]) => {
    const g = new THREE.Group(); g.position.set(x, 0, z); const m = box(w, h, d, c, 0, h / 2, 0); g.add(m);
    for (let k = 0; k < Math.floor(h / 0.7); k++) { const win = new THREE.Mesh(new THREE.BoxGeometry(w * 0.7, 0.18, 0.02), mat(0x2E4057)); win.position.set(0, 0.45 + k * 0.7, d / 2 + 0.01); g.add(win); }
    scene.add(g); return g; });
  const trees = [[-3.3, -3.2], [-3.3, -1.4], [-1.2, -3.3], [3.4, 3.4], [-3.4, 3.4]].map(([x, z]) => { const g = new THREE.Group(); g.position.set(x, 0, z);
    const t = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.5, 6), mat(0x8D6E63)); t.position.y = 0.25; g.add(t);
    const c = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1.2, 6), mat(0x2E9E5B)); c.position.y = 1.0; c.castShadow = true; g.add(c); scene.add(g); return g; });
  const car = new THREE.Group(); { const b = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.35, 0.5), mat(0xE63946)); b.position.y = 0.3; b.castShadow = true; car.add(b);
    const top = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.25, 0.44), mat(0xF1FAEE)); top.position.set(-0.05, 0.58, 0); car.add(top); } scene.add(car);
  // Isometric: orthographic camera at the classic angle (45 degrees around, about 35 degrees down).
  const S = 6.2, cam = new THREE.OrthographicCamera(-S, S, S * 1.5, -S * 1.5, 0.1, 100); cam.position.set(10, 8.2, 10); cam.lookAt(0, 1.4, 0);
  const isl = new THREE.Group(); scene.children.slice().forEach((o) => { if (!o.isLight) isl.add(o); }); scene.add(isl);
  tl.fromTo(isl.position, { y: -12 }, { y: 0, duration: 0.9, ease: "expo.out" }, 0.1);
  blds.forEach((g, i) => tl.fromTo(g.scale, { y: 0.001 }, { y: 1, duration: 0.6, ease: "back.out(1.7)" }, 0.8 + i * 0.18));
  trees.forEach((g, i) => tl.fromTo(g.scale, { x: 0.001, y: 0.001, z: 0.001 }, { x: 1, y: 1, z: 1, duration: 0.4, ease: "back.out(2.5)" }, 1.6 + i * 0.1));
  tl.fromTo("#ttl", { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 1.2);
  function render(t) {
    // The car drives along the bottom road, turns, and up the side road.
    const p = Math.min(1, Math.max(0, (t - 2.0) / 2.8)); const L1 = 0.55;
    if (p < L1) { const k = p / L1; car.position.set(3.6 - k * 6.0, 0, 2.4); car.rotation.y = Math.PI; }
    else { const k = (p - L1) / (1 - L1); car.position.set(-2.4, 0, 2.4 - k * 5.6); car.rotation.y = Math.PI / 2; }
    renderer.render(scene, cam);
  }`,
});
