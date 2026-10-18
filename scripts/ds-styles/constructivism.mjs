// Constructivism: a 1920s style poster. A loudspeaker shape, red and black diagonal bars and bold type shoot
// in along the diagonals, an arrow punches toward the word, and the poster shakes with energy.
export default () => {
  const R = "#D7261E", K = "#141414";
  return {
    card: `<div id="cv">
      <div class="bar" id="b1" style="background:${R};left:-200px;top:300px;width:1300px;height:130px;transform:rotate(-28deg)"></div>
      <div class="bar" id="b2" style="background:${K};left:-200px;top:700px;width:1300px;height:60px;transform:rotate(-28deg)"></div>
      <div id="circle"></div>
      <svg id="speaker" viewBox="0 0 400 400" width="420" height="420"><polygon points="40,160 140,160 320,40 320,360 140,240 40,240" fill="${K}"/>
        <path class="wave" d="M350,140 Q390,200 350,260" fill="none" stroke="${R}" stroke-width="16"/><path class="wave" d="M372,100 Q440,200 372,300" fill="none" stroke="${R}" stroke-width="16"/></svg>
      <div class="word" id="w1">SPEAK</div>
      <div class="word" id="w2">UP!</div>
      <svg id="arrow" viewBox="0 0 400 120" width="420" height="120"><polygon points="0,40 280,40 280,0 400,60 280,120 280,80 0,80" fill="${R}"/></svg>
      <div id="small">ALL VOICES · 1924 · NO.3</div>
    </div>`,
    css: `
  #card { background: #EFE6D2; }
  #cv { position: absolute; inset: 0; overflow: hidden; }
  .bar { position: absolute; transform-origin: 50% 50%; }
  #circle { position: absolute; left: 470px; top: 120px; width: 300px; height: 300px; border-radius: 50%; background: ${R}; }
  #speaker { position: absolute; left: 60px; top: 760px; transform: rotate(-28deg); }
  .word { position: absolute; font-family: "Geist", sans-serif; font-weight: 900; letter-spacing: -.04em; color: ${K}; transform: rotate(-28deg); transform-origin: 0 0; white-space: nowrap; }
  #w1 { left: 80px; top: 640px; font-size: 200px; }
  #w2 { left: 420px; top: 900px; font-size: 230px; color: ${R}; }
  #arrow { position: absolute; left: 60px; top: 1120px; transform: rotate(-28deg) scale(.7); }
  #small { position: absolute; right: 50px; bottom: 50px; font-family: "Geist Mono", monospace; font-weight: 700; font-size: 26px; letter-spacing: .14em; color: ${K}; }`,
    js: `
  // Everything travels along the same diagonal, like it is being shouted onto the page.
  const dx = Math.cos(-28 * Math.PI / 180), dy = Math.sin(-28 * Math.PI / 180);
  [["#b1", 1, 0.1], ["#b2", -1, 0.25], ["#w1", -1, 0.7], ["#w2", 1, 0.95]].forEach(([id, s, t]) => tl.fromTo(id, { x: s * 1400 * dx, y: s * 1400 * dy }, { x: 0, y: 0, duration: 0.55, ease: "expo.out" }, t));
  tl.fromTo("#circle", { scale: 0 }, { scale: 1, duration: 0.5, ease: "back.out(1.6)" }, 0.4);
  tl.fromTo("#speaker", { x: -500 }, { x: 0, duration: 0.5, ease: "expo.out" }, 1.2);
  tl.fromTo("#arrow", { x: -700 }, { x: 0, duration: 0.45, ease: "expo.out" }, 1.5);
  tl.fromTo(".wave", { opacity: 0 }, { opacity: 1, duration: 0.15, stagger: 0.15, repeat: 5, yoyo: true }, 1.8);
  tl.fromTo("#small", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 2.0);
  [[2.6, 8], [2.65, -8], [2.7, 5], [2.75, 0], [3.9, 8], [3.95, -6], [4.0, 0]].forEach(([t, x]) => tl.set("#cv", { x }, t));
  tl.to("#arrow", { x: 30, duration: 0.25, ease: "power2.out", yoyo: true, repeat: 3 }, 3.0);`,
  };
};
