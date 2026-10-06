// Flow-field background. Colors come from CSS vars --flow-bg / --flow-line / --flow-hi (r,g,b triplets).
// new FlowField(canvas, { density, shockwave, signature, links, interactive, clickTarget })
(function () {
  const P = new Uint8Array(512);
  { const p = [...Array(256).keys()].sort(() => Math.random() - .5); for (let i = 0; i < 512; i++) P[i] = p[i & 255]; }
  const fade = t => t * t * t * (t * (t * 6 - 15) + 10), lerp = (a, b, t) => a + t * (b - a);
  const grad = (h, x, y) => ((h & 1) ? -x : x) + ((h & 2) ? -y : y);
  function noise(a, b) {
    const X = Math.floor(a) & 255, Y = Math.floor(b) & 255; a -= Math.floor(a); b -= Math.floor(b);
    const u = fade(a), v = fade(b), A = P[X] + Y, B = P[X + 1] + Y;
    return lerp(lerp(grad(P[A], a, b), grad(P[B], a - 1, b), u), lerp(grad(P[A + 1], a, b - 1), grad(P[B + 1], a - 1, b - 1), u), v);
  }
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  window.FlowField = function (canvas, o = {}) {
    const opt = Object.assign({ density: 1100, shockwave: true, signature: false, initials: 'SK', links: false, interactive: true, clickTarget: null, sigX: .7 }, o);
    const x = canvas.getContext('2d'), dpr = Math.min(devicePixelRatio || 1, 2);
    let W = 0, H = 0, pts = [], ripples = [], mask = null, col = {}, sig = 0, visible = true;
    const mouse = { x: -9999, y: -9999 }; let lastMove = performance.now();
    const t0 = performance.now();

    function colors() {
      const s = getComputedStyle(document.documentElement);
      col = { bg: s.getPropertyValue('--flow-bg').trim(), line: s.getPropertyValue('--flow-line').trim(), hi: s.getPropertyValue('--flow-hi').trim(),
        light: document.documentElement.dataset.theme === 'light' };
      x.fillStyle = `rgb(${col.bg})`; x.fillRect(0, 0, W, H);
    }
    function spawn(p) { p.x = Math.random() * W; p.y = Math.random() * H; p.life = 80 + Math.random() * 220; p.kick = 0; return p; }
    function buildMask() {
      const m = document.createElement('canvas'); m.width = W; m.height = H; const mx = m.getContext('2d');
      const size = Math.min(W * .4, H * .62);
      mx.font = `800 ${size}px Inter, system-ui, sans-serif`; mx.textAlign = 'center'; mx.textBaseline = 'middle';
      mx.fillText(opt.initials, W * opt.sigX, H * .52);
      mask = mx.getImageData(0, 0, W, H).data;
    }
    const inMask = (px, py) => mask && px >= 0 && py >= 0 && px < W && py < H && mask[((py | 0) * W + (px | 0)) * 4 + 3] > 128;

    function size() {
      const r = canvas.getBoundingClientRect(); W = Math.max(1, r.width); H = Math.max(1, r.height);
      canvas.width = W * dpr; canvas.height = H * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0);
      pts = Array.from({ length: Math.round(W * H / opt.density) }, () => spawn({}));
      if (opt.signature) buildMask();
      colors();
    }

    if (opt.interactive) {
      addEventListener('mousemove', e => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; lastMove = performance.now(); }, { passive: true });
      document.addEventListener('mouseleave', () => { mouse.x = mouse.y = -9999; });
    }
    if (opt.shockwave) (opt.clickTarget || canvas.parentElement).addEventListener('click', e => {
      if (e.target.closest('a,button,input,textarea')) return;
      const r = canvas.getBoundingClientRect(); ripples.push({ x: e.clientX - r.left, y: e.clientY - r.top, r: 0 });
    });
    document.addEventListener('themechange', colors);
    new ResizeObserver(size).observe(canvas);
    new IntersectionObserver(es => { visible = es[0].isIntersecting; }).observe(canvas);

    function loop(now) { requestAnimationFrame(loop); if (visible) step(now); }
    function step(now) {
      if (!W) return;
      const t = now - t0, idle = now - lastMove;
      x.fillStyle = `rgba(${col.bg},${col.light ? .035 : .05})`; x.fillRect(0, 0, W, H);
      sig += (((opt.signature && idle > 2000) ? 1 : 0) - sig) * .02;
      for (const r of ripples) r.r += 7;
      ripples = ripples.filter(r => r.r < Math.hypot(W, H));
      const z = t * .00005, R = 170, near = [];
      x.lineWidth = 1;
      for (const p of pts) {
        let a = noise(p.x * .0025 + z, p.y * .0025 - z) * Math.PI * 3, heat = 0;
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
        if (d < R) { const k = 1 - d / R; heat = k; a += Math.atan2(dy, dx) * k; if (opt.links && near.length < 60) near.push(p); }
        for (const r of ripples) { const rd = Math.abs(Math.hypot(p.x - r.x, p.y - r.y) - r.r); if (rd < 24) { p.kick = Math.max(p.kick, 1 - rd / 24); p.ka = Math.atan2(p.y - r.y, p.x - r.x); } }
        let nx = p.x + Math.cos(a) * 1.4, ny = p.y + Math.sin(a) * 1.4;
        if (p.kick > .01) { nx += Math.cos(p.ka) * p.kick * 6; ny += Math.sin(p.ka) * p.kick * 6; heat = Math.max(heat, p.kick); p.kick *= .92; }
        const inside = sig > .02 && inMask(p.x, p.y);
        if (inside) { nx = lerp(nx, p.x, sig * .85); ny = lerp(ny, p.y, sig * .85); heat = Math.max(heat, sig * .9); }
        x.strokeStyle = heat > .05 ? `rgba(${col.hi},${.35 + heat * .55})` : `rgba(${col.line},${col.light ? .22 : .28})`;
        x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(nx, ny); x.stroke();
        p.x = nx; p.y = ny; p.life -= inside ? .2 : 1;
        if (p.life < 0 || p.x < 0 || p.x > W || p.y < 0 || p.y > H) spawn(p);
      }
      if (near.length) for (let i = 0; i < near.length; i++) for (let j = i + 1; j < near.length; j++) {
        const a = near[i], b = near[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 55) { x.strokeStyle = `rgba(${col.hi},${(1 - d / 55) * .35})`; x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.stroke(); }
      }
    }
    size();
    if (!reduced) requestAnimationFrame(loop);
    else for (let i = 0; i < 200; i++) step(performance.now());
  };
})();
