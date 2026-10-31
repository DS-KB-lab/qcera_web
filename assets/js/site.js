/* 奇创纪元 Qichuang Era — site behaviour
   Language switching, header, scroll reveals, and the data-driven sections of
   each page (platforms, equipment, datasets, hospital map, partners, games).
   Content lives in data.js; visual effects live in fx.js. */
(function () {
  'use strict';
  var Q = window.QCERA || {};
  var root = document.documentElement;
  var body = document.body;
  var page = body.getAttribute('data-page') || '';
  var script = document.currentScript;
  var ROOT = script ? script.src.replace(/assets\/js\/site\.js.*$/, '') : '';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('js');

  /* ------------------------------------------------------------------
     Helpers
     ------------------------------------------------------------------ */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  /* bilingual text node: Chinese as content, English in data-en */
  function t(zh, en, tag, cls) {
    tag = tag || 'span';
    return '<' + tag + (cls ? ' class="' + cls + '"' : '') + (en !== undefined && en !== zh ? ' data-en="' + esc(en) + '"' : '') + '>' + esc(zh) + '</' + tag + '>';
  }
  function pad(n) { return String(n).padStart(2, '0'); }
  function lang() { return root.lang === 'en' ? 'en' : 'zh'; }
  function L(zh, en) { return lang() === 'en' ? en : zh; }

  /* ------------------------------------------------------------------
     Numbers shared by several pages, computed from data.js
     ------------------------------------------------------------------ */
  var cities = Q.cities || [];
  var located = cities.filter(function (c) { return !c.overseas && !c.unlocated; });
  var overseas = cities.filter(function (c) { return c.overseas; });
  var STATS = {
    institutions: cities.reduce(function (n, c) { return n + c.institutions.length; }, 0),
    cities: located.length,
    overseas: overseas.length,
    partners: (Q.universities || []).length,
    datasets: (Q.datasets || []).length,
    platforms: (Q.platforms || []).length,
    equipment: (Q.equipment || []).filter(function (e) { return !e.data; }).length,
    modules: (Q.platforms || []).reduce(function (n, p) { return n + p.zh.tags.length; }, 0),
    regions: Object.keys((Q.regions || {})).filter(function (k) { return k !== 'overseas'; }).length,
    games: (Q.games || []).length
  };
  function fillStats() {
    $$('[data-stat]').forEach(function (el) {
      var v = STATS[el.getAttribute('data-stat')];
      if (v === undefined) return;
      el.textContent = String(v);
      if (el.hasAttribute('data-count')) el.setAttribute('data-count', String(v));
    });
  }

  /* ------------------------------------------------------------------
     Language: Chinese in the markup, English in data-en / data-en-html /
     data-en-<attr>. The choice is remembered across pages.
     ------------------------------------------------------------------ */
  var zhHtml = new WeakMap(), zhAttr = new WeakMap();
  var ATTRS = ['aria-label', 'content', 'placeholder', 'title', 'alt'];
  function applyLang(l) {
    var en = l === 'en';
    if (window.QFX && window.QFX.settleText) window.QFX.settleText();
    root.lang = en ? 'en' : 'zh-CN';
    $$('[data-en]').forEach(function (el) {
      if (!('zh' in el.dataset)) el.dataset.zh = el.textContent;
      var next = en ? el.getAttribute('data-en') : el.dataset.zh;
      if (el.textContent !== next) el.textContent = next;
    });
    $$('[data-en-html]').forEach(function (el) {
      if (!zhHtml.has(el)) zhHtml.set(el, el.innerHTML);
      el.innerHTML = en ? el.getAttribute('data-en-html') : zhHtml.get(el);
    });
    ATTRS.forEach(function (a) {
      $$('[data-en-' + a + ']').forEach(function (el) {
        var store = zhAttr.get(el) || {};
        if (!(a in store)) { store[a] = el.getAttribute(a) || ''; zhAttr.set(el, store); }
        el.setAttribute(a, en ? el.getAttribute('data-en-' + a) : store[a]);
      });
    });
    var btn = $('#lang-toggle');
    if (btn) btn.setAttribute('aria-label', en ? '切换到中文' : 'Switch to English');
    document.dispatchEvent(new CustomEvent('qcera:lang', { detail: l }));
  }
  function setupLang() {
    var btn = $('#lang-toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var next = lang() === 'en' ? 'zh' : 'en';
      try { localStorage.setItem('qcera-lang', next); } catch (e) { /* private mode */ }
      applyLang(next);
    });
  }

  /* ------------------------------------------------------------------
     Header: glass on scroll, mobile menu
     ------------------------------------------------------------------ */
  function setupHeader() {
    var header = $('.site-header');
    var btn = $('.menu-btn');
    if (header) {
      var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 12); };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    if (!btn) return;
    function close() { body.classList.remove('menu-open'); btn.setAttribute('aria-expanded', 'false'); }
    btn.addEventListener('click', function () {
      var open = !body.classList.contains('menu-open');
      body.classList.toggle('menu-open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
    $$('.nav a').forEach(function (a) { a.addEventListener('click', close); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    window.addEventListener('resize', function () { if (window.innerWidth > 1060) close(); });
  }

  /* ------------------------------------------------------------------
     Cards follow the cursor with a soft light (CSS reads --mx / --my)
     ------------------------------------------------------------------ */
  function setupCardLight() {
    document.addEventListener('pointermove', function (e) {
      var card = e.target.closest && e.target.closest('.card');
      if (!card) return;
      var b = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - b.left) + 'px');
      card.style.setProperty('--my', (e.clientY - b.top) + 'px');
    }, { passive: true });
  }

  /* ------------------------------------------------------------------
     Scroll reveals and number count-ups
     ------------------------------------------------------------------ */
  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    if (!isFinite(target) || reduced) { return; }
    var start = null, dur = 1400;
    function step(ts) {
      if (start === null) start = ts;
      var k = Math.min(1, (ts - start) / dur), e = 1 - Math.pow(1 - k, 4);
      el.textContent = String(Math.round(target * e));
      if (k < 1) requestAnimationFrame(step); else el.textContent = String(target);
    }
    requestAnimationFrame(step);
  }
  var io = null;
  function observeReveals(scope) {
    var els = $$('.reveal:not(.is-in)', scope);
    var seen = new Map();
    els.forEach(function (el) {
      if (el.style.getPropertyValue('--i')) return;
      var n = seen.get(el.parentElement) || 0;
      seen.set(el.parentElement, n + 1);
      el.style.setProperty('--i', String(n % 8));
    });
    if (!io) { els.forEach(function (el) { el.classList.add('is-in'); }); return; }
    els.forEach(function (el) { io.observe(el); });
  }
  function setupReveals() {
    if ('IntersectionObserver' in window && !reduced) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          io.unobserve(en.target);
          en.target.classList.add('is-in');
          $$('[data-count]', en.target).forEach(countUp);
          if (en.target.hasAttribute('data-count')) countUp(en.target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    }
    observeReveals(document);
  }

  /* ------------------------------------------------------------------
     Footer clock (Beijing time)
     ------------------------------------------------------------------ */
  function setupClock() {
    var el = $('[data-clock]');
    if (!el) return;
    function tick() {
      var d = new Date(Date.now() + 8 * 3600e3);
      el.textContent = pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds());
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ------------------------------------------------------------------
     Lightbox shared by equipment and platform galleries
     ------------------------------------------------------------------ */
  var LB = null;
  function lightbox(items, index) {
    if (!LB) {
      LB = document.createElement('div');
      LB.className = 'lightbox';
      LB.setAttribute('role', 'dialog');
      LB.setAttribute('aria-modal', 'true');
      LB.innerHTML = '<figure><div class="lb-frame"><img alt=""></div><figcaption><span></span><strong></strong></figcaption></figure>' +
        '<button class="lb-btn lb-close" type="button" aria-label="关闭" data-en-aria-label="Close">✕</button>' +
        '<button class="lb-btn lb-prev" type="button" aria-label="上一张" data-en-aria-label="Previous">←</button>' +
        '<button class="lb-btn lb-next" type="button" aria-label="下一张" data-en-aria-label="Next">→</button>';
      body.appendChild(LB);
      LB.addEventListener('click', function (e) {
        if (e.target === LB || e.target.closest('.lb-close')) LB.close();
        else if (e.target.closest('.lb-prev')) LB.go(-1);
        else if (e.target.closest('.lb-next')) LB.go(1);
      });
      document.addEventListener('keydown', function (e) {
        if (!LB.classList.contains('is-open')) return;
        if (e.key === 'Escape') LB.close();
        if (e.key === 'ArrowLeft') LB.go(-1);
        if (e.key === 'ArrowRight') LB.go(1);
      });
      LB.go = function (d) { LB.i = (LB.i + d + LB.items.length) % LB.items.length; LB.show(); };
      LB.show = function () {
        var it = LB.items[LB.i];
        var img = $('img', LB);
        img.src = ROOT + it.img;
        img.alt = it.caption || '';
        $('figcaption span', LB).textContent = pad(LB.i + 1) + ' / ' + pad(LB.items.length);
        $('figcaption strong', LB).textContent = it.caption || '';
        var multi = LB.items.length > 1;
        $('.lb-prev', LB).hidden = !multi;
        $('.lb-next', LB).hidden = !multi;
      };
      LB.close = function () {
        LB.classList.remove('is-open');
        body.style.overflow = '';
        if (LB.opener) LB.opener.focus({ preventScroll: true });
      };
      applyLangTo(LB);
    }
    LB.items = items;
    LB.i = index || 0;
    LB.opener = document.activeElement;
    LB.show();
    LB.classList.add('is-open');
    body.style.overflow = 'hidden';
    $('.lb-close', LB).focus({ preventScroll: true });
  }
  function applyLangTo(el) {
    if (lang() !== 'en') return;
    $$('[data-en-aria-label]', el).forEach(function (n) { n.setAttribute('aria-label', n.getAttribute('data-en-aria-label')); });
  }

  /* ------------------------------------------------------------------
     Page: home
     ------------------------------------------------------------------ */
  function renderHome() {
    var strip = $('#pf-strip');
    if (strip && Q.platforms) {
      strip.innerHTML = Q.platforms.map(function (p, i) {
        return '<a class="pf-row reveal" href="platforms/#' + p.id + '" data-img="' + esc(p.img) + '">' +
          '<span class="n">P-' + pad(i + 1) + '</span>' +
          '<h3>' + t(p.zh.name, p.en.name) + '<small>' + esc(p.zh.subtitle) + '</small></h3>' +
          t(p.zh.desc, p.en.desc, 'p') +
          '<span class="dir-arrow" aria-hidden="true">→</span></a>';
      }).join('');
      var peek = document.createElement('div');
      peek.className = 'pf-peek specimen';
      peek.setAttribute('aria-hidden', 'true');
      peek.innerHTML = '<img alt="">';
      body.appendChild(peek);
      var peekImg = $('img', peek);
      strip.addEventListener('pointermove', function (e) {
        if (e.pointerType !== 'mouse') return;
        var row = e.target.closest('.pf-row');
        if (!row) { peek.classList.remove('is-on'); return; }
        var src = ROOT + row.getAttribute('data-img');
        if (peekImg.getAttribute('src') !== src) peekImg.setAttribute('src', src);
        peek.style.left = (e.clientX + 170) + 'px';
        peek.style.top = e.clientY + 'px';
        peek.classList.add('is-on');
      });
      strip.addEventListener('pointerleave', function () { peek.classList.remove('is-on'); });
    }
    var mini = $('#net-mini');
    if (mini) buildMap(mini, { interactive: false });
    renderMarquee($('#home-marquee'), Q.universities || [], 1);
  }

  /* ------------------------------------------------------------------
     Partner logo pieces
     ------------------------------------------------------------------ */
  /* Light webp copies in assets/img/logos/; a logo added later without one falls back to the original file */
  function logoTile(u, eager) {
    var orig = ROOT + 'university_logos/' + esc(u.logo);
    var thumb = ROOT + 'assets/img/logos/' + esc(u.logo.replace(/\.[a-z]+$/i, '')) + '.webp';
    return '<span class="logo-tile' + (u.dark ? ' on-dark' : '') + '"><img src="' + thumb + '" onerror="this.onerror=null;this.src=\'' + orig + '\'" alt="' + esc(u.zh) + '" data-en-alt="' + esc(u.en) + '"' + (eager ? '' : ' loading="lazy"') + ' decoding="async"></span>';
  }
  function renderMarquee(el, list, rows) {
    if (!el || !list.length) return;
    var html = '';
    for (var r = 0; r < rows; r++) {
      var part = rows === 1 ? list : list.filter(function (_, i) { return i % rows === r; });
      var tiles = part.map(function (u) { return logoTile(u, true); }).join('');
      html += '<div class="marquee' + (r % 2 ? ' reverse' : '') + '" aria-hidden="' + (r ? 'true' : 'false') + '"><div class="marquee-track" style="--dur:' + Math.round(part.length * 3.2) + 's">' + tiles + tiles.replace(/<img /g, '<img aria-hidden="true" ') + '</div></div>';
    }
    el.innerHTML = html;
  }

  /* ------------------------------------------------------------------
     Page: platforms
     ------------------------------------------------------------------ */
  // Scientific figures keep their own proportions so legends are never cropped.
  function figRatio(p) {
    var m = p.fig && /_(\d+)x(\d+)\./.exec(p.img);
    return m ? ' style="aspect-ratio:' + m[1] + '/' + m[2] + '"' : '';
  }

  function renderPlatforms() {
    var box = $('#pf-blocks'), index = $('#pf-index');
    if (!box || !Q.platforms) return;
    index.innerHTML = Q.platforms.map(function (p, i) {
      return '<a href="#' + p.id + '"><span>' + pad(i + 1) + '</span>' + t(p.zh.name, p.en.name) + '</a>';
    }).join('');
    box.innerHTML = Q.platforms.map(function (p, i) {
      var tags = p.zh.tags.map(function (tag, j) { return t(tag, p.en.tags[j], 'li'); }).join('');
      var thumbs = p.gallery.map(function (src, j) {
        return '<button class="specimen" type="button" data-pf="' + i + '" data-g="' + j + '" aria-label="查看大图 ' + (j + 1) + '" data-en-aria-label="View image ' + (j + 1) + '"><img src="' + ROOT + esc(src) + '" alt="" loading="lazy" decoding="async"></button>';
      }).join('');
      return '<article class="pf-block" id="' + p.id + '">' +
        '<div class="pf-block-head"><span class="code">PLATFORM · ' + pad(i + 1) + ' / ' + pad(Q.platforms.length) + '</span></div>' +
        '<h2>' + t(p.zh.name, p.en.name) + '</h2>' +
        '<p class="sub">' + esc(p.zh.subtitle) + '</p>' +
        t(p.zh.desc, p.en.desc, 'p', 'desc') +
        '<div class="photo pf-hero-img reveal' + (p.fig ? ' is-figure' : '') + '"' + figRatio(p) + '><img src="' + ROOT + esc(p.img) + '" alt="' + esc(p.zh.name) + '" data-en-alt="' + esc(p.en.name) + '" loading="' + (i ? 'lazy' : 'eager') + '" decoding="async"><div class="hud"><i></i><i></i><i></i><i></i></div></div>' +
        '<div class="pf-grid">' +
        '<div class="card pf-tags reveal"><h3>' + t('技术模块 · ' + p.zh.tags.length, 'Modules · ' + p.en.tags.length) + '</h3><ol>' + tags + '</ol></div>' +
        '<div class="card pf-gallery reveal"><h3>' + t('平台影像', 'Platform imagery') + '</h3><div class="pf-thumbs">' + thumbs + '</div>' +
        t('图片来自公司宣传册，点击可查看大图。', 'Images from the company brochure. Click to enlarge.', 'p') + '</div>' +
        '</div></article>';
    }).join('');
    box.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-pf]');
      if (!b) return;
      var p = Q.platforms[+b.getAttribute('data-pf')];
      var items = p.gallery.map(function (src) { return { img: src, caption: L(p.zh.name, p.en.name) }; });
      lightbox(items, +b.getAttribute('data-g'));
    });
    // scrollspy
    if ('IntersectionObserver' in window) {
      var links = $$('a', index);
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          links.forEach(function (a) {
            var on = a.getAttribute('href') === '#' + en.target.id;
            a.classList.toggle('is-current', on);
            if (on && index.scrollWidth > index.clientWidth) index.scrollTo({ left: a.offsetLeft - 20, behavior: reduced ? 'auto' : 'smooth' });
          });
        });
      }, { rootMargin: '-40% 0px -55% 0px' });
      $$('.pf-block', box).forEach(function (b) { spy.observe(b); });
    }
  }

  /* ------------------------------------------------------------------
     Page: equipment
     ------------------------------------------------------------------ */
  function renderEquipment() {
    var box = $('#eq-grid');
    if (!box || !Q.equipment) return;
    var n = 0;
    box.innerHTML = Q.equipment.map(function (e, i) {
      var code = e.data ? 'DATA' : 'EQ-' + pad(++n);
      return '<button class="card eq-card reveal' + (e.wide ? ' wide' : '') + '" type="button" data-i="' + i + '">' +
        '<span class="eq-media"><span class="specimen"><img src="' + ROOT + esc(e.img) + '" alt="' + esc(e.zh) + '" data-en-alt="' + esc(e.en) + '" loading="lazy" decoding="async"></span></span>' +
        '<span class="eq-zoom" aria-hidden="true">⤢</span>' +
        '<span class="eq-cap"><span>' + code + '</span>' + t(e.zh, e.en, 'strong') + '</span></button>';
    }).join('');
    box.addEventListener('click', function (ev) {
      var b = ev.target.closest('.eq-card');
      if (!b) return;
      lightbox(Q.equipment.map(function (e) { return { img: e.img, caption: L(e.zh, e.en) }; }), +b.getAttribute('data-i'));
    });
  }

  /* ------------------------------------------------------------------
     Page: datasets
     ------------------------------------------------------------------ */
  function renderDatasets() {
    var box = $('#ds-list');
    if (!box || !Q.datasets) return;
    box.innerHTML = Q.datasets.map(function (d, i) {
      var stats = d.zh.stats.map(function (s, j) {
        var e = d.en.stats[j] || s;
        return '<div>' + t(s[0], e[0], 'strong') + t(s[1], e[1]) + '</div>';
      }).join('');
      return '<article class="card ds-card reveal" id="' + d.id + '">' +
        '<div><div class="ds-head"><span class="code">DS-' + pad(i + 1) + '</span>' + t('研究资产', 'Research asset') + '</div>' +
        t(d.zh.name, d.en.name, 'h3') + t(d.zh.tagline, d.en.tagline, 'p', 'tagline') + t(d.zh.summary, d.en.summary, 'p', 'summary') + '</div>' +
        '<div class="ds-stats">' + stats + '</div></article>';
    }).join('');
  }

  /* ------------------------------------------------------------------
     Hospital network map (hospitals page, and a quiet version on home)
     ------------------------------------------------------------------ */
  var SVGNS = 'http://www.w3.org/2000/svg';
  /* Spherical Mercator fitted to the three calibration anchors in cn.svg */
  var PROJ = { xs: 851.7922837322691, xo: -1048.0940462637232, ys: -851.8097364908117, yo: 979.3537761260916 };
  function project(lng, lat) {
    var r = Math.PI / 180;
    return { x: PROJ.xs * lng * r + PROJ.xo, y: PROJ.ys * Math.log(Math.tan(Math.PI / 4 + lat * r / 2)) + PROJ.yo };
  }
  /* China land mass sampled on a hex grid (step 8 in map units), run-length encoded per row */
  var DOTS = ';;;;;94-98;93-101;92-101;93-102;93-102;93-103;92-103;92-104;91-103;91-104;90-104;91-105;89-104;85-107;85-108;30-31,85-110;30-31,84-110;28-33,84-111,118;27-34,83-86,88-110,115-117;28-36,90-111,115-118;28-36,90-117;23,28-36,92-117;22-37,91-116;23-37,87-117;22-37,85-116;22-37,85-116;22-36,83-115;19-38,81-113,115;18-42,76-78,80-111;18-44,76-112;18-45,76-111;19-46,77-112;19-46,76-111;19-47,75-112;18-47,74-110;18-57,68,72-109;18-59,66-107;16-62,65-106;14-103,106;14-102;11-92,95-101;8-92,96-100;6-90,95-98;6-90,95-96;5-89,95;6-87,94;7-86;8-87;8-88;9-89,92-95;7-95;10-94;10-92;10-15,17-91;12-13,17-90;18-90;17-89;17-91;16-91;16-92;15-92;17-93;14,16-93;15-94;15-93;15-94;17-94;18-93;19,21-93;23-94;25-45,47-94;26-43,48-94;27-41,47-93;29-34,38-40,51-93;51-92;52-92;52-91;52-90;52-90;51-91;50-89,94;50-89,94;50-87,92-94;50,52-86,92-94;52-85,92-93;54-63,66-85,92-93;53-58,61,67-80,92;53-57,67-79,93;54-57,68-76;57,73-74;72;73;72-74;71-74;70-73;71-73;;;;;';
  function el(tag, attrs, parent) {
    var n = document.createElementNS(SVGNS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function dotRows() {
    var out = [], rows = (window.QCERA_DOTS || DOTS).split(';');
    var step = 8, rs = step * 0.866;
    rows.forEach(function (row, r) {
      if (!row) return;
      var y = step / 2 + r * rs, off = r % 2 ? step / 2 : 0;
      row.split(',').forEach(function (run) {
        var ab = run.split('-'), a = +ab[0], b = ab.length > 1 ? +ab[1] : a;
        for (var c = a; c <= b; c++) out.push(step / 2 + off + c * step, y);
      });
    });
    return out;
  }
  function buildMap(svg, opts) {
    opts = opts || {};
    var hub = located.filter(function (c) { return c.id === 'beijing'; })[0] || located[0];
    var pts = {};
    located.forEach(function (c) { pts[c.id] = project(c.lng, c.lat); });
    svg.textContent = '';
    var defs = el('defs', {}, svg);
    var glow = el('radialGradient', { id: svg.id + '-glow' }, defs);
    el('stop', { offset: '0', 'stop-color': 'rgb(110,168,255)', 'stop-opacity': '.28' }, glow);
    el('stop', { offset: '1', 'stop-color': 'rgb(110,168,255)', 'stop-opacity': '0' }, glow);
    el('image', { class: 'provinces', href: ROOT + 'assets/data/cn.svg', x: 0, y: 0, width: 1000, height: 738, preserveAspectRatio: 'xMidYMid meet' }, svg);
    // dots, brighter near partner cities
    var d = dotRows(), paths = ['', '', ''];
    var keys = located.map(function (c) { return pts[c.id]; });
    for (var i = 0; i < d.length; i += 2) {
      var x = d[i], y = d[i + 1], best = 1e9;
      for (var k = 0; k < keys.length; k++) {
        var dx = x - keys[k].x, dy = y - keys[k].y, dd = dx * dx + dy * dy;
        if (dd < best) best = dd;
      }
      var lvl = best < 26 * 26 ? 2 : best < 64 * 64 ? 1 : 0;
      paths[lvl] += 'M' + x.toFixed(1) + ' ' + y.toFixed(1) + 'h0';
    }
    var dots = el('g', { class: 'dots', 'aria-hidden': 'true' }, svg);
    el('path', { d: paths[0], stroke: 'rgba(255,255,255,.16)', 'stroke-width': 2.6 }, dots);
    el('path', { d: paths[1], stroke: 'rgba(140,184,255,.42)', 'stroke-width': 2.8 }, dots);
    el('path', { d: paths[2], stroke: 'rgba(170,205,255,.85)', 'stroke-width': 3 }, dots);
    // glow pools under each city
    var pools = el('g', { 'aria-hidden': 'true' }, svg);
    located.forEach(function (c) {
      var p = pts[c.id];
      el('circle', { cx: p.x, cy: p.y, r: 22 + Math.sqrt(c.institutions.length) * 9, fill: 'url(#' + svg.id + '-glow)' }, pools);
    });
    // arcs from Beijing to every partner city
    var arcs = el('g', { class: 'arcs', 'aria-hidden': 'true' }, svg);
    var h = pts[hub.id];
    located.forEach(function (c, idx) {
      if (c.id === hub.id) return;
      var p = pts[c.id];
      var mx = (h.x + p.x) / 2, my = (h.y + p.y) / 2;
      var dx = p.x - h.x, dy = p.y - h.y, len = Math.sqrt(dx * dx + dy * dy) || 1;
      var bend = Math.min(90, len * 0.28);
      var cx = mx + (dy / len) * bend * (dx > 0 ? -1 : 1), cy = my - Math.abs(dx / len) * bend * 0.6 - bend * 0.35;
      var gid = svg.id + '-g' + idx;
      var g = el('linearGradient', { id: gid, gradientUnits: 'userSpaceOnUse', x1: h.x, y1: h.y, x2: p.x, y2: p.y }, defs);
      el('stop', { offset: '0', 'stop-color': '#ff7a3d', 'stop-opacity': '.9' }, g);
      el('stop', { offset: '1', 'stop-color': '#6ea8ff', 'stop-opacity': '.9' }, g);
      var dPath = 'M' + h.x.toFixed(1) + ' ' + h.y.toFixed(1) + 'Q' + cx.toFixed(1) + ' ' + cy.toFixed(1) + ' ' + p.x.toFixed(1) + ' ' + p.y.toFixed(1);
      el('path', { class: 'arc', d: dPath, stroke: 'url(#' + gid + ')', 'data-city': c.id }, arcs);
      if (!reduced) el('path', { class: 'arc-flow', d: dPath, stroke: 'url(#' + gid + ')', style: 'animation-delay:-' + (idx * 0.37 % 3.6).toFixed(2) + 's' }, arcs);
    });
    // city nodes
    var nodes = el('g', { class: 'nodes' }, svg);
    located.forEach(function (c) {
      var p = pts[c.id], n = c.institutions.length;
      var attrs = { class: 'node' + (c.id === hub.id ? ' hub' : ''), transform: 'translate(' + p.x.toFixed(2) + ' ' + p.y.toFixed(2) + ')', 'data-city': c.id };
      if (opts.interactive) { attrs.tabindex = '0'; attrs.role = 'button'; }
      var g = el('g', attrs, nodes);
      var hr = 5.5 + Math.sqrt(n) * 2.2;
      el('circle', { class: 'halo', r: hr.toFixed(1) }, g);
      if (!reduced) el('circle', { class: 'pulse', r: hr.toFixed(1), style: 'animation-delay:-' + ((p.x * 7 % 28) / 10).toFixed(1) + 's' }, g);
      el('circle', { class: 'core', r: c.id === hub.id ? 4.6 : 3.4 }, g);
      if (opts.interactive) {
        var lbl = el('g', { class: 'lbl' }, g);
        el('rect', { x: -40, y: -hr - 34, width: 80, height: 26, rx: 13 }, lbl);
        el('text', { x: 0, y: -hr - 16.5 }, lbl);
        var title = el('title', {}, g);
        g.__label = function () {
          var txt = L(c.zh, c.en) + ' · ' + n;
          lbl.querySelector('text').textContent = txt;
          title.textContent = L(c.zh + ' · ' + n + ' 家合作机构', c.en + ' · ' + n + (n === 1 ? ' institution' : ' institutions'));
          g.setAttribute('aria-label', title.textContent);
          var w = 0;
          try { w = lbl.querySelector('text').getComputedTextLength(); } catch (e) { /* not rendered yet */ }
          if (!w) w = txt.length * 9;
          var r = lbl.querySelector('rect');
          r.setAttribute('x', (-w / 2 - 12).toFixed(1));
          r.setAttribute('width', (w + 24).toFixed(1));
        };
        g.__label();
      }
    });
    if (opts.interactive) document.addEventListener('qcera:lang', function () { $$('.node', svg).forEach(function (g) { g.__label && g.__label(); }); });
    return { svg: svg, pts: pts };
  }

  function renderHospitals() {
    var svg = $('#net-svg'), list = $('#net-list');
    if (!svg || !list) return;
    var map = buildMap(svg, { interactive: true });
    var state = { region: 'all', q: '', selected: null };
    var regionOrder = ['north', 'northeast', 'east', 'central', 'south', 'southwest', 'northwest', 'overseas'];
    var tabs = $('#net-tabs'), search = $('#net-q'), tip = $('#net-tip'), mapBox = $('.net-map');

    // overseas & unlocated cards under the map
    var extra = $('#net-overseas');
    if (extra) {
      extra.innerHTML = cities.filter(function (c) { return c.overseas || c.unlocated; }).map(function (c) {
        var label = c.overseas ? t('海外合作 · ' + c.zh, 'International · ' + c.en, 'small') : t(Q.regions[c.region][0] + ' · 未标注城市', Q.regions[c.region][1] + ' · city not specified', 'small');
        return '<button class="net-chip" type="button" data-city="' + c.id + '">' + label +
          '<strong>' + c.institutions.map(function (x) { return t(x[0], x[1]); }).join(' / ') + '</strong></button>';
      }).join('');
      extra.addEventListener('click', function (e) {
        var b = e.target.closest('[data-city]');
        if (b) select(b.getAttribute('data-city'), true);
      });
    }

    function regionCount(key) {
      return cities.filter(function (c) { return key === 'all' || c.region === key; }).reduce(function (n, c) { return n + c.institutions.length; }, 0);
    }
    tabs.innerHTML = '<button type="button" data-r="all" aria-pressed="true">' + t('全部', 'All') + '<b>' + STATS.institutions + '</b></button>' +
      regionOrder.filter(function (k) { return Q.regions[k]; }).map(function (k) {
        return '<button type="button" data-r="' + k + '" aria-pressed="false">' + t(Q.regions[k][0], Q.regions[k][1]) + '<b>' + regionCount(k) + '</b></button>';
      }).join('');
    tabs.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-r]');
      if (!b) return;
      state.region = b.getAttribute('data-r');
      $$('button', tabs).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      draw();
    });
    search.addEventListener('input', function () { state.q = search.value.trim().toLowerCase(); draw(); });

    function matches(inst) { return !state.q || inst[0].toLowerCase().indexOf(state.q) > -1 || inst[1].toLowerCase().indexOf(state.q) > -1; }
    function hl(s) {
      if (!state.q) return esc(s);
      var i = s.toLowerCase().indexOf(state.q);
      if (i < 0) return esc(s);
      return esc(s.slice(0, i)) + '<mark>' + esc(s.slice(i, i + state.q.length)) + '</mark>' + esc(s.slice(i + state.q.length));
    }
    function draw() {
      var en = lang() === 'en';
      var visible = {};
      var html = '';
      regionOrder.forEach(function (rk) {
        if (state.region !== 'all' && state.region !== rk) return;
        var group = cities.filter(function (c) { return c.region === rk; });
        var inner = '', total = 0;
        group.forEach(function (c) {
          var insts = c.institutions.filter(matches);
          if (!insts.length) return;
          visible[c.id] = true;
          total += insts.length;
          var name = c.unlocated ? (en ? Q.regions[rk][1] + ' (city not specified)' : Q.regions[rk][0] + '（未标注城市）') : (en ? c.en : c.zh);
          inner += '<button class="net-city' + (state.selected === c.id ? ' is-selected' : '') + '" type="button" id="city-' + c.id + '" data-city="' + c.id + '">' +
            '<span class="net-city-head"><strong>' + esc(name) + (c.overseas ? (en ? ' · Malaysia' : ' · 马来西亚') : '') + '</strong><span>' + insts.length + '</span></span>' +
            '<ul>' + insts.map(function (x) { return '<li>' + hl(en ? x[1] : x[0]) + '</li>'; }).join('') + '</ul></button>';
        });
        if (!inner) return;
        html += '<div class="net-region"><span>' + esc(en ? Q.regions[rk][1] : Q.regions[rk][0]) + '</span><span>' + total + (en ? ' inst.' : ' 家') + '</span></div>' + inner;
      });
      list.innerHTML = html || '<p class="net-empty">' + (en ? 'No institution matches “' + esc(search.value) + '”.' : '没有找到与“' + esc(search.value) + '”匹配的机构。') + '</p>';
      var filtering = state.region !== 'all' || !!state.q;
      svg.classList.toggle('has-filter', filtering);
      $$('.node', svg).forEach(function (n) {
        var id = n.getAttribute('data-city');
        n.classList.toggle('is-dim', filtering && !visible[id]);
      });
      $$('.arc', svg).forEach(function (a) { a.classList.toggle('is-on', filtering && !!visible[a.getAttribute('data-city')]); });
      $$('.net-chip', extra).forEach(function (c) { c.hidden = filtering && !visible[c.getAttribute('data-city')]; });
    }
    function select(id, fromMap) {
      state.selected = state.selected === id && !fromMap ? null : id;
      $$('.node', svg).forEach(function (n) { n.classList.toggle('is-selected', n.getAttribute('data-city') === state.selected); });
      $$('.net-chip', extra).forEach(function (n) { n.classList.toggle('is-selected', n.getAttribute('data-city') === state.selected); });
      $$('.net-city', list).forEach(function (n) { n.classList.toggle('is-selected', n.getAttribute('data-city') === state.selected); });
      var item = $('#city-' + id);
      if (!item && fromMap) {
        // the city may be filtered out: reset filters so it can be shown
        state.region = 'all'; state.q = ''; search.value = '';
        $$('button', tabs).forEach(function (x) { x.setAttribute('aria-pressed', String(x.getAttribute('data-r') === 'all')); });
        draw();
        item = $('#city-' + id);
      }
      if (item && fromMap) {
        list.scrollTo({ top: item.offsetTop - list.offsetTop - 8, behavior: reduced ? 'auto' : 'smooth' });
        if (window.innerWidth <= 1000) $('.net-panel').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      }
    }
    list.addEventListener('click', function (e) {
      var b = e.target.closest('.net-city');
      if (b) select(b.getAttribute('data-city'), false);
    });
    list.addEventListener('pointerover', function (e) {
      var b = e.target.closest('.net-city');
      $$('.node', svg).forEach(function (n) { n.classList.toggle('is-hot', !!b && n.getAttribute('data-city') === b.getAttribute('data-city')); });
      var hot = b && $('.node[data-city="' + b.getAttribute('data-city') + '"]', svg);
      if (hot) showTip(hot); else hideTip();
    });
    list.addEventListener('pointerleave', hideTip);
    svg.addEventListener('click', function (e) {
      var n = e.target.closest('.node');
      if (n) select(n.getAttribute('data-city'), true);
    });
    svg.addEventListener('keydown', function (e) {
      var n = e.target.closest('.node');
      if (n && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); select(n.getAttribute('data-city'), true); }
    });
    function showTip(node) {
      var c = cities.filter(function (x) { return x.id === node.getAttribute('data-city'); })[0];
      if (!c || !tip) return;
      var en = lang() === 'en';
      var names = c.institutions.slice(0, 4).map(function (x) { return '<li>' + esc(en ? x[1] : x[0]) + '</li>'; }).join('');
      var more = c.institutions.length > 4 ? '<li>' + (en ? '+ ' + (c.institutions.length - 4) + ' more' : '另有 ' + (c.institutions.length - 4) + ' 家') + '</li>' : '';
      tip.innerHTML = '<strong>' + esc(en ? c.en : c.zh) + '<span>' + c.institutions.length + (en ? ' INST.' : ' 家') + '</span></strong><ul>' + names + more + '</ul>';
      var b = node.getBoundingClientRect(), m = mapBox.getBoundingClientRect();
      var x = b.left - m.left + b.width / 2 + 18, y = b.top - m.top + b.height / 2 + 14;
      if (x + 260 > m.width) x = b.left - m.left - 270;
      if (y + 150 > m.height) y = m.height - 160;
      tip.style.left = x + 'px';
      tip.style.top = y + 'px';
      tip.classList.add('is-on');
    }
    function hideTip() { if (tip) tip.classList.remove('is-on'); }
    svg.addEventListener('pointerover', function (e) { var n = e.target.closest('.node'); if (n) showTip(n); });
    svg.addEventListener('pointerout', function (e) { var n = e.target.closest('.node'); if (n && !n.contains(e.relatedTarget)) hideTip(); });
    svg.addEventListener('focusin', function (e) { var n = e.target.closest('.node'); if (n) showTip(n); });
    svg.addEventListener('focusout', hideTip);
    document.addEventListener('qcera:lang', function () { draw(); hideTip(); });
    draw();
  }

  /* ------------------------------------------------------------------
     Page: partners
     ------------------------------------------------------------------ */
  var AREAS = [['all', '全部', 'All'], ['cn', '中国', 'China'], ['asia', '亚洲其他', 'Rest of Asia'], ['eu', '欧洲', 'Europe'], ['na', '北美', 'North America']];
  function renderPartners() {
    var grid = $('#pt-grid'), filter = $('#pt-filter'), count = $('#pt-count');
    var U = Q.universities || [];
    if (!grid) return;
    function n(a) { return a === 'all' ? U.length : U.filter(function (u) { return u.area === a; }).length; }
    filter.innerHTML = AREAS.map(function (a, i) {
      return '<button type="button" data-a="' + a[0] + '" aria-pressed="' + (i === 0) + '">' + t(a[1], a[2]) + '<b>' + n(a[0]) + '</b></button>';
    }).join('');
    grid.innerHTML = U.map(function (u) {
      var area = AREAS.filter(function (a) { return a[0] === u.area; })[0];
      return '<div class="pt-item" data-area="' + u.area + '">' + logoTile(u) + t(u.zh, u.en) + '<small>' + esc(area[2]) + '</small></div>';
    }).join('');
    function setCount(a) {
      var k = n(a);
      count.innerHTML = lang() === 'en' ? 'Showing ' + k + ' / ' + U.length : '显示 ' + k + ' / ' + U.length;
    }
    var current = 'all';
    filter.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-a]');
      if (!b) return;
      current = b.getAttribute('data-a');
      $$('button', filter).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      $$('.pt-item', grid).forEach(function (it) { it.hidden = current !== 'all' && it.getAttribute('data-area') !== current; });
      setCount(current);
    });
    document.addEventListener('qcera:lang', function () { setCount(current); });
    setCount('all');
    var matrix = $('#pt-matrix');
    if (matrix) {
      var max = Math.max.apply(null, AREAS.slice(1).map(function (a) { return n(a[0]); }));
      matrix.innerHTML = AREAS.slice(1).map(function (a) {
        return '<div class="card reveal"><strong data-count="' + n(a[0]) + '">' + n(a[0]) + '</strong>' + t(a[1], a[2]) +
          '<div class="bar"><i style="--w:' + Math.round(n(a[0]) / max * 100) + '%"></i></div></div>';
      }).join('');
    }
    renderMarquee($('#pt-marquee'), U, 2);
  }

  /* ------------------------------------------------------------------
     Page: games — one section per game: a phone frame that loads the web
     build on demand (full screen on phones), details and screenshots
     ------------------------------------------------------------------ */
  var HEART_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.3-9.4C1.5 7.8 3.6 4.5 7 4.5c2 0 3.4 1.1 5 3 1.6-1.9 3-3 5-3 3.4 0 5.5 3.3 4.3 6.6-1.8 4.8-9.3 9.4-9.3 9.4z" fill="currentColor"/></svg>';
  var PLAY_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" fill="currentColor"/></svg>';
  function renderGames() {
    var box = $('#gm-list');
    if (!box || !Q.games) return;
    box.innerHTML = Q.games.map(function (g, i) {
      var z = g.zh, en = g.en, dir = g.logo.replace(/[^/]+$/, '');
      var chips = z.genres.map(function (s, j) { return t(s, en.genres[j], 'span', 'chip'); }).join('');
      var facts = g.facts.map(function (f) {
        return '<div class="gm-fact"><strong>' + esc(f[0]) + '</strong>' + t(f[1], f[2]) + '</div>';
      }).join('');
      var rules = z.rules.map(function (s, j) { return '<li><span>' + pad(j + 1) + '</span>' + t(s, en.rules[j]) + '</li>'; }).join('');
      var feats = z.features.map(function (f, j) {
        var fe = en.features[j];
        return '<li>' + t(f[0], fe[0], 'strong') + t(f[1], fe[1], 'span') + '</li>';
      }).join('');
      var shots = g.shots.map(function (s, j) {
        return '<button class="gm-shot" type="button" data-i="' + j + '">' +
          '<span class="gm-shot-img"><img src="' + ROOT + dir + s[0] + '-s.webp" alt="' + esc(s[1]) + '" data-en-alt="' + esc(s[2]) + '" width="390" height="844" loading="lazy" decoding="async"></span>' +
          '<span class="gm-shot-cap"><span>' + pad(j + 1) + '</span>' + t(s[1], s[2]) + '</span></button>';
      }).join('');
      var c = g.charity, charity = '';
      if (c) {
        charity = '<div class="gm-charity" id="' + g.id + '-charity">' +
          '<div class="gm-charity-copy">' +
            '<span class="gm-charity-label">' + HEART_ICON + t(c.zh.label, c.en.label) + '</span>' +
            t(c.zh.title, c.en.title, 'h3', 'gm-charity-title') +
            t(c.zh.text, c.en.text, 'p', 'gm-charity-text') +
            t(c.zh.fund, c.en.fund, 'p', 'gm-charity-fund') +
            t(c.zh.status, c.en.status, 'p', 'gm-charity-status') +
          '</div>' +
          '<button class="gm-charity-shot" type="button" data-i="' + c.shot + '" aria-label="查看游戏里的爱心粮仓" data-en-aria-label="See the Cat Food Bank in the game">' +
            '<img src="' + ROOT + dir + g.shots[c.shot][0] + '-s.webp" alt="" width="390" height="844" loading="lazy" decoding="async"></button>' +
        '</div>';
      }
      var play = ROOT + g.play;
      return '<section class="section gm-section" id="' + g.id + '" data-game="' + i + '"><div class="wrap">' +
        '<div class="gm-feature">' +
          '<div class="gm-stage">' +
            '<div class="gm-device reveal"><div class="gm-screen">' +
              '<img class="gm-poster" src="' + ROOT + esc(g.poster) + '" alt="" width="390" height="844" decoding="async">' +
              '<button class="gm-play" type="button" data-play aria-label="开始试玩《' + esc(z.name) + '》" data-en-aria-label="Play ' + esc(en.name) + '">' +
                '<span class="gm-play-icon">' + PLAY_ICON + '</span>' + t('点击开始试玩', 'Tap to play', 'span', 'gm-play-label') + '</button>' +
              '<span class="gm-loading" aria-hidden="true"><i></i>' + t('游戏加载中', 'Loading the game') + '</span>' +
            '</div></div>' +
            '<div class="gm-device-bar"><span class="gm-bar-label"><span class="live"></span>WEB · ' + esc(g.id.toUpperCase()) + '</span>' +
              '<span class="gm-tools"><button class="gm-tool" type="button" data-reload hidden>' + t('↻ 重新载入', '↻ Reload') + '</button>' +
              '<a class="gm-tool" href="' + play + '" target="_blank" rel="noopener">' + t('全屏打开 ↗', 'Full screen ↗') + '</a></span></div>' +
          '</div>' +
          '<div class="gm-info">' +
            '<span class="eyebrow">GAME ' + pad(i + 1) + ' · ' + t(z.kind, en.kind) + '</span>' +
            '<h2 class="gm-title"><img class="gm-logo" src="' + ROOT + esc(g.logo) + '" alt="' + esc(z.name) + '" data-en-alt="' + esc(en.name + ' (' + z.name + ')') + '" width="960" height="340" decoding="async"><span class="gm-name-en">' + esc(en.name) + '</span></h2>' +
            t(z.tagline, en.tagline, 'p', 'gm-tagline') +
            t(z.desc, en.desc, 'p', 'gm-desc') +
            charity +
            '<div class="chips">' + chips + '</div>' +
            '<div class="gm-facts">' + facts + '</div>' +
            '<div class="gm-block">' + t('怎么玩', 'How to play', 'h3') + '<ol class="gm-rules">' + rules + '</ol></div>' +
            '<div class="gm-block">' + t('游戏内容', 'What’s inside', 'h3') + '<ul class="gm-features">' + feats + '</ul></div>' +
            '<div class="actions"><button class="btn btn-primary" type="button" data-play>' + t('开始试玩', 'Play now') + '<span class="arr" aria-hidden="true">▶</span></button>' +
              '<a class="btn" href="' + play + '" target="_blank" rel="noopener">' + t('全屏打开', 'Open full screen') + '<span class="arr out" aria-hidden="true">↗</span></a></div>' +
            t(z.platform, en.platform, 'p', 'gm-platform') +
            t(z.note, en.note, 'p', 'gm-note') +
          '</div>' +
        '</div>' +
        '<div class="gm-gallery">' +
          '<div class="gm-gallery-head"><span class="eyebrow">' + t('游戏画面', 'Screenshots') + '</span>' +
            '<span class="gm-arrows"><button class="lb-btn" type="button" data-scroll="-1" aria-label="向前" data-en-aria-label="Scroll back">←</button>' +
            '<button class="lb-btn" type="button" data-scroll="1" aria-label="向后" data-en-aria-label="Scroll forward">→</button></span></div>' +
          '<div class="gm-shots">' + shots + '</div>' +
        '</div>' +
      '</div></section>';
    }).join('');

    var small = window.matchMedia('(max-width: 760px), (pointer: coarse)');
    function start(sec, g) {
      var url = ROOT + g.play;
      if (small.matches) { location.href = url; return; }
      var screen = $('.gm-screen', sec);
      var frame = $('iframe', screen);
      var device = $('.gm-device', sec);
      var r = device.getBoundingClientRect();
      if (r.top < 0 || r.bottom > window.innerHeight) device.scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' });
      if (frame) { frame.focus(); return; }
      frame = document.createElement('iframe');
      frame.className = 'gm-frame';
      frame.title = L(g.zh.name, g.en.name);
      frame.setAttribute('allow', 'autoplay; fullscreen');
      frame.addEventListener('load', function () { screen.classList.add('is-loaded'); frame.focus(); });
      frame.src = url;
      screen.appendChild(frame);
      screen.classList.add('is-playing');
      $('[data-reload]', sec).hidden = false;
    }
    $$('.gm-section', box).forEach(function (sec) {
      var g = Q.games[+sec.getAttribute('data-game')];
      var dir = g.logo.replace(/[^/]+$/, '');
      var strip = $('.gm-shots', sec);
      sec.addEventListener('click', function (e) {
        if (e.target.closest('[data-play]')) { start(sec, g); return; }
        if (e.target.closest('[data-reload]')) {
          var frame = $('.gm-screen iframe', sec);
          if (frame) { $('.gm-screen', sec).classList.remove('is-loaded'); frame.src = ROOT + g.play; }
          return;
        }
        var arrow = e.target.closest('[data-scroll]');
        if (arrow) { strip.scrollBy({ left: +arrow.getAttribute('data-scroll') * strip.clientWidth * 0.8, behavior: reduced ? 'auto' : 'smooth' }); return; }
        var shot = e.target.closest('.gm-shot, .gm-charity-shot');
        if (shot) lightbox(g.shots.map(function (s) { return { img: dir + s[0] + '.webp', caption: L(s[1], s[2]) }; }), +shot.getAttribute('data-i'));
      });
    });
  }

  /* ------------------------------------------------------------------
     Page: contact — copy the e-mail address
     ------------------------------------------------------------------ */
  function setupCopy() {
    $$('[data-copy]').forEach(function (b) {
      b.addEventListener('click', function () {
        var text = b.getAttribute('data-copy');
        var done = function () {
          var note = $(b.getAttribute('data-note') || '');
          if (!note) return;
          note.classList.add('is-on');
          setTimeout(function () { note.classList.remove('is-on'); }, 2200);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, function () {});
        else {
          var ta = document.createElement('textarea');
          ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
          body.appendChild(ta); ta.select();
          try { document.execCommand('copy'); done(); } catch (e) { /* ignore */ }
          ta.remove();
        }
      });
    });
  }

  /* ------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------ */
  fillStats();
  if (page === 'home') renderHome();
  if (page === 'platforms') renderPlatforms();
  if (page === 'equipment') renderEquipment();
  if (page === 'datasets') renderDatasets();
  if (page === 'hospitals') renderHospitals();
  if (page === 'partners') renderPartners();
  if (page === 'games') renderGames();
  setupCopy();
  var saved = 'zh';
  try { saved = localStorage.getItem('qcera-lang') || 'zh'; } catch (e) { /* private mode */ }
  var param = new URLSearchParams(location.search).get('lang');
  if (param === 'en' || param === 'zh') saved = param;
  applyLang(saved === 'en' ? 'en' : 'zh');
  setupLang();
  document.addEventListener('qcera:lang', fillStats);
  setupHeader();
  setupCardLight();
  setupReveals();
  setupClock();
  // deep links to a platform / dataset after content has been rendered
  if (location.hash && /^#[\w-]+$/.test(location.hash)) {
    var target = document.getElementById(location.hash.slice(1));
    if (target) requestAnimationFrame(function () { target.scrollIntoView({ block: 'start' }); });
  }
  window.QCERA_SITE = { lightbox: lightbox, observeReveals: observeReveals, lang: lang };
})();
