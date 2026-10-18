// Brutalism: a raw web page. Thick black boxes snap in with no easing, huge type, a ticker runs, a cursor
// moves to the button and clicks it (the hard shadow collapses), and a caret blinks.
export default () => ({
  card: `<div id="br">
    <div class="box" id="nav"><span>INDEX</span><span>WORK</span><span>ABOUT</span></div>
    <div class="box" id="hero">RAW<br/>WEB.</div>
    <div class="box" id="txt">No templates. No gradients. Just HTML that says what it is<span id="caret">_</span></div>
    <a class="box" id="btn">CLICK HERE</a>
    <div class="box" id="tick"><div id="tickin">NEW DROP *** FREE SHIPPING *** NEW DROP *** FREE SHIPPING *** NEW DROP *** FREE SHIPPING *** </div></div>
    <svg id="cur" width="60" height="80" viewBox="0 0 24 32"><path d="M2,2 L2,26 L8,20 L12,30 L16,28 L12,18 L20,18 Z" fill="#000" stroke="#fff" stroke-width="2"/></svg>
  </div>`,
  css: `
  #card { background: #FFFFFF; border-radius: 0; }
  #br { position: absolute; inset: 0; font-family: "Geist Mono", monospace; color: #000; }
  .box { position: absolute; border: 6px solid #000; background: #fff; }
  #nav { left: 30px; right: 30px; top: 30px; height: 90px; display: flex; gap: 40px; align-items: center; padding-left: 26px; font-size: 34px; font-weight: 700; text-decoration: underline; }
  #hero { left: 30px; right: 30px; top: 150px; height: 470px; padding: 10px 24px; font-family: "Geist", sans-serif; font-weight: 900; font-size: 230px; line-height: .92; letter-spacing: -.05em; background: #0047FF; color: #fff; }
  #txt { left: 30px; width: 480px; top: 650px; height: 300px; padding: 22px; font-size: 38px; line-height: 1.25; }
  #btn { left: 540px; width: 294px; top: 650px; height: 140px; display: flex; align-items: center; justify-content: center; font-size: 38px; font-weight: 700; background: #00E676; box-shadow: 14px 14px 0 #000; }
  #tick { left: 30px; right: 30px; top: 1000px; height: 100px; overflow: hidden; background: #000; color: #fff; font-size: 44px; font-weight: 700; white-space: nowrap; display: flex; align-items: center; }
  #tickin { padding-left: 20px; }
  #cur { position: absolute; left: 760px; top: 1180px; }`,
  js: `
  // Boxes appear in hard jumps, no easing at all.
  ["#nav", "#hero", "#txt", "#btn", "#tick"].forEach((id, i) => tl.fromTo(id, { opacity: 0, x: i % 2 ? 60 : -60 }, { opacity: 1, x: 0, duration: 0.24, ease: "steps(3)" }, 0.15 + i * 0.22));
  tl.fromTo("#tickin", { x: 0 }, { x: -1400, duration: 5, ease: "none" }, 0);
  for (let i = 0; i < 10; i++) tl.set("#caret", { opacity: i % 2 }, 0.5 * i);
  tl.fromTo("#cur", { opacity: 0 }, { opacity: 1, duration: 0.01 }, 1.4);
  tl.to("#cur", { left: 680, top: 720, duration: 0.9, ease: "power2.inOut" }, 1.5);
  // Click: the button drops into its own shadow and turns black.
  tl.set("#btn", { x: 14, y: 14, boxShadow: "0 0 0 #000", background: "#000", color: "#fff" }, 2.5);
  tl.set("#btn", { x: 0, y: 0, boxShadow: "14px 14px 0 #000", background: "#00E676", color: "#000" }, 2.75);
  tl.set("#hero", { background: "#FF2D2D" }, 2.75);
  tl.set("#btn", { x: 14, y: 14, boxShadow: "0 0 0 #000", background: "#000", color: "#fff" }, 3.7);
  tl.set("#btn", { x: 0, y: 0, boxShadow: "14px 14px 0 #000", background: "#00E676", color: "#000" }, 3.95);
  tl.set("#hero", { background: "#0047FF" }, 3.95);`,
});
