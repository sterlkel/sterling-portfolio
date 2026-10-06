"use client";

// Interactive pieces for the Portrait redesign (STI-342), ported from design/demos/shared/flow.js.
// Not wired into any page yet; STI-343/STI-344 adopt them.
import { Fragment, useEffect, useRef, type CSSProperties, type ReactNode, type RefObject } from "react";

type FlowOptions = { density?: number; signature?: boolean; sigX?: number; sigY?: number; sigSize?: number; shockwave?: boolean };

const perm = (() => {
  const p = Array.from({ length: 256 }, (_, i) => i).sort(() => Math.random() - 0.5);
  return Uint8Array.from({ length: 512 }, (_, i) => p[i & 255]);
})();
const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
const lerp = (a: number, b: number, t: number) => a + t * (b - a);
const grad = (h: number, x: number, y: number) => ((h & 1) ? -x : x) + ((h & 2) ? -y : y);
function noise(a: number, b: number) {
  const X = Math.floor(a) & 255, Y = Math.floor(b) & 255;
  a -= Math.floor(a); b -= Math.floor(b);
  const u = fade(a), v = fade(b), A = perm[X] + Y, B = perm[X + 1] + Y;
  return lerp(lerp(grad(perm[A], a, b), grad(perm[B], a - 1, b), u), lerp(grad(perm[A + 1], a, b - 1), grad(perm[B + 1], a - 1, b - 1), u), v);
}

type Particle = { x: number; y: number; life: number; kick: number; ka: number };

function startFlow(canvas: HTMLCanvasElement, clickTarget: HTMLElement, o: FlowOptions) {
  const opt = { density: 1100, signature: false, sigX: 0.7, sigY: 0.52, sigSize: 1, shockwave: true, ...o };
  const ctx = canvas.getContext("2d")!;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let W = 0, H = 0, pts: Particle[] = [], ripples: { x: number; y: number; r: number }[] = [];
  let mask: Uint8ClampedArray | null = null, sig = 0, visible = true, raf = 0, lastMove = performance.now();
  let col = { bg: "", line: "", hi: "", light: false };
  const mouse = { x: -9999, y: -9999 }, t0 = performance.now();

  const colors = () => {
    const s = getComputedStyle(document.documentElement);
    col = { bg: s.getPropertyValue("--flow-bg").trim(), line: s.getPropertyValue("--flow-line").trim(), hi: s.getPropertyValue("--flow-hi").trim(), light: s.colorScheme === "light" };
    ctx.fillStyle = `rgb(${col.bg})`; ctx.fillRect(0, 0, W, H);
  };
  const spawn = (p: Particle) => { p.x = Math.random() * W; p.y = Math.random() * H; p.life = 80 + Math.random() * 220; p.kick = 0; return p; };
  const buildMask = () => {
    const m = document.createElement("canvas"); m.width = W; m.height = H;
    const mx = m.getContext("2d")!;
    mx.font = `800 ${Math.min(W * 0.4, H * 0.62) * opt.sigSize}px sans-serif`; mx.textAlign = "center"; mx.textBaseline = "middle";
    mx.fillText("SK", W * opt.sigX, H * opt.sigY);
    mask = mx.getImageData(0, 0, W, H).data;
  };
  const inMask = (x: number, y: number) => !!mask && x >= 0 && y >= 0 && x < W && y < H && mask[((y | 0) * W + (x | 0)) * 4 + 3] > 128;
  const size = () => {
    const r = canvas.getBoundingClientRect(); W = Math.max(1, r.width); H = Math.max(1, r.height);
    canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    pts = Array.from({ length: Math.round((W * H) / opt.density) }, () => spawn({} as Particle));
    if (opt.signature) buildMask();
    colors();
  };

  const onMove = (e: MouseEvent) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; lastMove = performance.now(); };
  const onClick = (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest("a,button")) return;
    const r = canvas.getBoundingClientRect(); ripples.push({ x: e.clientX - r.left, y: e.clientY - r.top, r: 0 });
  };
  window.addEventListener("mousemove", onMove, { passive: true });
  if (opt.shockwave) clickTarget.addEventListener("click", onClick);
  const themeObs = new MutationObserver(colors);
  themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const ro = new ResizeObserver(size); ro.observe(canvas);
  const io = new IntersectionObserver(es => { visible = es[0].isIntersecting; }); io.observe(canvas);

  const step = (now: number) => {
    const t = now - t0;
    ctx.fillStyle = `rgba(${col.bg},${col.light ? 0.035 : 0.05})`; ctx.fillRect(0, 0, W, H);
    sig += ((opt.signature && now - lastMove > 2000 ? 1 : 0) - sig) * 0.02;
    ripples.forEach(r => (r.r += 7));
    ripples = ripples.filter(r => r.r < Math.hypot(W, H));
    const z = t * 0.00005;
    for (const p of pts) {
      let a = noise(p.x * 0.0025 + z, p.y * 0.0025 - z) * Math.PI * 3, heat = 0;
      const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
      if (d < 170) { const k = 1 - d / 170; heat = k; a += Math.atan2(dy, dx) * k; }
      for (const r of ripples) { const rd = Math.abs(Math.hypot(p.x - r.x, p.y - r.y) - r.r); if (rd < 24) { p.kick = Math.max(p.kick, 1 - rd / 24); p.ka = Math.atan2(p.y - r.y, p.x - r.x); } }
      let nx = p.x + Math.cos(a) * 1.4, ny = p.y + Math.sin(a) * 1.4;
      if (p.kick > 0.01) { nx += Math.cos(p.ka) * p.kick * 6; ny += Math.sin(p.ka) * p.kick * 6; heat = Math.max(heat, p.kick); p.kick *= 0.92; }
      const inside = sig > 0.02 && inMask(p.x, p.y);
      if (inside) { nx = lerp(nx, p.x, sig * 0.85); ny = lerp(ny, p.y, sig * 0.85); heat = Math.max(heat, sig * 0.9); }
      ctx.strokeStyle = heat > 0.05 ? `rgba(${col.hi},${0.35 + heat * 0.55})` : `rgba(${col.line},${col.light ? 0.22 : 0.28})`;
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(nx, ny); ctx.stroke();
      p.x = nx; p.y = ny; p.life -= inside ? 0.2 : 1;
      if (p.life < 0 || p.x < 0 || p.x > W || p.y < 0 || p.y > H) spawn(p);
    }
  };
  const loop = (now: number) => { raf = requestAnimationFrame(loop); if (visible && W) step(now); };
  size();
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) for (let i = 0; i < 200; i++) step(performance.now());
  else raf = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); clickTarget.removeEventListener("click", onClick);
    themeObs.disconnect(); ro.disconnect(); io.disconnect();
  };
}

export function FlowCanvas({ className, style, clickTargetRef, ...opts }: FlowOptions & { className?: string; style?: CSSProperties; clickTargetRef?: RefObject<HTMLElement> }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    return startFlow(c, clickTargetRef?.current ?? c.parentElement!, opts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <canvas ref={ref} className={className} style={style} aria-hidden="true" />;
}

// Cursor-following 3D tilt with a springy return; click gives it a bounce.
export function Tilt({ children, className, style, max = 12 }: { children: ReactNode; className?: string; style?: CSSProperties; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    let rx = 0, ry = 0, tx = 0, ty = 0, vx = 0, vy = 0, raf = 0;
    const move = (e: MouseEvent) => { const r = el.getBoundingClientRect(); tx = -((e.clientY - r.top) / r.height - 0.5) * max; ty = ((e.clientX - r.left) / r.width - 0.5) * max; };
    const leave = () => { tx = ty = 0; };
    const click = () => { vx += 14; vy -= 10; };
    el.addEventListener("mousemove", move); el.addEventListener("mouseleave", leave); el.addEventListener("click", click);
    const spring = () => {
      vx = (vx + (tx - rx) * 0.12) * 0.8; vy = (vy + (ty - ry) * 0.12) * 0.8; rx += vx; ry += vy;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      raf = requestAnimationFrame(spring);
    };
    spring();
    return () => { cancelAnimationFrame(raf); el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); el.removeEventListener("click", click); };
  }, [max]);
  return <div ref={ref} className={className} style={style}>{children}</div>;
}

// Splits text into words that rise in one after another.
export function RiseWords({ text, wordClassName }: { text: string; wordClassName?: string }) {
  return <>{text.split(" ").map((w, i) => <Fragment key={i}><span className={wordClassName} style={{ animationDelay: `${0.1 + i * 0.12}s` }}>{w}</span>{" "}</Fragment>)}</>;
}
