// Pixel art: a tiny 16 bit game level drawn on a 108 x 162 pixel grid and scaled up with hard edges.
// A little hero runs while the ground scrolls, jumps to grab a coin and the score ticks up.
export default () => ({
  card: `<canvas id="px" width="108" height="162"></canvas>`,
  css: `
  #card { background: #5C94FC; }
  #px { position: absolute; inset: 0; width: 864px; height: 1296px; image-rendering: pixelated; }`,
  js: `
  const g = document.getElementById("px").getContext("2d");
  const P = (x, y, w, h, c) => { g.fillStyle = c; g.fillRect(Math.round(x), Math.round(y), w, h); };
  // 3 x 5 pixel font for the few characters we need.
  const F = { S: "111100111001111", C: "111100100100111", O: "111101101101111", R: "110101110101101", E: "111100111100111",
    0: "111101101101111", 1: "010110010010111", 2: "111001111100111", X: "101101010101101" };
  const text = (s, x, y, c) => [...s].forEach((ch, i) => { const m = F[ch]; if (!m) return; for (let k = 0; k < 15; k++) if (m[k] === "1") P(x + i * 4 + (k % 3), y + Math.floor(k / 3), 1, 1, c); });
  // Hero sprites: two run frames and a jump frame, 8 x 10. 1 skin, 2 shirt, 3 pants, 4 hair.
  const HERO = { a: ["00444400","04444440","00111100","00111100","02222220","02222220","00333300","00300300","03300330","00000000"],
    b: ["00444400","04444440","00111100","00111100","02222220","12222221","00333300","00333300","00300300","00330330"],
    j: ["00444400","04444440","00111100","10111101","12222221","02222220","00333300","03300330","03000030","00000000"] };
  const COL = { 1: "#FFC9A3", 2: "#E63946", 3: "#1D3557", 4: "#5A3A1E" };
  const sprite = (f, x, y) => HERO[f].forEach((row, r) => [...row].forEach((v, c) => { if (v !== "0") P(x + c, y + r, 1, 1, COL[v]); }));
  const S = { t: 0 };
  const draw = () => { const t = S.t;
    P(0, 0, 108, 162, "#5C94FC");
    const cloud = (x, y) => { P(x, y + 2, 16, 4, "#fff"); P(x + 3, y, 8, 2, "#fff"); };
    cloud(((10 - t * 6) % 140 + 140) % 140 - 20, 20); cloud(((70 - t * 6) % 140 + 140) % 140 - 20, 36);
    // Hills and ground scroll left; the hero stays near the middle.
    const off = (t * 22) % 16;
    for (let x = -16; x < 124; x += 32) { const hx = x - ((t * 10) % 32); P(hx, 108, 24, 12, "#3AA655"); P(hx + 4, 102, 16, 6, "#3AA655"); P(hx + 8, 98, 8, 4, "#3AA655"); }
    for (let x = -16; x < 124; x += 16) { P(x - off, 120, 16, 42, "#C84C0C"); P(x - off, 120, 16, 2, "#FCBCB0"); P(x - off + 7, 122, 1, 40, "#7C2C04"); }
    // Coin block and coin: the hero jumps at 2.2 s and grabs it.
    const jumpT = t - 2.2, jumping = jumpT > 0 && jumpT < 0.7, hy = jumping ? 110 - Math.round(Math.sin((jumpT / 0.7) * Math.PI) * 30) : 110;
    const got = t > 2.45;
    P(48, 62, 12, 10, "#FCA044"); P(49, 63, 10, 8, "#E09030"); P(52, 64, 4, 1, "#fff"); P(54, 65, 2, 2, "#fff"); P(54, 68, 2, 1, "#fff");
    if (!got) { const bob = Math.round(Math.sin(t * 6) * 1); P(52, 52 + bob, 4, 6, "#FCD000"); P(53, 53 + bob, 2, 4, "#FFF4A0"); }
    else if (t < 2.9) { const k = (t - 2.45) / 0.45; P(52, 50 - Math.round(k * 16), 4, 6, "#FCD000"); }
    sprite(jumping ? "j" : Math.floor(t * 8) % 2 ? "a" : "b", 50, hy);
    text("SCORE", 6, 6, "#fff"); text(got ? "01" : "00", 30, 6, "#fff");
    text("X", 74, 6, "#FCD000"); text(got ? "1" : "0", 79, 6, "#fff"); };
  tl.to(S, { t: 5, duration: 5, ease: "none", onUpdate: draw }, 0);
  draw();`,
});
