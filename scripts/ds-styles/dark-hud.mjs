// Dark HUD (FUI): sci-fi screen graphics in 2.5D. The camera zooms through into a dark contour map, tilted
// panels sit in 3D space and slowly turn, a heavy headline comes into focus, a mono label types itself with a
// block cursor, numbers tick, and a light streak sweeps across. One amber accent, red only for a warning.
export default () => {
  const A = "#F0BA48";
  // Contour lines: wobbly rings around two peaks, like a topographic map.
  let seed = 5; const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  const ring = (cx, cy, r, k) => { const pts = []; for (let i = 0; i <= 64; i++) { const a = (i / 64) * Math.PI * 2; const w = 1 + 0.12 * Math.sin(a * 3 + k) + 0.07 * Math.sin(a * 5 + k * 2); pts.push(`${(cx + Math.cos(a) * r * w).toFixed(1)},${(cy + Math.sin(a) * r * w * 0.8).toFixed(1)}`); } return `<polyline points="${pts.join(" ")}"/>`; };
  const contours = [[250, 420], [700, 1050]].map(([cx, cy], j) => Array.from({ length: 11 }, (_, i) => ring(cx, cy, 60 + i * 58, j * 2 + rnd())).join("")).join("");
  const corner = (x, y, sx, sy) => `<path d="M${x},${y + sy * 40} L${x},${y} L${x + sx * 40},${y}" />`;
  return {
    card: `<div id="stage">
      <svg id="topo" viewBox="0 0 864 1296" width="1100" height="1650"><g fill="none" stroke="rgba(255,255,255,.09)" stroke-width="1.5">${contours}</g></svg>
      <div id="cam">
        <div id="tag">01 <span>|</span> SIGNAL FOUND</div>
        <div class="panel" id="p1"><div class="pl">TARGET</div><div class="pv" id="n1">0000</div><div class="bar"><i id="b1"></i></div></div>
        <div class="panel" id="p2"><div class="pl">STATUS</div><div class="pv warn">UNVERIFIED</div></div>
        <div id="head">SYSTEM<br/><em>ONLINE</em></div>
        <div id="label"><span id="typed"></span><b id="cur"></b></div>
        <svg id="frame" viewBox="0 0 864 1296" width="864" height="1296"><g fill="none" stroke="${A}" stroke-width="3">${corner(60, 330, 1, 1)}${corner(804, 330, -1, 1)}${corner(60, 980, 1, -1)}${corner(804, 980, -1, -1)}</g>
          <g fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1"><rect x="90" y="360" width="684" height="590"/></g>
          <circle id="ret" cx="432" cy="655" r="34" fill="none" stroke="${A}" stroke-width="2"/></svg>
      </div>
      <div id="streak"></div>
      <div id="meta">LAT 03.139 · LNG 101.687 · REC</div>
    </div>`,
    css: `
  #card { background: #050505; }
  #stage { position: absolute; inset: 0; overflow: hidden; perspective: 1100px; }
  #topo { position: absolute; left: -120px; top: -180px; }
  #cam { position: absolute; inset: 0; transform-style: preserve-3d; }
  #tag { position: absolute; left: 60px; top: 70px; font-family: "Geist Mono", monospace; font-size: 28px; letter-spacing: .14em; color: #E8E6E1; }
  #tag span { color: ${A}; margin: 0 8px; }
  .panel { position: absolute; width: 330px; padding: 22px 24px; border: 1px solid rgba(255,255,255,.35); background: rgba(255,255,255,.03); font-family: "Geist Mono", monospace; color: #E8E6E1; }
  #p1 { left: 70px; top: 160px; transform: rotateY(18deg) translateZ(40px); }
  #p2 { right: 70px; top: 1040px; transform: rotateY(-18deg) translateZ(40px); }
  .pl { font-size: 20px; letter-spacing: .2em; color: #8E9097; }
  .pv { font-size: 52px; font-weight: 600; margin-top: 6px; color: ${A}; text-shadow: 0 0 18px rgba(240,186,72,.6); }
  .pv.warn { color: #E85848; text-shadow: 0 0 18px rgba(232,88,72,.5); font-size: 40px; }
  .bar { margin-top: 14px; height: 6px; background: rgba(255,255,255,.12); } .bar i { display: block; height: 100%; width: 0; background: ${A}; box-shadow: 0 0 12px ${A}; }
  #head { position: absolute; left: 0; right: 0; top: 470px; text-align: center; font-family: "Geist", sans-serif; font-weight: 900; font-size: 150px; line-height: .95; letter-spacing: -.03em; color: #fff; transform: translateZ(120px); }
  #head em { font-style: normal; color: ${A}; text-shadow: 0 0 30px rgba(240,186,72,.55); }
  #label { position: absolute; left: 0; right: 0; top: 800px; text-align: center; font-family: "Geist Mono", monospace; font-size: 30px; letter-spacing: .26em; color: #C9C7C2; transform: translateZ(80px); }
  #cur { display: inline-block; width: 18px; height: 32px; background: ${A}; vertical-align: -5px; margin-left: 6px; }
  #frame { position: absolute; left: 0; top: 0; transform: translateZ(10px); }
  #streak { position: absolute; top: -20%; bottom: -20%; width: 120px; left: -30%; background: linear-gradient(90deg, rgba(240,186,72,0), rgba(255,226,160,.85), rgba(240,186,72,0)); transform: skewX(-20deg); filter: blur(6px); mix-blend-mode: screen; }
  #meta { position: absolute; left: 60px; bottom: 50px; font-family: "Geist Mono", monospace; font-size: 20px; letter-spacing: .16em; color: #6E7078; }`,
    js: `
  // Zoom-through: the whole set flies in from the camera with motion blur, then the camera keeps creeping in.
  tl.fromTo("#cam", { scale: 3.2, filter: "blur(18px)", opacity: 0 }, { scale: 1, filter: "blur(0px)", opacity: 1, duration: 0.9, ease: "expo.out" }, 0.05);
  tl.to("#cam", { scale: 1.08, rotateY: -5, rotateX: 3, duration: 4, ease: "sine.inOut" }, 0.95);
  tl.fromTo("#topo", { x: 0, y: 0 }, { x: -60, y: -40, duration: 5, ease: "none" }, 0);
  tl.fromTo("#head", { filter: "blur(14px)", opacity: 0.2 }, { filter: "blur(0px)", opacity: 1, duration: 0.8, ease: "power2.out" }, 0.8);
  tl.fromTo(".panel", { opacity: 0, x: (i) => (i ? 120 : -120) }, { opacity: 1, x: 0, duration: 0.7, ease: "expo.out", stagger: 0.15 }, 0.6);
  tl.fromTo("#frame", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.9);
  tl.fromTo("#ret", { scale: 3, transformOrigin: "50% 50%", opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "expo.out" }, 1.1);
  tl.to("#ret", { rotation: 180, transformOrigin: "50% 50%", duration: 3, ease: "none" }, 1.6);
  tl.fromTo("#b1", { width: "0%" }, { width: "78%", duration: 2.2, ease: "power2.out" }, 1.0);
  // Typed label and ticking number, both read from the time.
  const msg = "TARGET · SECTOR 7 · LIVE"; const S = { t: 0 };
  const draw = () => { const t = S.t; document.getElementById("typed").textContent = msg.slice(0, Math.max(0, Math.floor((t - 1.5) * 16)));
    document.getElementById("cur").style.opacity = Math.floor(t * 3) % 2 ? 0 : 1;
    document.getElementById("n1").textContent = String(Math.min(7342, Math.floor(Math.max(0, t - 0.8) * 3400))).padStart(4, "0"); };
  tl.to(S, { t: 5, duration: 5, ease: "none", onUpdate: draw }, 0); draw();
  tl.fromTo("#streak", { left: "-30%" }, { left: "130%", duration: 0.5, ease: "power2.in" }, 3.6);`,
  };
};
