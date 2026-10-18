// Risograph: a zine cover printed one ink at a time. The pink pass rolls down the page, then the blue pass,
// the two inks mix where they overlap, and the layers drift slightly out of register. Grain on top.
export default () => {
  const pink = `<svg viewBox="0 0 864 1296" width="864" height="1296">
      <circle cx="560" cy="520" r="250" fill="#FF48B0"/>
      <rect x="80" y="980" width="704" height="40" fill="#FF48B0"/><rect x="80" y="1060" width="460" height="40" fill="#FF48B0"/>
      <text x="76" y="270" font-family="Geist, sans-serif" font-weight="900" font-size="200" letter-spacing="-8" fill="#FF48B0">PRINT</text>
    </svg>`;
  const blue = `<svg viewBox="0 0 864 1296" width="864" height="1296">
      <path d="M80,760 C200,640 300,880 420,760 S640,640 784,760 L784,900 L80,900 Z" fill="#0078BF"/>
      <circle cx="330" cy="560" r="170" fill="#0078BF"/>
      <text x="80" y="1210" font-family="Geist, sans-serif" font-weight="900" font-size="120" letter-spacing="-4" fill="#0078BF">CLUB NO.7</text>
    </svg>`;
  return {
    card: `<div class="ink" id="pink">${pink}</div><div class="ink" id="blue">${blue}</div><canvas id="grain" width="432" height="648"></canvas>
      <div id="roller"></div>`,
    css: `
  #card { background: #F6F1E7; }
  .ink { position: absolute; inset: 0; mix-blend-mode: multiply; }
  .ink svg { display: block; }
  #grain { position: absolute; inset: 0; width: 864px; height: 1296px; mix-blend-mode: multiply; opacity: .5; }
  #roller { position: absolute; left: -20px; right: -20px; height: 34px; top: 0; background: linear-gradient(#cfcac0, #8f8a80); border-radius: 17px; opacity: 0; box-shadow: 0 8px 14px rgba(0,0,0,.2); }`,
    js: `
  let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const gc = document.getElementById("grain").getContext("2d"), gd = gc.createImageData(432, 648);
  for (let i = 0; i < 432 * 648; i++) { const v = 255 - rnd() * rnd() * 140; gd.data[i * 4] = gd.data[i * 4 + 1] = gd.data[i * 4 + 2] = v; gd.data[i * 4 + 3] = 255; }
  gc.putImageData(gd, 0, 0);
  // Each ink is revealed top to bottom behind a roller, like a page going through the drum.
  [["#pink", 0.2], ["#blue", 1.5]].forEach(([id, t]) => {
    tl.fromTo(id, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.0, ease: "power1.inOut" }, t);
    tl.set("#roller", { opacity: 1 }, t).fromTo("#roller", { y: -30 }, { y: 1296, duration: 1.0, ease: "power1.inOut" }, t).set("#roller", { opacity: 0 }, t + 1.0);
  });
  // Misregistration: the blue layer lands a little off and keeps shifting in small steps.
  [[2.6, 8, -5], [3.1, 3, 6], [3.6, -6, 2], [4.1, 9, -4], [4.6, 4, 4]].forEach(([t, x, y]) => tl.set("#blue", { x, y }, t));
  [[3.3, -4, 3], [4.3, 3, -2]].forEach(([t, x, y]) => tl.set("#pink", { x, y }, t));`,
  };
};
