// Y2K: shiny chrome and bubbly tech from around 2000. Chrome "2000" with a moving shine, a spinning chrome
// ring, star sparkles that twinkle, see-through bubbles floating up, and a little electric spark.
export default () => {
  const sparkle = (x, y, s, i) => `<svg class="spk" style="left:${x - s / 2}px;top:${y - s / 2}px" width="${s}" height="${s}" viewBox="-10 -10 20 20"><path d="M0,-10 C1,-2 2,-1 10,0 C2,1 1,2 0,10 C-1,2 -2,1 -10,0 C-2,-1 -1,-2 0,-10 Z" fill="url(#chromeS${i})"/>
    <defs><linearGradient id="chromeS${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".5" stop-color="#9FB8D9"/><stop offset="1" stop-color="#fff"/></linearGradient></defs></svg>`;
  const bubbles = [[130, 1100, 110], [700, 1180, 80], [560, 1240, 140], [250, 1250, 70], [780, 1000, 60]];
  return {
    card: `<div id="grid"></div>
      <div id="ring"></div>
      <div id="num">2000</div>
      <div id="tag">FUTURE IS NOW</div>
      ${sparkle(150, 230, 120, 0)}${sparkle(720, 330, 90, 1)}${sparkle(680, 900, 140, 2)}${sparkle(170, 820, 70, 3)}
      ${bubbles.map(([x, y, d]) => `<div class="bub" style="left:${x - d / 2}px;top:${y - d / 2}px;width:${d}px;height:${d}px"></div>`).join("")}
      <svg id="zap" width="120" height="200" viewBox="0 0 12 20"><path d="M7,0 L1,11 L5,11 L3,20 L11,7 L7,7 L9,0 Z" fill="#B6F3FF" stroke="#fff" stroke-width=".6"/></svg>`,
    css: `
  #card { background: linear-gradient(170deg, #DDE7F6 0%, #B9C8F0 40%, #F2C6E4 100%); }
  #grid { position: absolute; left: -100px; right: -100px; bottom: 0; height: 420px; background-image: linear-gradient(rgba(255,255,255,.7) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,.7) 2px, transparent 2px);
    background-size: 64px 64px; transform: perspective(500px) rotateX(60deg); transform-origin: 50% 100%; }
  #ring { position: absolute; left: 132px; top: 300px; width: 600px; height: 600px; border-radius: 50%; border: 34px solid transparent;
    background: conic-gradient(from 0deg, #fff, #8FA6C8, #F7F9FF, #6E86AE, #fff, #A8B9D8, #fff) border-box; -webkit-mask: linear-gradient(#000 0 0) padding-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask-composite: exclude; }
  #num { position: absolute; left: 0; right: 0; top: 470px; text-align: center; font-family: "Geist", sans-serif; font-weight: 900; font-size: 240px; letter-spacing: -.04em;
    background: linear-gradient(180deg, #FFFFFF 0%, #C7D6EE 30%, #5D6F92 48%, #F4F8FF 52%, #9DB0CF 75%, #FFFFFF 100%); background-size: 100% 200%; -webkit-background-clip: text; background-clip: text; color: transparent;
    -webkit-text-stroke: 2px rgba(255,255,255,.9); filter: drop-shadow(0 10px 14px rgba(60,70,140,.35)); }
  #tag { position: absolute; left: 0; right: 0; top: 760px; text-align: center; font-family: "Geist Mono", monospace; font-weight: 600; font-size: 34px; letter-spacing: .4em; color: #5161A8; }
  .spk { position: absolute; filter: drop-shadow(0 0 10px rgba(255,255,255,.9)); }
  .bub { position: absolute; border-radius: 50%; background: radial-gradient(circle at 32% 28%, rgba(255,255,255,.95) 0 10%, rgba(255,255,255,.15) 30%, rgba(170,200,255,.25) 70%, rgba(255,180,230,.55) 100%); border: 2px solid rgba(255,255,255,.7); }
  #zap { position: absolute; left: 640px; top: 80px; filter: drop-shadow(0 0 16px #7FE6FF); }`,
    js: `
  tl.fromTo("#card", { opacity: 0 }, { opacity: 1, duration: 0.25 }, 0);
  tl.fromTo("#grid", { backgroundPositionY: 0 }, { backgroundPositionY: 320, duration: 5, ease: "none" }, 0);
  tl.fromTo("#ring", { scale: 0, rotation: -180 }, { scale: 1, rotation: 0, duration: 0.9, ease: "back.out(1.5)" }, 0.2);
  tl.to("#ring", { rotation: 360, duration: 4, ease: "none" }, 1.1);
  tl.fromTo("#num", { y: 120, opacity: 0, scaleY: 0.3 }, { y: 0, opacity: 1, scaleY: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" }, 0.6);
  tl.fromTo("#num", { backgroundPosition: "0 100%" }, { backgroundPosition: "0 0%", duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: 1 }, 1.2);
  tl.fromTo("#tag", { opacity: 0, letterSpacing: "1.2em" }, { opacity: 1, letterSpacing: "0.4em", duration: 0.8, ease: "power3.out" }, 1.1);
  gsap.utils.toArray(".spk").forEach((s, i) => { tl.fromTo(s, { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.4, ease: "back.out(3)" }, 0.9 + i * 0.15);
    tl.to(s, { scale: 0.4, rotation: 45, duration: 0.35, ease: "sine.inOut", yoyo: true, repeat: 3 }, 1.8 + i * 0.25); });
  gsap.utils.toArray(".bub").forEach((b, i) => tl.fromTo(b, { y: 300 }, { y: -500 - i * 60, duration: 4.5, ease: "none" }, 0.3 + i * 0.1));
  [[1.4, 1], [1.46, 0.2], [1.52, 1], [3.1, 0.2], [3.16, 1]].forEach(([t, o]) => tl.set("#zap", { opacity: o }, t));
  tl.set("#zap", { opacity: 0 }, 0);`,
  };
};
