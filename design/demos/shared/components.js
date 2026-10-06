// Renderers shared by all demos. Each takes a container element and fills it.
(function () {
  const { person, timeline, projects, caseStudy, skills, posts, resume, education, PUB } = window.SK;
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const fmt = (d, o = { month: 'short', day: 'numeric', year: 'numeric' }) => new Date(d + 'T12:00').toLocaleDateString('en-US', o);
  const param = k => new URLSearchParams(location.search).get(k);
  const postHref = s => `post.html?slug=${s}`, projHref = k => `project.html?p=${k}`;
  const io = (el, fn, threshold = .25) => new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { fn(e.target); o.unobserve(e.target); } }), { threshold }).observe(el);

  const UI = {};

  // ---------- chrome ----------
  UI.nav = (el, { brand = person.name, links, current }) => {
    el.classList.add('nav');
    el.innerHTML = `<a class="brand" href="index.html"><i></i>${brand}</a><nav class="links">${links.map(([l, h]) => `<a href="${h}" class="${l === current ? 'on' : ''}">${l}</a>`).join('')}</nav><button class="theme-btn" data-theme-toggle aria-label="Toggle theme"></button>`;
    const on = () => document.body.classList.toggle('scrolled', scrollY > 40);
    addEventListener('scroll', on, { passive: true }); on();
  };
  UI.footer = el => {
    el.classList.add('foot');
    el.innerHTML = `<span>© 2026 ${person.name}</span><span><a href="${person.github}">GitHub</a> · <a href="${person.linkedin}">LinkedIn</a> · <a href="card.html">Card</a> · <a href="../index.html">← all demos</a></span>`;
  };
  UI.reveal = () => $$('.rv').forEach(n => io(n, t => t.classList.add('in'), .15));
  UI.splitWords = h => { h.innerHTML = h.textContent.split(' ').map((w, i) => `<span class="w" style="animation-delay:${.1 + i * .12}s">${w}</span>`).join(' '); };

  // ---------- dividers ----------
  UI.wave = (fill = 'var(--bg2)', flip = false) => `<svg class="dv-wave ${flip ? 'flip' : ''}" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"><path fill="${fill}" d="M0,45 C240,0 480,80 720,35 C960,0 1200,70 1440,25 L1440,80 L0,80 Z"/></svg>`;
  UI.drawn = () => `<div class="dv-drawn" aria-hidden="true"><svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0,60 C200,60 260,20 420,20 S640,100 800,100 S1060,30 1200,60 S1380,60 1440,60"/></svg></div>`;
  UI.chapter = (n, label) => `<div class="dv-chapter"><span class="n">${n}</span><span class="l"></span><span class="t">${label}</span></div>`;
  UI.flowStrip = () => `<canvas class="dv-flow" aria-hidden="true"></canvas>`;
  UI.initDividers = () => {
    const drawn = $$('.dv-drawn path').map(p => { const len = p.getTotalLength(); p.style.strokeDasharray = len; p.style.strokeDashoffset = len; return { p, len }; });
    const chaps = $$('.dv-chapter');
    const on = () => {
      drawn.forEach(({ p, len }) => { const r = p.getBoundingClientRect(); p.style.strokeDashoffset = len * (1 - Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight * .7)))); });
      chaps.forEach(c => c.style.setProperty('--p', Math.min(1, Math.max(0, (innerHeight - c.getBoundingClientRect().top) / (innerHeight * .6)))));
    };
    addEventListener('scroll', on, { passive: true }); on();
    $$('canvas.dv-flow').forEach(c => new FlowField(c, { density: 420, shockwave: true, clickTarget: c }));
  };

  // ---------- timeline ----------
  UI.spine = (el, { compact = false } = {}) => {
    el.className = 'spine' + (compact ? ' compact' : '');
    el.innerHTML = `<div class="track"><div class="fill"></div></div>` + timeline.map(t => `
      <div class="item rv"><span class="dot"></span><div class="yr">${t.start}${t.end && t.end !== t.start ? ' — ' + t.end : ''}</div>
      <span class="kind">${t.kind}</span><h3>${t.title}</h3><div class="org">${t.org}</div>${t.text ? `<p>${t.text}</p>` : ''}</div>`).join('');
    const fill = $('.fill', el), items = $$('.item', el);
    const on = () => { const r = el.getBoundingClientRect(), mid = innerHeight * .6;
      fill.style.height = Math.min(1, Math.max(0, (mid - r.top) / r.height)) * 100 + '%';
      items.forEach(it => it.classList.toggle('lit', it.getBoundingClientRect().top < mid)); };
    addEventListener('scroll', on, { passive: true }); on();
  };
  UI.chapters = el => {
    const ch = timeline.filter(t => t.chapter);
    el.className = 'chapters';
    el.innerHTML = `<div class="stick"><div class="bigyr">Now</div><div class="chap">Chapter 01</div></div><div>${ch.map((t, i) => `
      <article data-yr="${i === 0 ? 'Now' : t.start.replace(/<[^>]+>/g, '')}" data-ch="Chapter ${String(i + 1).padStart(2, '0')}"><div class="org">${t.org} · ${t.title}</div><h3>${t.chapter.head}</h3><p>${t.chapter.body}</p></article>`).join('')}</div>`;
    const big = $('.bigyr', el), chap = $('.chap', el), arts = $$('article', el);
    addEventListener('scroll', () => { let cur = null; arts.forEach(a => { if (a.getBoundingClientRect().top < innerHeight * .5) cur = a; });
      if (cur && big.textContent !== cur.dataset.yr) { big.style.opacity = 0; setTimeout(() => { big.textContent = cur.dataset.yr; chap.textContent = cur.dataset.ch; big.style.opacity = 1; }, 150); } }, { passive: true });
  };
  UI.mini = el => {
    el.className = 'mini';
    el.innerHTML = timeline.filter(t => t.kind !== 'published').map(t => `<div class="row"><span class="y">${t.start}${t.end && t.end !== t.start ? '–' + t.end.replace('Present', 'now') : ''}</span><span class="t"><b>${t.title}</b> <span>${t.kind === 'milestone' ? '' : 'at '}${t.org}</span></span><span class="plus">+</span><div class="more">${t.text || ''}</div></div>`).join('');
    $$('.row', el).forEach(r => r.onclick = () => r.classList.toggle('open'));
  };

  // ---------- work ----------
  UI.cover = k => ({
    music: `<div class="cover c-music"><div class="art"></div></div>`,
    meal: `<div class="cover c-meal"><div class="art"></div></div>`,
    cli: `<div class="cover c-cli"><div class="art"><div>$ sting notes today<br><span class="g">→ opened 2026-10-01.md</span><br>$ sting ai "summarize inbox"<br><span class="g">→ 3 threads need replies</span><br>$ ▍</div></div></div>`,
    nix: `<div class="cover c-nix"><div class="art">❄</div></div>`,
    swing: `<div class="cover c-swing"><div class="art"><img src="${PUB}swingIcon1.png" alt=""></div></div>`,
    book: `<div class="cover c-book"><div class="art"><div>THE UNKNOWN<small>JATO LEE CHRONICLES · I</small></div></div></div>`,
  })[k];
  UI.workTwoUp = (el, { limit } = {}) => {
    el.className = 'twoup';
    el.innerHTML = projects.slice(0, limit || projects.length).map(p => `<a class="card rv" href="${projHref(p.key)}">${UI.cover(p.key)}<div class="meta"><h3>${p.title}</h3><span class="tag">${p.type}</span></div><p>${p.pitch}</p></a>`).join('');
  };
  UI.workIndex = el => {
    el.className = 'windex';
    el.innerHTML = projects.map((p, i) => `<a href="${projHref(p.key)}" data-k="${p.key}"><span class="n">0${i + 1}</span><span class="t">${p.title}</span><span class="k">${p.type}</span><span class="y">${p.year}</span></a>`).join('');
    const peek = document.createElement('div'); peek.className = 'peek'; document.body.append(peek);
    $$('a', el).forEach(a => { a.onmouseenter = () => { peek.innerHTML = UI.cover(a.dataset.k); peek.classList.add('on'); }; a.onmouseleave = () => peek.classList.remove('on'); });
    let px = 0, py = 0, tx = 0, ty = 0;
    addEventListener('mousemove', e => { tx = Math.min(e.clientX + 190, innerWidth - 160); ty = e.clientY; });
    (function loop() { px += (tx - px) * .15; py += (ty - py) * .15; peek.style.left = px + 'px'; peek.style.top = py + 'px'; requestAnimationFrame(loop); })();
  };
  UI.project = el => {
    const k = param('p') || 'cli', p = projects.find(x => x.key === k) || projects[0], cs = caseStudy[p.key];
    const next = projects[(projects.indexOf(p) + 1) % projects.length];
    document.title = p.title + ' — ' + person.name;
    el.innerHTML = `
      <div class="cs-hero"><a class="eyebrow" href="${document.querySelector('a[href="work.html"]') ? 'work.html' : 'index.html#work'}">← Work</a><h1>${p.title}</h1><p>${p.pitch}</p></div>
      ${UI.cover(p.key)}
      <div class="cs-meta"><div><b>Role</b>${cs ? cs.role : 'Solo'}</div><div><b>Timeline</b>${cs ? cs.timeline : p.year}</div><div><b>Stack</b>${p.stack.join(', ')}</div><div><b>Type</b>${p.type}</div></div>
      ${cs ? cs.sections.map(([h, b]) => `<div class="cs-body rv"><h2>${h}</h2><p>${b}</p></div>`).join('') + `<div class="cs-stats">${cs.stats.map(([n, l]) => `<div class="rv"><b>${n}</b>${l}</div>`).join('')}</div>`
           : `<div class="cs-body"><h2>Case study</h2><p>The full write-up for ${p.title} is coming soon. In the real site this page is a Markdown file: problem, what I built, screenshots, outcome. <a href="project.html?p=cli" style="color:var(--accent)">See the sting-cli case study</a> for the complete layout.</p></div>`}
      <a class="cs-next" href="${projHref(next.key)}"><span><span class="eyebrow" style="display:block;font-size:12px">Next project</span>${next.title}</span><span>→</span></a>`;
  };

  // ---------- skills ----------
  const chip = s => `<span class="chip">${s.src ? `<img src="${s.src}" alt="">` : ''}${s.n}</span>`;
  UI.bouncyMarquee = el => {
    el.className = 'bmq';
    const half = Math.ceil(skills.length / 2), r1 = skills.slice(0, half).map(chip).join(''), r2 = skills.slice(half).map(chip).join('');
    el.innerHTML = `<div class="row">${r1.repeat(4)}</div><div class="row">${r2.repeat(4)}</div>`;
    const rows = $$('.row', el).map((r, i) => ({ el: r, x: 0, dir: i ? 1 : -1 }));
    let lastY = scrollY, vel = 0, skew = 0;
    (function tick() {
      const dy = scrollY - lastY; lastY = scrollY; vel += (dy - vel) * .1; skew += (Math.max(-12, Math.min(12, vel * .6)) - skew) * .12;
      rows.forEach(r => { const w = r.el.scrollWidth / 4; r.x += r.dir * (.6 + Math.abs(vel) * .5) * (vel < -.5 ? -1 : 1);
        if (r.x <= -w) r.x += w; if (r.x > 0) r.x -= w; r.el.style.transform = `translateX(${r.x}px) skewX(${-skew * r.dir}deg)`; });
      requestAnimationFrame(tick);
    })();
    el.addEventListener('click', e => { const c = e.target.closest('.chip'); if (!c) return; c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop'); });
    el.addEventListener('animationend', e => e.target.classList.remove('pop'));
  };
  UI.bubbles = el => {
    el.className = 'bubbles';
    el.innerHTML = `<span class="hint">push them around · click to pop</span>` + skills.map(s => `<div class="bub" style="--c:${s.c};--fs:${10 + s.w * 2.6}px"><span>${s.n}</span></div>`).join('');
    let bubs = [], m = { x: -999, y: -999 }, t = 0, running = false;
    function make() { const W = el.clientWidth, H = el.clientHeight, unit = Math.min(W, H) / 11;
      bubs = $$('.bub', el).map((b, i) => { const r = unit * (.6 + skills[i].w * .32); b.style.width = b.style.height = r * 2 + 'px';
        return { el: b, r, x: r + Math.random() * (W - 2 * r), y: H + r + Math.random() * 200, vx: 0, vy: -2 - Math.random() * 3, ph: Math.random() * 6, W, H }; }); }
    el.addEventListener('mousemove', e => { const r = el.getBoundingClientRect(); m.x = e.clientX - r.left; m.y = e.clientY - r.top; });
    el.addEventListener('mouseleave', () => m.x = m.y = -999);
    el.addEventListener('click', e => { const b0 = e.target.closest('.bub'); if (!b0) return; const b = bubs.find(b => b.el === b0);
      b0.classList.add('popping'); setTimeout(() => { b.x = b.r + Math.random() * (b.W - 2 * b.r); b.y = b.H - b.r; b.vy = -6; b0.classList.remove('popping'); b0.classList.add('regrow'); setTimeout(() => b0.classList.remove('regrow'), 800); }, 350); });
    function step() {
      t += .016;
      for (const b of bubs) { b.vx += Math.sin(t * .7 + b.ph) * .03; b.vy += Math.cos(t * .5 + b.ph) * .03 + (b.H / 2 - b.y) * .0004;
        const dx = b.x - m.x, dy = b.y - m.y, d = Math.hypot(dx, dy); if (d < b.r + 70) { const f = (1 - d / (b.r + 70)) * 1.6; b.vx += dx / d * f; b.vy += dy / d * f; } }
      for (let i = 0; i < bubs.length; i++) for (let j = i + 1; j < bubs.length; j++) { const a = bubs[i], b = bubs[j], dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1, min = a.r + b.r + 4;
        if (d < min) { const p = (min - d) * .08, nx = dx / d, ny = dy / d; a.vx -= nx * p; a.vy -= ny * p; b.vx += nx * p; b.vy += ny * p; } }
      for (const b of bubs) { b.vx *= .94; b.vy *= .94; b.x += b.vx; b.y += b.vy;
        if (b.x < b.r) { b.x = b.r; b.vx *= -.6; } if (b.x > b.W - b.r) { b.x = b.W - b.r; b.vx *= -.6; }
        if (b.y < b.r) { b.y = b.r; b.vy *= -.6; } if (b.y > b.H - b.r && b.vy > 0) { b.y = b.H - b.r; b.vy *= -.6; }
        const sp = Math.min(.12, Math.hypot(b.vx, b.vy) * .02), a = Math.atan2(b.vy, b.vx), wob = Math.sin(t * 3 + b.ph) * .03;
        b.el.style.transform = `translate(${b.x - b.r}px,${b.y - b.r}px) rotate(${a}rad) scale(${1 + sp + wob},${1 - sp - wob}) rotate(${-a}rad)`; }
      requestAnimationFrame(step);
    }
    io(el, () => { make(); if (!running) { running = true; step(); } }, .2);
    addEventListener('resize', () => bubs.length && make());
  };
  UI.keycaps = el => {
    el.className = 'kbwrap';
    const rows = [skills.slice(0, 5), skills.slice(5, 10), skills.slice(10)];
    el.innerHTML = `<div class="kb">${rows.map((r, ri) => `<div class="r">${r.map((s, i) => `<div class="key ${s.w >= 5 ? 'wide acc' : (i + ri) % 4 === 2 ? 'hi' : ''}" data-l="${s.n[0].toLowerCase()}" data-n="${s.n}"><small>${'★'.repeat(s.w)}</small>${s.n}</div>`).join('')}</div>`).join('')}</div><div class="kb-typed"></div><p class="hint" style="position:static;text-align:center;margin:6px 0 0">hover the keys · or type on your keyboard</p>`;
    const typed = $('.kb-typed', el);
    const press = k => k.classList.add('down'), release = k => { k.classList.remove('down', 'boing'); void k.offsetWidth; k.classList.add('boing'); };
    $$('.key', el).forEach(k => { k.onmouseenter = () => press(k); k.onmouseleave = () => release(k); });
    addEventListener('keydown', e => { if (e.repeat || e.target.closest('input,textarea')) return; const ks = $$(`.key[data-l="${e.key.toLowerCase()}"]`, el); if (!ks.length) return; ks.forEach(press); typed.textContent = ks.map(k => k.dataset.n).join(' · '); });
    addEventListener('keyup', e => $$(`.key[data-l="${e.key.toLowerCase()}"]`, el).forEach(release));
  };

  // ---------- about ----------
  UI.about = (el, { heading = `Hello, I'm ${person.first}.` } = {}) => {
    el.className = 'about';
    el.innerHTML = `<div class="portrait rv"><img src="${person.photo}" alt="${person.name}"></div><div><h2 class="section-title">${heading}</h2><div class="bio">${person.bio.map(p => `<p>${p}</p>`).join('')}</div></div>`;
  };

  // ---------- blog ----------
  UI.magazine = (el, { limit, filters = true } = {}) => {
    const draw = f => {
      const list = posts.filter(p => f === 'all' || p.c === f), [first, ...rest] = list;
      el.querySelector('.mag-body').innerHTML = `
        <a class="feat" href="${postHref(first.slug)}"><div class="art"><canvas></canvas></div><div><span class="tag ${first.c === 'life' ? 'life' : ''}">${first.c}</span><h2>${first.t}</h2><p>${first.x}</p><span class="mono" style="font-size:12px;color:var(--muted)">${fmt(first.d)} · ${first.m} min</span></div></a>
        <div class="mag-grid">${rest.slice(0, limit ? limit - 1 : 99).map(p => `<a class="card rv in" href="${postHref(p.slug)}"><span class="tag ${p.c === 'life' ? 'life' : ''}">${p.c}</span><h3>${p.t}</h3><p>${p.x}</p><span class="date">${fmt(p.d)} · ${p.m} min</span></a>`).join('')}</div>`;
      new FlowField(el.querySelector('.feat canvas'), { density: 260, shockwave: false });
    };
    el.innerHTML = (filters ? `<div class="mag-filters">${['all', 'tech', 'life'].map((f, i) => `<button data-f="${f}" class="${i ? '' : 'on'}">${f[0].toUpperCase() + f.slice(1)}</button>`).join('')}</div>` : '') + `<div class="mag-body"></div>`;
    el.addEventListener('click', e => { const b = e.target.closest('[data-f]'); if (!b) return; $$('[data-f]', el).forEach(n => n.classList.toggle('on', n === b)); draw(b.dataset.f); });
    draw('all');
  };
  UI.plainList = (el, { limit } = {}) => {
    el.className = 'plain-list';
    el.innerHTML = posts.slice(0, limit || 99).map(p => `<div class="post"><span class="d">${p.d.slice(0, 7).replace('-', '.')}</span><span><a href="${postHref(p.slug)}">${p.t}</a>${p.c === 'life' ? '<span class="life-mark">· life</span>' : ''}</span></div>`).join('');
  };
  UI.post = (el, { mode = 'toc' } = {}) => {
    const p = posts.find(x => x.slug === param('slug')) || posts[0];
    const literary = mode === 'literary' || (mode === 'auto' && p.c === 'life');
    document.title = p.t;
    const body = p.body || `<p>${p.x}</p><h2 id="draft">Draft</h2><p>This post is a placeholder in the demo. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>`;
    el.className = 'post-wrap' + (literary ? ' literary' : '');
    el.innerHTML = `${literary ? '' : '<nav class="toc"><b>On this page</b></nav>'}<article class="post"><div class="meta"><span class="tag ${p.c === 'life' ? 'life' : ''}">${p.c}</span><span>${fmt(p.d)}</span><span>·</span><span>${p.m} min read</span></div><h1>${p.t}</h1>${body}
      <div class="post-end"><a href="blog.html">← All writing</a><span>Thanks for reading.</span></div></article>${literary ? '' : '<aside class="side"></aside>'}`;
    const art = $('article', el), notes = [];
    $$('.fn', art).forEach((f, i) => { notes.push(f.dataset.note); f.outerHTML = `<sup>${i + 1}</sup>`; });
    if (literary) { $$('sup', art).forEach((s, i) => s.closest('p').insertAdjacentHTML('afterend', `<span class="inline-note"><sup>${i + 1}</sup> ${notes[i]}</span>`)); }
    else {
      const toc = $('.toc', el), side = $('.side', el), hs = $$('h2', art);
      toc.insertAdjacentHTML('beforeend', hs.map(h => `<a href="#${h.id}">${h.textContent}</a>`).join(''));
      const place = () => { const sr = side.getBoundingClientRect(); side.innerHTML = ''; $$('sup', art).forEach((s, i) => side.insertAdjacentHTML('beforeend', `<div class="sn" style="top:${s.getBoundingClientRect().top - sr.top - 4}px"><sup>${i + 1}</sup> ${notes[i]}</div>`)); };
      place(); addEventListener('resize', place); document.fonts && document.fonts.ready.then(place);
      addEventListener('scroll', () => { let cur = null; hs.forEach(h => { if (h.getBoundingClientRect().top < 160) cur = h.id; }); $$('a', toc).forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + cur)); }, { passive: true });
    }
    const bar = document.createElement('div'); bar.className = 'prog'; document.body.append(bar);
    addEventListener('scroll', () => { bar.style.width = scrollY / (document.documentElement.scrollHeight - innerHeight) * 100 + '%'; }, { passive: true });
  };

  // ---------- resume ----------
  UI.resume = (el, { interactive = false } = {}) => {
    el.className = 'resume' + (interactive ? ' interactive' : '');
    const allSkills = [...new Set(resume.flatMap(j => j.bullets.flatMap(b => b[1])))];
    el.innerHTML = `
      <header><div><h1>${person.name}</h1><div class="contact-line"><span>${person.title}</span><a href="mailto:${person.email}">${person.email}</a><a href="${person.github}">github.com/sterlkel</a><a href="${person.linkedin}">LinkedIn</a></div></div>
        <div class="actions"><button class="btn ghost" onclick="print()">Print</button><a class="btn" href="${person.resumePdf}" download>Download PDF</a></div></header>
      <h2>Skills</h2><div class="skills-row">${allSkills.map(s => `<button class="sk" data-s="${s}">${s}</button>`).join('')}</div>
      ${interactive ? '<div class="filter-note">Click a skill to see where I used it.</div>' : ''}
      <h2>Experience</h2>${resume.map(j => `<div class="job"><div class="when">${j.dates}</div><div><h3>${j.org} <span>· ${j.title}</span></h3><ul>${j.bullets.map(([b, s]) => `<li data-s="${s.join('|')}">${b}</li>`).join('')}</ul></div></div>`).join('')}
      <h2>Projects</h2>${projects.slice(0, 4).map(p => `<div class="job"><div class="when">${p.year}</div><div><h3>${p.title} <span>· ${p.stack.join(', ')}</span></h3><ul><li data-s="${p.stack.join('|')}">${p.pitch}</li></ul></div></div>`).join('')}
      <h2>Education</h2>${education.map(([s, d, y]) => `<div class="job"><div class="when">${y}</div><div><h3>${s} <span>· ${d}</span></h3></div></div>`).join('')}`;
    if (interactive) {
      const note = $('.filter-note', el);
      el.addEventListener('click', e => { const b = e.target.closest('.sk'); if (!b) return;
        const on = !b.classList.contains('on'); $$('.sk', el).forEach(n => n.classList.remove('on'));
        el.classList.toggle('filtering', on);
        if (on) { b.classList.add('on'); const n = $$('li', el).filter(li => { const m = li.dataset.s.split('|').includes(b.dataset.s); li.classList.toggle('match', m); return m; }).length; note.textContent = `${b.dataset.s}: used in ${n} place${n === 1 ? '' : 's'}. Click again to clear.`; }
        else note.textContent = 'Click a skill to see where I used it.'; });
    }
  };

  // ---------- contact ----------
  UI.contactCards = el => {
    el.innerHTML = `
      <button class="contact-big" title="Copy email">${person.email}<span class="copy">copy</span></button>
      <div class="channels">
        <a class="channel book rv" href="${person.booking}"><b>Book 20 minutes</b><span>Pick a time that works. No prep needed.</span><span class="arr">open calendar →</span></a>
        <a class="channel rv" href="${person.linkedin}"><b>LinkedIn</b><span>Professional history and recommendations.</span><span class="arr">connect →</span></a>
        <a class="channel rv" href="${person.github}"><b>GitHub</b><span>Code, dotfiles and side projects.</span><span class="arr">browse →</span></a>
        <a class="channel rv" href="blog.html"><b>Writing</b><span>Notes on building things.</span><span class="arr">read →</span></a>
      </div>`;
    const b = $('.contact-big', el);
    b.onclick = () => { navigator.clipboard && navigator.clipboard.writeText(person.email).catch(() => {}); b.classList.add('copied'); $('.copy', b).textContent = 'copied!'; setTimeout(() => { b.classList.remove('copied'); $('.copy', b).textContent = 'copy'; }, 1600); };
  };
  UI.chatForm = el => {
    el.className = 'chat';
    const steps = [
      { q: "Hey! What's your name?", k: 'name', input: 'text', ph: 'Type your name' },
      { q: n => `Nice to meet you, ${n.name || 'friend'}. What's this about?`, k: 'topic', opts: ['A job opportunity', 'A project idea', 'Something I wrote', 'Just saying hi'] },
      { q: 'Tell me a bit more.', k: 'msg', input: 'area', ph: 'A few sentences is perfect' },
      { q: 'And where should I reply?', k: 'email', input: 'email', ph: 'you@example.com' },
    ];
    const data = {}; let i = 0;
    const render = () => {
      if (i >= steps.length) {
        el.innerHTML = `<div class="step on"><p class="q"><small>sent (demo)</small>Thanks, ${data.name || 'friend'}! 🎉</p><p style="color:var(--muted)">In the demo nothing is actually sent. Prefer email? <a style="color:var(--accent)" href="mailto:${person.email}">${person.email}</a> · or <a style="color:var(--accent)" href="${person.booking}">book 20 minutes</a>.</p></div>`; return; }
      const s = steps[i], q = typeof s.q === 'function' ? s.q(data) : s.q;
      el.innerHTML = `<div class="dots">${steps.map((_, j) => `<i class="${j <= i ? 'on' : ''}"></i>`).join('')}</div><div class="step on"><p class="q"><small>${String(i + 1).padStart(2, '0')} / 0${steps.length}</small>${q}</p>
        ${s.opts ? `<div class="opts">${s.opts.map(o => `<button>${o}</button>`).join('')}</div>` : s.input === 'area' ? `<textarea rows="3" placeholder="${s.ph}"></textarea>` : `<input type="${s.input}" placeholder="${s.ph}">`}
        <div class="nav-row">${s.opts ? '' : '<button class="btn">Next ↵</button>'}${i ? '<a href="#" class="back">← back</a>' : ''}</div></div>`;
      const f = $('input,textarea', el); if (f) { f.value = data[s.k] || ''; f.focus({ preventScroll: true }); f.onkeydown = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); next(); } }; }
      $$('.opts button', el).forEach(b => b.onclick = () => { data[s.k] = b.textContent; i++; render(); });
      const nb = $('.nav-row .btn', el); if (nb) nb.onclick = next;
      const back = $('.back', el); if (back) back.onclick = e => { e.preventDefault(); i--; render(); };
    };
    const next = () => { const f = $('input,textarea', el); if (f && !f.value.trim()) { f.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-10px)' }, { transform: 'translateX(10px)' }, { transform: 'translateX(0)' }], { duration: 300 }); return; } if (f) data[steps[i].k] = f.value.trim(); i++; render(); };
    render();
  };

  // ---------- business card ----------
  UI.card = el => {
    el.className = 'cardpage';
    el.innerHTML = `
      <div class="bcard"><div class="flip">
        <div class="face front"><canvas></canvas><img class="avatar" src="${person.photo}" alt=""><h1>${person.name}</h1><div class="role">${person.title}</div><div class="role mono" style="font-size:13px;margin-top:6px">${person.email}</div><div class="tap">tap to flip ↻</div></div>
        <div class="face back"><div class="qr"></div><div class="tap">scan to open this card</div></div>
      </div></div>
      <div class="card-actions"><button class="btn" id="vcf">＋ Save contact</button><button class="btn ghost" id="share">Share</button></div>
      <div class="card-links">
        <a href="index.html">Portfolio<span>→</span></a>
        <a href="${postHref(posts[0].slug)}">Latest: ${posts[0].t}<span>→</span></a>
        <a href="${person.booking}">Book 20 minutes<span>cal</span></a>
        <a href="${person.github}">GitHub<span>@sterlkel</span></a>
        <a href="${person.linkedin}">LinkedIn<span>in/</span></a>
        <a href="mailto:${person.email}">Email<span>@</span></a>
      </div>`;
    new FlowField($('.front canvas', el), { density: 300, shockwave: false });
    const card = $('.bcard', el); card.onclick = () => card.classList.toggle('flipped');
    const url = person.site + '/card';
    if (window.QRCode) new QRCode($('.qr', el), { text: url, width: 180, height: 180, colorDark: '#111', colorLight: '#fff' });
    else $('.qr', el).textContent = url;
    $('#vcf').onclick = () => {
      const v = ['BEGIN:VCARD', 'VERSION:3.0', `FN:${person.name}`, 'N:Kelly;Sterling;;;', `TITLE:${person.title}`, `EMAIL:${person.email}`, `URL:${person.site}`, `URL:${person.linkedin}`, 'END:VCARD'].join('\n');
      const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([v], { type: 'text/vcard' })); a.download = 'sterling-kelly.vcf'; a.click();
    };
    $('#share').onclick = async () => { if (navigator.share) { try { await navigator.share({ title: person.name, url }); } catch (e) {} } else { navigator.clipboard && navigator.clipboard.writeText(url); $('#share').textContent = 'Link copied!'; } };
  };

  // =================== Round 2 ===================

  // Resume shown as the actual PDF file. Updating = replacing public/resume.pdf.
  UI.resumePdf = (el, { frame = 'paper', updated = 'Dec 2024' } = {}) => {
    el.className = 'rpdf rpdf-' + frame;
    const src = person.resumePdf + '#toolbar=0&navpanes=0&view=FitH';
    el.innerHTML = `
      <div class="rpdf-bar"><div><h1>Résumé</h1><span class="mono">PDF · updated ${updated}</span></div>
        <div class="rpdf-actions"><a class="btn ghost" href="${person.resumePdf}" target="_blank" rel="noopener">Open</a><a class="btn" href="${person.resumePdf}" download>Download</a></div></div>
      <div class="rpdf-deskbg"><div class="rpdf-sheet"><iframe src="${src}" title="Résumé PDF" loading="lazy"></iframe>
        <a class="rpdf-fallback" href="${person.resumePdf}">Your browser can't show the PDF inline. <b>Open the résumé →</b></a></div></div>`;
  };

  // Plain writing list, optionally with excerpts and year groups.
  UI.writingList = (el, { limit, excerpts = false, years = false } = {}) => {
    el.className = 'wlist' + (excerpts ? ' with-x' : '');
    let html = '', last = '';
    posts.slice(0, limit || 99).forEach(p => {
      const y = p.d.slice(0, 4);
      if (years && y !== last) { html += `<div class="wl-year">${y}</div>`; last = y; }
      html += `<a class="wl" href="${postHref(p.slug)}"><span class="d">${years ? fmt(p.d, { month: 'short', day: 'numeric' }) : fmt(p.d, { month: 'short', year: 'numeric' })}</span><span class="b"><b>${p.t}</b>${p.c === 'life' ? '<i>life</i>' : ''}${excerpts ? `<span class="x">${p.x}</span>` : ''}</span></a>`;
    });
    el.innerHTML = html;
  };

  // Compact work list: small thumbnail + title + pitch. Scales to any length.
  UI.workRows = (el, { limit } = {}) => {
    el.className = 'wrows';
    el.innerHTML = projects.slice(0, limit || 99).map(p => `<a class="wr" href="${projHref(p.key)}"><div class="thumb">${UI.cover(p.key)}</div><div class="b"><b>${p.title}</b><span>${p.pitch}</span></div><span class="tag">${p.type}</span></a>`).join('');
  };

  // Compact 3-up grid with type filters; cards glide when filtering.
  UI.workGrid = el => {
    el.className = 'wgrid-wrap';
    const types = ['All', ...new Set(projects.map(p => p.type))];
    el.innerHTML = `<div class="mag-filters">${types.map((t, i) => `<button data-t="${t}" class="${i ? '' : 'on'}">${t}</button>`).join('')}</div>
      <div class="wgrid">${projects.map(p => `<a class="wg" data-type="${p.type}" href="${projHref(p.key)}">${UI.cover(p.key)}<b>${p.title}</b><span>${p.type} · ${p.year}</span></a>`).join('')}</div>`;
    const grid = $('.wgrid', el);
    $('.mag-filters', el).onclick = e => { const b = e.target.closest('button'); if (!b) return;
      $$('.mag-filters button', el).forEach(n => n.classList.toggle('on', n === b));
      const cards = [...grid.children], first = new Map(cards.map(c => [c, c.getBoundingClientRect()]));
      cards.forEach(c => c.hidden = b.dataset.t !== 'All' && c.dataset.type !== b.dataset.t);
      cards.forEach(c => { if (c.hidden) return; const f = first.get(c), l = c.getBoundingClientRect();
        if (!f.width) c.animate([{ opacity: 0, transform: 'scale(.9)' }, { opacity: 1, transform: 'none' }], { duration: 450, easing: 'cubic-bezier(.3,1.6,.5,1)' });
        else c.animate([{ transform: `translate(${f.left - l.left}px,${f.top - l.top}px)` }, { transform: 'none' }], { duration: 500, easing: 'cubic-bezier(.2,.7,.2,1)' }); }); };
  };

  // Two featured projects large, the rest as a typographic archive.
  UI.workFeatured = el => {
    el.className = 'wfeat';
    const [a, b, ...rest] = projects;
    el.innerHTML = `<div class="twoup">${[a, b].map(p => `<a class="card" href="${projHref(p.key)}">${UI.cover(p.key)}<div class="meta"><h3>${p.title}</h3><span class="tag">${p.type}</span></div><p>${p.pitch}</p></a>`).join('')}</div>
      <h3 class="wfeat-h">Archive</h3><div id="wfeat-idx"></div>`;
    $('.twoup', el).querySelectorAll('.card')[1].style.marginTop = '0';
    const idx = $('#wfeat-idx', el); UI.workIndex(idx);
    $$('a', idx).forEach((n, i) => { if (i < 2) n.remove(); });
  };

  // Simplest contact: copyable email, one booking button, a line of links.
  UI.contactSimple = el => {
    el.className = 'csimple';
    el.innerHTML = `<button class="contact-big" title="Copy email">${person.email}<span class="copy">copy</span></button>
      <div class="cs-row"><a class="btn" href="${person.booking}">Book 20 minutes →</a><a class="btn ghost" href="card.html">My card</a></div>
      <p class="cs-links">Also on <a href="${person.linkedin}">LinkedIn</a> and <a href="${person.github}">GitHub</a>.</p>`;
    const b = $('.contact-big', el);
    b.onclick = () => { navigator.clipboard && navigator.clipboard.writeText(person.email).catch(() => {}); b.classList.add('copied'); $('.copy', b).textContent = 'copied!'; setTimeout(() => { b.classList.remove('copied'); $('.copy', b).textContent = 'copy'; }, 1600); };
  };

  // "Elsewhere on the site" cards.
  UI.elsewhere = (el, { items } = {}) => {
    const def = [
      ['writing', 'Writing', `Latest: ${posts[0].t}`, 'blog.html'],
      ['work', "Things I've made", `${projects.slice(0, 3).map(p => p.title).join(', ')} and more.`, 'work.html'],
      ['about', "Who's writing this", 'Short bio, where I\'ve worked, the tools I use.', 'about.html'],
      ['résumé', 'The formal version', 'The same PDF I send to recruiters.', 'resume.html'],
    ];
    el.className = 'elsewhere';
    el.innerHTML = (items || def).map(([e, b, s, h]) => `<a class="els rv" href="${h}"><span class="eyebrow">${e}</span><b>${b}</b><span>${s}</span><span class="arr">→</span></a>`).join('');
  };

  // Big typographic section index; hovering a row floats a preview of that section.
  UI.sectionIndex = el => {
    const rows = [
      ['01', 'Writing', 'blog.html', `<div class="pv pv-list">${posts.slice(0, 3).map(p => `<div><small>${fmt(p.d, { month: 'short', day: 'numeric' })}</small>${p.t}</div>`).join('')}</div>`],
      ['02', 'Work', 'work.html', UI.cover('cli')],
      ['03', 'About', 'about.html', `<div class="pv pv-photo"><img src="${person.photo}" alt=""></div>`],
      ['04', 'Résumé', 'resume.html', `<div class="pv pv-page"><i></i><i></i><i style="width:60%"></i><i></i><i style="width:80%"></i><i></i><i style="width:50%"></i></div>`],
      ['05', 'Contact', 'contact.html', `<div class="pv pv-mail">${person.email}</div>`],
    ];
    el.className = 'sindex windex';
    el.innerHTML = rows.map(([n, t, h, pv]) => `<a href="${h}" data-pv="${encodeURIComponent(pv)}"><span class="n">${n}</span><span class="t">${t}</span><span class="k"></span><span class="y">→</span></a>`).join('');
    const peek = document.createElement('div'); peek.className = 'peek'; document.body.append(peek);
    $$('a', el).forEach(a => { a.onmouseenter = () => { peek.innerHTML = decodeURIComponent(a.dataset.pv); peek.classList.add('on'); }; a.onmouseleave = () => peek.classList.remove('on'); });
    let px = 0, py = 0, tx = 0, ty = 0;
    addEventListener('mousemove', e => { tx = Math.min(e.clientX + 190, innerWidth - 160); ty = e.clientY; });
    (function loop() { px += (tx - px) * .15; py += (ty - py) * .15; peek.style.left = px + 'px'; peek.style.top = py + 'px'; requestAnimationFrame(loop); })();
  };

  // Sticky sidebar used as the nav in the sidebar layout.
  UI.sidebar = (el, { links, current }) => {
    el.className = 'sb';
    el.innerHTML = `<canvas class="sb-flow"></canvas><div class="sb-in">
      <a class="sb-name" href="index.html">Sterling<br>Kelly</a><p class="sb-role">${person.title}. Founder once, novelist once, writing again.</p>
      <nav>${links.map(([l, h]) => `<a href="${h}" class="${l === current ? 'on' : ''}"><i></i>${l}</a>`).join('')}</nav>
      <div class="sb-foot"><a href="${person.github}">GitHub</a><a href="${person.linkedin}">LinkedIn</a><a href="card.html">Card</a><button class="theme-btn" data-theme-toggle aria-label="Toggle theme"></button></div></div>`;
    new FlowField($('.sb-flow', el), { density: 700, shockwave: true, clickTarget: el });
  };

  window.UI = UI;
})();
