// Swiss style: a jazz concert poster on a strict grid. Grid lines draw, huge type slides into its columns,
// small text lines set flush left, and a red circle steps along the grid.
export default () => {
  const cols = [64, 264, 464, 664], rows = [64, 400, 736, 1072];
  const grid = cols.map((x) => `<div class="gl v" style="left:${x}px"></div>`).join("") + rows.map((y) => `<div class="gl h" style="top:${y}px"></div>`).join("");
  return {
    card: `<div id="sw">
      ${grid}
      <div id="dot"></div>
      <div class="big" style="top:70px">Jazz</div>
      <div class="big" style="top:330px">Night</div>
      <div class="info" style="left:64px;top:770px"><b>Oct 26</b><br/>8 pm<br/>Main Hall</div>
      <div class="info" style="left:304px;top:770px"><b>Line up</b><br/>Trio One<br/>The Blue Four<br/>Night Quintet</div>
      <div class="foot">Music Festival 2026</div>
    </div>`,
    css: `
  #card { background: #F3F3EF; }
  #sw { position: absolute; inset: 0; overflow: hidden; }
  .gl { position: absolute; background: rgba(21,23,26,.14); }
  .gl.v { top: 0; bottom: 0; width: 2px; } .gl.h { left: 0; right: 0; height: 2px; }
  .big { position: absolute; left: 52px; font-family: "Geist", sans-serif; font-weight: 800; font-size: 300px; line-height: 1; letter-spacing: -.055em; color: #15171A; }
  .info { position: absolute; font-family: "Geist", sans-serif; font-size: 40px; line-height: 1.3; color: #15171A; }
  .info b { font-weight: 700; }
  .foot { position: absolute; left: 64px; bottom: 40px; font-family: "Geist", sans-serif; font-weight: 700; font-size: 40px; color: #E3241B; }
  #dot { position: absolute; width: 200px; height: 200px; border-radius: 50%; background: #E3241B; left: 664px; top: 736px; }`,
    js: `
  tl.fromTo(".gl.v", { scaleY: 0, transformOrigin: "50% 0%" }, { scaleY: 1, duration: 0.6, ease: "power3.inOut", stagger: 0.08 }, 0.1);
  tl.fromTo(".gl.h", { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.6, ease: "power3.inOut", stagger: 0.08 }, 0.2);
  tl.fromTo(".big", { x: -900 }, { x: 0, duration: 0.7, ease: "power4.out", stagger: 0.15 }, 0.7);
  tl.fromTo("#dot", { scale: 0 }, { scale: 1, duration: 0.5, ease: "power3.out" }, 1.2);
  tl.fromTo(".info", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out", stagger: 0.12 }, 1.6);
  tl.fromTo(".foot", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 2.0);
  // The circle moves from column to column in clean, exact steps.
  tl.to("#dot", { top: 1036, duration: 0.45, ease: "power3.inOut" }, 2.6);
  tl.to("#dot", { left: 464, duration: 0.45, ease: "power3.inOut" }, 3.2);
  tl.to("#dot", { left: 664, duration: 0.45, ease: "power3.inOut" }, 3.8);`,
  };
};
