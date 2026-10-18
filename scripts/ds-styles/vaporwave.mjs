// Vaporwave: a classical bust on a checker floor under a pastel sunset. Old computer windows pop up, the
// floor scrolls into the distance, the bust slowly turns its gaze, and wide spaced text fades in.
export default () => {
  const win = (id, x, y, w, h, title, body) => `<div class="win" id="${id}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px"><div class="bar"><span>${title}</span><i>x</i></div><div class="body">${body}</div></div>`;
  return {
    card: `<div id="sky"></div><div id="sun"></div><div id="floor"></div>
      <svg id="bust" viewBox="0 0 400 520" width="400" height="520"><defs><linearGradient id="marble" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".6" stop-color="#E4DCEB"/><stop offset="1" stop-color="#B9A9C9"/></linearGradient></defs>
        <path d="M60,520 C60,420 120,380 160,360 L160,320 C120,300 110,260 115,220 C100,215 95,190 110,180 C110,90 160,40 220,40 C290,40 330,100 320,170 C335,180 330,205 315,210 C315,270 290,310 250,320 L250,360 C300,380 350,420 350,520 Z" fill="url(#marble)" stroke="#8E7BA8" stroke-width="3"/>
        <path d="M120,130 C140,70 230,40 300,100 C270,90 250,110 230,100 C210,120 180,100 160,120 C150,110 130,120 120,130 Z" fill="#D8CDE3"/><path d="M190,190 C200,186 214,186 222,192" stroke="#8E7BA8" stroke-width="4" fill="none"/></svg>
      ${win("w1", 60, 180, 360, 200, "hello.exe", "<b>WELCOME</b><div class='prog'><i></i></div>")}
      ${win("w2", 470, 300, 320, 170, "error", "Feelings not found.<div class='btns'><u>OK</u></div>")}
      <div id="txt">ＤＲＥＡＭ ９６</div>`,
    css: `
  #card { background: #FF9DD6; }
  #sky { position: absolute; inset: 0; background: linear-gradient(180deg, #7B5CD6 0%, #FF8FC8 50%, #FFD1E8 64%); }
  #sun { position: absolute; left: 232px; top: 430px; width: 400px; height: 400px; border-radius: 50%; background: linear-gradient(180deg, #FFE36E, #FF6FA8);
    -webkit-mask: repeating-linear-gradient(180deg, #000 0 26px, transparent 26px 34px); mask: repeating-linear-gradient(180deg, #000 0 26px, transparent 26px 34px); }
  #floor { position: absolute; left: -400px; right: -400px; bottom: 0; height: 520px; transform: perspective(380px) rotateX(58deg); transform-origin: 50% 100%;
    background-color: #1FD1E0; background-image: conic-gradient(#1A0E3A 25%, transparent 0 50%, #1A0E3A 0 75%, transparent 0); background-size: 120px 120px; }
  #bust { position: absolute; left: 232px; top: 640px; filter: drop-shadow(10px 14px 0 rgba(90,40,140,.35)); }
  .win { position: absolute; background: #C3C3C3; border: 3px solid; border-color: #fff #555 #555 #fff; font-family: "Geist Mono", monospace; }
  .bar { height: 38px; background: linear-gradient(90deg, #0A0A80, #A0C8F0); color: #fff; font-size: 22px; display: flex; justify-content: space-between; align-items: center; padding: 0 8px; }
  .bar i { font-style: normal; width: 26px; height: 24px; background: #C3C3C3; color: #000; text-align: center; line-height: 22px; border: 2px solid; border-color: #fff #555 #555 #fff; }
  .body { padding: 18px; font-size: 24px; color: #000; }
  .prog { margin-top: 18px; height: 26px; border: 2px solid; border-color: #555 #fff #fff #555; background: #fff; } .prog i { display: block; height: 100%; width: 0; background: repeating-linear-gradient(90deg, #0A0A80 0 18px, transparent 18px 22px); }
  .btns { margin-top: 18px; text-align: center; } .btns u { text-decoration: none; display: inline-block; padding: 4px 30px; border: 2px solid; border-color: #fff #555 #555 #fff; }
  #txt { position: absolute; left: 0; right: 0; top: 70px; text-align: center; font-family: "Geist", sans-serif; font-weight: 300; font-size: 64px; letter-spacing: .5em; color: #fff; white-space: nowrap; text-shadow: 3px 3px 0 #1FD1E0, -3px -3px 0 #FF4FA3; }`,
    js: `
  tl.fromTo("#floor", { backgroundPositionY: 0 }, { backgroundPositionY: 600, duration: 5, ease: "none" }, 0);
  tl.fromTo("#sun", { y: 140 }, { y: 0, duration: 1.8, ease: "power2.out" }, 0.1);
  tl.fromTo("#bust", { y: 500 }, { y: 0, duration: 1.0, ease: "power3.out" }, 0.4);
  tl.to("#bust", { scaleX: -1, duration: 0.01 }, 3.0);
  // Windows pop open in hard steps like an old desktop.
  tl.fromTo("#w1", { scale: 0.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.18, ease: "steps(3)" }, 1.2);
  tl.fromTo("#w1 .prog i", { width: "0%" }, { width: "100%", duration: 1.6, ease: "steps(10)" }, 1.5);
  tl.fromTo("#w2", { scale: 0.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.18, ease: "steps(3)" }, 2.4);
  tl.fromTo("#txt", { opacity: 0, letterSpacing: "0.8em" }, { opacity: 1, letterSpacing: "0.5em", duration: 1.2, ease: "sine.out" }, 0.6);
  tl.to("#w2", { x: 6, duration: 0.05, yoyo: true, repeat: 5 }, 3.6);`,
  };
};
