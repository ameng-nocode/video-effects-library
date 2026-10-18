// ASCII art: a smiling face drawn only with keyboard characters on an old green terminal. The picture types
// itself in line by line with a blinking cursor, then the face winks. Built from a shading field.
export default () => ({
  card: `<pre id="asc"></pre><div id="prompt">&gt; render face.txt<b id="cur"></b></div>`,
  css: `
  #card { background: #0B0F0B; }
  #asc { position: absolute; left: 32px; top: 150px; margin: 0; font-family: "Geist Mono", monospace; font-size: 17px; line-height: 19px; letter-spacing: 1px; color: #6CFF8A; text-shadow: 0 0 6px rgba(108,255,138,.6); white-space: pre; }
  #prompt { position: absolute; left: 40px; top: 70px; font-family: "Geist Mono", monospace; font-size: 30px; color: #6CFF8A; }
  #cur { display: inline-block; width: 16px; height: 30px; background: #6CFF8A; vertical-align: -4px; margin-left: 8px; }`,
  js: `
  const COLS = 70, ROWS = 56, RAMP = " .:-=+*#%@";
  // Shading: a lit head with eyes, a smile and shoulders; each cell picks a character by darkness.
  const shade = (c, r, wink) => { const x = (c - COLS / 2) / (COLS / 2), y = (r - ROWS * 0.4) / (ROWS * 0.45);
    let v = 0; const head = x * x / 0.42 + y * y / 0.62; if (head < 1) v = 0.35 + 0.5 * (1 - head) * (0.6 - 0.4 * x);
    const sh = (x * x) / 1.2 + ((y - 1.45) * (y - 1.45)) / 0.18; if (sh < 1) v = Math.max(v, 0.5 + 0.3 * (1 - sh));
    const eye = (ex) => ((x - ex) ** 2) / 0.006 + ((y + 0.18) ** 2) / (wink && ex > 0 ? 0.0006 : 0.012);
    if (eye(-0.22) < 1 || eye(0.22) < 1) v = 1;
    const sm = Math.abs(Math.hypot(x, y - 0.05) - 0.38); if (sm < 0.035 && y > 0.12) v = 1;
    return RAMP[Math.min(RAMP.length - 1, Math.floor(v * (RAMP.length - 1)))]; };
  const frame = (wink) => Array.from({ length: ROWS }, (_, r) => Array.from({ length: COLS }, (_, c) => shade(c, r, wink)).join(""));
  const A = frame(false), B = frame(true);
  const S = { t: 0 };
  const draw = () => { const t = S.t; const shown = Math.floor(Math.max(0, t - 0.6) * 26); const wink = t > 3.6 && t < 3.9;
    document.getElementById("asc").textContent = (wink ? B : A).slice(0, Math.min(ROWS, shown)).join("\\n");
    document.getElementById("cur").style.opacity = Math.floor(t * 3) % 2 ? 0 : 1; };
  tl.to(S, { t: 5, duration: 5, ease: "none", onUpdate: draw }, 0); draw();`,
});
