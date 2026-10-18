// Skeuomorphism: an old radio app that copies real materials. Wood case, brushed metal face, a glass dial
// with a needle, a speaker grille and a chunky knob. The knob turns, the needle slides, the tuning light glows.
export default () => ({
  card: `<div id="radio">
      <div id="face">
        <div id="dial"><div class="scale">${[88, 92, 96, 100, 104, 108].map((f) => `<span>${f}</span>`).join("")}</div><div id="needle"></div><div id="glare"></div></div>
        <div id="grille"></div>
        <div id="knob"><div id="mark"></div></div>
        <div id="lamp"></div><div id="lbl">TUNING</div>
      </div>
      <div id="brand">MODEL 58 · AM FM</div>
    </div>`,
  css: `
  #card { background: #E7DFD3; }
  #radio { position: absolute; left: 60px; top: 220px; width: 744px; height: 880px; border-radius: 48px;
    background: repeating-linear-gradient(95deg, #7A4A2A 0 6px, #8B5632 6px 14px, #6E4225 14px 18px); box-shadow: inset 0 3px 0 rgba(255,255,255,.25), inset 0 -8px 16px rgba(0,0,0,.35), 0 30px 60px rgba(60,30,10,.35); }
  #face { position: absolute; left: 40px; top: 40px; right: 40px; bottom: 110px; border-radius: 28px;
    background: linear-gradient(180deg, #E9EAEC, #B9BCC2); box-shadow: inset 0 2px 0 #fff, inset 0 -3px 6px rgba(0,0,0,.25);
    background-image: repeating-linear-gradient(90deg, rgba(255,255,255,.25) 0 1px, rgba(0,0,0,.04) 1px 3px), linear-gradient(180deg, #E9EAEC, #B9BCC2); }
  #dial { position: absolute; left: 40px; right: 40px; top: 40px; height: 190px; border-radius: 16px; background: linear-gradient(180deg, #F7E9C6, #E2CC97); box-shadow: inset 0 4px 10px rgba(0,0,0,.35); overflow: hidden; }
  .scale { position: absolute; left: 30px; right: 30px; top: 60px; display: flex; justify-content: space-between; font-family: Georgia, serif; font-size: 34px; color: #3A2A14; }
  #needle { position: absolute; left: 40px; top: 20px; width: 6px; height: 150px; background: #C0261E; box-shadow: 0 0 4px rgba(0,0,0,.4); }
  #glare { position: absolute; left: -10%; top: 0; width: 40%; height: 100%; background: linear-gradient(100deg, rgba(255,255,255,0), rgba(255,255,255,.55), rgba(255,255,255,0)); }
  #grille { position: absolute; left: 40px; top: 270px; width: 360px; height: 360px; border-radius: 50%; background: radial-gradient(circle, #2A2A2A 3px, #4A4A4A 4px) 0 0 / 18px 18px; box-shadow: inset 0 6px 14px rgba(0,0,0,.6), 0 2px 0 #fff; }
  #knob { position: absolute; right: 70px; top: 300px; width: 220px; height: 220px; border-radius: 50%;
    background: conic-gradient(#d9d9d9, #8f8f8f, #f4f4f4, #9a9a9a, #e8e8e8, #8a8a8a, #d9d9d9); box-shadow: 0 14px 22px rgba(0,0,0,.35), inset 0 0 0 10px rgba(0,0,0,.06); }
  #mark { position: absolute; left: 50%; top: 14px; width: 12px; height: 46px; margin-left: -6px; border-radius: 6px; background: #C0261E; }
  #lamp { position: absolute; right: 150px; top: 570px; width: 50px; height: 50px; border-radius: 50%; background: radial-gradient(circle at 40% 35%, #FFE7A8, #E39B2D 60%, #8A4E12); box-shadow: 0 0 0 4px #777; }
  #lbl { position: absolute; right: 120px; top: 632px; font-family: Georgia, serif; font-size: 22px; letter-spacing: .2em; color: #3A3A3A; }
  #brand { position: absolute; left: 0; right: 0; bottom: 36px; text-align: center; font-family: Georgia, serif; font-size: 34px; letter-spacing: .3em; color: #F2D9A8; text-shadow: 0 2px 0 rgba(0,0,0,.4); }`,
  js: `
  tl.fromTo("#radio", { y: 120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0.1);
  // Knob turns, needle follows across the dial, the tuning lamp glows when a station is found.
  tl.to("#knob", { rotation: 220, duration: 2.2, ease: "power2.inOut" }, 1.0);
  tl.to("#needle", { left: 470, duration: 2.2, ease: "power2.inOut" }, 1.0);
  tl.to("#knob", { rotation: 200, duration: 0.5, ease: "power2.inOut" }, 3.3);
  tl.to("#needle", { left: 430, duration: 0.5, ease: "power2.inOut" }, 3.3);
  tl.fromTo("#lamp", { filter: "brightness(.5)", boxShadow: "0 0 0 4px #777" }, { filter: "brightness(1.3)", boxShadow: "0 0 0 4px #777, 0 0 40px 10px rgba(255,190,80,.8)", duration: 0.4 }, 3.8);
  tl.fromTo("#glare", { left: "-40%" }, { left: "110%", duration: 1.6, ease: "sine.inOut" }, 0.6);
  tl.fromTo("#grille", { scale: 1 }, { scale: 1.02, duration: 0.12, yoyo: true, repeat: 7, ease: "sine.inOut" }, 3.9);`,
});
