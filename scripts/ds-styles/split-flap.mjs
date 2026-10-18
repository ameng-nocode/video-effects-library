// Split-flap: a train station departure board. Every tile flips through letters before it lands on the city
// and time, row by row, with the flap halves snapping down and amber times like a real board.
export default () => {
  const COLS = 8;
  const rows = [["TOKYO", "09:45"], ["PARIS", "10:20"], ["LONDON", "11:05"], ["SEOUL", "12:30"], ["BERLIN", "13:15"]];
  const tile = (cls) => `<div class="t ${cls}"><span></span><i></i></div>`;
  const board = rows.map(([city, time], r) => `<div class="row">${Array.from({ length: COLS }, () => tile("c")).join("")}<div class="gap"></div>${Array.from({ length: 5 }, () => tile("tm")).join("")}</div>`).join("");
  return {
    card: `<div id="hdr"><span>DEPARTURES</span><span id="clk">09:00</span></div><div id="board">${board}</div>
      <div id="foot"><span class="led"></span>PLATFORM 4</div>`,
    css: `
  #card { background: #121417; }
  #hdr { position: absolute; left: 36px; right: 36px; top: 50px; display: flex; justify-content: space-between; font-family: "Geist Mono", monospace; font-weight: 600; font-size: 40px; letter-spacing: .12em; color: #E8E6E1; }
  #clk { color: #F2A93B; }
  #board { position: absolute; left: 24px; top: 170px; display: flex; flex-direction: column; gap: 40px; }
  .row { display: flex; gap: 5px; }
  .gap { width: 16px; }
  .t { position: relative; width: 56px; height: 150px; background: #1E2126; border-radius: 6px; box-shadow: inset 0 2px 0 rgba(255,255,255,.05), 0 4px 6px rgba(0,0,0,.5); overflow: hidden;
    font-family: "Geist", sans-serif; font-weight: 700; font-size: 74px; color: #ECEAE4; display: flex; align-items: center; justify-content: center; }
  .t.tm { width: 50px; color: #F2A93B; font-size: 64px; }
  .t::after { content: ""; position: absolute; left: 0; right: 0; top: 50%; height: 3px; background: #0A0B0D; }
  .t i { position: absolute; left: 0; right: 0; top: 0; height: 50%; background: linear-gradient(#2A2E35, #1E2126); transform-origin: 50% 100%; transform: scaleY(0); }
  #foot { position: absolute; left: 36px; bottom: 50px; font-family: "Geist Mono", monospace; font-size: 34px; letter-spacing: .14em; color: #8E9097; display: flex; align-items: center; gap: 16px; }
  .led { width: 18px; height: 18px; border-radius: 50%; background: #3BD16F; box-shadow: 0 0 12px #3BD16F; }`,
    js: `
  const ROWS = ${JSON.stringify(rows)}, COLS = ${COLS};
  const ABC = " ABCDEFGHIJKLMNOPQRSTUVWXYZ", NUM = " 0123456789:";
  const rowsEl = [...document.querySelectorAll(".row")];
  // Each tile: its final character, the time it lands, and how many flips it makes on the way.
  const tiles = [];
  rowsEl.forEach((row, r) => { const [city, time] = ROWS[r];
    [...row.querySelectorAll(".c")].forEach((el, c) => { const ch = (city.padEnd(COLS))[c]; tiles.push({ el, set: ABC, ch, land: 0.6 + r * 0.32 + c * 0.06 + (ABC.indexOf(ch) % 5) * 0.05 }); });
    [...row.querySelectorAll(".tm")].forEach((el, c) => { tiles.push({ el, set: NUM, ch: time[c], land: 1.4 + r * 0.32 + c * 0.05 }); }); });
  const RATE = 16;
  const S = { t: 0 };
  const draw = () => { const t = S.t;
    tiles.forEach((x, i) => { const sp = x.el.firstChild, fl = x.el.lastChild;
      if (t >= x.land) { sp.textContent = x.ch; fl.style.transform = "scaleY(0)"; return; }
      const start = 0.3; if (t < start) { sp.textContent = ""; fl.style.transform = "scaleY(0)"; return; }
      const n = Math.floor((t - start) * RATE) + i; sp.textContent = x.set[n % x.set.length];
      const ph = ((t - start) * RATE) % 1; fl.style.transform = "scaleY(" + (ph < 0.5 ? 1 - ph * 2 : 0) + ")"; });
    const m = Math.min(45, Math.floor(t * 9)); document.getElementById("clk").textContent = "09:" + String(m).padStart(2, "0"); };
  tl.to(S, { t: 5, duration: 5, ease: "none", onUpdate: draw }, 0);
  draw();`,
  };
};
