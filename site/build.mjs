// Builds site/library.js from site/categories.json and every data/<category>.json it lists.
// A category whose data file does not exist yet is kept as "soon" (shown as coming next).
// The pages load library.js with a plain <script>, so they open straight from disk (no server).
// Usage: node site/build.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const site = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(site, "..");
const registry = JSON.parse(fs.readFileSync(path.join(site, "categories.json"), "utf8"));
const rel = (p) => "../" + p.replace(/\\/g, "/").replace(/^\/+/, "");

// Where each name comes from: site/sources.json says which words in "where" mean which tool;
// the link comes from data/sources.json (the research list), or from site/sources.json when missing there.
const research = fs.existsSync(path.join(root, "data/sources.json")) ? JSON.parse(fs.readFileSync(path.join(root, "data/sources.json"), "utf8")) : [];
const tools = JSON.parse(fs.readFileSync(path.join(site, "sources.json"), "utf8")).map((t) => {
  const r = research.find((x) => x.id === t.id);
  return { id: t.id, name: t.name, short: t.short || t.name, doc: t.doc, url: t.url || (r && r.url) || "", match: t.match };
});
function whereToSources(where) {
  return String(where || "").split(",").map((part) => {
    const word = (part.match(/\[([^\]]+)\]/) || [])[1] || "";
    const tool = tools.find((t) => t.match.some((m) => part.toLowerCase().includes(m.toLowerCase())));
    return tool ? { id: tool.id, word } : null;
  }).filter(Boolean);
}

// Chinese labels for categories and filter chips (site/zh.json), used when the 中文 switch is on.
const zh = fs.existsSync(path.join(site, "zh.json")) ? JSON.parse(fs.readFileSync(path.join(site, "zh.json"), "utf8")) : {};

const problems = [];
const categories = registry.map((cat) => {
  const file = path.join(root, cat.data);
  const z = zh[cat.id] || {};
  const base = { id: cat.id, title: cat.title, line: cat.line || "", title_zh: z.title || "", line_zh: z.line || "",
    note: cat.note || "Each one made in the same scene, so you can compare them.", note_zh: z.note || (cat.note ? "" : "每个都在同一个场景里做，方便比较。"),
    chips: (cat.chips || []).map((ch) => ({ ...ch, label_zh: (z.chips || {})[ch.id] || "" })) };
  if (!fs.existsSync(file)) return { ...base, ready: false, items: [] };
  let raw = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!Array.isArray(raw)) raw = raw.items || raw.effects || [];
  const items = raw.map((it, i) => {
    for (const k of ["id", "name", "prompt"]) if (!it[k]) problems.push(`${cat.id}[${i}] has no ${k}`);
    const clipPath = path.join(cat.clips, `${it.id}.mp4`);
    const hasClip = fs.existsSync(path.join(root, clipPath));
    if (!hasClip) problems.push(`${cat.id}/${it.id}: no clip at ${clipPath}`);
    return {
      id: it.id,
      no: it.no || String(i + 1).padStart(2, "0"),
      name: it.name,
      line: it.line || "",
      use_when: it.use_when || "",
      prompt: it.prompt,
      also_called: Array.isArray(it.also_called) ? it.also_called.map((a) => ({ name: a.name, where: a.where || "", sources: whereToSources(a.where) })) : [],
      tags: Array.isArray(it.tags) ? it.tags : [],
      refs: Array.isArray(it.sources) ? it.sources.filter((s) => s && s.name && s.url).map((s) => ({ name: s.name, url: s.url })) : [],
      clip: hasClip ? rel(clipPath) : "",
    };
  });
  return { ...base, ready: items.length > 0, items };
});

const out = `// Made by site/build.mjs from site/categories.json. Do not edit by hand.\nwindow.LIBRARY = ${JSON.stringify({ built: new Date().toISOString().slice(0, 10), sources: tools.map(({ match, ...t }) => t), categories }, null, 1)};\n`;
fs.writeFileSync(path.join(site, "library.js"), out);
const ready = categories.filter((c) => c.ready);
console.log(`wrote site/library.js: ${ready.map((c) => `${c.id} (${c.items.length})`).join(", ")}; coming: ${categories.filter((c) => !c.ready).map((c) => c.id).join(", ") || "none"}`);
if (problems.length) console.log("check:\n  " + problems.join("\n  "));
