// The site, "Shelves" design: top tabs, a wide row of playing clips up top, one shelf per category.
// Every word on the page goes through V.L(english, 中文) so the 中文 switch changes it.
(function () {
  var V = window.VEL, U = window.UI, esc = V.esc, L = V.L;
  var app = document.getElementById("app");
  var SELF = location.pathname.split("/").pop() || "index.html";
  var cur = V.cat(V.param("c"));
  var moon = '<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M14.5 11.2A6 6 0 0 1 6.8 3.5a6 6 0 1 0 7.7 7.7z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  var sun = '<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><circle cx="9" cy="9" r="3.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9 1.8v1.8M9 14.4v1.8M1.8 9h1.8M14.4 9h1.8M3.9 3.9l1.3 1.3M12.8 12.8l1.3 1.3M3.9 14.1l1.3-1.3M12.8 5.2l1.3-1.3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';

  function top() {
    return '<header class="top"><div class="top-in"><a class="brand" href="' + SELF + '">Video Effects Library</a>' +
      '<nav class="tabs" aria-label="' + L("Categories", "类别") + '"><a href="' + SELF + '"' + (cur ? "" : ' aria-current="page"') + '>' + L("Home", "首页") + '</a>' +
      V.ready.map(function (c) { return '<a href="' + SELF + '?c=' + c.id + '"' + (cur && cur.id === c.id ? ' aria-current="page"' : "") + '>' + esc(V.ctitle(c)) + ' <span>' + c.items.length + '</span></a>'; }).join("") +
      V.soon.map(function (c) { return '<span class="tab-soon">' + esc(V.ctitle(c)) + ' <span>' + L("Soon", "即将推出") + '</span></span>'; }).join("") +
      '</nav><div class="top-actions">' +
      '<button type="button" class="btn-ghost lang-btn" data-lang aria-label="' + L("Switch to Chinese", "Switch to English") + '">' + L("中文", "EN") + '</button>' +
      '<button type="button" class="btn-ghost icon-only" data-theme-toggle aria-label="' + L("Dark mode", "深色模式") + '"></button>' +
      '<button type="button" class="btn-ghost" data-pause></button>' +
      '<button type="button" class="btn-ghost" data-clear-top hidden>' + L("Clear all", "全部清除") + '</button>' +
      '<button type="button" class="picks-btn" data-tray aria-haspopup="dialog">' + L("Get prompt", "我的 Prompt") + ' <span class="picks-count" data-count>0</span></button></div></div></header>';
  }
  function syncTheme() {
    var dark = V.theme() === "dark";
    document.querySelectorAll("[data-theme-toggle]").forEach(function (b) {
      b.innerHTML = dark ? sun : moon;
      b.setAttribute("aria-label", dark ? L("Light mode", "浅色模式") : L("Dark mode", "深色模式"));
      b.setAttribute("title", b.getAttribute("aria-label"));
    });
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest("button"); if (!t) return;
    if (t.hasAttribute("data-lang")) V.setLang(V.lang() === "zh" ? "en" : "zh");
    else if (t.hasAttribute("data-theme-toggle")) { V.setTheme(V.theme() === "dark" ? "light" : "dark"); syncTheme(); }
  });

  function home() {
    var all = V.all(), clips = all.filter(function (x) { return x.item.clip; });
    var stage = ["dolly-zoom", "orbit", "push-in", "crash-zoom", "crane-up"].map(function (id) { return clips.filter(function (x) { return x.item.id === id; })[0]; }).filter(Boolean);
    if (stage.length < 5) stage = clips.slice(0, 5);
    app.innerHTML = top() + '<main>' +
      '<section class="hero"><div class="hero-text"><h1>' + L("See the effect. Get its real name. Copy the prompt.", "看效果，知道它的真名，复制 Prompt。") + '</h1>' +
      '<p class="lead">' + L(all.length + " video effects, each filmed as a short clip and named the way AI video tools name them. Add the ones you want, then copy one prompt.",
        all.length + " 个视频效果，每个都有一段短片，名字跟 AI 视频工具用的一样。勾选你要的，再复制一个 prompt。") + '</p>' +
      '<p class="works"><span class="works-badge">' + L("Works in Claude Code", "Claude Code 可用") + '</span>' +
      L("Each prompt gives the exact move, distance and timing, so Claude Code can build it. The clips here were made the same way.",
        "每个 prompt 都写清楚怎么动、多远、多久，Claude Code 就能照着做。这里的 clip 也是这样做出来的。") + '</p>' +
      U.searchBox(L("Search all effects", "搜索效果"), L("Type a name or what it does, like zoom or turns.", "打名字或它做什么，例如 zoom 或 turn。")) + '</div>' +
      '<div class="stage" data-list>' + stage.map(function (x, i) {
        return '<button type="button" class="stage-clip s' + i + '" data-open data-cat="' + x.cat.id + '" data-id="' + esc(x.item.id) + '" aria-label="' + L("Open", "打开") + ' ' + esc(x.item.name) + '"><video data-loop muted playsinline preload="auto" src="' + esc(x.item.clip) + '#t=2"></video></button>';
      }).join("") + '</div></section>' +
      '<section class="band" data-results hidden><div class="band-head"><h2>' + L("Results", "搜索结果") + '</h2></div><div class="grid" data-list data-grid></div><p class="empty" data-empty hidden>' + L("No effect with that name yet.", "找不到这个名字的效果。") + '</p></section>' +
      V.ready.map(function (c) {
        return '<section class="band"><div class="band-head row"><div><h2>' + esc(V.ctitle(c)) + '</h2><p>' + esc(V.cline(c)) + '</p></div><a class="btn-line" href="' + SELF + '?c=' + c.id + '">' + L("See all " + c.items.length, "看全部 " + c.items.length + " 个") + U.chev(0) + '</a></div>' +
          '<div class="shelf" data-list>' + c.items.slice(0, 12).map(function (it) { return U.card(c, it); }).join("") + '</div></section>';
      }).join("") +
      (V.soon.length ? '<section class="band"><div class="band-head"><h2>' + L("Coming next", "即将推出") + '</h2><p>' + L("New categories, filmed the same way.", "新的类别，用同样的方式做。") + '</p></div><div class="soon-row">' +
        V.soon.map(function (c) { return '<div class="soon-card"><b>' + esc(V.ctitle(c)) + '</b><span>' + esc(V.cline(c)) + '</span></div>'; }).join("") + '</div></section>' : "") +
      '</main>' + foot();
    var q = document.getElementById("q"), res = app.querySelector("[data-results]"), grid = res.querySelector("[data-grid]"), empty = res.querySelector("[data-empty]");
    q.addEventListener("input", function () {
      var v = q.value.trim(); res.hidden = !v;
      if (!v) { grid.innerHTML = ""; return; }
      var hits = V.all().filter(function (x) { return V.matches(x.item, v); });
      grid.innerHTML = hits.map(function (x) { return U.card(x.cat, x.item); }).join("");
      empty.hidden = hits.length > 0; V.watch(grid);
    });
  }

  function category(c) {
    var chip = "", eg = esc(c.items[Math.min(6, c.items.length - 1)].name.toLowerCase());
    app.innerHTML = top() + '<main><section class="band cat-top"><a class="back" href="' + SELF + '">' + U.chev(180) + L("Home", "首页") + '</a>' +
      '<div class="band-head row"><div><h1>' + esc(V.ctitle(c)) + ' <span class="count">' + c.items.length + '</span></h1><p>' + esc(V.cline(c)) + ' ' + esc(L(c.note, c.note_zh)) + '</p></div>' +
      U.searchBox(L("Search", "搜索"), L("A name, like " + eg + ".", "打名字，例如 " + eg + "。")) + '</div>' +
      '<div class="seg" role="group" aria-label="' + L("Filter", "筛选") + '"><button type="button" data-chip="" aria-pressed="true">' + L("All", "全部") + '</button>' +
      c.chips.map(function (x) { return '<button type="button" data-chip="' + x.id + '" aria-pressed="false">' + esc(V.chipLabel(x)) + '</button>'; }).join("") + '</div>' +
      '<div class="grid" data-list></div><p class="empty" data-empty hidden>' + L("No effect matches. Try All or clear the search.", "没有符合的效果。试试「全部」，或清空搜索。") + '</p></section></main>' + foot();
    var grid = app.querySelector(".grid"), q = document.getElementById("q"), empty = app.querySelector("[data-empty]");
    function draw() {
      var hits = c.items.filter(function (it) { return V.inChip(c, chip, it) && V.matches(it, q.value); });
      grid.innerHTML = hits.map(function (it) { return U.card(c, it); }).join("");
      empty.hidden = hits.length > 0; V.watch(grid);
    }
    app.querySelectorAll("[data-chip]").forEach(function (b) {
      b.addEventListener("click", function () { chip = b.getAttribute("data-chip"); app.querySelectorAll("[data-chip]").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); }); draw(); });
    });
    q.addEventListener("input", draw); draw();
  }

  function foot() {
    return '<footer class="foot"><span>' + L("Video Effects Library. Free and open source.", "Video Effects Library。免费、开源。") + '</span></footer>';
  }

  if (cur) category(cur); else home();
  U.start();
  syncTheme();
})();
