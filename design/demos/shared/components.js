// Renderers for the Portrait mock (design/demos/final-a). Each takes a container element and fills it.
(function () {
  const { person, timeline, projects, caseStudy, skills, posts, PUB } = window.SK;
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const fmt = (d, o = { month: 'short', day: 'numeric', year: 'numeric' }) => new Date(d + 'T12:00').toLocaleDateString('en-US', o);
  const param = k => new URLSearchParams(location.search).get(k);
  const postHref = s => `post.html?slug=${s}`, projHref = k => `project.html?p=${k}`;
  // Pages can remap where "all writing" / "all work" live by setting window.SK_ROUTES before this script.
  const R = Object.assign({ writing: 'blog.html', work: null }, window.SK_ROUTES || {});
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

  UI.chapter = (n, label) => `<div class="dv-chapter"><span class="n">${n}</span><span class="l"></span><span class="t">${label}</span></div>`;

  // ---------- experience ----------
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
  UI.project = el => {
    const k = param('p') || 'cli', p = projects.find(x => x.key === k) || projects[0], cs = caseStudy[p.key];
    const next = projects[(projects.indexOf(p) + 1) % projects.length];
    document.title = p.title + ' — ' + person.name;
    el.innerHTML = `
      <div class="cs-hero"><a class="eyebrow" href="${R.work || 'index.html#work'}">← Work</a><h1>${p.title}</h1><p>${p.pitch}</p></div>
      ${UI.cover(p.key)}
      <div class="cs-meta"><div><b>Role</b>${cs ? cs.role : 'Solo'}</div><div><b>Timeline</b>${cs ? cs.timeline : p.year}</div><div><b>Stack</b>${p.stack.join(', ')}</div><div><b>Type</b>${p.type}</div></div>
      ${cs ? cs.sections.map(([h, b]) => `<div class="cs-body rv"><h2>${h}</h2><p>${b}</p></div>`).join('') + `<div class="cs-stats">${cs.stats.map(([n, l]) => `<div class="rv"><b>${n}</b>${l}</div>`).join('')}</div>`
           : `<div class="cs-body"><h2>Case study</h2><p>The full write-up for ${p.title} is coming soon. In the real site this page is a Markdown file: problem, what I built, screenshots, outcome. <a href="project.html?p=cli" style="color:var(--accent)">See the sting-cli case study</a> for the complete layout.</p></div>`}
      <a class="cs-next" href="${projHref(next.key)}"><span><span class="eyebrow" style="display:block;font-size:12px">Next project</span>${next.title}</span><span>→</span></a>`;
  };

  // ---------- skills ----------
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
  UI.plainList = (el, { limit } = {}) => {
    el.className = 'plain-list';
    el.innerHTML = posts.slice(0, limit || 99).map(p => `<div class="post"><span class="d">${p.d.slice(0, 7).replace('-', '.')}</span><span><a href="${postHref(p.slug)}">${p.t}</a>${p.c === 'life' ? '<span class="life-mark">· life</span>' : ''}</span></div>`).join('');
  };
  // Literary post layout; footnotes become inline notes under their paragraph.
  UI.post = el => {
    const p = posts.find(x => x.slug === param('slug')) || posts[0];
    document.title = p.t;
    const body = p.body || `<p>${p.x}</p><h2 id="draft">Draft</h2><p>This post is a placeholder in the demo. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>`;
    el.className = 'post-wrap literary';
    el.innerHTML = `<article class="post"><div class="meta"><span class="tag ${p.c === 'life' ? 'life' : ''}">${p.c}</span><span>${fmt(p.d)}</span><span>·</span><span>${p.m} min read</span></div><h1>${p.t}</h1>${body}
      <div class="post-end"><a href="${R.writing}">← All writing</a><span>Thanks for reading.</span></div></article>`;
    const art = $('article', el), notes = [];
    $$('.fn', art).forEach((f, i) => { notes.push(f.dataset.note); f.outerHTML = `<sup>${i + 1}</sup>`; });
    $$('sup', art).forEach((s, i) => s.closest('p').insertAdjacentHTML('afterend', `<span class="inline-note"><sup>${i + 1}</sup> ${notes[i]}</span>`));
    const bar = document.createElement('div'); bar.className = 'prog'; document.body.append(bar);
    addEventListener('scroll', () => { bar.style.width = scrollY / (document.documentElement.scrollHeight - innerHeight) * 100 + '%'; }, { passive: true });
  };

  // ---------- contact ----------
  UI.contactCards = el => {
    el.innerHTML = `
      <button class="contact-big" title="Copy email">${person.email}<span class="copy">copy</span></button>
      <div class="channels">
        <a class="channel book rv" href="${person.booking}"><b>Book 20 minutes</b><span>Pick a time that works. No prep needed.</span><span class="arr">open calendar →</span></a>
        <a class="channel rv" href="${person.linkedin}"><b>LinkedIn</b><span>Professional history and recommendations.</span><span class="arr">connect →</span></a>
        <a class="channel rv" href="${person.github}"><b>GitHub</b><span>Code, dotfiles and side projects.</span><span class="arr">browse →</span></a>
        <a class="channel rv" href="${R.writing}"><b>Writing</b><span>Notes on building things.</span><span class="arr">read →</span></a>
      </div>`;
    const b = $('.contact-big', el);
    b.onclick = () => { navigator.clipboard && navigator.clipboard.writeText(person.email).catch(() => {}); b.classList.add('copied'); $('.copy', b).textContent = 'copied!'; setTimeout(() => { b.classList.remove('copied'); $('.copy', b).textContent = 'copy'; }, 1600); };
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

  // ---------- résumé, writing list, work rows ----------
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

  // ---------- coming-soon writing, tilt, elsewhere, index ----------

  // Writing can be shown as "coming soon" while the first posts are drafted.
  // Demo-only switch: ?writing=soon|full, remembered in localStorage.
  UI.writingMode = () => {
    const q = param('writing');
    if (q) { try { localStorage.setItem('sk-writing', q); } catch (e) {} return q; }
    try { return localStorage.getItem('sk-writing') || 'soon'; } catch (e) { return 'soon'; }
  };
  const drafts = [
    [posts[0].t, 'editing', 82], [posts[1].t, 'drafting', 55], [posts[2].t, 'outlining', 20],
  ];
  UI.writingSoon = (el, { big = false } = {}) => {
    el.className = 'wsoon' + (big ? ' big' : '');
    el.innerHTML = `<p class="ws-lede">First posts are on the way<span class="ws-cursor"></span></p>
      <p class="ws-sub">I'm writing the first few now. Here's what's on the desk:</p>
      <div class="ws-list">${drafts.map(([t, s, pct]) => `<div class="ws-item rv"><b>${t}</b><span class="ws-meta"><span class="ws-status ws-${s}">${s}</span><span class="ws-bar"><i style="--p:${pct}%"></i></span></span></div>`).join('')}</div>
      <p class="ws-sub">Meanwhile, <a href="${R.work || 'work.html'}">see what I've built →</a></p>`;
  };
  // Renders full list or coming-soon depending on the mode.
  UI.writing = (el, opts = {}) => UI.writingMode() === 'soon' ? UI.writingSoon(el, opts) : (opts.plain ? UI.plainList(el, opts) : UI.writingList(el, opts));
  UI.modeToggle = () => {
    const m = UI.writingMode(), b = document.createElement('button');
    b.className = 'mode-toggle';
    b.innerHTML = `<span>demo · writing:</span><b class="${m === 'soon' ? 'on' : ''}">coming soon</b><b class="${m === 'full' ? 'on' : ''}">full blog</b>`;
    b.onclick = () => { try { localStorage.setItem('sk-writing', m === 'soon' ? 'full' : 'soon'); } catch (e) {} location.href = location.pathname; };
    document.body.append(b);
  };

  // 3D tilt + glare that follows the cursor, springs back on leave.
  UI.tilt = (el, { max = 10 } = {}) => {
    el.classList.add('tilt'); el.insertAdjacentHTML('beforeend', '<span class="glare"></span>');
    let rx = 0, ry = 0, tx = 0, ty = 0, vx = 0, vy = 0;
    el.addEventListener('mousemove', e => { const r = el.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
      tx = -py * max; ty = px * max; el.style.setProperty('--gx', (px + .5) * 100 + '%'); el.style.setProperty('--gy', (py + .5) * 100 + '%'); el.classList.add('hov'); });
    el.addEventListener('mouseleave', () => { tx = ty = 0; el.classList.remove('hov'); });
    el.addEventListener('click', () => { vx += 14; vy -= 10; });
    (function spring() { vx = (vx + (tx - rx) * .12) * .8; vy = (vy + (ty - ry) * .12) * .8; rx += vx; ry += vy;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`; requestAnimationFrame(spring); })();
  };

  // Index Card's one-line "Elsewhere".
  UI.elsewhereLine = (el, links = [['about', 'about.html'], ['résumé', 'resume.html'], ['contact', 'contact.html'], ['card', 'card.html']]) => {
    el.className = 'else-line';
    el.innerHTML = `Elsewhere: ${links.map(([l, h]) => `<a href="${h}">${l}</a>`).join(', ')}.`;
  };

  // Index Card's writing | work lists as a page of their own.
  UI.everything = el => {
    el.className = 'everything';
    el.innerHTML = `<div id="writing"><div class="ev-h">${UI.chapter('', 'Writing')}</div><div id="ev-w"></div></div>
      <div id="work"><div class="ev-h">${UI.chapter('', 'Work')}</div><div class="plist">${projects.map(p => `<a href="${projHref(p.key)}"><span>${p.title}</span><small>${p.type}</small></a>`).join('')}</div></div>`;
    UI.writing($('#ev-w', el), { plain: true });
    if (location.hash) { const t = document.querySelector(location.hash); if (t) setTimeout(() => t.scrollIntoView({ behavior: 'smooth' }), 100); }
  };

  window.UI = UI;
})();
