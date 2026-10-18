// Collage: torn paper scraps, a cut out moon, tape strips and ransom note letters slap down one by one
// on craft paper, each with its own tilt and a small drop shadow.
export default () => {
  const torn = (w, h, seed) => { let s = seed; const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280) * 3.2; const pts = [];
    for (let x = 0; x <= 100; x += 5) pts.push(`${x}% ${r()}%`); for (let y = 0; y <= 100; y += 5) pts.push(`${100 - r()}% ${y}%`);
    for (let x = 100; x >= 0; x -= 5) pts.push(`${x}% ${100 - r()}%`); for (let y = 100; y >= 0; y -= 5) pts.push(`${r()}% ${y}%`); return `polygon(${pts.join(",")})`; };
  const scraps = [
    [40, 120, 520, 560, "#2E5BFF", -6, 3], [330, 380, 480, 420, "#F25C8A", 5, 7], [70, 760, 380, 300, "#15171A", -3, 11], [420, 820, 400, 330, "#3FC79A", 7, 5],
  ].map(([x, y, w, h, c, r, sd]) => `<div class="scrap" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;background:${c};--r:${r}deg;clip-path:${torn(w, h, sd)}"></div>`).join("");
  const letters = [["C", "#fff", "#15171A", -8, "Geist"], ["U", "#F25C8A", "#fff", 6, "Geist Mono"], ["T", "#15171A", "#fff", -4, "Geist"], ["&", "#2E5BFF", "#fff", 10, "Geist"],
    ["P", "#fff", "#15171A", 5, "Geist Mono"], ["A", "#3FC79A", "#15171A", -9, "Geist"], ["S", "#15171A", "#fff", 7, "Geist"], ["T", "#fff", "#F25C8A", -5, "Geist Mono"], ["E", "#F25C8A", "#15171A", 8, "Geist"]];
  const lt = letters.map(([ch, bg, fg, r, f], i) => `<div class="lt" style="left:${(i < 4 ? 70 : 40) + (i < 4 ? i : i - 4) * (i < 4 ? 120 : 150)}px;top:${i < 4 ? 1070 : 1160}px;background:${bg};color:${fg};font-family:${f};--r:${r}deg">${ch}</div>`).join("");
  return {
    card: `${scraps}
      <div class="scrap" id="moon" style="left:420px;top:150px;width:330px;height:330px;border-radius:50%;background:radial-gradient(circle at 40% 35%, #fff, #c9c4b8 70%);--r:0deg"></div>
      <div class="scrap" id="photo" style="left:120px;top:440px;width:300px;height:380px;background:repeating-linear-gradient(0deg,#222 0 6px,#444 6px 12px);--r:-10deg;border:16px solid #fff"></div>
      <div class="tape" style="left:150px;top:420px;--r:-30deg"></div><div class="tape" style="left:590px;top:130px;--r:20deg"></div><div class="tape" style="left:640px;top:800px;--r:-12deg"></div>
      ${lt}`,
    css: `
  #card { background: #D9CDB5; background-image: radial-gradient(rgba(0,0,0,.06) 1px, transparent 1px); background-size: 6px 6px; }
  .scrap, .lt, .tape { position: absolute; transform: rotate(var(--r)); filter: drop-shadow(4px 6px 4px rgba(0,0,0,.28)); }
  .tape { width: 170px; height: 46px; background: rgba(255,255,255,.55); }
  .lt { width: 110px; height: 124px; font-weight: 900; font-size: 96px; line-height: 124px; text-align: center; }`,
    js: `
  // Each piece is slapped down: it drops from slightly above, too big, with extra tilt, then settles.
  const pieces = gsap.utils.toArray(".scrap, .tape, .lt");
  pieces.forEach((p, i) => { const t = 0.15 + i * 0.13 + (p.classList.contains("lt") ? 0.2 : 0);
    tl.fromTo(p, { opacity: 0, scale: 1.5, y: -60, rotation: "+=" + (i % 2 ? 25 : -25) }, { opacity: 1, scale: 1, y: 0, rotation: "-=" + (i % 2 ? 25 : -25), duration: 0.28, ease: "power3.in" }, t); });
  tl.to(".lt", { y: -14, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1, stagger: 0.07 }, 4.0);`,
  };
};
