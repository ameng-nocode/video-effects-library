// Doodle: a big word in the middle, then marker scribbles draw themselves around it: a loop circle, arrows,
// stars, sparkles and an underline, a little wobbly like real hand drawing.
export default () => {
  const P = (d, c, w, cls = "") => `<path class="dd ${cls}" pathLength="1" d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const star = (x, y, s) => `M${x},${y - s} L${x + s * 0.3},${y - s * 0.3} L${x + s},${y - s * 0.2} L${x + s * 0.45},${y + s * 0.25} L${x + s * 0.6},${y + s} L${x},${y + s * 0.55} L${x - s * 0.6},${y + s} L${x - s * 0.45},${y + s * 0.25} L${x - s},${y - s * 0.2} L${x - s * 0.3},${y - s * 0.3} Z`;
  return {
    card: `<div id="word">NEW!</div>
      <svg viewBox="0 0 864 1296" width="864" height="1296" style="position:absolute;inset:0">
        ${P("M180,560 C140,420 330,360 470,380 C640,400 760,470 720,600 C690,720 470,760 320,730 C190,705 150,640 200,590 C240,550 300,560 330,570", "#15171A", 10)}
        ${P("M200,800 C320,780 520,790 680,770", "#FF3B6B", 14)}${P("M230,830 C360,815 520,822 640,808", "#FF3B6B", 8)}
        ${P("M120,260 C160,330 190,380 250,430", "#15171A", 8)}${P("M250,430 L215,415 M250,430 L245,393", "#15171A", 8)}
        ${P("M760,1000 C700,940 650,900 600,860", "#15171A", 8)}${P("M600,860 L640,862 M600,860 L606,898", "#15171A", 8)}
        ${P(star(700, 240, 50), "#FFB703", 8)}${P(star(150, 1000, 36), "#2EC4B6", 8)}
        ${P("M640,1120 L640,1180 M610,1150 L670,1150 M620,1130 L660,1170 M660,1130 L620,1170", "#FF3B6B", 7)}
        ${P("M100,620 q20,-30 40,0 t40,0 t40,0", "#2EC4B6", 8)}
      </svg>
      <div id="scrib">check this out</div>`,
    css: `
  #card { background: #FFFFFF; }
  .dd { stroke-dasharray: 1; stroke-dashoffset: 1; }
  #word { position: absolute; left: 0; right: 0; top: 470px; text-align: center; font-family: "Geist", sans-serif; font-weight: 900; font-size: 210px; letter-spacing: -.04em; color: #15171A; }
  #scrib { position: absolute; left: 240px; top: 930px; font-family: "Segoe Print", "Comic Sans MS", cursive; font-size: 56px; color: #15171A; transform: rotate(-6deg); }`,
  js: `
  tl.fromTo("#word", { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(2.2)" }, 0.15);
  gsap.utils.toArray(".dd").forEach((p, i) => tl.to(p, { strokeDashoffset: 0, duration: i === 0 ? 0.8 : 0.35, ease: "power1.inOut" }, 0.7 + i * 0.28));
  tl.fromTo("#scrib", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "none" }, 3.4);
  tl.to("#word", { rotation: -3, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut" }, 4.3);`,
  };
};
