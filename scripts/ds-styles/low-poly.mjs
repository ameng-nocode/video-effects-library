// Low poly in real 3D: a fox sitting on a faceted hill at sunset, every surface a few flat triangles. The scene
// turns slowly so each facet catches the light, the tail swishes and the sun sinks.
export default () => ({
  three: true,
  card: `<canvas id="gl3" width="1296" height="1944"></canvas>`,
  css: `#card { background: linear-gradient(180deg, #2B1E4F 0%, #E2627A 55%, #F7B267 100%); } #gl3 { position: absolute; inset: 0; width: 864px; height: 1296px; }`,
  js: `
  const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("gl3"), antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setSize(1296, 1944, false); renderer.setClearColor(0, 0); renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xffd6c2, 0x3a2a5a, 1.3));
  const sun = new THREE.DirectionalLight(0xffc48a, 2.6); sun.position.set(-6, 5, 6); scene.add(sun);
  const flat = (c) => new THREE.MeshStandardMaterial({ color: c, flatShading: true, roughness: 0.9 });
  let seed = 9; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const lumpy = (geo, amt) => { const p = geo.attributes.position; for (let i = 0; i < p.count; i++) p.setXYZ(i, p.getX(i) * (1 + (rnd() - 0.5) * amt), p.getY(i) * (1 + (rnd() - 0.5) * amt), p.getZ(i) * (1 + (rnd() - 0.5) * amt)); geo.computeVertexNormals(); return geo; };
  const world = new THREE.Group(); scene.add(world);
  const hill = new THREE.Mesh(lumpy(new THREE.IcosahedronGeometry(5, 1), 0.18), flat(0x3E7C59)); hill.scale.set(1.3, 0.55, 1.3); hill.position.y = -4.2; world.add(hill);
  const mtn = (x, z, h, c) => { const m = new THREE.Mesh(lumpy(new THREE.ConeGeometry(h * 0.8, h, 5, 2), 0.15), flat(c)); m.position.set(x, -2.5 + h / 2, z); world.add(m); };
  mtn(-5, -6, 6, 0x5B4B8A); mtn(3, -8, 8, 0x4A3D78); mtn(7, -5, 5, 0x6A5A9A);
  // Fox: a few polyhedra in orange and cream.
  const fox = new THREE.Group(); const O = flat(0xE8742B), W = flat(0xF4EBDD), D = flat(0x2B2B2B);
  const body = new THREE.Mesh(lumpy(new THREE.DodecahedronGeometry(0.9, 0), 0.1), O); body.scale.set(0.9, 1.15, 0.8); body.position.y = 0.9; fox.add(body);
  const chest = new THREE.Mesh(new THREE.TetrahedronGeometry(0.55, 0), W); chest.position.set(0, 1.1, 0.5); fox.add(chest);
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.55, 1.0, 4), O); head.rotation.x = Math.PI / 2; head.position.set(0, 2.15, 0.35); fox.add(head);
  const skull = new THREE.Mesh(new THREE.OctahedronGeometry(0.55, 0), O); skull.position.set(0, 2.15, -0.05); fox.add(skull);
  [-1, 1].forEach((s) => { const e = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.6, 3), O); e.position.set(s * 0.3, 2.75, -0.1); e.rotation.z = -s * 0.25; fox.add(e); });
  const nose = new THREE.Mesh(new THREE.OctahedronGeometry(0.1, 0), D); nose.position.set(0, 2.15, 0.88); fox.add(nose);
  const tail = new THREE.Group(); const tm = new THREE.Mesh(new THREE.ConeGeometry(0.45, 1.8, 5), O); tm.rotation.z = Math.PI / 2 + 0.4; tm.position.x = 0.9; tail.add(tm);
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.5, 5), W); tip.rotation.z = -Math.PI / 2 + 0.4; tip.position.set(1.85, 0.4, 0); tail.add(tip); tail.position.set(0.5, 0.4, -0.4); fox.add(tail);
  fox.position.set(0, -0.15, 1.2); world.add(fox);
  const sunDisc = new THREE.Mesh(new THREE.CircleGeometry(1.6, 7), new THREE.MeshBasicMaterial({ color: 0xffe0a3 })); sunDisc.position.set(-3, 4, -12); world.add(sunDisc);
  const camera = new THREE.PerspectiveCamera(34, 864 / 1296, 0.1, 100); camera.position.set(0, 2.2, 13); camera.lookAt(0, 1.2, 0);
  tl.fromTo(hill.scale, { y: 0.001 }, { y: 0.55, duration: 0.8, ease: "expo.out" }, 0.1);
  tl.fromTo(fox.scale, { x: 0.001, y: 0.001, z: 0.001 }, { x: 1, y: 1, z: 1, duration: 0.7, ease: "back.out(1.8)" }, 0.7);
  tl.fromTo(sunDisc.position, { y: 6 }, { y: 1.5, duration: 5, ease: "none" }, 0);
  function render(t) { world.rotation.y = -0.5 + t * 0.2; tail.rotation.y = Math.sin(t * 3) * 0.35; head.rotation.z = Math.sin(t * 1.4) * 0.08; renderer.render(scene, camera); }`,
});
