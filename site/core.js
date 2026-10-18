// Shared logic for every page: data, search, filter chips, picks, the copied prompt, clip playback.
// Each look (a.js, b.js) only draws markup and calls into window.VEL.
(function () {
  var LIB = window.LIBRARY || { categories: [] };
  var KEY = "vel.picks.v1";
  var listeners = [];

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var sources = LIB.sources || [];
  function source(id) { return sources.filter(function (s) { return s.id === id; })[0] || null; }
  // Every tool that names this effect, once each, in the order of the sources list.
  function toolsOf(item) {
    var ids = {};
    item.also_called.forEach(function (a) { (a.sources || []).forEach(function (s) { ids[s.id] = true; }); });
    return sources.filter(function (s) { return ids[s.id]; });
  }
  var ready = LIB.categories.filter(function (c) { return c.ready; });
  var soon = LIB.categories.filter(function (c) { return !c.ready; });
  function cat(id) { return ready.filter(function (c) { return c.id === id; })[0] || null; }
  function find(catId, id) {
    var c = cat(catId);
    if (!c) return null;
    return c.items.filter(function (it) { return it.id === id; })[0] || null;
  }
  function all() {
    var out = [];
    ready.forEach(function (c) { c.items.forEach(function (it) { out.push({ cat: c, item: it }); }); });
    return out;
  }
  function norm(s) { return String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(); }
  function matches(item, q) {
    q = norm(q);
    if (!q) return true;
    var hay = norm([item.name, item.line, item.use_when, item.tags.join(" "), item.also_called.map(function (a) { return a.name; }).join(" ")].join(" "));
    return q.split(" ").every(function (w) { return hay.indexOf(w) !== -1; });
  }
  function inChip(c, chipId, item) {
    if (!chipId) return true;
    var chip = c.chips.filter(function (x) { return x.id === chipId; })[0];
    if (!chip) return true;
    if (chip.ids) return chip.ids.indexOf(item.id) !== -1;
    if (chip.tag) return item.tags.indexOf(chip.tag) !== -1;
    return true;
  }

  // Picks: [{cat, id, note}] in order. Saved in this browser only.
  var picks = [];
  try { picks = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { picks = []; }
  picks = picks.filter(function (p) { return find(p.cat, p.id); });
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(picks)); } catch (e) {}
    listeners.forEach(function (fn) { fn(picks); });
  }
  function idx(catId, id) {
    for (var i = 0; i < picks.length; i++) if (picks[i].cat === catId && picks[i].id === id) return i;
    return -1;
  }
  var P = {
    list: function () { return picks.slice(); },
    count: function () { return picks.length; },
    order: function (catId, id) { return idx(catId, id) + 1; },
    has: function (catId, id) { return idx(catId, id) !== -1; },
    toggle: function (catId, id) {
      var i = idx(catId, id);
      if (i === -1) picks.push({ cat: catId, id: id, note: "" }); else picks.splice(i, 1);
      save();
      return i === -1;
    },
    move: function (i, d) {
      var j = i + d;
      if (j < 0 || j >= picks.length) return;
      var t = picks[i]; picks[i] = picks[j]; picks[j] = t;
      save();
    },
    remove: function (i) { picks.splice(i, 1); save(); },
    clear: function () { picks = []; save(); },
    note: function (i, text) { if (picks[i]) { picks[i].note = text; try { localStorage.setItem(KEY, JSON.stringify(picks)); } catch (e) {} } },
    on: function (fn) { listeners.push(fn); }
  };

  function promptText() {
    var lines = ["Use these effects in this order:", ""];
    picks.forEach(function (p, i) {
      var c = cat(p.cat), it = find(p.cat, p.id);
      lines.push((i + 1) + ". " + it.name + " (" + c.title.toLowerCase().replace(/s$/, "") + ")");
      lines.push(it.prompt);
      if (p.note && p.note.trim()) lines.push("My note: " + p.note.trim());
      lines.push("");
    });
    return lines.join("\n").trim() + "\n";
  }

  function copy(text, btn, doneLabel) {
    var label = btn ? btn.textContent : "";
    function done() {
      if (!btn) return;
      btn.textContent = doneLabel || "Copied";
      btn.classList.add("is-done");
      setTimeout(function () { btn.textContent = label; btn.classList.remove("is-done"); }, 1600);
    }
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta); done();
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback);
    else fallback();
  }

  // Clips play only while on screen, and everything stops when "Pause clips" is on.
  var paused = false;
  try { paused = localStorage.getItem("vel.paused") === "1"; } catch (e) {}
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches && localStorage.getItem("vel.paused") === null) paused = true;
  var seen = new WeakMap();
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      seen.set(e.target, e.isIntersecting);
      if (e.isIntersecting && !paused) e.target.play().catch(function () {}); else e.target.pause();
    });
  }, { rootMargin: "120px" }) : null;
  function watch(scope) {
    (scope || document).querySelectorAll("video[data-loop]").forEach(function (v) {
      v.muted = true; v.loop = true; v.playsInline = true;
      if (io) io.observe(v); else if (!paused) v.play().catch(function () {});
    });
  }
  function setPaused(on) {
    paused = on;
    try { localStorage.setItem("vel.paused", on ? "1" : "0"); } catch (e) {}
    document.querySelectorAll("video[data-loop]").forEach(function (v) {
      if (on) v.pause(); else if (seen.get(v) !== false) v.play().catch(function () {});
    });
  }

  function param(name) {
    var m = new RegExp("[?&]" + name + "=([^&]*)").exec(location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : "";
  }

  // One open layer at a time (detail or tray). Escape closes it; page scroll locks while open.
  var openLayer = null;
  function open(el, onClose) {
    if (openLayer) close();
    openLayer = { el: el, onClose: onClose, focus: document.activeElement };
    el.hidden = false;
    document.documentElement.classList.add("is-locked");
    requestAnimationFrame(function () { el.classList.add("is-open"); });
  }
  function close() {
    if (!openLayer) return;
    var l = openLayer; openLayer = null;
    l.el.classList.remove("is-open");
    l.el.hidden = true;
    document.documentElement.classList.remove("is-locked");
    if (l.onClose) l.onClose();
    if (l.focus && l.focus.focus) l.focus.focus();
  }
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });

  // Language (English or 中文) and colour mode (light or dark), saved in this browser.
  var lang = "en", theme = "light";
  try { lang = localStorage.getItem("vel.lang") === "zh" ? "zh" : "en"; theme = localStorage.getItem("vel.theme") === "dark" ? "dark" : "light"; } catch (e) {}
  function L(en, zh) { return lang === "zh" && zh ? zh : en; }
  function setLang(v) { try { localStorage.setItem("vel.lang", v); } catch (e) {} location.reload(); }
  function setTheme(v) { theme = v; document.documentElement.setAttribute("data-theme", v); try { localStorage.setItem("vel.theme", v); } catch (e) {} }
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.lang = lang === "zh" ? "zh" : "en";
  function ctitle(c) { return L(c.title, c.title_zh); }
  function cline(c) { return L(c.line, c.line_zh); }
  function chipLabel(x) { return L(x.label, x.label_zh); }

  window.VEL = {
    lang: function () { return lang; }, L: L, setLang: setLang, theme: function () { return theme; }, setTheme: setTheme,
    ctitle: ctitle, cline: cline, chipLabel: chipLabel,
    esc: esc, built: LIB.built, sources: sources, source: source, toolsOf: toolsOf, ready: ready, soon: soon, cat: cat, find: find, all: all,
    matches: matches, inChip: inChip, picks: P, promptText: promptText, copy: copy,
    watch: watch, setPaused: setPaused, isPaused: function () { return paused; },
    param: param, open: open, close: close, isOpen: function () { return !!openLayer; }
  };
})();
