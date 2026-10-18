// Scrapbook: a travel journal page. Photos with white borders, a ticket stub, a stamp, washi tape and
// handwritten notes stick onto the page one by one, then a doodled heart draws itself.
export default () => {
  const items = [
    ["photo", 70, 150, 420, 330, -5, "linear-gradient(160deg,#8FC9E8,#3E8FBF 55%,#E9C46A 56%,#D8A657)"],
    ["photo", 400, 420, 380, 300, 6, "linear-gradient(170deg,#F4A6A6,#E76F51 50%,#264653 51%,#2A9D8F)"],
    ["ticket", 90, 620, 320, 140, -3, ""],
    ["stamp", 560, 120, 170, 200, 8, ""],
    ["photo", 120, 860, 330, 260, 4, "linear-gradient(180deg,#A8DADC,#457B9D 60%,#1D3557)"],
  ];
  return {
    card: `<div id="page"></div>
      ${items.map(([k, x, y, w, h, r, bg], i) => `<div class="it ${k}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;--r:${r}deg">${k === "photo" ? `<div class="img" style="background:${bg}"></div>` : k === "ticket" ? `<div class="tk"><b>ADMIT ONE</b><span>Night Market</span><i>No. 0471</i></div>` : `<div class="st">AIR<br/>MAIL</div>`}</div>`).join("")}
      <div class="tape" style="left:190px;top:130px;--r:-12deg"></div><div class="tape" style="left:610px;top:400px;--r:14deg"></div><div class="tape" style="left:220px;top:845px;--r:6deg"></div>
      <div class="note" id="n1" style="left:500px;top:780px">best trip ever!</div>
      <div class="note" id="n2" style="left:470px;top:900px;font-size:40px">day 3 · rain then sun</div>
      <svg id="heart" viewBox="0 0 864 1296" width="864" height="1296"><path pathLength="1" d="M700,1060 C650,1010 610,1060 650,1100 L700,1150 L750,1100 C790,1060 750,1010 700,1060 Z" fill="none" stroke="#E63946" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    css: `
  #card { background: #F3EBDD; }
  #page { position: absolute; inset: 0; background-image: linear-gradient(rgba(70,110,170,.16) 2px, transparent 2px); background-size: 100% 52px; }
  .it { position: absolute; transform: rotate(var(--r)); filter: drop-shadow(3px 6px 6px rgba(0,0,0,.22)); }
  .photo { background: #fff; padding: 16px 16px 48px; } .img { width: 100%; height: 100%; }
  .ticket { background: #F2D06B; border-radius: 10px; } .tk { padding: 18px 24px; font-family: "Geist Mono", monospace; color: #3A2E14; display: flex; flex-direction: column; gap: 4px; font-size: 24px; } .tk b { font-size: 34px; }
  .stamp { background: #fff; padding: 12px; } .st { width: 100%; height: 100%; border: 4px dashed #1D3557; display: flex; align-items: center; justify-content: center; text-align: center; font-family: "Geist", sans-serif; font-weight: 900; font-size: 40px; color: #E63946; }
  .tape { position: absolute; width: 150px; height: 40px; background: rgba(160,210,200,.7); transform: rotate(var(--r)); }
  .note { position: absolute; font-family: "Segoe Print", "Comic Sans MS", cursive; font-size: 50px; color: #1D3557; transform: rotate(-4deg); white-space: nowrap; }
  #heart { position: absolute; inset: 0; } #heart path { stroke-dasharray: 1; stroke-dashoffset: 1; }`,
    js: `
  gsap.utils.toArray(".it, .tape").forEach((el, i) => tl.fromTo(el, { opacity: 0, scale: 1.25, y: -40 }, { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power3.in" }, 0.15 + i * 0.22));
  // Handwriting appears left to right like it is being written.
  ["#n1", "#n2"].forEach((id, i) => tl.fromTo(id, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "none" }, 2.2 + i * 0.9));
  tl.to("#heart path", { strokeDashoffset: 0, duration: 0.8, ease: "power1.inOut" }, 3.8);`,
  };
};
