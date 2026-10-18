// Glassmorphism in real 3D: frosted glass panes drift in front of glossy spheres on a light grid. The glass
// blurs and bends whatever is behind it, the spheres float, and the panes slide past each other.
export default () => ({
  three: true,
  card: `<canvas id="gl3" width="1296" height="1944"></canvas><div id="kick">FROSTED GLASS</div>`,
  css: `
  #card { background: #F5F5F9; }
  #gl3 { position: absolute; inset: 0; width: 864px; height: 1296px; }
  #kick { position: absolute; left: 60px; top: 64px; font-family: "Geist Mono", monospace; font-weight: 600; font-size: 26px; letter-spacing: .22em; color: #6A4BD8; }`,
  js: `
  const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("gl3"), antialias: true, preserveDrawingBuffer: true });
  renderer.setSize(1296, 1944, false);
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.0; renderer.transmissionResolutionScale = 0.5;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf5f5f9);
  const pm = new THREE.PMREMGenerator(renderer); scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;

  // Light grid on the back wall so the frosted glass has something to blur.
  const gc = document.createElement("canvas"); gc.width = gc.height = 1024; const g = gc.getContext("2d");
  g.fillStyle = "#F5F5F9"; g.fillRect(0, 0, 1024, 1024); g.strokeStyle = "#E1E1EA"; g.lineWidth = 3;
  for (let i = 0; i <= 1024; i += 64) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, 1024); g.stroke(); g.beginPath(); g.moveTo(0, i); g.lineTo(1024, i); g.stroke(); }
  const gt = new THREE.CanvasTexture(gc); gt.colorSpace = THREE.SRGBColorSpace; gt.wrapS = gt.wrapT = THREE.RepeatWrapping; gt.repeat.set(3, 4);
  const wall = new THREE.Mesh(new THREE.PlaneGeometry(30, 40), new THREE.MeshStandardMaterial({ map: gt, roughness: 1 }));
  wall.position.z = -6; wall.receiveShadow = true; scene.add(wall);

  scene.add(new THREE.HemisphereLight(0xffffff, 0xdcd8f0, 1.2));
  const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(-4, 8, 8); key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048); key.shadow.radius = 8; Object.assign(key.shadow.camera, { left: -10, right: 10, top: 12, bottom: -12 }); scene.add(key);

  const gloss = (c) => new THREE.MeshPhysicalMaterial({ color: c, roughness: 0.18, clearcoat: 1, clearcoatRoughness: 0.08 });
  const ball = (r, c, x, y, z) => { const m = new THREE.Mesh(new THREE.SphereGeometry(r, 96, 64), gloss(c)); m.position.set(x, y, z); m.castShadow = true; scene.add(m); return m; };
  const balls = [ball(1.9, 0x6d3fe0, -1.2, 2.2, -2.2), ball(0.9, 0xd63ad8, 1.9, 4.6, -3.2), ball(1.5, 0xa995f2, 1.6, -1.6, -2.8), ball(0.8, 0xcfc6f7, -1.9, -3.9, -1.0)];
  const base = balls.map((b) => b.position.clone());

  const glass = new THREE.MeshPhysicalMaterial({ color: 0xf6f4ff, transmission: 1, roughness: 0.55, thickness: 1.4, ior: 1.45, clearcoat: 1, clearcoatRoughness: 0.05, specularIntensity: 1, attenuationColor: new THREE.Color(0xeeeaff), attenuationDistance: 3 });
  const edge = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 });
  const pane = (w, h) => { const geo = new RoundedBoxGeometry(w, h, 0.22, 6, 0.12); const m = new THREE.Mesh(geo, glass); m.castShadow = true; m.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo, 30), edge)); scene.add(m); return m; };
  const p1 = pane(5.2, 6.4), p2 = pane(3.8, 2.8);
  p1.position.set(0.6, 1.4, 0.4); p1.rotation.set(-0.06, -0.22, 0.02);
  p2.position.set(1.4, -2.8, 1.6); p2.rotation.set(0.05, -0.32, -0.03);

  const camera = new THREE.PerspectiveCamera(32, 864 / 1296, 0.1, 100);
  camera.position.set(0, 0.3, 17); camera.lookAt(0, 0.3, 0);

  tl.fromTo(p1.position, { x: -9 }, { x: 0.6, duration: 1.1, ease: "expo.out" }, 0.3);
  tl.fromTo(p2.position, { x: 9 }, { x: 1.4, duration: 1.1, ease: "expo.out" }, 0.6);
  tl.to(p1.position, { x: 0.1, duration: 3.4, ease: "sine.inOut" }, 1.4);
  tl.to(p2.position, { x: -0.6, duration: 3.2, ease: "sine.inOut" }, 1.7);
  tl.to(p1.rotation, { y: -0.08, duration: 3.4, ease: "sine.inOut" }, 1.4);
  balls.forEach((b, i) => tl.fromTo(b.scale, { x: 0.001, y: 0.001, z: 0.001 }, { x: 1, y: 1, z: 1, duration: 0.6, ease: "back.out(1.8)" }, 0.1 + i * 0.12));
  tl.fromTo("#kick", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }, 1.0);

  function render(t) {
    balls.forEach((b, i) => { b.position.y = base[i].y + Math.sin(t * 1.3 + i * 1.7) * 0.25; b.position.x = base[i].x + Math.cos(t * 0.9 + i) * 0.12; });
    camera.position.x = Math.sin(t * 0.4) * 0.5; camera.lookAt(0, 0.3, 0);
    renderer.render(scene, camera);
  }`,
});
