// Claymorphism: puffy clay app controls. A clay panel drops in and squashes, a toggle switches on,
// a heart button is pressed and pops, a slider knob slides, and a chat bubble bounces in.
export default () => {
  const clay = (c) => `background:${c};box-shadow: inset 10px 12px 18px rgba(255,255,255,.55), inset -10px -14px 20px rgba(50,30,110,.22), 0 20px 32px rgba(80,60,150,.22);`;
  return {
    card: `<div id="panel" class="c" style="${clay("#F4F0FF")}"></div>
      <div id="toggle" class="c" style="${clay("#D6CCF5")}"><div id="knob" class="c" style="${clay("#FFFFFF")}"></div></div>
      <div id="heart" class="c" style="${clay("#F5A9C6")}"><svg viewBox="0 0 24 24" width="120" height="120"><path d="M12,21 C5,15 2,12 2,8 A5,5 0 0 1 12,6 A5,5 0 0 1 22,8 C22,12 19,15 12,21 Z" fill="#fff"/></svg></div>
      <div id="track" class="c" style="${clay("#D6CCF5")}"><div id="fill" style="${clay("#8FD9C0")}"></div><div id="sknob" class="c" style="${clay("#FFFFFF")}"></div></div>
      <div id="chat" class="c" style="${clay("#9CC2F6")}">Hello!</div>`,
    css: `
  #card { background: linear-gradient(160deg, #EEE8FF, #DCD2FA); }
  .c { position: absolute; }
  #panel { left: 70px; top: 330px; width: 724px; height: 760px; border-radius: 80px; }
  #toggle { left: 150px; top: 430px; width: 300px; height: 150px; border-radius: 75px; }
  #knob { left: 15px; top: 15px; width: 120px; height: 120px; border-radius: 50%; }
  #heart { left: 534px; top: 420px; width: 180px; height: 180px; border-radius: 60px; display: flex; align-items: center; justify-content: center; }
  #track { left: 150px; top: 720px; width: 564px; height: 90px; border-radius: 45px; }
  #fill { position: absolute; left: 0; top: 0; bottom: 0; width: 90px; border-radius: 45px; }
  #sknob { left: 0; top: -15px; width: 120px; height: 120px; border-radius: 50%; }
  #chat { left: 150px; top: 880px; width: 380px; height: 140px; border-radius: 60px; font-family: "Geist", sans-serif; font-weight: 800; font-size: 64px; color: #fff; display: flex; align-items: center; justify-content: center; }
  #fx { display: none; }`,
    js: `
  tl.fromTo("#panel", { y: -1400 }, { y: 0, duration: 0.5, ease: "power2.in" }, 0.1);
  tl.to("#panel", { scaleY: 0.86, scaleX: 1.06, transformOrigin: "50% 100%", duration: 0.09 }, 0.6);
  tl.to("#panel", { scaleY: 1, scaleX: 1, duration: 0.8, ease: "elastic.out(1, 0.35)" }, 0.69);
  tl.fromTo(["#toggle", "#heart", "#track", "#chat"], { scale: 0 }, { scale: 1, duration: 0.5, ease: "back.out(2.4)", stagger: 0.12 }, 0.8);
  // Toggle: the knob squishes as it slides across, and the track turns mint.
  tl.to("#knob", { x: 150, scaleX: 1.25, duration: 0.25, ease: "power2.in" }, 1.8).to("#knob", { scaleX: 1, duration: 0.5, ease: "elastic.out(1, 0.4)" }, 2.05);
  tl.to("#toggle", { background: "#8FD9C0", duration: 0.3 }, 1.9);
  // Heart: pressed in, then pops bigger and settles.
  tl.to("#heart", { scale: 0.86, duration: 0.12 }, 2.4).to("#heart", { scale: 1.15, background: "#FF7FAE", duration: 0.18, ease: "power2.out" }, 2.52).to("#heart", { scale: 1, duration: 0.7, ease: "elastic.out(1, 0.35)" }, 2.7);
  // Slider: the knob slides right and the mint fill follows it.
  tl.to("#sknob", { x: 400, duration: 1.0, ease: "power2.inOut" }, 3.0);
  tl.to("#fill", { width: 500, duration: 1.0, ease: "power2.inOut" }, 3.0);
  tl.fromTo("#chat", { rotation: 0 }, { rotation: -4, duration: 0.18, ease: "sine.inOut", yoyo: true, repeat: 3 }, 3.9);`,
  };
};
