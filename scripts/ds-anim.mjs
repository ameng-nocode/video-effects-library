// Style animations for design style clips. Each style is a motion graphic built in code (shapes, type, SVG,
// canvas), not an animated picture, and each has its own subject so the styles do not look alike.
// One file per style in scripts/ds-styles/<id>.mjs. Its default export returns { card, behind, css, js }:
// card = HTML inside the 864x1296 card, behind = HTML on the stage under the card, css = extra styles,
// js = timeline code (a paused GSAP timeline "tl" already exists). Anything drawn per frame must read the
// timeline time, so every frame renders the same on its own. A real 3D style also returns three: true;
// its js then runs as a module with THREE, RoundedBoxGeometry and RoomEnvironment in scope and must define
// render(t), which draws the WebGL frame for time t.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), "ds-styles");
const STYLES = {};
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".mjs"))) {
  STYLES[f.replace(/\.mjs$/, "")] = (await import(pathToFileURL(path.join(dir, f)).href)).default;
}

export const hasAnim = (id) => id in STYLES;
export const animFor = (id) => ({ behind: "", css: "", ...STYLES[id]() });
