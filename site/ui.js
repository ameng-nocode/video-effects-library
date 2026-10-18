// Shared pieces every design uses: clip card, detail pop-up, picks drawer, top-bar sync.
// Each design file only draws its own layout and calls UI.*.
(function () {
  var V = window.VEL, esc = V.esc, hooks = [];
  function syncTop() {
    var n = V.picks.count();
    document.querySelectorAll("[data-count]").forEach(function (el) { el.textContent = n; });
    document.querySelectorAll("[data-tray]").forEach(function (el) { el.classList.toggle("has", n > 0); });
    document.querySelectorAll("[data-clear-top]").forEach(function (el) { el.hidden = n === 0; });
    document.querySelectorAll("[data-pause]").forEach(function (el) { el.textContent = V.isPaused() ? V.L("Play clips", "播放") : V.L("Pause clips", "暂停"); });
  }
  /* ---------- cards ---------- */
  function card(c, it) {
    var o = V.picks.order(c.id, it.id);
    return '<article class="card' + (o ? " is-picked" : "") + '" data-cat="' + c.id + '" data-id="' + esc(it.id) + '">' +
      '<button type="button" class="card-clip" data-open aria-label="Open ' + esc(it.name) + '">' +
      (it.clip ? '<video data-loop muted playsinline preload="metadata" src="' + esc(it.clip) + '#t=2"></video>' : '<span class="no-clip">Clip coming</span>') +
      '</button>' +
      '<div class="card-foot"><div class="card-name"><span class="mono">' + esc(it.no) + '</span>' + esc(it.name) + '</div>' +
      '<button type="button" class="pick" data-pick role="checkbox" aria-checked="' + (o ? "true" : "false") + '" aria-label="' + V.L("Add ", "加入 ") + esc(it.name) + '">' + pickLabel(o) + '</button></div></article>';
  }
  // Under each clip: which AI tools use this name, so the source is never hidden.
  function srcLine(it) {
    var t = V.toolsOf(it);
    if (!t.length) return "";
    return '<p class="card-src"><span>Same name in</span> ' + t.map(function (s) { return esc(s.short); }).join(", ") + '</p>';
  }
  var ext = '<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M4 2h6v6M10 2 3 9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  function toolLink(s, word) {
    return '<a class="tool" href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.name) + ext + '</a>' + (word ? '<span class="word">types it as [' + esc(word) + ']</span>' : "");
  }
  function pickLabel(o) { return o ? tick : ""; }
  var tick = '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var plus = '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M7 2v10M2 7h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  function syncCards() {
    document.querySelectorAll(".card[data-id]").forEach(function (el) {
      var o = V.picks.order(el.getAttribute("data-cat"), el.getAttribute("data-id"));
      el.classList.toggle("is-picked", !!o);
      var b = el.querySelector("[data-pick]");
      b.setAttribute("aria-checked", o ? "true" : "false");
      b.innerHTML = pickLabel(o);
    });
  }

  /* ---------- detail ---------- */
  var detail = document.createElement("div");
  detail.className = "detail"; detail.hidden = true;
  detail.setAttribute("role", "dialog"); detail.setAttribute("aria-modal", "true"); detail.setAttribute("aria-label", "Effect");
  var shown = null;
  function openDetail(catId, id, list) {
    var c = V.cat(catId), it = V.find(catId, id);
    if (!it) return;
    shown = { cat: catId, id: id, list: list || c.items.map(function (x) { return x.id; }) };
    var pos = shown.list.indexOf(id);
    detail.innerHTML = '<div class="detail-panel">' +
      '<div class="detail-clip">' + (it.clip ? '<video muted loop playsinline autoplay src="' + esc(it.clip) + '"></video>' : "") + '</div>' +
      '<div class="detail-text"><div class="detail-top"><span class="mono">' + esc(V.ctitle(c)) + ' ' + esc(it.no) + '</span>' +
      '<div class="detail-nav"><button type="button" class="btn-ghost" data-step="-1"' + (pos <= 0 ? " disabled" : "") + ' aria-label="' + V.L("Previous", "上一个") + '">' + chev(180) + '</button>' +
      '<button type="button" class="btn-ghost" data-step="1"' + (pos >= shown.list.length - 1 ? " disabled" : "") + ' aria-label="' + V.L("Next", "下一个") + '">' + chev(0) + '</button>' +
      '<button type="button" class="btn-ghost" data-close>' + V.L("Close", "关闭") + '</button></div></div>' +
      '<h2 class="detail-name">' + esc(it.name) + '</h2><p class="detail-line">' + esc(it.line) + '</p>' +
      '<h3 class="label">' + V.L("How to ask an AI", "怎样跟 AI 讲") + '</h3><p class="ask">' + esc(askLine(c, it)) + '</p>' +
      '<h3 class="label">' + V.L("Motion spec", "动作规格") + '</h3><ul class="spec">' + specOf(it).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul>' +
      (it.use_when ? '<h3 class="label">' + V.L("When to use it", "什么时候用") + '</h3><p class="detail-line">' + esc(it.use_when) + '</p>' : "") +
      '<div class="detail-actions"><button type="button" class="btn-rec" data-dpick></button><button type="button" class="btn-ghost line" data-dcopy>' + V.L("Copy prompt", "复制 Prompt") + '</button></div>' +
      '<p class="hint">' + V.L("Works in Claude Code and in AI video tools.", "Claude Code 和 AI 视频工具都能用。") + '</p>' +
      '</div></div>';
    syncDetail();
    if (!V.isOpen()) V.open(detail, function () { shown = null; detail.innerHTML = ""; });
  }
  // "How to ask an AI": one plain sentence built from the name and its one-line meaning.
  function askLine(c, it) {
    var kind = c.title.toLowerCase().replace(/s$/, "");
    var art = /^[aeiou]/i.test(it.name) ? "an " : "a ";
    var line = it.line ? it.line.charAt(0).toLowerCase() + it.line.slice(1) : "";
    return "Add " + art + it.name.toLowerCase() + " " + kind + (line ? ": " + line : ".");
  }
  // "Motion spec": the prompt split into its parts (move, distance, timing, extra detail).
  function specOf(it) {
    var body = it.prompt.replace(/^[^:]{1,40}:\s*/, "");
    return body.split(/\.\s+|,\s+(?=(?:from|over|so|while|then|with|and then)\b)/i)
      .map(function (x) { x = x.trim().replace(/\.$/, ""); return x ? x.charAt(0).toUpperCase() + x.slice(1) : ""; })
      .filter(Boolean);
  }
  function chev(r) { return '<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" style="transform:rotate(' + r + 'deg)"><path d="M7 4l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'; }
  function syncDetail() {
    if (!shown) return;
    var b = detail.querySelector("[data-dpick]"), o = V.picks.order(shown.cat, shown.id);
    if (b) { b.innerHTML = o ? '<span class="pick-no">' + o + '</span>' + V.L("Added, remove", "已加入，移除") : plus + V.L("Add to prompt", "加进 Prompt"); b.classList.toggle("on", !!o); }
  }
  detail.addEventListener("click", function (e) {
    if (e.target === detail) return V.close();
    var t = e.target.closest("button");
    if (!t || !shown) return;
    if (t.hasAttribute("data-close")) V.close();
    else if (t.hasAttribute("data-step")) {
      var i = shown.list.indexOf(shown.id) + Number(t.getAttribute("data-step"));
      if (shown.list[i]) openDetail(shown.cat, shown.list[i], shown.list);
    } else if (t.hasAttribute("data-dpick")) { if (V.picks.toggle(shown.cat, shown.id)) added(shown.cat, shown.id); }
    else if (t.hasAttribute("data-dcopy")) V.copy(V.find(shown.cat, shown.id).prompt, t, V.L("Copied", "已复制"));
  });

  /* ---------- picks drawer ---------- */
  var tray = document.createElement("div");
  tray.className = "tray"; tray.hidden = true;
  tray.setAttribute("role", "dialog"); tray.setAttribute("aria-modal", "true"); tray.setAttribute("aria-label", V.L("Your prompt", "我的 Prompt"));
  function drawTray() {
    var list = V.picks.list();
    tray.innerHTML = '<div class="tray-panel"><div class="tray-head"><h2>' + V.L("Your prompt", "我的 Prompt") + ' <span class="mono">' + list.length + '</span></h2><button type="button" class="btn-ghost" data-close>' + V.L("Close", "关闭") + '</button></div>' +
      (list.length ? '<p class="tray-sub">' + V.L("Top to bottom is the order in your video.", "从上到下，就是视频里的顺序。") + '</p><ol class="tray-list">' + list.map(function (p, i) {
        var it = V.find(p.cat, p.id);
        return '<li class="tray-item"><div class="tray-thumb">' + (it.clip ? '<video data-loop muted playsinline preload="auto" src="' + esc(it.clip) + '#t=2"></video>' : "") + '<span class="mono">' + (i + 1) + '</span></div>' +
          '<div class="tray-main"><div class="tray-name">' + esc(it.name) + '</div>' +
          '<label for="note-' + i + '">' + V.L("Note", "备注") + '</label><input id="note-' + i + '" class="tray-note" data-note="' + i + '" type="text" value="' + esc(p.note) + '" autocomplete="off">' +
          (i === 0 ? '<p class="hint">' + V.L('Where it goes, like "for the opening".', "放在哪里，例如「开头用」。") + '</p>' : "") + '</div>' +
          '<div class="tray-tools"><button type="button" class="icon-btn" data-up="' + i + '" aria-label="Move up"' + (i === 0 ? " disabled" : "") + '>' + arrow(0) + '</button>' +
          '<button type="button" class="icon-btn" data-down="' + i + '" aria-label="Move down"' + (i === list.length - 1 ? " disabled" : "") + '>' + arrow(180) + '</button>' +
          '<button type="button" class="icon-btn" data-remove="' + i + '" aria-label="Remove">' + cross + '</button></div></li>';
      }).join("") + '</ol>' +
      '<h3 class="label">' + V.L("The prompt you copy", "会复制的 Prompt") + '</h3><pre class="tray-pre" data-preview></pre>' +
      '<p class="claude-note">' + V.L("<b>Works in Claude Code.</b> Paste the prompt into Claude Code and it builds these moves in your video. It also works in AI video tools like Runway or Kling.", "<b>Claude Code 可用。</b>把 prompt 贴进 Claude Code，它就会在你的视频里做出这些效果。Runway、Kling 这些 AI 视频工具也能用。") + '</p>' +
      '<div class="tray-foot"><button type="button" class="btn-rec wide" data-copyall>' + V.L("Copy prompt", "复制 Prompt") + '</button><button type="button" class="btn-ghost" data-clear>' + V.L("Clear all", "全部清除") + '</button></div>'
      : '<p class="tray-empty">' + V.L("Nothing added yet. Tick the box under any clip.", "还没有加任何效果。在 clip 下面打勾就能加。") + '</p>') + '</div>';
    var pre = tray.querySelector("[data-preview]");
    if (pre) pre.textContent = V.promptText();
    V.watch(tray);
  }
  function arrow(r) { return '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" style="transform:rotate(' + r + 'deg)"><path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'; }
  var cross = '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  tray.addEventListener("click", function (e) {
    if (e.target === tray) return V.close();
    var t = e.target.closest("button");
    if (!t) return;
    if (t.hasAttribute("data-close")) V.close();
    else if (t.hasAttribute("data-up")) V.picks.move(+t.getAttribute("data-up"), -1);
    else if (t.hasAttribute("data-down")) V.picks.move(+t.getAttribute("data-down"), 1);
    else if (t.hasAttribute("data-remove")) V.picks.remove(+t.getAttribute("data-remove"));
    else if (t.hasAttribute("data-clear")) V.picks.clear();
    else if (t.hasAttribute("data-copyall")) V.copy(V.promptText(), t, V.L("Copied", "已复制"));
  });
  tray.addEventListener("input", function (e) {
    var i = e.target.getAttribute("data-note");
    if (i === null) return;
    V.picks.note(+i, e.target.value);
    var pre = tray.querySelector("[data-preview]");
    if (pre) pre.textContent = V.promptText();
  });

  document.addEventListener("click", function (e) {
    var t = e.target.closest("button, a");
    if (!t) return;
    if (t.hasAttribute("data-tray")) { drawTray(); V.open(tray); var f = tray.querySelector("button"); if (f) f.focus(); }
    else if (t.hasAttribute("data-clear-top")) V.picks.clear();
    else if (t.hasAttribute("data-pause")) { V.setPaused(!V.isPaused()); syncTop(); }
    else if (t.hasAttribute("data-pick")) { var c = t.closest(".card"); if (V.picks.toggle(c.getAttribute("data-cat"), c.getAttribute("data-id"))) added(c.getAttribute("data-cat"), c.getAttribute("data-id")); }
    else if (t.hasAttribute("data-open")) {
      var k = t.closest("[data-id]"), grid = t.closest("[data-list]");
      var ids = grid ? Array.prototype.map.call(grid.querySelectorAll('[data-id][data-cat="' + k.getAttribute("data-cat") + '"]'), function (x) { return x.getAttribute("data-id"); }) : null;
      openDetail(k.getAttribute("data-cat"), k.getAttribute("data-id"), ids);
    }
  });
  V.picks.on(function () {
    syncTop(); syncCards(); syncDetail(); hooks.forEach(function (fn) { fn(); });
    if (!tray.hidden) {
      var active = document.activeElement && document.activeElement.getAttribute("data-note");
      drawTray();
      if (active !== null && active !== undefined) { var inp = tray.querySelector('[data-note="' + active + '"]'); if (inp) inp.focus(); }
    }
  });

  function searchBox(label, hint) {
    return '<div class="search"><label for="q">' + label + '</label><input id="q" type="search" autocomplete="off"><p class="hint">' + hint + '</p></div>';
  }


  // Short message after each Add, pointing to where the prompt is.
  var toast = document.createElement("div"), toastTimer = null;
  toast.className = "toast"; toast.hidden = true; toast.setAttribute("role", "status");
  function added(catId, id) {
    var it = V.find(catId, id), n = V.picks.count();
    toast.innerHTML = '<span><b>' + esc(it.name) + '</b>' + V.L(' added. ' + n + (n === 1 ? ' effect' : ' effects') + ' in your prompt.', ' 已加入。Prompt 里有 ' + n + ' 个效果。') + '</span><button type="button" class="btn-main" data-tray>' + V.L("Get prompt", "我的 Prompt") + '</button>';
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.hidden = true; }, 4000);
  }
  document.addEventListener("click", function (e) { if (e.target.closest("[data-tray]")) toast.hidden = true; }, true);

  function start() {
    document.body.appendChild(toast);
    document.body.appendChild(detail);
    document.body.appendChild(tray);
    V.watch(document);
    syncTop();
  }
  window.UI = { card: card, srcLine: srcLine, toolLink: toolLink, ext: ext, chev: chev, pickLabel: pickLabel, openDetail: openDetail,
    searchBox: searchBox, syncTop: syncTop, start: start, onPicks: function (fn) { hooks.push(fn); } };
})();
