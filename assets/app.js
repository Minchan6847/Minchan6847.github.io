/* Renders the site from window.SITE (assets/content.js).
 * Routes use the URL hash:  #en = English home,  #ko = Korean home,  #orca / #ko-orca = project page,
 * #projects / #ko-projects = a section of the home page.
 * No element uses these names as its id, so the browser never scrolls by itself and the script decides the position. */
(function () {
  "use strict";
  var S = window.SITE;
  var root = document.getElementById("app");
  var SECTIONS = ["projects", "experience", "education", "skills", "contact"];
  var lang = "en";

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  /* text with `code` spans */
  function rich(s) {
    return esc(s).replace(/`([^`]+)`/g, "<code>$1</code>");
  }
  function t(o) { return o == null ? "" : (typeof o === "string" ? o : o[lang]); }
  function href(target) {
    var p = lang === "ko" ? (target ? "ko-" + target : "ko") : (target || "en");
    return "#" + p;
  }
  function findProject(id) {
    for (var i = 0; i < S.projects.length; i++) if (S.projects[i].id === id) return S.projects[i];
    return null;
  }

  function parseHash() {
    var h = (location.hash || "").replace(/^#/, "");
    var l = "en";
    if (h === "ko") { l = "ko"; h = ""; }
    else if (h.indexOf("ko-") === 0) { l = "ko"; h = h.slice(3); }
    if (h === "top" || h === "en") h = "";
    return { lang: l, target: h };
  }

  /* ---------- pieces ---------- */
  function stageStrip(covered) {
    if (!covered || !covered.length) return "";
    var out = '<ol class="strip" aria-label="' + esc(t(S.ui.stagesLabel)) + '">';
    S.stages.forEach(function (st) {
      var on = covered.indexOf(st.id) >= 0;
      out += '<li class="' + (on ? "on" : "off") + '">' + esc(t(st.label)) +
        '<span class="sr"> (' + esc(t(on ? S.ui.covered : S.ui.notCovered)) + ")</span></li>";
    });
    return out + "</ol>";
  }

  function flowMap() {
    var rows = S.projects.filter(function (p) { return p.stages.length; }).map(function (p) { return { name: t(p.short), link: href(p.id), stages: p.stages }; });
    S.otherWork.forEach(function (w) {
      if (w.inMap) rows.push({ name: t(w.short), link: null, stages: w.stages });
    });
    var h = '<div class="map-wrap"><table class="map"><caption>' + esc(t(S.ui.mapTitle)) + "</caption><thead><tr><td></td>";
    S.stages.forEach(function (st) {
      h += '<th scope="col"><span class="full">' + esc(t(st.label)) + '</span><span class="abbr">' + esc(t(st.short)) + "</span></th>";
    });
    h += "</tr></thead><tbody>";
    rows.forEach(function (r) {
      h += '<tr><th scope="row">' + (r.link ? '<a href="' + r.link + '">' + esc(r.name) + "</a>" : esc(r.name)) + "</th>";
      S.stages.forEach(function (st) {
        var on = r.stages.indexOf(st.id) >= 0;
        h += '<td class="' + (on ? "on" : "off") + '"><span class="cell"></span><span class="sr">' +
          esc(t(on ? S.ui.covered : S.ui.notCovered)) + "</span></td>";
      });
      h += "</tr>";
    });
    return h + "</tbody></table></div><p class=\"map-note\">" + esc(t(S.ui.mapNote)) + "</p>";
  }

  function header(isHome) {
    var other = lang === "ko" ? "en" : "ko";
    var cur = parseHash().target;
    var otherHref = other === "ko" ? (cur ? "#ko-" + cur : "#ko") : ("#" + (cur || "en"));
    var nav = "";
    SECTIONS.forEach(function (id) {
      nav += '<a href="' + href(id) + '">' + esc(t(S.ui.nav[id])) + "</a>";
    });
    return '<header class="site-header"><div class="wrap bar">' +
      '<a class="brand" href="' + href("") + '">' + esc(t(S.profile.name)) + "</a>" +
      '<nav aria-label="Sections">' + nav + "</nav>" +
      '<a class="lang" href="' + otherHref + '" lang="' + other + '" aria-label="' + esc(t(S.ui.langSwitchLabel)) + '">' +
      esc(t(S.ui.langSwitch)) + "</a></div></header>";
  }

  function home() {
    var P = S.profile, h = "";
    h += '<section class="hero wrap"><h1>' + esc(t(P.name)) + '</h1><p class="role">' + esc(t(P.role)) + "</p>";
    P.summary.forEach(function (s) { h += '<p class="lede">' + rich(t(s)) + "</p>"; });
    h += '<p class="status">' + esc(t(P.status)) + "</p>";
    h += flowMap() + "</section>";

    h += '<section class="wrap block" id="sec-projects"><h2>' + esc(t(S.ui.projects)) + '</h2><div class="plist">';
    S.projects.forEach(function (p) {
      h += '<article class="pitem"><div class="phead"><h3><a href="' + href(p.id) + '">' + esc(t(p.title)) + "</a></h3>" +
        '<p class="when">' + esc(t(p.period)) + "</p></div>" +
        "<p>" + rich(t(p.summary)) + "</p>" + stageStrip(p.stages) + '<ul class="hl">';
      p.highlights.forEach(function (x) { h += "<li>" + rich(t(x)) + "</li>"; });
      h += '</ul><p><a class="more" href="' + href(p.id) + '">' + esc(t(S.ui.readMore)) + "</a></p></article>";
    });
    h += "</div>";

    h += '<h3 class="sub">' + esc(t(S.ui.otherWork)) + '</h3><dl class="other">';
    S.otherWork.forEach(function (w) {
      h += "<div><dt>" + esc(t(w.title)) + '<span class="when">' + esc(t(w.period)) + "</span></dt><dd>" + rich(t(w.text)) +
        (w.repo ? ' <a class="rlink" href="' + esc(w.repo.url) + '" rel="noopener">' + esc(t(S.ui.repoWord)) + "</a>" +
          (w.repo.private ? ' <span class="tag">' + esc(t(S.ui.privateTag)) + "</span>" : "") : "") + "</dd></div>";
    });
    h += "</dl></section>";

    h += '<section class="wrap block" id="sec-experience"><h2>' + esc(t(S.ui.experience)) + '</h2><ol class="timeline">';
    S.experience.forEach(function (e) {
      h += '<li><p class="when">' + esc(t(e.period)) + "</p><div><h3>" + esc(t(e.title)) + '</h3><p class="org">' + esc(t(e.org)) + "</p><ul>";
      e.points.forEach(function (x) { h += "<li>" + rich(t(x)) + "</li>"; });
      h += "</ul></div></li>";
    });
    h += "</ol></section>";

    var E = S.education;
    h += '<section class="wrap block" id="sec-education"><h2>' + esc(t(S.ui.education)) + "</h2>" +
      '<div class="edu"><h3>' + esc(t(E.school)) + '</h3><p class="org">' + esc(t(E.degree)) + ", " + esc(t(E.period)) + "</p>" +
      "<p>" + esc(t(E.gpa)) + "</p><p>" + esc(t(E.courses)) + "</p></div>" +
      '<h3 class="sub">' + esc(t(S.ui.awards)) + '</h3><ul class="awards">';
    S.awards.forEach(function (a) {
      h += '<li><span class="when">' + esc(a.year) + "</span><div><strong>" + esc(t(a.title)) + '</strong><p class="org">' + esc(t(a.org)) + "</p></div></li>";
    });
    h += "</ul></section>";

    h += '<section class="wrap block" id="sec-skills"><h2>' + esc(t(S.ui.skills)) + '</h2><dl class="skills">';
    S.skills.forEach(function (k) {
      h += "<div><dt>" + esc(t(k.stage)) + "</dt><dd>" + esc(k.items) + "</dd></div>";
    });
    h += "</dl></section>";

    h += '<section class="wrap block" id="sec-contact"><h2>' + esc(t(S.ui.contact)) + '</h2><dl class="contact">' +
      "<div><dt>" + esc(t(S.ui.email)) + '</dt><dd><span id="email-text" class="sel">' + esc(P.email) + "</span> " +
      '<button type="button" id="copy-email" class="copy">' + esc(t(S.ui.copy)) + "</button></dd></div>" +
      "<div><dt>" + esc(t(S.ui.github)) + '</dt><dd><a href="' + esc(P.github) + '" rel="noopener">' + esc(P.github.replace("https://", "")) + "</a></dd></div>" +
      "</dl></section>";
    return h;
  }

  function project(p) {
    var h = '<article class="wrap detail"><p class="crumb"><a href="' + href("projects") + '">' + esc(t(S.ui.back)) + "</a></p>" +
      "<h1>" + esc(t(p.title)) + '</h1><p class="lede">' + rich(t(p.summary)) + "</p>" + stageStrip(p.stages) +
      '<dl class="meta"><div><dt>' + esc(t(S.ui.period)) + "</dt><dd>" + esc(t(p.period)) + " · " + esc(t(p.context)) + "</dd></div>" +
      "<div><dt>" + esc(t(S.ui.tools)) + "</dt><dd>" + esc(p.tools) + "</dd></div></dl>";
    h += '<section class="facts"><h2>' + esc(t(S.ui.keyFacts)) + '</h2><div class="tscroll"><table>';
    p.facts.forEach(function (f) { h += '<tr><th scope="row">' + esc(t(f[0])) + "</th><td>" + rich(t(f[1])) + "</td></tr>"; });
    h += "</table></div></section>";
    p.sections.forEach(function (s) {
      h += '<section class="story"><h2>' + esc(t(s.h)) + "</h2>";
      s.body.forEach(function (b) { h += "<p>" + rich(t(b)) + "</p>"; });
      if (s.list) {
        h += "<ul>";
        s.list.forEach(function (x) { h += "<li>" + rich(t(x)) + "</li>"; });
        h += "</ul>";
      }
      h += "</section>";
    });
    if ((p.repos && p.repos.length) || p.report) {
      var anyPrivate = false;
      h += '<section class="source"><h2>' + esc(t(S.ui.repos)) + '</h2><ul class="links">';
      (p.repos || []).forEach(function (r) {
        if (r.private) anyPrivate = true;
        h += '<li><a href="' + esc(r.url) + '" rel="noopener">' + esc(r.name) + "</a>" +
          (r.private ? ' <span class="tag">' + esc(t(S.ui.privateTag)) + "</span>" : "") + "</li>";
      });
      if (p.report) h += '<li id="report-link" hidden><a href="' + esc(p.report.path) + '">' + esc(t(p.report.label)) + "</a></li>";
      h += "</ul>";
      if (anyPrivate) h += '<p class="note">' + esc(t(S.ui.privateNote)) + "</p>";
      h += "</section>";
    }
    var idx = S.projects.indexOf(p), nx = S.projects[(idx + 1) % S.projects.length];
    h += '<p class="next">' + esc(t(S.ui.next)) + ': <a href="' + href(nx.id) + '">' + esc(t(nx.title)) + "</a></p></article>";
    return h;
  }

  /* ---------- render ---------- */
  var lastView = null, lastLang = null;
  function headings() { return root.querySelectorAll("main h1, main h2, main h3"); }
  /* the heading nearest the top of the screen, so a language switch can return to the same place */
  function readingPosition() {
    var hs = headings(), best = -1;
    for (var i = 0; i < hs.length; i++) {
      if (hs[i].getBoundingClientRect().top <= 140) best = i; else break;
    }
    return best < 0 ? null : { index: best, top: hs[best].getBoundingClientRect().top };
  }
  function render() {
    var r = parseHash();
    var kept = null, keptY = window.scrollY;
    if (lastLang && lastLang !== r.lang) kept = readingPosition();
    lang = r.lang;
    document.documentElement.lang = lang;
    document.body.classList.toggle("ko", lang === "ko");
    var p = findProject(r.target);
    var isSection = SECTIONS.indexOf(r.target) >= 0;
    var view = p ? "p:" + p.id : "home";
    var body;
    if (p) body = project(p);
    else if (r.target && !isSection) body = '<div class="wrap block"><p>' + esc(t(S.ui.notFound)) + '</p><p><a href="' + href("") + '">' + esc(t(S.profile.name)) + "</a></p></div>";
    else body = home();
    root.innerHTML = header(!p) + "<main>" + body + "</main>" +
      '<footer class="wrap foot"><p>© ' + esc(t(S.profile.name)) + "</p></footer>";

    var btn = document.getElementById("copy-email");
    if (btn) btn.addEventListener("click", function () {
      var done = function () { btn.textContent = t(S.ui.copied); };
      var fallback = function () {
        var el = document.getElementById("email-text"), rg = document.createRange();
        rg.selectNodeContents(el);
        var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(rg);
      };
      try { navigator.clipboard.writeText(S.profile.email).then(done, fallback); } catch (e) { fallback(); }
    });

    var langSwitch = lastLang && lastLang !== lang && view === lastView;
    if (langSwitch) {
      var hs = headings();
      if (kept && hs[kept.index]) window.scrollBy(0, hs[kept.index].getBoundingClientRect().top - kept.top);
      else window.scrollTo(0, keptY);
    } else if (isSection) {
      var el = document.getElementById("sec-" + r.target);
      if (el) el.scrollIntoView();
    } else if (view !== lastView) {
      window.scrollTo(0, 0);
    }
    lastView = view; lastLang = lang;

    var rl = document.getElementById("report-link");
    if (rl && p && p.report && window.fetch) {
      fetch(p.report.path, { method: "HEAD" }).then(function (res) { if (res.ok) rl.hidden = false; }, function () {});
    }
  }

  window.addEventListener("hashchange", render);
  render();
})();
