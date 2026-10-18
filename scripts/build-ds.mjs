// Builds one HyperFrames scene per design style: a coded motion graphic on a card, with the same labels as the camera clips.
// Reads data/design-styles.json and scripts/ds-anim.mjs; writes previews/ds/<id>/index.html.
// Each style moves the way that style is known for.
// Usage: node scripts/build-ds.mjs [id ...]   then   bash scripts/build-ds-render.sh <id> [id ...]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { animFor, hasAnim } from "./ds-anim.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const styles = JSON.parse(fs.readFileSync(path.join(root, "data/design-styles.json"), "utf8"));
const want = process.argv.slice(2);
const W = 1080, H = 1920, DURATION = 5;
const CARD = { w: 864, h: 1296, x: 108, y: 168 };
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");

for (const s of styles.filter((s) => !want.length || want.includes(s.id))) {
  if (!hasAnim(s.id)) { console.log(`skip ${s.id}: no animation yet`); continue; }
  const dir = path.join(root, "previews/ds", s.id);
  fs.mkdirSync(dir, { recursive: true });
  for (const f of ["Geist.woff2", "Geist-Mono.woff2"]) fs.copyFileSync(path.join(root, "previews/set3d/fonts", f), path.join(dir, f));
  const a = animFor(s.id);
  fs.writeFileSync(path.join(dir, "index.html"), `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=${W}, height=${H}" />
<title>${esc(s.name)}</title>
<style>
  @font-face { font-family: "Geist"; src: url("Geist.woff2") format("woff2"); font-weight: 100 900; }
  @font-face { font-family: "Geist Mono"; src: url("Geist-Mono.woff2") format("woff2"); font-weight: 100 900; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${W}px; height: ${H}px; overflow: hidden; background: #E9ECF0; }
  #root { position: relative; width: ${W}px; height: ${H}px; overflow: hidden; }
  #card { position: absolute; left: ${CARD.x}px; top: ${CARD.y}px; width: ${CARD.w}px; height: ${CARD.h}px; border-radius: 28px; overflow: hidden; box-shadow: 0 30px 70px rgba(21,23,26,.18), 0 6px 18px rgba(21,23,26,.10); background: #fff; }
  .label { position: absolute; left: 72px; font-family: "Geist", sans-serif; color: #15171A; }
${a.css}
</style>
</head>
<body>
<div id="root" data-composition-id="${s.id}" data-start="0" data-width="${W}" data-height="${H}" data-duration="${DURATION}">
  ${a.behind}
  <div id="card">${a.card}</div>
  <div style="position:absolute;left:0;right:0;bottom:0;height:520px;background:linear-gradient(to top, rgba(233,236,240,.96), rgba(233,236,240,0));"></div>
  <div class="label" style="top:88px;font-family:'Geist Mono',monospace;font-size:28px;font-weight:500;letter-spacing:.14em;color:#5B616B;">DESIGN STYLE ${s.no}</div>
  <div class="label" style="bottom:196px;font-size:118px;font-weight:700;letter-spacing:-.03em;line-height:1;">${esc(s.name)}</div>
  <div class="label" style="bottom:128px;font-size:36px;font-weight:500;color:#5B616B;">${esc(s.line)}</div>
</div>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
${a.three ? `<script type="importmap">
  { "imports": { "three": "https://cdn.jsdelivr.net/npm/three@0.181.2/build/three.module.js", "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.181.2/examples/jsm/" } }
</script>
<script type="module">
  import * as THREE from "three";
  import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
  import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
  const tl = gsap.timeline({ paused: true });
${a.js}
  // 3D styles define render(t); every seek moves the timeline, then draws that exact frame.
  window.__timelines = window.__timelines || {};
  window.__timelines["${s.id}"] = tl;
  window.addEventListener("hf-seek", (e) => { tl.seek(e.detail.time, false); render(e.detail.time); });
  tl.seek(window.__hfThreeTime || 0, false); render(window.__hfThreeTime || 0);
</script>` : `<script>
  const tl = gsap.timeline({ paused: true });
${a.js}
  window.__timelines = window.__timelines || {};
  window.__timelines["${s.id}"] = tl;
</script>`}
</body>
</html>
`);
  console.log(`built previews/ds/${s.id}`);
}
