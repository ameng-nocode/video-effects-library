// Frutiger Aero: glossy 2000s tech. A bright sky over green hills, see-through bubbles rise, water drops slide
// down the glass, a light swoosh sweeps through and a glossy gel button shines.
export default () => {
  const bubbles = [[140, 1150, 150], [610, 1250, 110], [380, 1320, 190], [760, 1100, 80], [90, 1400, 90], [520, 1450, 130], [250, 1500, 70]];
  const drops = [[120, 120, 26], [700, 220, 34], [420, 90, 20], [780, 520, 22], [60, 600, 30]];
  return {
    card: `<div id="sky"></div><div class="cloud" style="left:60px;top:240px"></div><div class="cloud" style="left:480px;top:150px;transform:scale(.7)"></div>
      <svg id="hills" viewBox="0 0 864 1296" width="864" height="1296"><defs><linearGradient id="hg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9BE15D"/><stop offset="1" stop-color="#2E9E3E"/></linearGradient>
        <linearGradient id="hg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C5F27A"/><stop offset="1" stop-color="#4DB84A"/></linearGradient></defs>
        <path d="M-50,1010 C150,900 330,930 480,990 C620,1040 760,960 914,920 L914,1296 L-50,1296 Z" fill="url(#hg2)"/>
        <path d="M-50,1090 C180,1010 380,1060 560,1110 C700,1150 820,1090 914,1060 L914,1296 L-50,1296 Z" fill="url(#hg)"/></svg>
      <svg id="swoosh" viewBox="0 0 864 1296" width="864" height="1296"><path pathLength="1" d="M-40,820 C200,700 460,760 620,640 C720,560 800,520 920,520" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="16" stroke-linecap="round"/>
        <path pathLength="1" d="M-40,860 C220,760 480,800 640,690 C740,610 820,580 920,580" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="6" stroke-linecap="round"/></svg>
      ${bubbles.map(([x, y, d]) => `<div class="bub" style="left:${x - d / 2}px;top:${y - d / 2}px;width:${d}px;height:${d}px"></div>`).join("")}
      ${drops.map(([x, y, d]) => `<div class="drop" style="left:${x}px;top:${y}px;width:${d}px;height:${d * 1.25}px"></div>`).join("")}
      <div id="title">Connect</div>
      <div id="btn">Start</div>`,
    css: `
  #card { background: #5EC2F5; }
  #sky { position: absolute; inset: 0; background: linear-gradient(180deg, #1F8FE5 0%, #5EC2F5 45%, #CFF0FF 75%); }
  .cloud { position: absolute; width: 300px; height: 90px; border-radius: 60px; background: rgba(255,255,255,.9); box-shadow: 60px -40px 0 -6px rgba(255,255,255,.9), 140px -20px 0 -10px rgba(255,255,255,.9); filter: blur(2px); }
  #hills, #swoosh { position: absolute; inset: 0; }
  #swoosh path { stroke-dasharray: 1; stroke-dashoffset: 1; filter: drop-shadow(0 0 10px rgba(255,255,255,.9)); }
  .bub { position: absolute; border-radius: 50%; background: radial-gradient(circle at 30% 26%, rgba(255,255,255,.95) 0 9%, rgba(255,255,255,.18) 26%, rgba(120,210,255,.18) 64%, rgba(255,255,255,.65) 100%); border: 2px solid rgba(255,255,255,.75); }
  .drop { position: absolute; border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; background: radial-gradient(circle at 35% 30%, #fff 0 12%, rgba(255,255,255,.25) 30%, rgba(30,140,220,.25) 75%, rgba(255,255,255,.7) 100%); box-shadow: 0 6px 10px rgba(0,60,120,.2); }
  #title { position: absolute; left: 0; right: 0; top: 400px; text-align: center; font-family: "Geist", sans-serif; font-weight: 600; font-size: 130px; letter-spacing: -.03em; color: #fff; text-shadow: 0 4px 18px rgba(0,80,160,.45); }
  #btn { position: absolute; left: 252px; top: 600px; width: 360px; height: 110px; border-radius: 55px; font-family: "Geist", sans-serif; font-weight: 700; font-size: 48px; color: #fff; display: flex; align-items: center; justify-content: center; overflow: hidden;
    background: linear-gradient(180deg, #7FE36B 0%, #37B24D 55%, #1F8E35 100%); box-shadow: inset 0 2px 0 rgba(255,255,255,.7), 0 12px 24px rgba(0,80,40,.3); text-shadow: 0 2px 4px rgba(0,60,20,.4); }
  #btn::before { content: ""; position: absolute; left: 14px; right: 14px; top: 6px; height: 46%; border-radius: 50px; background: linear-gradient(180deg, rgba(255,255,255,.85), rgba(255,255,255,.1)); }`,
    js: `
  tl.fromTo("#hills", { y: 300 }, { y: 0, duration: 0.9, ease: "power3.out" }, 0.1);
  tl.fromTo(".cloud", { x: -60 }, { x: 60, duration: 5, ease: "none" }, 0);
  tl.fromTo("#title", { opacity: 0, y: 40, filter: "blur(10px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }, 0.5);
  tl.fromTo("#btn", { scale: 0 }, { scale: 1, duration: 0.6, ease: "back.out(2)" }, 0.9);
  tl.to("#swoosh path", { strokeDashoffset: 0, duration: 1.0, ease: "power2.inOut", stagger: 0.12 }, 1.0);
  gsap.utils.toArray(".bub").forEach((b, i) => tl.fromTo(b, { y: 200 }, { y: -900 - i * 60, x: (i % 2 ? 40 : -40), duration: 4.6, ease: "none" }, i * 0.12));
  gsap.utils.toArray(".drop").forEach((d, i) => tl.fromTo(d, { y: 0, opacity: 0 }, { y: 160 + i * 40, opacity: 1, duration: 2.6, ease: "power2.in" }, 1.2 + i * 0.25));
  tl.to("#btn", { scale: 0.94, duration: 0.1 }, 3.4).to("#btn", { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.4)" }, 3.5);`,
  };
};
