"use client";

// Interactive pieces for the Portrait redesign (STI-342), ported from design/demos/shared/flow.js.
// Not wired into any page yet; STI-343/STI-344 adopt them.
import { Fragment, useEffect, useRef, type CSSProperties, type ReactNode, type RefObject } from "react";

export type FlowOptions = {
  density?: number;
  signature?: boolean;
  initials?: string;
  sigX?: number;
  sigY?: number;
  sigSize?: number;
  shockwave?: boolean;
};

type Particle = { x: number; y: number; life: number; kick: number; ka: number };
type Ripple = { x: number; y: number; r: number };
type FlowColors = { bg: string; line: string; hi: string; light: boolean };

const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
const lerp = (a: number, b: number, t: number) => a + t * (b - a);
const grad = (hash: number, x: number, y: number) => ((hash & 1) ? -x : x) + ((hash & 2) ? -y : y);

function createNoise() {
  const values = Array.from({ length: 256 }, (_, index) => index).sort(() => Math.random() - 0.5);
  const permutation = Uint8Array.from({ length: 512 }, (_, index) => values[index & 255]);

  return (x: number, y: number) => {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    const u = fade(x);
    const v = fade(y);
    const A = permutation[X] + Y;
    const B = permutation[X + 1] + Y;
    return lerp(
      lerp(grad(permutation[A], x, y), grad(permutation[B], x - 1, y), u),
      lerp(grad(permutation[A + 1], x, y - 1), grad(permutation[B + 1], x - 1, y - 1), u),
      v,
    );
  };
}

function startFlow(canvas: HTMLCanvasElement, clickTarget: HTMLElement, options: FlowOptions) {
  const opt = {
    density: 1100,
    signature: false,
    initials: "SK",
    sigX: 0.7,
    sigY: 0.52,
    sigSize: 1,
    shockwave: true,
    ...options,
  };
  const context = canvas.getContext("2d");
  if (!context) return;

  const noise = createNoise();
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let reducedMotion = motionQuery.matches;
  let width = 0;
  let height = 0;
  let particles: Particle[] = [];
  let ripples: Ripple[] = [];
  let signatureMask: Uint8ClampedArray | null = null;
  let signatureVisibility = 0;
  let visible = false;
  let animationFrame: number | undefined;
  let lastMove = performance.now();
  let colors: FlowColors = { bg: "0, 0, 0", line: "255, 255, 255", hi: "255, 255, 255", light: false };
  const mouse = { x: -9999, y: -9999 };
  const startedAt = performance.now();

  const updateColors = () => {
    const root = document.documentElement;
    const styles = getComputedStyle(root);
    colors = {
      bg: styles.getPropertyValue("--flow-bg").trim(),
      line: styles.getPropertyValue("--flow-line").trim(),
      hi: styles.getPropertyValue("--flow-hi").trim(),
      light: root.dataset.theme === "light",
    };
    context.fillStyle = `rgb(${colors.bg})`;
    context.fillRect(0, 0, width, height);
  };

  const spawn = (particle: Particle) => {
    particle.x = Math.random() * width;
    particle.y = Math.random() * height;
    particle.life = 80 + Math.random() * 220;
    particle.kick = 0;
    return particle;
  };

  const buildSignatureMask = () => {
    const maskCanvas = document.createElement("canvas");
    maskCanvas.width = width;
    maskCanvas.height = height;
    const maskContext = maskCanvas.getContext("2d");
    if (!maskContext) return;

    const signatureSize = Math.min(width * 0.4, height * 0.62) * opt.sigSize;
    maskContext.font = `800 ${signatureSize}px Inter, system-ui, sans-serif`;
    maskContext.textAlign = "center";
    maskContext.textBaseline = "middle";
    maskContext.fillText(opt.initials, width * opt.sigX, height * opt.sigY);
    signatureMask = maskContext.getImageData(0, 0, width, height).data;
  };

  const inSignatureMask = (x: number, y: number) => (
    signatureMask !== null
    && x >= 0
    && y >= 0
    && x < width
    && y < height
    && signatureMask[((y | 0) * width + (x | 0)) * 4 + 3] > 128
  );

  const drawStaticFrame = () => {
    for (let index = 0; index < 200; index += 1) draw(performance.now());
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    particles = Array.from({ length: Math.round((width * height) / opt.density) }, () => spawn({} as Particle));
    if (opt.signature) buildSignatureMask();
    updateColors();
    if (reducedMotion) drawStaticFrame();
  };

  const onMove = (event: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
    lastMove = performance.now();
  };
  const onMouseLeave = () => {
    mouse.x = -9999;
    mouse.y = -9999;
  };
  const onClick = (event: MouseEvent) => {
    const target = event.target;
    if (target instanceof Element && target.closest("a, button, input, textarea, select, label")) return;
    const rect = canvas.getBoundingClientRect();
    ripples.push({ x: event.clientX - rect.left, y: event.clientY - rect.top, r: 0 });
  };

  const draw = (now: number) => {
    const elapsed = now - startedAt;
    context.fillStyle = `rgba(${colors.bg},${colors.light ? 0.035 : 0.05})`;
    context.fillRect(0, 0, width, height);
    signatureVisibility += ((opt.signature && now - lastMove > 2000 ? 1 : 0) - signatureVisibility) * 0.02;
    ripples.forEach((ripple) => { ripple.r += 7; });
    ripples = ripples.filter((ripple) => ripple.r < Math.hypot(width, height));

    const z = elapsed * 0.00005;
    context.lineWidth = 1;
    for (const particle of particles) {
      let angle = noise(particle.x * 0.0025 + z, particle.y * 0.0025 - z) * Math.PI * 3;
      let heat = 0;
      const dx = particle.x - mouse.x;
      const dy = particle.y - mouse.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 170) {
        const strength = 1 - distance / 170;
        heat = strength;
        angle += Math.atan2(dy, dx) * strength;
      }

      for (const ripple of ripples) {
        const rippleDistance = Math.abs(Math.hypot(particle.x - ripple.x, particle.y - ripple.y) - ripple.r);
        if (rippleDistance < 24) {
          particle.kick = Math.max(particle.kick, 1 - rippleDistance / 24);
          particle.ka = Math.atan2(particle.y - ripple.y, particle.x - ripple.x);
        }
      }

      let nextX = particle.x + Math.cos(angle) * 1.4;
      let nextY = particle.y + Math.sin(angle) * 1.4;
      const insideSignature = signatureVisibility > 0.02 && inSignatureMask(particle.x, particle.y);
      if (particle.kick > 0.01) {
        nextX += Math.cos(particle.ka) * particle.kick * 6;
        nextY += Math.sin(particle.ka) * particle.kick * 6;
        heat = Math.max(heat, particle.kick);
        particle.kick *= 0.92;
      }
      if (insideSignature) {
        nextX = lerp(nextX, particle.x, signatureVisibility * 0.85);
        nextY = lerp(nextY, particle.y, signatureVisibility * 0.85);
        heat = Math.max(heat, signatureVisibility * 0.9);
      }

      context.strokeStyle = heat > 0.05
        ? `rgba(${colors.hi},${0.35 + heat * 0.55})`
        : `rgba(${colors.line},${colors.light ? 0.22 : 0.28})`;
      context.beginPath();
      context.moveTo(particle.x, particle.y);
      context.lineTo(nextX, nextY);
      context.stroke();
      particle.x = nextX;
      particle.y = nextY;
      particle.life -= insideSignature ? 0.2 : 1;
      if (particle.life < 0 || particle.x < 0 || particle.x > width || particle.y < 0 || particle.y > height) spawn(particle);
    }
  };

  const stopLoop = () => {
    if (animationFrame !== undefined) cancelAnimationFrame(animationFrame);
    animationFrame = undefined;
  };
  const loop = (now: number) => {
    animationFrame = undefined;
    if (!visible || reducedMotion) return;
    draw(now);
    animationFrame = requestAnimationFrame(loop);
  };
  const startLoop = () => {
    if (!reducedMotion && visible && animationFrame === undefined) animationFrame = requestAnimationFrame(loop);
  };

  const themeObserver = new MutationObserver(() => {
    updateColors();
    if (reducedMotion) drawStaticFrame();
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) startLoop();
    else stopLoop();
  });
  intersectionObserver.observe(canvas);
  const onMotionChange = (event: MediaQueryListEvent) => {
    reducedMotion = event.matches;
    if (reducedMotion) {
      stopLoop();
      drawStaticFrame();
    } else {
      startLoop();
    }
  };

  window.addEventListener("mousemove", onMove, { passive: true });
  document.addEventListener("mouseleave", onMouseLeave);
  if (opt.shockwave) clickTarget.addEventListener("click", onClick);
  motionQuery.addEventListener("change", onMotionChange);
  resize();

  return () => {
    stopLoop();
    window.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseleave", onMouseLeave);
    clickTarget.removeEventListener("click", onClick);
    motionQuery.removeEventListener("change", onMotionChange);
    themeObserver.disconnect();
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
  };
}

export type FlowCanvasProps = FlowOptions & {
  className?: string;
  style?: CSSProperties;
  clickTargetRef?: RefObject<HTMLElement>;
};

export function FlowCanvas({
  className,
  style,
  clickTargetRef,
  density,
  signature,
  initials,
  sigX,
  sigY,
  sigSize,
  shockwave,
}: FlowCanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const clickTarget = clickTargetRef?.current ?? canvas?.parentElement;
    if (!canvas || !clickTarget) return;
    return startFlow(canvas, clickTarget, { density, signature, initials, sigX, sigY, sigSize, shockwave });
  }, [clickTargetRef, density, signature, initials, sigX, sigY, sigSize, shockwave]);

  return <canvas ref={ref} className={className} style={style} aria-hidden="true" />;
}

// Cursor-following 3D tilt with a springy return; click gives it a bounce.
export function Tilt({ children, className, style, max = 12 }: { children: ReactNode; className?: string; style?: CSSProperties; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let rx = 0, ry = 0, tx = 0, ty = 0, vx = 0, vy = 0;
    let raf: number | undefined;
    const move = (e: MouseEvent) => { const r = el.getBoundingClientRect(); tx = -((e.clientY - r.top) / r.height - 0.5) * max; ty = ((e.clientX - r.left) / r.width - 0.5) * max; };
    const leave = () => { tx = ty = 0; };
    const click = () => { vx += 14; vy -= 10; };
    const spring = () => {
      vx = (vx + (tx - rx) * 0.12) * 0.8; vy = (vy + (ty - ry) * 0.12) * 0.8; rx += vx; ry += vy;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      raf = requestAnimationFrame(spring);
    };
    const stop = () => {
      if (raf !== undefined) cancelAnimationFrame(raf);
      raf = undefined;
      el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); el.removeEventListener("click", click);
      el.style.transform = "";
    };
    const start = () => {
      if (raf !== undefined) return;
      el.addEventListener("mousemove", move); el.addEventListener("mouseleave", leave); el.addEventListener("click", click);
      spring();
    };
    const onMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) stop();
      else start();
    };

    if (!motionQuery.matches) start();
    motionQuery.addEventListener("change", onMotionChange);
    return () => { stop(); motionQuery.removeEventListener("change", onMotionChange); };
  }, [max]);
  return <div ref={ref} className={className} style={style}>{children}</div>;
}

// Splits text into words that rise in one after another.
export function RiseWords({ text, wordClassName }: { text: string; wordClassName?: string }) {
  return <>{text.split(" ").map((w, i) => <Fragment key={i}><span className={wordClassName} style={{ animationDelay: `${0.1 + i * 0.12}s` }}>{w}</span>{" "}</Fragment>)}</>;
}
