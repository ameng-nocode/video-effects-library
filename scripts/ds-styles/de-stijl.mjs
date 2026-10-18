// De Stijl: only straight lines. Thick black grid lines slice the white page one by one, cells fill with red,
// blue and yellow, then the grid shifts and the colours trade places.
export default () => {
  const V = [210, 520, 690], H = [330, 760, 1010];
  const cells = [["c1", 0, 0, 210, 330, "#D7261E"], ["c2", 520, 760, 344, 250, "#1E4FA8"], ["c3", 690, 0, 174, 330, "#F2C318"], ["c4", 0, 1010, 210, 286, "#1E4FA8"], ["c5", 210, 760, 310, 250, "#F2F0EA"]];
  return {
    card: `<div id="ds">
      ${cells.map(([id, x, y, w, h, c]) => `<div class="cell" id="${id}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;background:${c}"></div>`).join("")}
      ${V.map((x, i) => `<div class="ln v" style="left:${x - 11}px"></div>`).join("")}${H.map((y) => `<div class="ln h" style="top:${y - 11}px"></div>`).join("")}
    </div>`,
    css: `
  #card { background: #F2F0EA; }
  #ds { position: absolute; inset: 0; overflow: hidden; }
  .cell { position: absolute; }
  .ln { position: absolute; background: #141414; }
  .ln.v { top: 0; bottom: 0; width: 22px; } .ln.h { left: 0; right: 0; height: 22px; }`,
    js: `
  const lines = gsap.utils.toArray(".ln");
  lines.forEach((l, i) => tl.fromTo(l, l.classList.contains("v") ? { scaleY: 0, transformOrigin: i % 2 ? "50% 100%" : "50% 0%" } : { scaleX: 0, transformOrigin: i % 2 ? "100% 50%" : "0% 50%" },
    l.classList.contains("v") ? { scaleY: 1, duration: 0.4, ease: "power3.inOut" } : { scaleX: 1, duration: 0.4, ease: "power3.inOut" }, 0.15 + i * 0.16));
  gsap.utils.toArray(".cell").forEach((c, i) => tl.fromTo(c, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.35, ease: "power3.out" }, 1.3 + i * 0.18));
  // The colours trade places in clean hard cuts.
  tl.set("#c1", { background: "#1E4FA8" }, 3.0).set("#c2", { background: "#D7261E" }, 3.0);
  tl.set("#c3", { background: "#D7261E" }, 3.4).set("#c4", { background: "#F2C318" }, 3.4);
  tl.set("#c5", { background: "#F2C318" }, 3.8).set("#c3", { background: "#F2C318" }, 4.2).set("#c5", { background: "#F2F0EA" }, 4.2);`,
  };
};
